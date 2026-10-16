// === DATOS GLOBALES ===
const products = [
    { id: 1, name: "Pack Anime Legendario", nameEn: "Legendary Anime Pack", category: "anime", price: 3, oldPrice: 4, discount: 25, rating: 5, reviews: 24, badge: "TOP", badgeType: "hot", description: "Los personajes más icónicos del anime en un solo pack.", descriptionEn: "The most iconic anime characters in a single pack.", specs: ["24 stickers variados", "Tamaños de 4 a 7 cm", "Vinilo impermeable", "+2 años de duración"], specsEn: ["24 assorted stickers", "Sizes from 4 to 7 cm", "Waterproof vinyl", "Over 2 years durability"], icon: "anime" },
    { id: 2, name: "Pack Gamer Ultimate", nameEn: "Ultimate Gamer Pack", category: "gamer", price: 4, oldPrice: null, discount: 0, rating: 5, reviews: 18, badge: null, badgeType: null, description: "Para verdaderos gamers. Logos, personajes y memes gaming.", descriptionEn: "For true gamers. Logos, characters and gaming memes.", specs: ["30 stickers variados", "Tamaños de 4 a 8 cm", "Vinilo impermeable", "Ideal para laptops"], specsEn: ["30 assorted stickers", "Sizes from 4 to 8 cm", "Waterproof vinyl", "Ideal for laptops"], icon: "gamer" },
    { id: 3, name: "Pack Cine y Series", nameEn: "Movies and Series Pack", category: "cine", price: 3, oldPrice: null, discount: 0, rating: 4, reviews: 15, badge: "NEW", badgeType: "new", description: "Marvel, Star Wars, Netflix y tus series favoritas.", descriptionEn: "Marvel, Star Wars, Netflix and your favorite series.", specs: ["20 stickers premium", "Tamaños de 5 a 8 cm", "Vinilo impermeable", "Colores vibrantes"], specsEn: ["20 premium stickers", "Sizes from 5 to 8 cm", "Waterproof vinyl", "Vibrant colors"], icon: "cine" },
    { id: 4, name: "Pack Street y Skate", nameEn: "Street and Skate Pack", category: "skate", price: 4, oldPrice: null, discount: 0, rating: 5, reviews: 12, badge: null, badgeType: null, description: "Estilo urbano puro. Thrasher, Santa Cruz y logos clásicos.", descriptionEn: "Pure street style. Thrasher, Santa Cruz and classic logos.", specs: ["15 stickers grandes", "Tamaños de 6 a 10 cm", "Vinilo de alta resistencia", "Para skate y motos"], specsEn: ["15 large stickers", "Sizes from 6 to 10 cm", "High-resistance vinyl", "For skate and bikes"], icon: "skate" },
    { id: 5, name: "Pack Stikmania", nameEn: "Stikmania Pack", category: "stikmania", price: 3, oldPrice: null, discount: 0, rating: 5, reviews: 30, badge: "EXCLUSIVE", badgeType: "hot", description: "Stickers exclusivos del artista @sti_kmania. Diseños únicos.", descriptionEn: "Exclusive stickers from artist @sti_kmania. Unique designs.", specs: ["18 stickers de autor", "Tamaños de 5 a 7 cm", "Vinilo impermeable", "Diseños originales"], specsEn: ["18 artist stickers", "Sizes from 5 to 7 cm", "Waterproof vinyl", "Original designs"], icon: "stikmania" },
    { id: 6, name: "Pack Personalizado", nameEn: "Custom Pack", category: "personalizado", price: 2, oldPrice: null, discount: 0, rating: 5, reviews: 45, badge: null, badgeType: null, description: "Envía tus diseños o elige los stickers que más te gusten.", descriptionEn: "Send your designs or choose the stickers you like most.", specs: ["Elige cantidad (10-100)", "Tú eliges los diseños", "Material premium", "Diseño gratis incluido"], specsEn: ["Choose quantity (10-100)", "You choose the designs", "Premium material", "Free design included"], icon: "custom" }
];

