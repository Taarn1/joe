const socket = io();

// Der hvor beskederne bliver vist 
const seeMessages = document.getElementById("seeMessage");
// tekstinputfelt 
const input = document.getElementById("input");
// bruger 



// denne skal laves om til at username bliver til den bruger som er logget ind 

function sendChat() {
  if (input.value) {
    socket.emit("chat message", ": " + input.value);
    input.value = "";
  }
}

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  item.setAttribute("id", "item")
  seeMessage.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
})