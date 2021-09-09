var successMessage = document.getElementById('success-message');
var spinner = document.getElementById('spinner');
var loginButton = document.getElementById("login-btn");

const logUserIn = (e) => {
  e.preventDefault();
  loginButton.style.display = "none"
  spinner.style.display = "block";
  setTimeout(() => {
    spinner.style.display = "none";
    successMessage.style.display = "block";
    waitAndRedirect();
  }, 1000);
}

const waitAndRedirect = () => {
  setTimeout(() => {
    location.assign("users.html");
  }, 1500);
}