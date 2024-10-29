# LinkedIn Auto Connector 🚀

This Chrome extension automates the process of sending connection requests on LinkedIn. It locates and clicks "Connect" buttons on LinkedIn profiles, sending requests without a personalized note. You can start and stop the connection process as needed, making it easier to network on the platform.

![image](https://github.com/user-attachments/assets/8b4e3861-7a5e-4fb3-8c22-f5933f6ba9d8)


![image](https://github.com/user-attachments/assets/d5008d6b-1006-4769-a738-3c93254c1b87)

![image](https://github.com/user-attachments/assets/861f3311-8ea6-43bf-ae29-1c55cc857183)

![image](https://github.com/user-attachments/assets/f5a7408a-5bdd-4adc-8c76-f59ea4150788)

## DEMO VIDEO LINK

[Click Here](https://drive.google.com/file/d/1FfU-MMPS30znsLMUZ0Rl--JIfNWe4wnp/view?usp=sharing)

## Features 🌟
- **Automatic Connection Requests**: Finds and clicks "Connect" buttons for you.
- **Start/Stop Control**: Start and stop the connection requests anytime.
- **Button Count**: Displays the number of available "Connect" buttons.
- **Status Updates**: Provides feedback on the process (e.g., `Sending connection requests...`, `Stopped sending connection requests`).

## Installation 🛠️
1. Clone this repository to your local machine. == > git clone https://github.com/Ragulakarthik/Kinkedin_Auto_Connector_Extension.git
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

## Problem Understanding and Requirements Analysis  📊
The primary goal of this extension is to automate LinkedIn connection requests to enhance networking efforts. To do this efficiently:

**Automation**: We needed a mechanism to identify and click "Connect" buttons across a LinkedIn page.

**Control Mechanism:** A way to start and stop the automation process, as it’s necessary to give the user control over the actions.

**Status and Feedback:** Users would need feedback on the extension’s actions (e.g., the number of "Connect" buttons found, whether it's currently running, etc.). These requirements led to designing a Chrome extension with a popup UI, a background script for event management, and content scripts for on-page actions.

## Architectural Design Choices  🏗️
The architecture for a Chrome extension involves several components:

**popup.html and popup.js**: These files create and manage the user interface of the extension, allowing the user to start and stop the automation process.

**content.js:** This script directly interacts with LinkedIn’s DOM (Document Object Model). Its responsibility is to detect "Connect" buttons and initiate a click action on each button found. Additionally, it needs to be aware of other elements like "Message" or "Pending" buttons to avoid unnecessary clicks.

**background.js**: A background script helps persist the state and event listeners even when the popup is not open, making the extension more reliable and responsive to LinkedIn page changes.

## Key Design Decisions ⚙️

**Manifest Configuration**: I used manifest_version: 3, which is the latest and recommended version for Chrome extensions. Permissions were chosen to grant scripting access to LinkedIn pages, which is necessary for interacting with buttons on the page.

**Content Script (content.js) Execution**: The content script was designed to inject itself into LinkedIn pages as specified by the matches key in the manifest, ensuring the extension only runs where it is needed. This approach also limits unnecessary background processing.

**User-Controlled Actions:** The popup UI gives the user clear Start and Stop buttons, enabling them to initiate and halt the automation process as needed. This makes the extension more user-friendly and provides clear control over the automated actions.

## Implementation of Core Functionalities  🚀
Each component in the extension has a well-defined role, simplifying both the code and its maintenance:

**popup.js:**
This script handles UI interactions, listening for clicks on the Start and Stop buttons.
It then sends corresponding messages (start or stop) to content.js, instructing it to begin or halt the automation process.

**content.js:**

**Button Detection**: The script uses the DOM to detect elements labeled "Connect." It filters out elements that contain "Message" or "Pending" to ensure only valid "Connect" buttons are clicked.

**Automated Clicking**: Once a button is identified, a click() event is triggered. For a more natural user simulation, a random delay (5–10 seconds) between each action was added to avoid LinkedIn’s anti-bot detection systems.

**Sending Without Note**: When a modal appears after clicking "Connect," content.js identifies and clicks the "Send without a note" button if available. This step is crucial to minimize user interaction and fully automate the process.

**Progress Updates**: The script communicates with popup.js by sending the status and button count, providing real-time feedback to the user.
background.js:

Maintains a persistent state for the extension, even when the popup is closed, enabling reliable background event handling.

## Error Handling and Edge Cases  🚧

Several scenarios were accounted for:

**Rate Limiting**: Adding a random delay between clicks mimics human behavior, reducing the risk of LinkedIn rate-limiting or flagging the user.

**Duplicate Detection**: Profiles with "Message" or "Pending" instead of "Connect" are ignored, ensuring the extension only sends valid requests.

**User Control and Feedback**: By giving clear start and stop controls, as well as status messages, users are well-informed of the extension’s activity.

## Important Components ⚙️

1. **Status Tracking**: isRunning ensures that the connection requests continue until stopped.
2. **Random Delays**: Adds a random delay (5-10 seconds) between each connection request to simulate a human pattern.
3. **Button Filtering**: Only clicks "Connect" buttons and skips profiles with "Message" or "Pending" options.

## Conclusion ✅
This architecture offers a modular, scalable solution for automating LinkedIn connections. By using separate scripts for different responsibilities, this design provides a clean and organized codebase that can be easily modified or expanded.

This approach ensures efficient automation with user control and minimizes the risk of detection, providing users with a streamlined way to network on LinkedIn.

Feel free to customize the `git clone` URL and any other details as necessary for your project. This `README.md` file now contains all the information you provided in a structured format.  😊
