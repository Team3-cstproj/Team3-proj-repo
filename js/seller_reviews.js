
  const productSelect = document.getElementById("productSelect");
  const reviewsContainer = document.getElementById("reviewsContainer");
  const themToggler = document.querySelector(".theme-toggler");
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
  