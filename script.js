document.addEventListener('DOMContentLoaded', () => {

    // --- Unified Mobile Navigation Toggle ---
    // This single block now handles showing and hiding the mobile menu.
    const navBar = document.getElementById('navbar');
    const menuOpenBtn = document.getElementById('bar');
    const menuCloseBtn = document.getElementById('close');

    if (navBar && menuOpenBtn) {
        menuOpenBtn.addEventListener('click', () => {
            navBar.classList.add('active');
        });
    }

    if (navBar && menuCloseBtn) {
        menuCloseBtn.addEventListener('click', () => {
            navBar.classList.remove('active');
        });
    }

    // --- Product Image Gallery ---
    // This script handles the image selection on a product detail page.
    const mainImg = document.getElementById("MainImg");
    const smallImgs = document.getElementsByClassName("small-img");

    // This check ensures the code only runs on pages with a product gallery.
    if (mainImg && smallImgs.length > 0) {
        for (let i = 0; i < smallImgs.length; i++) {
            smallImgs[i].onclick = function() {
                mainImg.src = this.src;
            };
        }
    }

    // --- Ring Cycling Animation ---
    // This animates the rings on the homepage.
    const rings = document.querySelectorAll('.ring-item');
    const backgroundTitle = document.getElementById('background-title');
    const mainTitle = document.getElementById('main-ring-title');
    const mainPrice = document.getElementById('main-ring-price');
    const mainCode = document.getElementById('main-ring-code');
    const productDetails = document.getElementById('product-details');

    // This check ensures the animation code only runs on the homepage.
    if (rings.length > 0 && backgroundTitle && mainTitle && mainPrice && mainCode && productDetails) {
        
        function updateTextContent() {
            const topRing = document.querySelector('.ring-item[data-pos="1"]');
            if (!topRing) return;

            const title = topRing.dataset.title;
            const price = topRing.dataset.price;
            const code = topRing.dataset.code;

            productDetails.style.opacity = 0;
            backgroundTitle.style.opacity = 0;

            setTimeout(() => {
                backgroundTitle.textContent = title.toUpperCase();
                mainTitle.textContent = title;
                mainPrice.textContent = price;
                mainCode.innerHTML = `Take 20% off for a limited time.<br> Use Code: ${code}`;

                productDetails.style.opacity = 1;
                backgroundTitle.style.opacity = 1;
            }, 750); // Half of the CSS transition duration
        }

        function cycleRings() {
            rings.forEach(ring => {
                let currentPos = parseInt(ring.dataset.pos, 10);
                currentPos = (currentPos % 3) + 1; // Cycles through 1, 2, 3
                ring.dataset.pos = currentPos;
                ring.className = `ring-item position-${currentPos}`;
            });
            updateTextContent();
        }

        // Initial setup
        rings.forEach(ring => {
            ring.className = `ring-item position-${ring.dataset.pos}`;
        });
        updateTextContent();

        setInterval(cycleRings, 4000);
    }

    // --- Swiper Carousel ---
    // This initializes the Swiper.js carousel if the library is loaded.
    if (typeof Swiper !== 'undefined') {
        new Swiper('.swiper-container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
