const socket = io();
document.addEventListener("DOMContentLoaded", async function () {
// DOM elements
const seeMessages = document.querySelector("#seeMessage");
const chatList = document.querySelector("#chatList");
const message = document.querySelector("#input");
const sendButton = document.querySelector("#button");

// Event listeners

const cookie = document.cookie
const userid = Number(cookie.split("userId=")[1])
console.log({userid: userid, type: typeof(userid)})

const getMatches = async (userid) => {
  const response = await fetch(`/user/getMatches/${userid}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

let usersOnline = [];

socket.on("users", (users) => {
  usersOnline = users;
  console.log({connected: usersOnline});
});
socket.on("connect", () => {
  socket.emit("joined", {socketid:socket.id, userid: userid});
});

sendButton.addEventListener("click", 
  () => {
    socket.emit("private message", message.value);
    message.value = "";
  }
);

socket.on("private message", (msg) => {
  console.log(msg);
  listMessages(msg);
});

const listMessages = (msg) => {
    const li = document.createElement("li");
    li.innerHTML = msg;
    seeMessages.appendChild(li);
}
const listOnlineMatches = async () => {
  const matches = await getMatches(userid);
  console.log(matches);
  //const li = document.createElement("li");
  //li.innerHTML = msg;
  //chatList.appendChild(li);
}

listOnlineMatches();
});