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

// ----------------
 
// load localstorage in table
function loadProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = ''; 

  products.forEach((product) => {
    const row = `
      <tr>
        <td>${product.id}</td> 
        <td>${product.name}</td>
       
        <td>${product.price}$</td>
        <td>
          <div class="remove-icon" onclick="removeProduct('${product.id}')">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}
function removeProduct(productId) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const updatedProducts = products.filter(product => String(product.id) !== productId);
  localStorage.setItem('products', JSON.stringify(updatedProducts)); 
  loadProducts(); 
}
loadProducts();
