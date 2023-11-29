const socket = io();
document.addEventListener("DOMContentLoaded", async () => {
// Der hvor beskederne bliver vist 
const seeMessages = document.getElementById("seeMessage");
// tekstinputfelt 
const input = document.getElementById("input");
// bruger 



//mockup til at få det til at virke
let userId = 1;

//hent matches for denne bruger
const matches = await fetch(`http://localhost:3000/user/matches/${userId}`).then((res) => res.json());


const sendMessage = () => {
    const message = input.value;
    socket.emit("message", { message, userId });
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
