document.addEventListener("DOMContentLoaded", async function () {
  let user = {};
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", loginUser);

  function loginUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    user.username = username;
    user.password = password;
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  }
});
