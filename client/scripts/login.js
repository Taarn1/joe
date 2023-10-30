let responseDOM = document.getElementById("response");

let user = {};

function loginUser() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  user.username = username;
  user.password = password;

  axios
    .post("http://localhost:3000/login", user)
    .then(async function (response) {
      console.log(response.data);
      responseDOM.innerHTML = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
