const socket = io();
document.addEventListener("DOMContentLoaded", async () => {
  // Der hvor beskederne bliver vist
  const seeMessages = document.getElementById("seeMessage");
  // tekstinputfelt
  const input = document.getElementById("input");
  // bruger
});

/*
//mockup til at få det til at virke
let userId = 1;

//hent matches for denne bruger
const matches = await fetch(`http://localhost:3000/user/matches/${userId}`).then((res) => res.json());


const sendMessage = () => {
    const message = input.value;
    socket.emit("message", { message, userId });
    input.value = "";
  }*/

function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === cookieName) {
      return cookie[1];
    }
  }
  return null;
}

let username;

document.addEventListener("DOMContentLoaded", async function () {
  // Se brugers matches..
  // Find det første match..
  // filtrer efter 

  const userId = getCookieValue("userId");
  const response = await fetch(`/user/getUser/id=${userId}`);

  const data = await response.json();
  username = data[0].username;
});

function sendMessage() {
  if (input.value) {
    socket.emit("chat message", username + ": " + input.value);
    input.value = "";
  }
}

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  item.setAttribute("id", "item");
  seeMessage.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
