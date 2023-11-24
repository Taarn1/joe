let responseDOM = document.getElementById("response");
let user = {};
let preferredCity;

function updateCity() {
  preferredCity = document.getElementById("cityoptions").value;
}

function saveUser() {
  // Call updateCity before saveUser to ensure preferredCity is initialized
  updateCity();

  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let age = document.getElementById("age").value;
  let number = document.getElementById("number").value;

  user.username = username;
  user.email = email;
  user.password = password;
  user.age = age;
  user.number = number;
  user.preferredCity = preferredCity;

  console.log(user);
  //fetch post to localhost:3000/user/signup
  //send user object as JSON in body of request
  fetch("http://localhost:3000/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  // redirect to profile page
  window.location.href = "http://localhost:3000/profile";
}
