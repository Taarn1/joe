document.addEventListener("DOMContentLoaded", async function () {
  let user = {};
  let preferredCity;
  let cookie = document.cookie;

  const preferredCityOption = document.getElementById("cityoptions");
  preferredCityOption.addEventListener("change", updateCity);
  function updateCity() {
    preferredCity = document.getElementById("cityoptions").value;
  }

  const signupButton = document.getElementById("signupButton");
  signupButton.addEventListener("click", saveUser);
  function saveUser() {
    if (cookie) return alert("You are already logged in");
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

    fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(()=>window.location.href = "/profile");
    // redirect to profile page
  }
});
