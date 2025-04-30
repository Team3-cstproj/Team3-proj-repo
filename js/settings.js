const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users")) || [];

// Fill form with current data
document.getElementById("username").value = currentUser.username;
document.getElementById("email").value = currentUser.email;
document.getElementById("password").value = currentUser.password;

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
currentUser.name = updatedUsername;
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