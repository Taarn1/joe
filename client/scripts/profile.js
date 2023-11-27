document.addEventListener("DOMContentLoaded", async () => {
  // check if a user is logged in
  let cookie = document.cookie;
  if (!cookie) return (window.location.href = "http://localhost:3000/login");
  const id = cookie.split("=")[1];
  let user = await fetch("http://localhost:3000/user" + id).then((r) =>
    r.json()
  );
  if (!Object.keys(user).length) {
    // one more check if the user is logged in
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // deleting the user if not logged in
    alert("You will be forwarded to login");
    return (window.location = "http://localhost:3000/login");
  }
  user = user["1"];
  // get user info
  document.querySelector("#showUsername").innerHTML = user.username;
  document.querySelector("#showEmail").innerHTML = user.email;
  document.querySelector("#showAge").innerHTML = user.age;
  document.querySelector("#showNumber").innerHTML = user.number;
  document.querySelector("#showCity").innerHTML = user.preferredCity;
});
