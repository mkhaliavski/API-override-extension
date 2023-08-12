import ResourceType = chrome.webRequest.ResourceType;
import Network = chrome.devtools.network;

export type NetworkEntry = {
    requestId: string;
    request: Network.Request;
    frameId: string;
    resourceType: ResourceType;
    responseErrorReason?: string;
    responseStatusCode?: number;
    responseStatusText?: string;
    responseHeaders: Array<{name: string; value: string}>
    body?: string;
}

export type FetchViewCallback = (newEntry: NetworkEntry, all: NetworkEntry[], prev: NetworkEntry[]) => void;

export interface ResponseOverride {
    overridingUrl: string;
    override(source: NetworkEntry): NetworkEntry;
}

