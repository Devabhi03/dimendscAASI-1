document.addEventListener('DOMContentLoaded', () => {

    // --- Original Navigation Toggle (from initial code) ---
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    if (bar) {
        bar.addEventListener('click', () => {
            if (nav) {
                nav.classList.add('active');
            }
        });
    }

    if (close) {
        close.addEventListener('click', () => {
            if (nav) {
                nav.classList.remove('active');
            }
        });
    }

    // --- Original Product Image Gallery (from initial code) ---
    // This script is for the product detail page.
    const MainImg = document.getElementById("MainImg");
    const smallimg = document.getElementsByClassName("small-img");

    if (MainImg && smallimg.length > 0) {
        // This loop makes the code work for any number of small images
        for (let i = 0; i < smallimg.length; i++) {
            smallimg[i].onclick = function() {
                MainImg.src = this.src;
            };
        }
    }

    // --- New Hamburger Menu Toggle (from new code) ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden'); // Toggles the 'hidden' class
        });
    }

    // --- New Ring Cycling Animation (from new code) ---
    const rings = document.querySelectorAll('.ring-item');
    const backgroundTitle = document.getElementById('background-title');
    const mainTitle = document.getElementById('main-ring-title');
    const mainPrice = document.getElementById('main-ring-price');
    const mainCode = document.getElementById('main-ring-code');
    const productDetails = document.getElementById('product-details');

    // Check if ring elements exist before running animation code
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
            }, 750);
        }

        function cycleRings() {
            rings.forEach(ring => {
                let currentPos = parseInt(ring.dataset.pos);
                currentPos++;
                if (currentPos > 3) {
                    currentPos = 1;
                }
                ring.dataset.pos = currentPos;
                ring.className = `ring-item position-${ring.dataset.pos}`;
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


    // --- New Swiper Carousel (from new code) ---
    // Note: This requires the Swiper.js library to be included in your HTML.
    if (typeof Swiper !== 'undefined') {
        var swiper = new Swiper('.swiper-container', {
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


    // --- New Smooth Scroll (from new code) ---
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
