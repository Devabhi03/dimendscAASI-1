
        document.addEventListener('DOMContentLoaded', () => {
            // --- Hamburger Menu Toggle ---
            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');

            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden'); // Toggles the 'hidden' class
                });
            }

            // --- Ring Cycling Animation ---
            const rings = document.querySelectorAll('.ring-item');
            const backgroundTitle = document.getElementById('background-title');
            const mainTitle = document.getElementById('main-ring-title');
            const mainPrice = document.getElementById('main-ring-price');
            const mainCode = document.getElementById('main-ring-code');
            const productDetails = document.getElementById('product-details');

            function updateTextContent() {
                // Find the ring currently in position 1
                const topRing = document.querySelector('.ring-item[data-pos="1"]');
                if (!topRing) return;

                const title = topRing.dataset.title;
                const price = topRing.dataset.price;
                const code = topRing.dataset.code;
                
                // Fade out text
                productDetails.style.opacity = 0;
                backgroundTitle.style.opacity = 0;

                // Update text after a short delay to allow for fade out
                setTimeout(() => {
                    backgroundTitle.textContent = title.toUpperCase();
                    mainTitle.textContent = title;
                    mainPrice.textContent = price;
                    mainCode.innerHTML = `Take 20% off for a limited time.<br> Use Code: ${code}`;
                    
                    // Fade in new text
                    productDetails.style.opacity = 1;
                    backgroundTitle.style.opacity = 1;
                }, 750); // This should be half of the CSS transition duration
            }

            function cycleRings() {
                rings.forEach(ring => {
                    let currentPos = parseInt(ring.dataset.pos);
                    currentPos++;
                    if (currentPos > 3) {
                        currentPos = 1;
                    }
                    ring.dataset.pos = currentPos;
                });

                // Apply new position classes
                rings.forEach(ring => {
                    ring.className = `ring-item position-${ring.dataset.pos}`;
                });

                updateTextContent();
            }

            // Initial setup
            // Apply initial position classes
            rings.forEach(ring => {
                ring.className = `ring-item position-${ring.dataset.pos}`;
            });
            updateTextContent(); // Set initial text
            
            // Start cycling every 4 seconds
            setInterval(cycleRings, 4000);

            // --- Swiper Carousel ---
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

            // --- Smooth Scroll ---
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });
 