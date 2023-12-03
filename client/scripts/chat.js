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
console.log(document.cookie);
const userIdCookie = document.cookie.split(";")
const userId = userIdCookie.find((cookie) => cookie.includes("userId")).split("=")[1];
console.log(userId);

//send to login if no cookie
//ikke lavet endnu


//ikke lavet endnu
const clearChatWindow = () => {
    while(seeMessages.firstChild){
        seeMessages.removeChild(seeMessages.firstChild);
    }
}

const send = (input) => {
    chatroom.sendMessage(input.message);
    input.value = "";
}

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
            chatbutton.addEventListener("click", () => {
                clearChatWindow(seeMessages)
                console.log("match_id" + match.match_id);
                let chatroom = new Chatroom(match.match_id);
                
                activeChatroom = chatroom.roomname; //tror ikke helt det virker endnu
                sendButton.addEventListener("click", () => { //virker ikke helt. Eventlisteneren bliver ved med at blive tilføjet så hvis du klikker på chat ->
                    //2 gange, sender du beskeden 2 gange
                    console.log(sendButton); //ccheck 
                    //tror man kan fjerne eventlisteneren med removeEventListener i en funktion

                    send(input);
                });

                //det er her, man lytter på beskeder
                socket.on(chatroom.roomname, (message) => {
                    if(chatroom.active){
                    const messageElement = document.createElement("li");
                    messageElement.innerHTML = message;
                    seeMessages.appendChild(messageElement);
                }});
            
                
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
        console.log("user sent: " + message + "to room: " + this.roomname);
    }
}


})