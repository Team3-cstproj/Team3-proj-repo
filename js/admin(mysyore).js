// <!-- Sidebar Toggle Script -->
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main');

toggleBtn.addEventListener('click', function () {
  sidebar.classList.toggle('collapsed');
  mainContent.classList.toggle('collapsed');
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
        <td>${product.date}</td>
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
  const updatedProducts = products.filter(product => product.id !== productId); 
  localStorage.setItem('products', JSON.stringify(updatedProducts)); 
  loadProducts(); 
}


loadProducts();
