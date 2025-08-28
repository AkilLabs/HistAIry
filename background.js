// Background script for the History Extension
// This handles opening the sidebar when the extension icon is clicked

chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// Optional: Set default behavior for the sidebar
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({
    path: 'dist/sidebar.html',
    enabled: true
  });
});
