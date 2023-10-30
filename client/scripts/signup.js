let responseDOM = document.getElementById("response");

let user = {};

function saveUser() {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  user.username = username;
  user.email = email;
  user.password = password;

  console.log(user);

  axios // axios er en funktion der sender en request til en server
    .post("http://localhost:3000/user", user) // tilføjer user til databasen
    .then(async function (response) {
      console.log(response);
      responseDOM.innerHTML = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
