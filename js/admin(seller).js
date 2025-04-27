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
  const allData = JSON.parse(localStorage.getItem('authData.sellers')) || [];
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ''; 

  allData.forEach((seller) => {
    const row = `
      <tr>
                  <td>${seller.id}</td>
                  <td>${seller.username}</td>
                  <td>${seller.email}</td>
                  <td>
                    <div class="remove-icon" onclick="removeProduct('${seller.id}')">
                      <i class="fa-solid fa-xmark"></i>
                    </div>
                  </td>
                </tr>
    `;
    tableBody.innerHTML += row;
  });
}
function removeProduct(productId) {
  const allData = JSON.parse(localStorage.getItem('authData.sellers')) || [];
  const updatedProducts = allData.sellers.filter(seller => String(seller.id) !== productId);
  localStorage.setItem('auth.sellers', JSON.stringify(updatedProducts)); 
  loadProducts(); 
}
loadProducts();