
// <!-- Sidebar Toggle Script -->
const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    // show & hidden icon Desktop
    toggleBtn?.addEventListener('click', function () {
      if (window.innerWidth >= 768) {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
      }
      if (window.innerWidth < 768) {
        sidebar.classList.toggle('show');
      }
    });

    //  show & hidden icon mobile
    mobileMenuBtn?.addEventListener('click', function () {
      if (window.innerWidth < 768) {
        sidebar.classList.toggle('show');
      }
    });


// load localstorage in table
function loadProducts() {
  const allData = JSON.parse(localStorage.getItem('authData')) || [];
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ''; 

  allData.users.forEach((user) => {
    const row = `
      <tr>
                  <td>${user.id}</td>
                  <td>${user.username}</td>
                  <td>${user.email}</td>
                  <td>
                    <div class="remove-icon" onclick="removeProduct('${user.id}')">
                      <i class="fa-solid fa-xmark"></i>
                    </div>
                  </td>
                </tr>
    `;
    tableBody.innerHTML += row;
  });
}
function removeProduct(productId) {
  let allDatauser = JSON.parse(localStorage.getItem('authData')) || [];
  const updateduser = allDatauser.users.filter(user => String(user.id) !== productId);
  allDatauser.users=updateduser;
  localStorage.setItem('authData', JSON.stringify(allDatauser)); 

  const custmoerr = JSON.parse(localStorage.getItem('users')) || [];
  const updatedcustomereuserdata = custmoerr.filter(user => String(user.id) !== productId);
  localStorage.setItem('users', JSON.stringify(updatedcustomereuserdata));
  loadProducts(); 
}
loadProducts();
//clear session storage after log out
document.querySelector('.nav-link.text-danger').addEventListener('click', function(e) {
  e.preventDefault();
  sessionStorage.clear(); 
  window.location.href = 'login.html'; 
});