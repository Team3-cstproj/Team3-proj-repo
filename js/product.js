//nav bar -----strart
//  cart list baby
const cartBtnList = document.querySelectorAll(".cart-trigger");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCart");

cartBtnList.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
  });
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});
////btns color baby
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".offer-banner .btn").forEach((button) => {
    function activate() {
      button.style.backgroundColor = "white";
      button.style.color = "black";
    }

    function deactivate() {
      button.style.backgroundColor = "transparent";
      button.style.color = "white";
    }

    button.addEventListener("mousedown", activate);
    button.addEventListener("mouseup", deactivate);
    button.addEventListener("mouseleave", deactivate);
    button.addEventListener("touchstart", activate);
    button.addEventListener("touchend", deactivate);
  });
});
// nav bar -------end




///////////////////////////////
// handel reviw part
/////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  // Initialize reviews from localStorage
  const STORAGE_KEY = "product_reviews";
  let reviews = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // Display existing reviews on page load
  displayReviews();

  // Review form submission
  const reviewForm = document.querySelector("#reviews-tab-pane form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("reviewerName").value;
      const email = document.getElementById("reviewerEmail").value;
      const reviewText = document.getElementById("reviewText").value;
      const rating =
        document.querySelector('input[name="rating"]:checked')?.value || 0;

      // Create new review object
      const newReview = {
        name: name,
        email: email,
        text: reviewText,
        rating: rating,
        date: new Date().toISOString(),
      };

      // Add to reviews array (keeping only last 3)
      reviews.unshift(newReview); // Add to beginning (newest first)
      if (reviews.length > 3) {
        reviews = reviews.slice(0, 3); // Keep only 3 most recent
      }

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));

      // Update display
      displayReviews();

      // Reset the form
      reviewForm.reset();

      // Uncheck all stars
      document.querySelectorAll('input[name="rating"]').forEach((star) => {
        star.checked = false;
      });
    });
  }

  // Function to display reviews
  function displayReviews() {
    const reviewsContainer = document.querySelector(
      "#reviews-tab-pane .divider"
    ).previousElementSibling;

    // Clear existing content
    reviewsContainer.innerHTML = "";

    if (reviews.length === 0) {
      reviewsContainer.textContent = "There are no reviews yet.";
      return;
    }

    // Create a container for all reviews
    const allReviewsContainer = document.createElement("div");
    allReviewsContainer.className = "all-reviews";

    // Add each review
    reviews.forEach((review) => {
      allReviewsContainer.appendChild(createReviewElement(review));
    });

    reviewsContainer.appendChild(allReviewsContainer);
  }

  // Function to create a review element
  function createReviewElement(review) {
    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review mb-4 p-3 bg-light rounded";

    // Create star rating
    const starsDiv = document.createElement("div");
    starsDiv.className = "star-rating mb-2";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i");
      star.className =
        i <= review.rating ? "fas fa-star text-warning" : "far fa-star";
      starsDiv.appendChild(star);
    }

    // Create reviewer info
    const reviewerInfo = document.createElement("div");
    reviewerInfo.className =
      "reviewer-info mb-2 d-flex justify-content-between";

    const date = new Date(review.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    reviewerInfo.innerHTML = `
          <strong>${review.name}</strong>
          <small class="text-muted">${formattedDate}</small>
      `;

    // Create review text
    const reviewText = document.createElement("div");
    reviewText.className = "review-text";
    reviewText.textContent = review.text;

    // Append all elements
    reviewDiv.appendChild(starsDiv);
    reviewDiv.appendChild(reviewerInfo);
    reviewDiv.appendChild(reviewText);

    return reviewDiv;
  }

  // Star rating interaction
  const stars = document.querySelectorAll(".rating-stars .star");
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const input = this.previousElementSibling;
      input.checked = true;

      // Update star display
      const rating = parseInt(input.value);
      const allStars = document.querySelectorAll(".rating-stars .star i");

      allStars.forEach((s, index) => {
        if (index < rating) {
          s.classList.remove("far");
          s.classList.add("fas");
        } else {
          s.classList.remove("fas");
          s.classList.add("far");
        }
      });
    });

    // Hover effect for stars
    star.addEventListener("mouseover", function () {
      const input = this.previousElementSibling;
      const rating = parseInt(input.value);

      document.querySelectorAll(".rating-stars .star i").forEach((s, index) => {
        if (index < rating) {
          s.classList.add("hovered");
        }
      });
    });

    star.addEventListener("mouseout", function () {
      document.querySelectorAll(".rating-stars .star i").forEach((s) => {
        s.classList.remove("hovered");
      });
    });
  });

});
