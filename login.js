var successMessage = document.getElementById('success-message');
var spinner = document.getElementById('spinner');

const logUserIn = (e) => {
  e.preventDefault();
  spinner.style.display = "block";
  setTimeout(() => {
    spinner.style.display = "none";
    successMessage.style.display = "block";
  }, 1500);
}
