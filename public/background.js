chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("index.html#/landing"),
    });
  }
  // chrome.storage.sync.get("loggedIn", ({ loggedIn }) => {
  //   if (!loggedIn) {
  //     chrome.tabs.create({
  //       url: chrome.runtime.getURL("index.html#/landing"),
  //     });
  //   }
  // });
});

chrome.action.onClicked.addListener((details) => {
  chrome.storage.sync.get("accountCreated", ({ encrypted }) => {
    if (!encrypted) {
      // Remove the default popup to handle redirection
      chrome.action.setPopup({ popup: "index.html#/welcome" });

      // Open the login page in a new tab
      // chrome.tabs.create({
      //   url: chrome.runtime.getURL("index.html#/welcome"),
      // });
      // Programmatically open the popup
      chrome.action.openPopup();
    } else {
      // Restore the default popup for logged-in users
      chrome.action.setPopup({ popup: "index.html" });

      // Programmatically open the popup
      chrome.action.openPopup();
    }
  });
});

// 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

function loginWithGoogle() {
  const clientId =
    "Y1054224637281-4epe4bvpic5tdv68lg133tm8pre8pmhg.apps.googleusercontent.com";
  const redirectUri = chrome.identity.getRedirectURL();
  const scope =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${redirectUri}&` +
    `response_type=token&` +
    `scope=${scope}`;

  chrome.identity.launchWebAuthFlow(
    {
      url: authUrl,
      interactive: true,
    },
    (redirectUrl) => {
      if (chrome.runtime.lastError || !redirectUrl) {
        console.error("Login failed:", chrome.runtime.lastError);
        return;
      }

      // Extract the access token from the redirect URL
      const params = new URLSearchParams(
        new URL(redirectUrl).hash.substring(1)
      );
      const accessToken = params.get("access_token");

      if (accessToken) {
        console.log("Access Token:", accessToken);

        // Fetch user info using the access token
        fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((userInfo) => {
            console.log("User Info:", userInfo);
            // Save user info to Chrome storage
            chrome.storage.sync.set({ userInfo, loggedIn: true }, () => {
              console.log("User logged in.");
            });
          })
          .catch((error) => console.error("Failed to fetch user info:", error));
      }
    }
  );
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "login") {
    loginWithGoogle();
  }
  if (message.type === "setEncryption") {
    chrome.storage.sync.set({ accountCreated: message.encrypt });
  }
  if (message.type === "getEncryption") {
    chrome.storage.sync.get(["accountCreated"]).then((encrypted) => {
      sendResponse({ success: true, encrypted: encrypted.accountCreated });
    });
  }

  return true;
});
