import chrome, {debuggee} from "src/lib/chrome/chrome"
import { FetchViewCallback, NetworkEntry, ResponseOverride } from "./types";


class NetworkManager {

    private readonly viewCallbacks = new Map<string, FetchViewCallback>();
    private readonly responseOverrides = new Map<string, ResponseOverride>();

    private requestMap = new Map<string, NetworkEntry>();

    public async enable() {
        await chrome.debugger.sendCommand(debuggee, "Fetch.enable");
    }

    public async disable() {
        await chrome.debugger.sendCommand(debuggee, "Fetch.disable");

        await chrome.debugger.onEvent.addListener(async (source, method, params: NetworkEntry) => {
            if (method !== "Fetch.requestPaused") {
                return;
            }

            if (source.tabId !== debuggee.tabId) {
                await chrome.debugger.sendCommand(source, "Fetch.continueRequest");
                return;
            }

            let isResponseOverridden = false;
            this.responseOverrides.forEach((responseOverride) => {
                if (responseOverride.overridingUrl === (params.request as any).url) {
                    Object.assign(params, responseOverride.override(params))
                    isResponseOverridden = true;
                }
            })

            if (!params.body && params.responseStatusCode && (params.responseStatusCode >=200 && params.responseStatusCode < 300)) {
                const bodyResponse = await chrome.debugger.sendCommand(source, "Fetch.getResponseBody", {requestId: params.requestId}) as any;

                if (bodyResponse.base64Encoded) {
                    bodyResponse.body = atob(escape(decodeURIComponent(bodyResponse.body)))
                }
            }

            const updatedRequestMap = new Map([...this.requestMap.entries(), [params.requestId, params]])

            this.viewCallbacks.forEach((callback) => {
                callback(params, Array.from(updatedRequestMap.values()), Array.from(this.requestMap.values()))
            })

            this.requestMap = updatedRequestMap;

            if (isResponseOverridden) {
                if (params.responseErrorReason) {
                    await chrome.debugger.sendCommand(source, "Fetch.failRequest", params)
                } else {
                    await chrome.debugger.sendCommand(source, "Fetch.fulfillRequest", params)
                }
            }
            await chrome.debugger.sendCommand(source, "Fetch.continueRequest", params);
        })
    }



    public addViewCallback(key: string, callback: FetchViewCallback) {
        this.viewCallbacks.set(key, callback)
    }

    public hasViewCallback(key: string) {
        return this.viewCallbacks.has(key)
    }

    public removeViewCallback(key: string) {
        this.viewCallbacks.delete(key)
    }

    public addOverride(key: string, override: ResponseOverride) {
        this.responseOverrides.set(key, override)
    }

    public hasOverride(key: string) {
        return this.responseOverrides.has(key);
    }

    public removeOverride(key: string) {
        this.responseOverrides.delete(key)
    }
}

export default new NetworkManager()
