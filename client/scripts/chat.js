const socket = io();
document.addEventListener("DOMContentLoaded", async () => {
// Der hvor beskederne bliver vist 
const seeMessages = document.getElementById("seeMessage");
const sendButton = document.getElementById("button");
const chatlist = document.getElementById("chatList");
// tekstinputfelt 
const input = document.getElementById("input");
// bruger 

//getcookie
const userId = 1;
const cookie = document.cookie.split(";").find((cookie) => cookie.startsWith("userId"));


const match = fetch(`http://localhost:3000/user/getmatches/${userId}`)
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        result.forEach(match => {
            const matcheduser = match.user1 === userId ? match.user2 : match.user1;
            const chatbutton = document.createElement("button");
            chatbutton.addEventListener("click", () => {
                socket.emit(match.match_id, input.value);
                input.value = "";
            });
            chatbutton.innerHTML = matcheduser;
            chatlist.appendChild(chatbutton);
        });
    })
    .catch((err) => {
        console.error(err);
    });;

class Chatroom {
    constructor(matchid) {
        this.roomname = matchid;
    }
    sendmessage(message) {
        socket.emit(this.roomname, message);
    }
}


/*socket.on(chatroom.roomname, (message) => {
    console.log(message);
    const messageElement = document.createElement("p");
    messageElement.innerHTML = message;
    seeMessages.appendChild(messageElement);
});*/

});