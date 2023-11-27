const socket = io();

// Der hvor beskederne bliver vist 
const seeMessages = document.getElementById("seeMessage");
// tekstinputfelt 
const input = document.getElementById("input");
// bruger, skal være den bruger som er logget ind 
let username = document.cookie;

socket.emit("user joined", username);

function sendChat() {
  if (input.value) {
    socket.emit("chat message", username + ": " + input.value);
    input.value = "";
  }
}

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  item.setAttribute("id", "item")
  seeMessage.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// Vi skal have lavet et array + en funktion med alle brugerens matches 

// Lave en funktion som ved click laver et private room mellem bruger og match 

