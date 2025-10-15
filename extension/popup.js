document.getElementById("attachDebugger").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.action.setBadgeText({ text: "Debug" });
        chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
        chrome.runtime.sendMessage({ id: activeTab.id, server:'server' });
      }
    });
  });