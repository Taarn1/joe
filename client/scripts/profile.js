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
  if (!userId) {
    window.location.href = "/";
  }
  const authenticate = await fetch(`/user/auth`).then((response) =>window.location.href = "/").catch((error) => console.log(error));
  const response = await fetch(`/user/getUser/id=${userId}`);
  const data = await response.json();
  if(data.length > 0) { 
    displayUserData(data); // Call the function to display the data
  }
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
  await loadProfile();

  // match knap
  const matchButton = document.getElementById("matchButton");
  matchButton.addEventListener('click', async function () {
    console.log(userId)
  const matchUserID = await fetch(`/user/match/${userId}`);
  console.log(matchUserID);
  /*if (data.length < 0) {
  alert("You got one or more matches")
  return (window.location.href = "/user/chat");
  } else {
    return alert("No matches, buy a delicious sandwich or juice")
  }*/
  })

  // logout
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", async() => {
      await fetch(`/user/logout`)
      .then((response) => response.json())
      .then(() => {
        alert("You are now logged out");
        window.location.href = "/";
      }).catch((error) => console.log(error));
  });
});