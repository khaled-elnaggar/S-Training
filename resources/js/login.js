var successMessage = document.getElementById('success-message');
var spinner = document.getElementById('spinner');

const logUserIn = (e) => {
  e.preventDefault();
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