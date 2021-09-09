const USERS_URL = "https://reqres.in/api/users";
const itemsDiv = document.getElementById("items");
const spinner = document.getElementById("spinner");
spinner.style.display = "block";

let users = [];


const fetchUsers = async (url) => {
  const response = await fetch(url);
  const usersObj = await response.json();
  return usersObj.data;
}


(async function main() {

  const users = await fetchUsers(USERS_URL);
  spinner.style.display = "none";

  users.forEach(user => {
    const itemRow = document.createElement('tr');
    itemRow.innerHTML = `<td>${user.id}</td><td><img class="w-100 w-lg-50" src="${user.avatar}"/></td><td>${user.first_name}</td><td>${user.email}</td>`;
    itemsDiv.appendChild(itemRow);
  });

}())