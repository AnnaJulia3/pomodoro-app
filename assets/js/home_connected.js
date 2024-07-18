var usernameInMenu = document.getElementById("username");
var userIdInMenu = document.getElementById("id_user");
var userEmailInMenu = document.getElementById("email_user");
var dataUser;

function updateMenu(username, userId, userEmail) {
  usernameInMenu.textContent = username;
  userIdInMenu.textContent = userId;
  userEmailInMenu.textContent = userEmail;
}


if (dataUser){
  updateMenu(dataUser['username'], dataUser['id'], dataUser['email']);
}



