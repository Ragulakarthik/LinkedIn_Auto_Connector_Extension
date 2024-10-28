document.addEventListener("DOMContentLoaded", () => {

    let buttonCount = 0;

    // Disable the stop button initially
    document.getElementById("stopButton").disabled = true;

    document.getElementById("startButton").addEventListener("click", () => {
        // Send start message to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "start" });
        });
        
        document.getElementById("status").innerText = "Sending connection requests...";
        
        // Disable the start button and enable the stop button
        document.getElementById("startButton").disabled = true;
        document.getElementById("stopButton").disabled = false;
    });

    document.getElementById("stopButton").addEventListener("click", () => {
        // Send stop message to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "stop" });
        });

        document.getElementById("status").innerText = "Stopped sending connection requests.";
        
        // Enable the start button and disable the stop button
        document.getElementById("startButton").disabled = false;
        document.getElementById("stopButton").disabled = true;
    });

    // Listener for messages from the content script
    chrome.runtime.onMessage.addListener((request) => {
        if (request.buttonCount !== undefined) {
            buttonCount = request.buttonCount;
            document.getElementById("buttonCountValue").innerText = buttonCount; // Update button count
        }
    });
});
