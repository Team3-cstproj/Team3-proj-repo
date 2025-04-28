// <!-- Sidebar Toggle Script -->
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main');

toggleBtn.addEventListener('click', function () {
  sidebar.classList.toggle('collapsed');
  mainContent.classList.toggle('collapsed');
});


// load localstorage in table
function loadProducts() {
  const allData = JSON.parse(localStorage.getItem('authData')) || [];
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ''; 

  allData.userss.forEach((user) => {
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
  const allDatasellers = JSON.parse(localStorage.getItem('authData.users')) || [];
  const updatedProducts = users.filter(user => String(user.id) !== productId);
  localStorage.setItem('authData.users', JSON.stringify(updatedProducts)); 
  loadProducts(); 
}
loadProducts();