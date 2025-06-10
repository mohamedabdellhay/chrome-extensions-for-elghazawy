// background.js - Service Worker للإضافة

chrome.runtime.onInstalled.addListener(() => {
  console.log("SEO Checker Extension installed");
});

// تفعيل الإضافة عند تغيير التبويب
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    // فحص إذا كان الرابط يطابق النمط المطلوب
    if (tab.url.match(/admin\.elghazawy\.com\/admin\/item2\/.*\/edit/)) {
      // تفعيل icon الإضافة
      chrome.action.setBadgeText({
        tabId: tabId,
        text: "ON",
      });
      chrome.action.setBadgeBackgroundColor({ color: "#4ade80" });
    } else {
      // إلغاء تفعيل icon الإضافة
      chrome.action.setBadgeText({
        tabId: tabId,
        text: "",
      });
    }
  }
});

// التعامل مع رسائل من content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getSEOData") {
    // يمكن إضافة معالجة إضافية هنا
    sendResponse({ status: "success" });
  }

  if (request.action === "openOptions") {
    chrome.runtime.openOptionsPage();
  }
});

// إضافة context menu للصفحات المتوافقة
chrome.contextMenus.create({
  id: "analyzeSEO",
  title: "تحليل SEO للصفحة",
  contexts: ["page"],
  documentUrlPatterns: ["https://admin.elghazawy.com/admin/item2/*/edit*"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "analyzeSEO") {
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
