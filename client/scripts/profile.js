console.log("profile.js loaded");
document.addEventListener("DOMContentLoaded", async () => {
  // Function to load user profile 
  
  const getCookie = (cname)=> {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  let userid = getCookie("sessionId");
  console.log(userid);
  const loadProfile = async () => {
    // Check if the user is logged in
    if (!document.cookie) {
      //window.location.href = "/";
    }
    else if (document.cookie) {
      // Get user id from cookie
      const userId = document.cookie.split("=")[1];
      // Get user info from database
      const response = await fetch(`http://localhost:3000/user/getUser/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
  loadProfile();
});
