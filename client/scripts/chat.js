const socket = io();
document.addEventListener("DOMContentLoaded", async () => {
  //check for cookie
  if (!document.cookie) window.location.href = "/";
//authenticates the user
await fetch(`/user/authenticate`).then((response) => {
  if (response.status === 401) {
    alert("Fejl i autentifikation, du er blevet logget ud");
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  }
}); 

//load elements
const seeMessages = document.getElementById("seeMessage");
const sendButton = document.getElementById("button");
const chatlist = document.getElementById("chatList");
// tekstinputfelt 
const input = document.getElementById("input");

//getting userId
const userIdCookie = document.cookie.split(";")
const userId = userIdCookie.find((cookie) => cookie.includes("userId")).split("=")[1];

//function to clear the thatwindow
const clearChatWindow = () => {
    sendButton.onclick = () => {};
    while(seeMessages.firstChild){
        seeMessages.removeChild(seeMessages.firstChild);
    }
}

let activeChatroom = null;

//send message 
sendButton.addEventListener("click", () => {
    const messageToSend = input.value;
    if (activeChatroom) {
      const chatroom = new Chatroom(activeChatroom);
      chatroom.sendMessage(activeChatroom, messageToSend);
      const messageElement = document.createElement("li");
      messageElement.classList.add("sent")
      messageElement.classList.add("item");
      messageElement.innerHTML = messageToSend;
      seeMessages.appendChild(messageElement);
      input.value = ''; 
    } else {
      alert('Ingen chat valgt.');
    }
  });


//loads matches and creates chatrooms
const match = fetch(`/user/getmatches/${userId}`)
    .then((response) => response.json())
    .then((result) => {
        result.forEach(match => {
            const chatroom = new Chatroom(match.match_id);
            let matchedUser;

            //Sets username of the matched user
            if (userId == match.user1Id) {
              matchedUser = match.user2;
            } else {
              matchedUser = match.user1;
            }
          
            const chatbutton = document.createElement("button");
            chatbutton.setAttribute("id", "chatButton");

            //socket.io eventlistener
            //recieved message is different from sent message to allow for different styling
            socket.on(`receivedMessage_${chatroom.roomname}`, (message) => {
              //if the chatroom is active, the message is displayed
              if (activeChatroom === chatroom.roomname) {
                const messageElement = document.createElement('li');
                messageElement.classList.add('received');
                messageElement.classList.add("item");
                messageElement.innerHTML = message;
                seeMessages.appendChild(messageElement);
                //alerts the user that another person has sent a message. Could be improved
              } else {
                alert('Du har en ny besked');
              }
            });
            //chatbutton is the button that selects the active chatroom
            chatbutton.addEventListener("click", () => {
              clearChatWindow();
              activeChatroom = chatroom.roomname;                             
            });
          
            chatbutton.innerHTML = "Chat med " + matchedUser;
            chatlist.appendChild(chatbutton);
          });
    })
    .catch((err) => {
        console.error(err);
    });

    //tried using a class.
class Chatroom {
    constructor(matchid) {
        this.roomname = matchid;
    }
    sendMessage(activeChatroom, messageToSend) {
        //emits to chatroom. Handled by socket.io on server
        socket.emit(`sendMessage_${activeChatroom}`, messageToSend); // Sender beskeden til det specifikke rum på serveren
    }
}
})