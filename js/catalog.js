
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


