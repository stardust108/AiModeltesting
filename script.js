const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Display user message
  addMessage(message, "user-message");

  // Fetch bot response
  getBotResponse(message)
    .then(botResponse => {
      addMessage(botResponse, "bot-message");
    })
    .catch(error => {
      addMessage("Error: Unable to fetch response.", "bot-message");
      console.error(error);
    });

  userInput.value = "";
}

function addMessage(message, className) {
  const messageDiv = document.createElement("div");
  messageDiv.className = className;
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userMessage) {
  const API_KEY = "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";
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
