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
  const API_KEY = ${{ secret.APIKEY }}
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
