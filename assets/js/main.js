// === DATOS ===
const products = [
    { id: 1, name: "Pack Anime Legendario", nameEn: "Legendary Anime Pack", category: "anime", price: 3, oldPrice: 4, discount: 25, rating: 5, reviews: 24, badge: "TOP", badgeType: "hot", description: "Los personajes más icónicos del anime.", descriptionEn: "The most iconic anime characters.", specs: ["24 stickers", "4-7 cm", "Vinilo impermeable"], specsEn: ["24 stickers", "4-7 cm", "Waterproof vinyl"], icon: "anime" },
    { id: 2, name: "Pack Gamer Ultimate", nameEn: "Ultimate Gamer Pack", category: "gamer", price: 4, oldPrice: null, discount: 0, rating: 5, reviews: 18, badge: null, badgeType: null, description: "Para verdaderos gamers.", descriptionEn: "For true gamers.", specs: ["30 stickers", "4-8 cm", "Vinilo impermeable"], specsEn: ["30 stickers", "4-8 cm", "Waterproof vinyl"], icon: "gamer" },
    { id: 3, name: "Pack Cine y Series", nameEn: "Movies and Series Pack", category: "cine", price: 3, oldPrice: null, discount: 0, rating: 4, reviews: 15, badge: "NEW", badgeType: "new", description: "Marvel, Star Wars, Netflix.", descriptionEn: "Marvel, Star Wars, Netflix.", specs: ["20 stickers", "5-8 cm", "Vinilo impermeable"], specsEn: ["20 stickers", "5-8 cm", "Waterproof vinyl"], icon: "cine" },
    { id: 4, name: "Pack Street y Skate", nameEn: "Street and Skate Pack", category: "skate", price: 4, oldPrice: null, discount: 0, rating: 5, reviews: 12, badge: null, badgeType: null, description: "Estilo urbano puro.", descriptionEn: "Pure street style.", specs: ["15 stickers", "6-10 cm", "Alta resistencia"], specsEn: ["15 stickers", "6-10 cm", "High resistance"], icon: "skate" },
    { id: 5, name: "Pack Stikmania", nameEn: "Stikmania Pack", category: "stikmania", price: 3, oldPrice: null, discount: 0, rating: 5, reviews: 30, badge: "EXCLUSIVE", badgeType: "hot", description: "Stickers exclusivos @sti_kmania.", descriptionEn: "Exclusive @sti_kmania stickers.", specs: ["18 stickers", "5-7 cm", "Vinilo impermeable"], specsEn: ["18 stickers", "5-7 cm", "Waterproof vinyl"], icon: "stikmania" },
    { id: 6, name: "Pack Personalizado", nameEn: "Custom Pack", category: "personalizado", price: 2, oldPrice: null, discount: 0, rating: 5, reviews: 45, badge: null, badgeType: null, description: "Envía tus diseños.", descriptionEn: "Send your designs.", specs: ["10-100 unidades", "Tú eliges", "Diseño gratis"], specsEn: ["10-100 units", "You choose", "Free design"], icon: "custom" }
];

const productIcons = {
    anime: '<svg viewBox="0 0 24 24"><path d="M4 6c4-2 12-2 16 0"/><path d="M6 6v14"/><path d="M18 6v14"/><path d="M4 10h16"/><path d="M12 6v4"/></svg>',
    gamer: '<svg viewBox="0 0 24 24"><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="15" cy="11" r="1"/><circle cx="17" cy="13" r="1"/></svg>',
    cine: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5v14"/><path d="M17 5v14"/></svg>',
    skate: '<svg viewBox="0 0 24 24"><path d="M3 14c0 1.5 1.5 2 3 2h12c1.5 0 3-.5 3-2"/><circle cx="8" cy="19" r="1.5"/><circle cx="16" cy="19" r="1.5"/></svg>',
    stikmania: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>',
    custom: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>'
};

let cart = JSON.parse(localStorage.getItem('stikmania_cart') || '[]');
let currentFilter = 'all';
let currentLang = localStorage.getItem('stikmania_lang') || 'es';

// === FUNCIONES GLOBALES ===
window.addToCart = function(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem('stikmania_cart', JSON.stringify(cart));
    updateCartUI();
    showToast(currentLang === 'es' ? 'Añadido al carrito' : 'Added to cart', 'success');
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('stikmania_cart', JSON.stringify(cart));
    updateCartUI();
};

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initMenu();
    initCart();
    initLanguage();
    initScrollReveal();
    initFAQ();
    
    if (document.getElementById('productsGrid')) {
        renderProducts(products);
        initFilters();
        initSearch();
    }
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
        drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
    });
    
    if (close) close.addEventListener('click', () => {
        drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    });
    if (overlay) overlay.addEventListener('click', () => {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
    });
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
    if (cart.length === 0) { showToast('Carrito vacío', 'error'); return; }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let message = '*PEDIDO STIKMANIA*\n\n';
    cart.forEach(item => { message += '• ' + (currentLang === 'es' ? item.name : item.nameEn) + ' x' + item.quantity + ' - $' + (item.price * item.quantity).toFixed(2) + ' USD\n'; });
    message += '\n*Total: $' + total.toFixed(2) + ' USD*';
    window.open('https://wa.me/5359758756?text=' + encodeURIComponent(message), '_blank');
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = productsToRender.map(product => '<div class="product-card"><div class="product-image">' + (product.badge ? '<span class="product-badge ' + product.badgeType + '">' + product.badge + '</span>' : '') + (productIcons[product.icon] || '') + '</div><div class="product-info"><div class="product-title">' + (currentLang === 'es' ? product.name : product.nameEn) + '</div><div class="product-rating"><span class="stars">' + '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating) + '</span><span class="reviews">(' + product.reviews + ')</span></div><div class="product-price"><span class="price-current">$' + product.price + ' USD</span>' + (product.oldPrice ? '<span class="price-old">$' + product.oldPrice + '</span>' : '') + (product.discount > 0 ? '<span class="discount-badge">-' + product.discount + '%</span>' : '') + '</div><button class="add-to-cart-btn" onclick="addToCart(products.find(p => p.id === ' + product.id + '))">' + (currentLang === 'es' ? 'Añadir' : 'Add') + '</button></div></div>').join('');
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
        renderProducts(products.filter(p => p.name.toLowerCase().includes(query) || p.nameEn.toLowerCase().includes(query)));
    });
}

function initLanguage() {
    const langBtn = document.getElementById('langToggle');
    if (!langBtn) return;
    
    langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
    
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('stikmania_lang', currentLang);
        langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
        if (document.getElementById('productsGrid')) {
            renderProducts(currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter));
        }
        updateCartUI();
    });
}

function initScrollReveal() {
    function reveal() {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
        });
    }
    window.addEventListener('scroll', reveal);
    window.addEventListener('load', reveal);
    reveal();
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

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<span>' + (type === 'success' ? '✅' : '') + '</span><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}