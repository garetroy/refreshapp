var tabsTimeDict = {}
chrome.tabs.onCreated.addListener(function (tab) {
    if(tab.incognito){ 
        tabsTimeDict[tab.id] = Date.now(); 
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeinfo, tab) {
    if(tab.incognito && tabsTimeDict[tabId] != undefined){ 
        chrome.browsingData.remove({"since":tabsTimeDict[tabId]}, {
        "appcache": true,
        "cache": true,
        "cookies": true,
        "downloads": true,
        "fileSystems": true,
        "formData": true,
        "history": true,
        "indexedDB": true,
        "localStorage": true,
        "pluginData": true,
        "passwords": true,
        "webSQL": true
      },null);
    }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
    if(tabsTimeDict[tabId] !== undefined)
        delete tabsTimeDict[tabId]
});