const productIcons = {
    anime: '<svg viewBox="0 0 24 24"><path d="M4 6c4-2 12-2 16 0"/><path d="M6 6v14"/><path d="M18 6v14"/><path d="M4 10h16"/><path d="M12 6v4"/></svg>',
    gamer: '<svg viewBox="0 0 24 24"><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="15" cy="11" r="1"/><circle cx="17" cy="13" r="1"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>',
    cine: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14"/><path d="M17 5v14"/><path d="M3 10h4"/><path d="M3 14h4"/><path d="M17 10h4"/><path d="M17 14h4"/></svg>',
    skate: '<svg viewBox="0 0 24 24"><path d="M3 14c0 1.5 1.5 2 3 2h12c1.5 0 3-.5 3-2"/><circle cx="8" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/><path d="M7 16V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8"/></svg>',
    stikmania: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>',
    custom: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>'
};

let cart = JSON.parse(localStorage.getItem('stikmania_cart') || '[]');
let currentFilter = 'all';
let currentLang = localStorage.getItem('stikmania_lang') || 'es';
let currentPage = 'hero';

// === FUNCIONES GLOBALES (para onclick en HTML) ===
window.navigateTo = function(page, anchor) {
    console.log('Navigating to:', page);
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) {
        target.classList.add('active');
        currentPage = page;
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === page);
        });
        if (anchor) {
            setTimeout(() => {
                const el = document.getElementById(anchor);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
        setTimeout(() => {
            document.querySelectorAll('.page-section.active .fade-in').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('active');
            });
        }, 50);
    }
};

window.closeMenu = function() {
    const drawer = document.getElementById('menuDrawer');
    const overlay = document.getElementById('menuOverlay');
    const toggle = document.getElementById('menuToggle');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (toggle) toggle.classList.remove('active');
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
};

window.addToCart = function(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });
    saveCart();
    updateCartUI();
    showToast(currentLang === 'es' ? 'Añadido al carrito' : 'Added to cart', 'success');
};

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    try { initLoader(); } catch(e) { console.log('Loader:', e); }
    try { initMenu(); } catch(e) { console.log('Menu:', e); }
    try { initCart(); } catch(e) { console.log('Cart:', e); }
    try { initLanguage(); } catch(e) { console.log('Lang:', e); }
    try { initBottomNav(); } catch(e) { console.log('BottomNav:', e); }
    try { initScrollReveal(); } catch(e) { console.log('Reveal:', e); }
    try { initScrollProgress(); } catch(e) { console.log('Progress:', e); }
    try { initDynamicYear(); } catch(e) { console.log('Year:', e); }
    try { initFAQ(); } catch(e) { console.log('FAQ:', e); }
    try { renderProducts(products); } catch(e) { console.log('Products:', e); }
    try { initFilters(); } catch(e) { console.log('Filters:', e); }
    try { initSearch(); } catch(e) { console.log('Search:', e); }
});

function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => loader.remove(), 500); }, 400);
    }
}

function initMenu() {
    const toggle = document.getElementById('menuToggle');
    const drawer = document.getElementById('menuDrawer');
    const overlay = document.getElementById('menuOverlay');
    const close = document.getElementById('menuClose');
    if (!toggle || !drawer) return;
    
    toggle.addEventListener('click', () => {
        drawer.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        toggle.classList.toggle('active');
    });
    
    if (close) close.addEventListener('click', window.closeMenu);
    if (overlay) overlay.addEventListener('click', window.closeMenu);
}

function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (!cartBtn || !cartDrawer) return;
    
    updateCartUI();
    
    cartBtn.addEventListener('click', () => {
        cartDrawer.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
    });
    
    if (cartClose) cartClose.addEventListener('click', () => {
        cartDrawer.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
    });
    if (cartOverlay) cartOverlay.addEventListener('click', () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
}

