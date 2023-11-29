document.addEventListener("DOMContentLoaded", async function () {
  const userId = getCookieValue("userId");
  console.log(userId);
  const response = await fetch(`/user/getUser/id=${userId}`);
  const data = await response.json();
  displayUserData(data); // Call the function to display the data
  const loadProfile = async () => {
    // Check if the user is logged in
    if (!document.cookie) {
      //window.location.href = "/";
    } else if (document.cookie) {
      // Get user id from cookie
      const userId = document.cookie.split("=")[1];
      // Get user info from database
      const response = await fetch(`/user/getUser/id=${userId}`); 
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

function displayUserData(data) {
  // Access the HTML elements where you want to display the data
  const nameElement = document.getElementById("showUsername");
  const emailElement = document.getElementById("showEmail");
  const ageElement = document.getElementById("showAge");
  const numberElement = document.getElementById("showNumber");
  const cityElement = document.getElementById("showCity");

  // Set the innerHTML of the elements with the data values
  nameElement.innerHTML = data[0].username;
  emailElement.innerHTML = data[0].email;
  ageElement.innerHTML = data[0].age;
  numberElement.innerHTML = data[0].number;
  cityElement.innerHTML = data[0].cityname;
}

document.addEventListener("DOMContentLoaded", async function () {
  const userId = getCookieValue("userId");
  const response = await fetch(`/user/getUser/id=${userId}`);
  const data = await response.json();

  console.log("Response Data:", data);
  displayUserData(data); // Call the function to display the data

  const loadProfile = async () => {
    // Check if the user is logged in
    if (!document.cookie) {
      //window.location.href = "/";
    } else if (document.cookie) {
      // Get user id from cookie
      const userId = document.cookie.split("=")[1];
      // Get user info from database
      const response = await fetch(`/user/getUser/id=${userId}`);
    }
  };
  loadProfile();

  // logout
  const logoutButton = document.querySelector("#logoutButton");
  logoutButton.addEventListener("click", () => {
    let cookie = document.cookie;
    if (!cookie) return alert("No need to logout when you haven't login");
    else {
      console.log("Before Logout:", document.cookie);
      document.cookie =
        "userId=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie =
        "sessionId=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      console.log("After Logout:", document.cookie);

      let cookie = document.cookie;
      if (cookie) return alert("logout failed");
      else {
        alert("logout succeed");
        return (window.location.href = "/");
      }
    }
  });
});
