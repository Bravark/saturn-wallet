// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.get("loggedIn", ({ loggedIn }) => {
//     if (!loggedIn) {
//       chrome.tabs.create({
//         url: chrome.runtime.getURL("index.html#/landing"),
//       });
//     }
//   });
// });

chrome.action.onClicked.addListener(() => {
  chrome.storage.sync.get("loggedIn", ({ loggedIn }) => {
    if (loggedIn) {
      // Remove the default popup to handle redirection
      chrome.action.setPopup({ popup: "" });

      // Open the login page in a new tab
      chrome.tabs.create({
        url: chrome.runtime.getURL("index.html#/landing"),
      });
    } else {
      // Restore the default popup for logged-in users
      chrome.action.setPopup({ popup: "index.html" });

      // Programmatically open the popup
      chrome.action.openPopup();
    }
  });
});