function saveCart() { localStorage.setItem('stikmania_cart', JSON.stringify(cart)); }

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    if (!cartItems) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (totalItems > 0) {
        if (cartCount) { cartCount.textContent = totalItems; cartCount.classList.remove('hidden'); }
    } else {
        if (cartCount) cartCount.classList.add('hidden');
    }
    
    if (cartTotal) cartTotal.textContent = '$' + totalPrice.toFixed(2) + ' USD';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">' + (currentLang === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty') + '</div>';
    } else {
        cartItems.innerHTML = cart.map(item => '<div class="cart-item"><div class="cart-item-image">' + (productIcons[item.icon] || '') + '</div><div class="cart-item-info"><div class="cart-item-title">' + (currentLang === 'es' ? item.name : item.nameEn) + '</div><div class="cart-item-price">$' + item.price + ' USD x ' + item.quantity + '</div></div><button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')">&times;</button></div>').join('');
    }
}

function checkout() {
    if (cart.length === 0) { showToast(currentLang === 'es' ? 'Carrito vacío' : 'Cart is empty', 'error'); return; }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let message = '*PEDIDO STIKMANIA*\n\n';
    cart.forEach(item => { message += '• ' + (currentLang === 'es' ? item.name : item.nameEn) + ' x' + item.quantity + ' - $' + (item.price * item.quantity).toFixed(2) + ' USD\n'; });
    message += '\n*Total: $' + total.toFixed(2) + ' USD*';
    window.open('https://wa.me/5359758756?text=' + encodeURIComponent(message), '_blank');
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = productsToRender.map(product => '<div class="product-card" data-category="' + product.category + '"><div class="product-image">' + (product.badge ? '<span class="product-badge ' + product.badgeType + '">' + product.badge + '</span>' : '') + (productIcons[product.icon] || '') + '</div><div class="product-info"><div class="product-title">' + (currentLang === 'es' ? product.name : product.nameEn) + '</div><div class="product-rating"><span class="stars">' + '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating) + '</span><span class="reviews">(' + product.reviews + ')</span></div><div class="product-price"><span class="price-current">$' + product.price + ' USD</span>' + (product.oldPrice ? '<span class="price-old">$' + product.oldPrice + '</span>' : '') + (product.discount > 0 ? '<span class="discount-badge">-' + product.discount + '%</span>' : '') + '</div><button class="add-to-cart-btn" onclick="addToCart(products.find(p => p.id === ' + product.id + '))">' + (currentLang === 'es' ? 'Añadir' : 'Add') + '</button></div></div>').join('');
}

function initFilters() {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const filter = chip.dataset.filter;
            currentFilter = filter;
            renderProducts(filter === 'all' ? products : products.filter(p => p.category === filter));
        });
    });
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        renderProducts(products.filter(p => p.name.toLowerCase().includes(query) || p.nameEn.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)));
    });
}

function initLanguage() {
    const langBtn = document.getElementById('langToggle');
    if (!langBtn) return;
    
    function updateLanguage() {
        langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
        document.documentElement.lang = currentLang;
        renderProducts(currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter));
        updateCartUI();
    }
    
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('stikmania_lang', currentLang);
        updateLanguage();
    });
    
    updateLanguage();
}

function initBottomNav() {
    const items = document.querySelectorAll('.bottom-nav-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            if (page) navigateTo(page);
        });
    });
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<span>' + (type === 'success' ? '✅' : '❌') + '</span><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const sign = question.querySelector('span:last-child');
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

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
            }
        });
    });
}

function initScrollReveal() {
    function reveal() {
        document.querySelectorAll('.page-section.active .fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
        });
    }
    window.addEventListener('scroll', reveal);
    window.addEventListener('load', reveal);
    reveal();
}

function initScrollProgress() {
    const existing = document.getElementById('scrollProgress');
    if (existing) return;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.id = 'scrollProgress';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight > 0) bar.style.height = (scrollTop / scrollHeight * 100) + '%';
    });
}

function initDynamicYear() {
    document.querySelectorAll('.current-year').forEach(s => s.textContent = new Date().getFullYear());
}