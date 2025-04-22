
// document.addEventListener('DOMContentLoaded', function () {
//     const productCards = document.querySelectorAll('.product-card');

//     productCards.forEach(card => {
//         const colorOptions = card.querySelectorAll('.color-option');
//         const images = card.querySelectorAll('.product-image img');

//         colorOptions.forEach(option => {
//             option.addEventListener('click', function () {
//                 // Remove active class from all color options in this card
//                 colorOptions.forEach(opt => opt.classList.remove('active'));
//                 this.classList.add('active');

//                 const selectedColor = this.getAttribute('data-color');

//                 // Update images in this card
//                 images.forEach(img => {
//                     img.classList.remove('active');
//                     if (img.getAttribute('data-color') === selectedColor) {
//                         img.classList.add('active');
//                     }
//                 });
//             });
//         });
//     });
// });


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