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
   await fetch(`/user/authenticate`).then((response) => console.log(response));
    //delete cookies due to them being invalid
    //document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  const response = await fetch(`/user/getUser/${userId}`);
  const data = await response.json();
  if(data.length > 0) { 
    displayUserData(data); // Call the function to display the data
  }
  // match knap
  const matchButton = document.getElementById("matchButton");
  matchButton.addEventListener('click', async function () {
  await fetch(`/user/match/${userId}`).then((r) => {
    console.log(r);
    if (r.length > 0) {
    alert("You got one or more matches")
    return (window.location.href = "/user/chat");
    } else {
      return alert("No matches, buy a delicious sandwich or juice")
    }});
  })

  // logout
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", async() => {
    //delete cookie
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("You are now logged out");
    window.location.href = "/";

  });
});