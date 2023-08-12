
const currentTab = await chrome.tabs.getCurrent()

export const debuggee = {tabId: currentTab.id}

if (currentTab.id && currentTab.url.startsWith("http")) {
    await chrome.debugger.attach(debuggee, "0.1")
}


export default chrome;