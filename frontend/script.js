document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.querySelector(".chat-box");

  function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "bot-msg";
    div.innerText = text;
    chatBox.appendChild(div);
  }

  addBotMessage("Are you a Guest or a Registered Student?");
});
