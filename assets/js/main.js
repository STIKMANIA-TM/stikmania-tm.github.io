/* ============================================
   STIKMANIA - Main JavaScript (Compartido)
   Versión 4.2 - Con indicador de progreso
   ============================================ */

// 1. LOADER
window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                if (loader.parentNode) loader.remove();
            }, 500);
        }, 400);
    }
});

// 2. SCROLL REVEAL
function revealOnScroll() {
    var elements = document.querySelectorAll('.fade-in');
    var windowHeight = window.innerHeight;
    
    elements.forEach(function(element) {
        var elementTop = element.getBoundingClientRect().top;
        var triggerPoint = windowHeight - 100;
        
        if (elementTop < triggerPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// 3. FAQ TOGGLE
function initFAQ() {
    var questions = document.querySelectorAll('.faq-question');
    
    questions.forEach(function(question) {
        question.addEventListener('click', function() {
            var answer = this.nextElementSibling;
            var sign = this.querySelector('span:last-child');
            
            var allAnswers = document.querySelectorAll('.faq-answer.show');
            allAnswers.forEach(function(openAnswer) {
                if (openAnswer !== answer) {
                    openAnswer.classList.remove('show');
                    var openSign = openAnswer.previousElementSibling.querySelector('span:last-child');
                    if (openSign) openSign.textContent = '+';
                }
            });
            
            if (answer.classList.contains('show')) {
                answer.classList.remove('show');
                if (sign) sign.textContent = '+';
            } else {
                answer.classList.add('show');
                if (sign) sign.textContent = '−';
            }
        });
    });
}

// 4. SMOOTH SCROLL
function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerOffset = 80;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 5. HEADER SCROLL EFFECT
function initHeaderScroll() {
    var header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.borderBottomColor = 'rgba(0, 255, 0, 0.3)';
        } else {
            header.style.padding = '15px 0';
            header.style.borderBottomColor = '';
        }
    });
}

// 6. MENÚ HAMBURGUESA MÓVIL
function initMobileMenu() {
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('mainNav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
            nav.classList.toggle('open');
        });
        
        var links = nav.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                toggle.classList.remove('active');
                nav.classList.remove('open');
            });
        });
        
        window.addEventListener('scroll', function() {
            if (nav.classList.contains('open')) {
                toggle.classList.remove('active');
                nav.classList.remove('open');
            }
        });
    }
}

// 7. SERVICE WORKER
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registrado:', registration.scope);
                })
                .catch(function(error) {
                    console.log('Error SW:', error);
                });
        });
    }
}

// 8. IDIOMA
function initLanguage() {
    var currentLang = localStorage.getItem('stikmania_lang') || 'es';
    var langBtn = document.getElementById('langToggle');
    
    function updateLanguage() {
        if (langBtn) {
            langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
        }
        document.querySelectorAll('[data-es]').forEach(function(el) {
            el.textContent = currentLang === 'es' 
                ? el.getAttribute('data-es') 
                : el.getAttribute('data-en');
        });
        document.documentElement.lang = currentLang;
    }
    
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            localStorage.setItem('stikmania_lang', currentLang);
            updateLanguage();
        });
    }
    
    updateLanguage();
}

// 9. AÑO DINÁMICO
function initDynamicYear() {
    var yearSpans = document.querySelectorAll('.current-year');
    var year = new Date().getFullYear();
    yearSpans.forEach(function(span) {
        span.textContent = year;
    });
}

// 10. INDICADOR DE PROGRESO LATERAL
function initScrollProgress() {
    var progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.id = 'scrollProgress';
    document.body.appendChild(progressBar);
    
    function updateProgress() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.height = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initSmoothScroll();
    initHeaderScroll();
    initMobileMenu();
    initLanguage();
    initDynamicYear();
    initServiceWorker();
    initScrollProgress();
});