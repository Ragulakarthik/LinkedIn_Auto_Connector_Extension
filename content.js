let isRunning = false;

function sendConnectionRequests() {
    const waitForButtons = setInterval(() => {
        if (!isRunning) {
            clearInterval(waitForButtons);
            return;
        }

        // Gather all buttons on the page
        const buttons = Array.from(document.querySelectorAll("button"));
        
        // Filter for "Connect" buttons, skipping "Message" or "Pending" buttons
        const connectButtons = buttons.filter(button =>
            button.innerText === "Connect" &&
            !button.disabled &&
            !button.closest('div').querySelector("button[aria-label='Message']") &&
            !button.closest('div').querySelector("button[aria-label='Pending']")
        );

        // Send the count of available Connect buttons to popup
        chrome.runtime.sendMessage({ buttonCount: connectButtons.length });

        // If no connect buttons are found, stop the interval
        if (connectButtons.length === 0) {
            console.log("No more 'Connect' buttons found.");
            isRunning = false;
            clearInterval(waitForButtons);
            return;
        }

        let index = 0;

        const clickNextButton = () => {
            if (!isRunning || index >= connectButtons.length) {
                clearInterval(waitForButtons);
                return;
            }

            const button = connectButtons[index];
            if (button) {
                button.click(); // Click the "Connect" button

                // Wait for the modal to open
                setTimeout(() => {
                    const sendWithoutNoteButton = document.querySelector("button[aria-label='Send without a note']");
                    const cancelButton = getCancelButton(); // Function to get the cancel button

                    if (sendWithoutNoteButton) {
                        sendWithoutNoteButton.click(); // Click the "Send without a note"
                        console.log(`Connection request sent! Total sent: ${index + 1}`); // Show total sent based on index
                    } else if (cancelButton) {
                        cancelButton.click(); // Click the cancel button
                        console.log("Cancelled a dialog box.");
                    } else {
                        console.log("Send without a note button not found, skipping.");
                    }

                    index++;
                    const randomDelay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000; // 5-10 seconds delay
                    setTimeout(clickNextButton, randomDelay);
                }, 1000); // Wait 1 second for the modal to open
            } else {
                console.log("Connect button not found, moving to the next one.");
                index++;
                clickNextButton(); // Continue to the next button if the current one is missing
            }
        };

        clickNextButton(); // Start clicking the connect buttons
    }, 2000); // Check every 2 seconds for the buttons
}

function getCancelButton() {
    // Attempt to find the cancel button using various selectors
    const cancelButton = document.querySelector("button[aria-label='Cancel']") || 
                         document.querySelector("button[data-control-name='Cancel']") ||
                         document.querySelector("button[aria-label*='Cancel']") ||
                         document.querySelector("button[aria-label='Close']") ||  // Additional option
                         document.querySelector("button[data-control-name='close']"); // Additional option
    return cancelButton; // Return the found button or null if not found
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "start") {
        isRunning = true;
        sendConnectionRequests();
    } else if (request.action === "stop") {
        isRunning = false;
    }
});
