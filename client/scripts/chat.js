const socket = io();

// Der hvor beskederne bliver vist 
const seeMessages = document.getElementById("seeMessage");
// tekstinputfelt 
const input = document.getElementById("input");
// bruger 
let username = "Anonymous";

socket.emit("user joined", username);

// denne skal laves om til at username bliver til den bruger som er logget ind 
function changeUsername() {
  username = document.getElementById("username").value;
  if (!username == "") {
    localStorage.setItem("Username", username);
  } else {
    localStorage.setItem("Username", "Anonymous");
  }
  socket.emit("user joined", username);
  document.getElementById("username").value = "";
  console.log(username);
}

function sendChat() {
  if (input.value) {
    socket.emit("chat message", username + ": " + input.value);
    input.value = "";
  }
}

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  seeMessage.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// Cookie her:
/*
let username = getCookie("userAuth");
if (!username) location.href = "/login";

socket.emit("user joined", username);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
*/
