/* ============================================
   STIKMANIA - Carrusel de imágenes en packs
   Versión 1.0 - Táctil, autoplay, flechas y dots
   ============================================ */

(function() {
    function initPackCarousels() {
        var carousels = document.querySelectorAll('.pack-img-carousel');
        
        carousels.forEach(function(carousel) {
            var track = carousel.querySelector('.pack-img-carousel-track');
            var slides = carousel.querySelectorAll('.pack-img-slide');
            var prevBtn = carousel.querySelector('.carousel-arrow.prev');
            var nextBtn = carousel.querySelector('.carousel-arrow.next');
            var dotsContainer = carousel.querySelector('.carousel-dots');
            var dots = carousel.querySelectorAll('.carousel-dot');
            
            if (!track || slides.length === 0) return;
            
            var currentIndex = 0;
            var slideCount = slides.length;
            var autoplayInterval = null;
            var autoplayDelay = 4000; // 4 segundos
            var touchStartX = 0;
            var touchEndX = 0;
            
            // Crear dots dinámicamente si no existen
            if (!dotsContainer && slideCount > 1) {
                dotsContainer = document.createElement('div');
                dotsContainer.className = 'carousel-dots';
                for (var i = 0; i < slideCount; i++) {
                    var dot = document.createElement('button');
                    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                    dot.setAttribute('aria-label', 'Ir a imagen ' + (i + 1));
                    dot.addEventListener('click', function() {
                        var idx = Array.prototype.indexOf.call(dotsContainer.children, this);
                        goToSlide(idx);
                    });
                    dotsContainer.appendChild(dot);
                }
                carousel.appendChild(dotsContainer);
                dots = dotsContainer.querySelectorAll('.carousel-dot');
            }
            
            function updateTrack() {
                track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
                
                // Actualizar dots
                if (dotsContainer) {
                    var dots = dotsContainer.querySelectorAll('.carousel-dot');
                    dots.forEach(function(dot, i) {
                        if (i === currentIndex) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                }
            }
            
            function goToSlide(index) {
                if (index < 0) index = slideCount - 1;
                if (index >= slideCount) index = 0;
                currentIndex = index;
                updateTrack();
                resetAutoplay();
            }
            
            function nextSlide() {
                goToSlide(currentIndex + 1);
            }
            
            function prevSlide() {
                goToSlide(currentIndex - 1);
            }
            
            function startAutoplay() {
                if (slideCount <= 1) return;
                autoplayInterval = setInterval(nextSlide, autoplayDelay);
            }
            
            function stopAutoplay() {
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    autoplayInterval = null;
                }
            }
            
            function resetAutoplay() {
                stopAutoplay();
                startAutoplay();
            }
            
            // Eventos de flechas
            if (prevBtn) {
                prevBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    prevSlide();
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    nextSlide();
                });
            }
            
            // Eventos táctiles (swipe)
            carousel.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoplay();
            }, { passive: true });
            
            carousel.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                var diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                } else {
                    startAutoplay();
                }
            }, { passive: true });
            
            // Pausar autoplay al hacer hover (desktop)
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
            
            // Iniciar autoplay
            startAutoplay();
        });
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPackCarousels);
    } else {
        initPackCarousels();
    }
})();