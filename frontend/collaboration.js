// Grab elements
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatDisplay = document.getElementById("chat-display");

// Event Listener for send button
sendBtn.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message !== "") {
    const messageElem = document.createElement("p");
    messageElem.textContent = `You: ${message}`; // Fixed string interpolation
    messageElem.style.marginBottom = "10px";
    chatDisplay.appendChild(messageElem);

    // Clear the input field
    chatInput.value = "";

    // Scroll to the bottom of the chat display
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }
});