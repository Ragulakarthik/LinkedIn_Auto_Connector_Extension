let isRunning = false;
let sentCount = 0;

function sendConnectionRequests() {
    const waitForButtons = setInterval(() => {
        const buttons = Array.from(document.querySelectorAll("button"));
        
        // Filter out connect buttons and skip those with "Message" or "Pending" buttons
        const connectButtons = buttons.filter(button => 
            button.innerText === "Connect" && 
            !button.disabled &&
            !button.closest('div').querySelector("button[aria-label='Message']") && // Skip if there's a "Message" button
            !button.closest('div').querySelector("button[aria-label='Pending']") // Skip if there's a "Pending" button
        );

        if (connectButtons.length === 0) {
            console.log("No more 'Connect' buttons found.");
            clearInterval(waitForButtons);
            chrome.runtime.sendMessage({ sentCount });
            return;
        }

        let index = 0;

        const clickNextButton = () => {
            if (!isRunning || index >= connectButtons.length) {
                clearInterval(waitForButtons);
                chrome.runtime.sendMessage({ sentCount });
                return;
            }

            const button = connectButtons[index];
            button.click(); // Click the "Connect" button

            // Wait a moment for the modal to open
            setTimeout(() => {
                const sendWithoutNoteButton = document.querySelector("button[aria-label='Send without a note']");
                if (sendWithoutNoteButton) {
                    sendWithoutNoteButton.click(); // Click the "Send without a note" button
                    sentCount++; // Increment the count only after sending
                    console.log(`Connection request sent! Total sent: ${sentCount}`); // Log for debugging
                } else {
                    console.log("Send without a note button not found, skipping.");
                }

                index++;
                const randomDelay = Math.floor(Math.random() * (3000 - 2000 + 1)) + 5000; // 2-3 seconds delay
                setTimeout(clickNextButton, randomDelay);
            }, 1000); // Wait 1 second for the modal to open
        };

        clickNextButton();
    }, 1000); // Check every second for the buttons
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "start") {
        isRunning = true;
        sentCount = 0; // Reset count when starting
        sendConnectionRequests();
    } else if (request.action === "stop") {
        isRunning = false;
    }
});
