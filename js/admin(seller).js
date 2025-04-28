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

  allData.sellers.forEach((seller) => {
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
 let allData  = JSON.parse(localStorage.getItem('authData')) || [];
  const  updatesellers = allData.sellers.filter(seller => String(seller.id) !== productId);
  allData.sellers=updatesellers;
  localStorage.setItem('authData', JSON.stringify(allData)); 

  const sellerr = JSON.parse(localStorage.getItem('users')) || [];
  const updatedselleruserdata = sellerr.filter(seller => String(seller.id) !== productId);
  localStorage.setItem('users', JSON.stringify(updatedselleruserdata)); 
  loadProducts(); 
}

loadProducts();