// client initialization 
// autoconnect false gør at der ikke kommer en connection med det samme, vil blive kaldt senere
import { io } from "socket.io-client";

const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });

export default socket;
