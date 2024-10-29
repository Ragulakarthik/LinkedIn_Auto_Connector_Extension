# LinkedIn Auto Connector 🚀

This Chrome extension automates the process of sending connection requests on LinkedIn. It locates and clicks "Connect" buttons on LinkedIn profiles, sending requests without a personalized note. You can start and stop the connection process as needed, making it easier to network on the platform.

## Features 🌟
- **Automatic Connection Requests**: Finds and clicks "Connect" buttons for you.
- **Start/Stop Control**: Start and stop the connection requests anytime.
- **Button Count**: Displays the number of available "Connect" buttons.
- **Status Updates**: Provides feedback on the process (e.g., `Sending connection requests...`, `Stopped sending connection requests`).

## Installation 🛠️
1. Clone this repository to your local machine. == > [git clone https://github.com/Ragulakarthik/Kinkedin_Auto_Connector_Extension.git]
2. Open Chrome and navigate to chrome://extensions/.
3. Enable Developer mode (toggle in the top right).
4. Click Load unpacked and select the folder containing this extension.
5. The extension should now be installed and visible in your extensions toolbar.

## Usage  📖
1. Open LinkedIn in a Chrome tab and navigate to a page with "Connect" buttons (e.g., People You May Know).
2. Click on the LinkedIn Auto Connector extension in the Chrome toolbar to open the popup interface.
3. Click Start to begin sending connection requests.
4. The extension will automatically click "Connect" buttons, skipping profiles that already show "Message" or "Pending."
5. Click Stop at any time to halt the connection requests. ⏸️

## How It Works - Workflow Overview  🔍
The extension consists of:

1. **popup.html**: The popup UI with Start and Stop buttons and displays for status and button count.
2. **popup.js**: Handles button clicks in the popup, sends start and stop messages to the content script.
3. **content.js**: Executes on LinkedIn pages, identifies "Connect" buttons, and sends connection requests.
4. **background.js**: Manages persistent event listeners.
5. **manifest.json**: Configures permissions, popup UI, and content scripts.

## Detailed Workflow  🔧

1. **popup.html**:
renders the interface with
Start and Stop buttons to control the connection process.
Status and button count elements to display real-time updates.
2. **popup.js**:
Adds event listeners to the buttons.
Sends start or stop messages to content.js to begin or halt the connection requests.
Updates the interface (status message, button count).
3. **content.js**:
Detects "Connect" buttons, skipping "Message" or "Pending" buttons.
When started, it iteratively clicks each "Connect" button and handles the modal that appears.
Looks for and clicks the "Send without a note" button if available.
Sends updates to popup.js (via chrome.runtime.sendMessage) on the button count and status.
4. **background.js**:
Adds an event listener to automatically inject content.js when the extension icon is clicked.
5. **manifest.json**:
Specifies the Chrome permissions (scripting, activeTab, storage) and content script details.
Sets the popup and icon for the extension.

## Important Components ⚙️

1. **Status Tracking**: isRunning ensures that the connection requests continue until stopped.
2. **Random Delays**: Adds a random delay (5-10 seconds) between each connection request to simulate a human pattern.
3. **Button Filtering**: Only clicks "Connect" buttons and skips profiles with "Message" or "Pending" options.


Feel free to customize the `git clone` URL and any other details as necessary for your project. This `README.md` file now contains all the information you provided in a structured format.  😊
