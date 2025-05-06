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

  let products = JSON.parse(localStorage.getItem('products')) || [];
  const updatedproducts = products.filter(product => String(product.sellerId) !== productId);
  localStorage.setItem('products', JSON.stringify(updatedproducts));

  
  loadProducts(); 
}
//clear session storage after log out
document.querySelector('.nav-link.text-danger').addEventListener('click', function(e) {
  e.preventDefault();
  sessionStorage.clear(); 
  window.location.href = 'login.html'; 
});
loadProducts();