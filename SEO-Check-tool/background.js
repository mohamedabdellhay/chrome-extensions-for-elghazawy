// background.js - Service Worker للإضافة

chrome.runtime.onInstalled.addListener(() => {
  console.log("SEO Checker Extension installed");
});

// تفعيل الإضافة عند تغيير التبويب
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    if (tab.url.match(/admin\.elghazawy\.com\/admin\/item2\/.*\/edit/)) {
      chrome.action.setBadgeText({
        tabId: tabId,
        text: "ON",
      });
      chrome.action.setBadgeBackgroundColor({ color: "#4ade80" });
    } else {
      chrome.action.setBadgeText({
        tabId: tabId,
        text: "",
      });
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSEOData") {
    sendResponse({ status: "success" });
  }

  if (request.action === "openOptions") {
    chrome.runtime.openOptionsPage();
  }
});

chrome.contextMenus.create({
  id: "seo-checker-panel",
  title: "SEO Checker Panel",
  contexts: ["page"],
  documentUrlPatterns: ["https://admin.elghazawy.com/admin/item2/*/edit*"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "seo-checker-panel") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const refreshBtn = document.getElementById("refresh-seo");
        if (refreshBtn) {
          refreshBtn.click();
        } else {
          location.reload();
        }
      },
    });
  }
});
