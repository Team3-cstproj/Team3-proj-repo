
const allowedRoles = ['seller']; // Customize this for each page
      
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

if (!currentUser || !allowedRoles.includes(currentUser.role)) {
  window.location.href = 'error.html';
}

const sideMenue = document.querySelector("aside");
const menuBtn = document.querySelector("#menu_bar");
const closeBtn = document.querySelector("#close_btn");
menuBtn.addEventListener("click", () => {
  sideMenue.style.display = "block";
})
closeBtn.addEventListener("click", () => {
  sideMenue.style.display = "none";
})
  const productSelect = document.getElementById("productSelect");
  const reviewsContainer = document.getElementById("reviewsContainer");
  info = JSON.parse(sessionStorage.getItem("currentUser"));
  const products = JSON.parse(localStorage.getItem("products")) || [];
  document.getElementById("seller_name").textContent = currentUser.username;
  document.getElementById("clearUser").addEventListener("click", function () {
    sessionStorage.clear();
    })
  // Populate dropdown
  const productSearch = document.getElementById("productSearch");
  const productList = document.getElementById("productList");
  
  // Populate datalist with product names
  products.forEach(product => {
    if(product.sellerId === info.id){
      const option = document.createElement("option");
      option.value = product.name;
      productList.appendChild(option);
  }
  });
  let flag = JSON.parse(sessionStorage.getItem("flag"));
    if(flag % 2 == 0){
        document.body.classList.toggle("dark-theme-variables");
        themToggler.querySelector("span:nth-child(1)").classList.toggle("active");
        themToggler.querySelector("span:nth-child(2)").classList.toggle("active");
    }
  const themToggler = document.querySelector(".theme-toggler");
  themToggler.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme-variables");
      themToggler.querySelector("span:nth-child(1)").classList.toggle("active");
      themToggler.querySelector("span:nth-child(2)").classList.toggle("active");
  });

  
  function showReviewsFromSearch() {
    const searchValue = productSearch.value.trim().toLowerCase();
    reviewsContainer.innerHTML = "";
  
    const product = products.find(p => p.name.toLowerCase() === searchValue);
    if (!product) {
      reviewsContainer.innerHTML = "<p>Product not found.</p>";
      return;
    }
  
    const title = document.createElement("h2");
    title.textContent = `Reviews for ${product.name}`;
    reviewsContainer.appendChild(title);
  
    if (!product.reviews || product.reviews.length === 0) {
      reviewsContainer.innerHTML += "<p>No reviews available.</p>";
      return;
    }
  
    product.reviews.forEach(review => {
      const div = document.createElement("div");
      div.className = "review";
      div.innerHTML = `
        <div class="username">@${review.username}</div>
        <div class="stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
        <div class="comment">${review.comment}</div>
        <div class="date">${review.date}</div>
      `;
      reviewsContainer.appendChild(div);
    });
  }
  