
  const productSelect = document.getElementById("productSelect");
  const reviewsContainer = document.getElementById("reviewsContainer");
  const themToggler = document.querySelector(".theme-toggler");

  const products = JSON.parse(localStorage.getItem("products")) || [];
  document.getElementById("seller_name").textContent = currentUser.username;
  document.getElementById("clearUser").addEventListener("click", function () {
    sessionStorage.clear();
    })
  // Populate dropdown
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    console.log(option.value,option.textContent);
    productSelect.appendChild(option);
  });
  console.log(productSelect)
  function showReviewsFromSelect() {
    const selectedId = parseInt(productSelect.value);
    reviewsContainer.innerHTML = "";

    const product = products.find(p => p.id === selectedId);
    if (!product) return;

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

  themToggler.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme-variables");
    themToggler.querySelector("span:nth-child(1)").classList.toggle("active");
    themToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});
