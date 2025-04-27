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
  const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ''; 

  sellers.forEach((seller) => {
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
  const sellers = JSON.parse(localStorage.getItem('sellers')) || [];
  const updatedProducts = sellers.filter(seller => String(seller.id) !== productId);
  localStorage.setItem('sellers', JSON.stringify(updatedProducts)); 
  loadProducts(); 
}
loadProducts();