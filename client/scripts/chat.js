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
const userIdCookie = document.cookie.split(";")
const userId = userIdCookie.find((cookie) => cookie.includes("userId")).split("=")[1];

//send to login if no cookie
//ikke lavet endnu


//ikke lavet endnu
const clearChatWindow = () => {
    sendButton.onclick = () => {};
    while(seeMessages.firstChild){
        seeMessages.removeChild(seeMessages.firstChild);
    }
}

sendButton.addEventListener("click", () => {
    const messageToSend = input.value; // Få indholdet fra inputfeltet
    if (activeChatroom) {
      const chatroom = new Chatroom(activeChatroom);
      chatroom.sendMessage(messageToSend);
      input.value = ''; // Nulstil inputfeltet efter at beskeden er sendt
    } else {
      console.error('Ingen aktivt chatrum valgt.');
      // Håndter fejlen her, hvis der ikke er valgt et aktivt chatrum
    }
  });

//skal bruges til at lytte til det aktive chatroom
let activeChatroom = null;


const match = fetch(`http://localhost:3000/user/getmatches/${userId}`)
    .then((response) => response.json())
    .then((result) => {
        //callback. koden kører når fetch er færdig
        console.log(result);
        result.forEach(match => {
            const matcheduser = match.user1 !== userId ? match.user2 : match.user1; // kig på dette
            const chatbutton = document.createElement("button");
            let chatroom = new Chatroom(match.match_id);
                //det er her, man lytter på beskeder
            socket.on(chatroom.roomname, (message) => {
                if(activeChatroom === chatroom.roomname){
                const messageElement = document.createElement("li");
                messageElement.innerHTML = message;
                seeMessages.appendChild(messageElement);
            }});
            chatbutton.addEventListener("click", () => {
                clearChatWindow()
                console.log("match_id" + match.match_id);
                activeChatroom = chatroom.roomname;                             
                
            });
            chatbutton.innerHTML = "chat med " + matcheduser; // kig på dette
            chatlist.appendChild(chatbutton);
        });
    })
    .catch((err) => {
        console.error(err);
    });

class Chatroom {
    constructor(matchid) {
        this.roomname = matchid;
    }
    sendMessage(message) {
        //måske kan vi remove eventlisteneren her
        socket.emit(this.roomname, message);
    }
}


})