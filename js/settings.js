let users = JSON.parse(localStorage.getItem("users")) || [];
let authData = JSON.parse(localStorage.getItem("authData")) || [];
// Fill form with current data
document.getElementById("username").value = currentUser.username;
document.getElementById("email").value = currentUser.email;
document.getElementById("password").value = currentUser.password;
document.getElementById("seller_name").textContent = currentUser.username;
document.getElementById("clearUser").addEventListener("click", function () {
  sessionStorage.clear();
  })
// On form submit
document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const updatedUsername = document.getElementById("username").value.trim();
  const updatedEmail = document.getElementById("email").value.trim();
  const updatedPassword = document.getElementById("password").value;

users.forEach(user => {

    if (user.id === currentUser.id) {
        user.username = updatedUsername;
        user.email = updatedEmail;
        user.password = updatedPassword;
    } 
});
authData.sellers.forEach(authdata => {

  if (authdata.id === currentUser.id) {
    console.log(authdata.username, authdata.email, authdata.password);
    authdata.username = updatedUsername;
    authdata.email = updatedEmail;
    authdata.password = updatedPassword;
  } 
});
currentUser.username = updatedUsername;
currentUser.email = updatedEmail;
currentUser.password = updatedPassword;

  // Update in users array in localStorage
localStorage.setItem("users", JSON.stringify(users));
sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  // Show success message
  Swal.fire({
    icon: 'success',
    title: 'Product Added!',
    text: 'Your product has been successfully added.',
    confirmButtonColor: '#3085d6',
    timer: 3000,
    showConfirmButton: false
});

// Optionally reset the form
this.reset();

});