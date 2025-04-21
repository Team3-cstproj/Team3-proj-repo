//  cart list baby
 const cartBtnList = document.querySelectorAll('.cart-trigger');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCart');

  cartBtnList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartSidebar.classList.add('active');
      cartOverlay.classList.add('active');
    });
  });

  closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
  });

  cartOverlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
  });
////btns color baby
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.offer-banner .btn').forEach(button => {
    function activate() {
      button.style.backgroundColor = 'white';
      button.style.color = 'black';
    }

    function deactivate() {
      button.style.backgroundColor = 'transparent';
      button.style.color = 'white';
    }

    button.addEventListener('mousedown', activate);
    button.addEventListener('mouseup', deactivate);
    button.addEventListener('mouseleave', deactivate);
    button.addEventListener('touchstart', activate);
    button.addEventListener('touchend', deactivate);
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const logoTrack = document.getElementById('logoTrack');
    const leftArrow = document.querySelector('.carousel-arrow.left');
    const rightArrow = document.querySelector('.carousel-arrow.right');
    const logoItems = document.querySelectorAll('.logo-item');
    let currentIndex = 0;
    let autoRotateInterval;
    
    // Clone first few items for infinite effect
    function cloneItemsForInfinite() {
        const itemsToClone = Array.from(logoItems).slice(0, 4);
        itemsToClone.forEach(item => {
            const clone = item.cloneNode(true);
            logoTrack.appendChild(clone);
        });
    }
    
    // Update carousel position
    function updateCarousel() {
        const logoWidth = logoItems[0].offsetWidth;
        const offset = -currentIndex * logoWidth;
        logoTrack.style.transform = `translateX(${offset}px)`;
        
        // Reset position if at the end (for infinite effect)
        if (currentIndex >= logoItems.length) {
            setTimeout(() => {
                logoTrack.style.transition = 'none';
                currentIndex = 0;
                updateCarousel();
                setTimeout(() => {
                    logoTrack.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }
    }
    
    // Move to next slide
    function moveNext() {
        currentIndex++;
        updateCarousel();
        resetAutoRotate();
    }
    
    // Move to previous slide
    function movePrev() {
        if (currentIndex <= 0) {
            // Jump to end for infinite effect
            logoTrack.style.transition = 'none';
            currentIndex = logoItems.length;
            updateCarousel();
            setTimeout(() => {
                logoTrack.style.transition = 'transform 0.5s ease';
                currentIndex--;
                updateCarousel();
            }, 50);
        } else {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Auto-rotate carousel
    function startAutoRotate() {
        autoRotateInterval = setInterval(moveNext, 2000);
    }
    
    // Reset auto-rotate timer
    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }
    
    // Initialize
    cloneItemsForInfinite();
    startAutoRotate();
    
    // Event listeners
    leftArrow.addEventListener('click', movePrev);
    rightArrow.addEventListener('click', moveNext);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
    
    // Pause on hover
    logoTrack.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    
    logoTrack.addEventListener('mouseleave', () => {
        startAutoRotate();
    });
});

