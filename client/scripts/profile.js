console.log("profile.js loaded");
document.addEventListener("DOMContentLoaded", async () => {
  // Function to load user profile

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  let userid = getCookie("sessionId");
  console.log(userid);
  const loadProfile = async () => {
    // Check if the user is logged in
    if (!document.cookie) {
      //window.location.href = "/";
    } else if (document.cookie) {
      // Get user id from cookie
      const userId = document.cookie.split("=")[1];
      // Get user info from database
      const response = await fetch(
        `http://localhost:3000/user/getUser/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };
  loadProfile();

  // logout
  const logoutButton = document.querySelector("#logoutButton");
  logoutButton.addEventListener("click", () => {
    let cookie = document.cookie;
    if (!cookie) return alert("No need to logout when you haven't login");
    else {
      // hvis den findes slettes cookie'en
      document.cookie = "id=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; //sætter datoen tilbage, så den slettes
      let cookie = document.cookie;
      if (cookie) return alert("logout failed");
      else {
        alert("logout succeed");
        return location.reload();
      }
    }
  });
});
