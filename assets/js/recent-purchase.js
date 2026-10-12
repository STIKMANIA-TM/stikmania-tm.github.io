/* ============================================
   STIKMANIA - Recent Purchase Popup v3
   Intervalos variables + Negocios reales
   ============================================ */

(function() {
    // Intervalos de aparición en milisegundos (10s, 13s, 16s, 30s, 45s, 50s, 1-5 min)
    var intervals = [
        10000, 13000, 16000, 30000, 45000, 50000,
        60000, 120000, 180000, 240000, 300000
    ];
    
    // Nombres personales cubanos
    var firstNames = [
        'Carlos', 'María', 'Javier', 'Yanelis', 'Roberto', 'Dariel', 'Lía', 'Adrián',
        'Carla', 'Miguel', 'Ana', 'Luis', 'Sofía', 'Pedro', 'Laura', 'Jorge',
        'Carmen', 'Ricardo', 'Elena', 'Fernando', 'Isabel', 'Manuel', 'Patricia', 'Diego',
        'Valentina', 'Andrés', 'Camila', 'Oscar', 'Natalia', 'Raúl', 'Daniela', 'Víctor',
        'Gabriela', 'Tomás', 'Mariana', 'Alejandro', 'Lucía', 'Emilio', 'Rosa', 'Pablo',
        'Beatriz', 'Héctor', 'Silvia', 'Ramón', 'Teresa', 'Julio', 'Marta', 'Enrique',
        'Claudia', 'Francisco', 'Verónica', 'Antonio', 'Lorena', 'Rafael', 'Cristina',
        'Alberto', 'Diana', 'Sergio', 'Yusleidy', 'Yosvani', 'Lázaro', 'Yamila', 'Osmany',
        'Dayami', 'Reinier', 'Lisandra', 'Yoel', 'Yudith', 'Reynier', 'Ariana', 'Yoandy',
        'Yuniesky', 'Lianet', 'Yosvany', 'Mayra', 'Lester', 'Yaima', 'Yordan', 'Yisel'
    ];
    
    var lastInitials = ['M.', 'R.', 'G.', 'P.', 'L.', 'F.', 'T.', 'V.', 'D.', 'S.', 'H.', 'C.', 'B.', 'N.', 'A.'];
    
    // Negocios reales cubanos
    var businessNames = [
        'Vita Nuova', 'Alma Café', 'Neder Café', 'La Casa del Perro', 'Boquitas',
        'California Café', 'Casa del Perro', 'Coppelia', "Dino's Pizza", 'Doña Adela',
        'El Burrito', 'Heladería Habana Libre', 'Los Mangos Pizza', 'Maxi Burger',
        'Pizzería Milán', 'Qbanito', 'Snack Deli', 'Tacos', 'Too Much Havana',
        '25MN Badido', 'Ama', 'Cafe Tropi', 'Cafetería Los Afortunados', 'Cafetería Pilón',
        'Café La Rampa', 'Café Nana', 'Café Panini', 'Café Rueda', 'Café-Galería Mamainé',
        'Cajita de Comida', 'DiTú La Rampa', 'Don Bello', 'El Caribeño',
        'La Zorra y El Cuervo', 'Nerea Café', 'Pabellón Cuba', 'Rápido 15 y L',
        'Skyline', 'Sylvain', 'Cafetería El Príncipe', 'Cafetería Los Lirios',
        'Ela & Paleta', 'VAIVÉN Pizza Bar', 'Andar 17', 'Cafetería Latina París',
        'Café Enlace Bistró', 'Doña Bertha', 'El Arca de Noé', 'Lucky Bite', 'NK',
        'Pizzas Express', 'Cafetería Visa Vis', 'Cafetería Don Luigi', 'Café G',
        'Café Infinito', 'Café Turín', 'Café Virginia', 'F y 11', 'Illuxion',
        'Kafé Ave Línea', 'La Despensa', 'La Parrillita de Carbón', 'La Fuente Pasa',
        'Tarjetas', 'Virgo Café'
    ];
    
    var cities = [
        'Vedado, La Habana', 'Miramar, La Habana', 'Centro Habana', 'Playa, La Habana',
        'Habana Vieja', 'Santiago de Cuba', 'Cienfuegos', 'Camagüey', 'Varadero',
        'Regla', 'Guanabacoa', 'Boyeros', 'Plaza', 'Cerro', 'Diez de Octubre',
        'Arroyo Naranjo', 'San Miguel del Padrón', 'Habana del Este', 'Cotorro', 'Marianao',
        'La Lisa', 'Pinar del Río', 'Santa Clara', 'Holguín', 'Bayamo', 'Guantánamo'
    ];
    
    var products = [
        'Pack Anime Legendario', 'Pack Gamer Ultimate', 'Pack Cine y Series',
        'Pack Street y Skate', 'Pack Stikmania', 'Pack Personalizado',
        'Etiquetas para jabones artesanales', '100 etiquetas premium',
        'Stickers para botella', 'Etiquetas para envases', '500 stickers corporativos',
        'Pack de 24 stickers variados', 'Etiquetas para velas', 'Empaque personalizado',
        'Stickers para laptop', 'Etiquetas para mermeladas', 'Pack de 30 stickers gaming',
        'Stickers para moto', 'Etiquetas para cosméticos', 'Pack de 18 memes cubanos',
        'Stickers para termo', 'Etiquetas para miel', 'Pack de 15 stickers skate',
        'Stickers para casco', 'Etiquetas para shampoo', 'Pack de 20 stickers Marvel',
        'Stickers para guitarra', 'Etiquetas para café', 'Pack de 48 stickers anime',
        'Stickers para skateboard', 'Etiquetas para cerveza artesanal'
    ];
    
    var times = [
        'hace 2 minutos', 'hace 5 minutos', 'hace 8 minutos', 'hace 11 minutos',
        'hace 15 minutos', 'hace 18 minutos', 'hace 23 minutos', 'hace 28 minutos',
        'hace 35 minutos', 'hace 42 minutos', 'hace 1 hora', 'hace 2 horas',
        'hace 3 horas', 'hace 4 horas', 'hace 5 horas', 'hace 6 horas',
        'hace 8 horas', 'hace 10 horas', 'hace 12 horas', 'hace 1 día'
    ];
    
    // Generar 1000 compras únicas
    function generateUniquePurchases(count) {
        var purchases = [];
        var usedCombinations = new Set();
        var attempts = 0;
        var maxAttempts = count * 10;
        
        while (purchases.length < count && attempts < maxAttempts) {
            attempts++;
            
            // 30% probabilidad de que sea un negocio, 70% persona
            var isBusiness = Math.random() < 0.30;
            var name, initial;
            
            if (isBusiness) {
                name = businessNames[Math.floor(Math.random() * businessNames.length)];
                initial = name.charAt(0);
            } else {
                var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                var lastInitial = lastInitials[Math.floor(Math.random() * lastInitials.length)];
                name = firstName + ' ' + lastInitial;
                initial = firstName.charAt(0);
            }
            
            var city = cities[Math.floor(Math.random() * cities.length)];
            var product = products[Math.floor(Math.random() * products.length)];
            var time = times[Math.floor(Math.random() * times.length)];
            
            var comboKey = name + '|' + city + '|' + product + '|' + time;
            
            if (!usedCombinations.has(comboKey)) {
                usedCombinations.add(comboKey);
                purchases.push({
                    name: name,
                    city: city,
                    product: product,
                    time: time,
                    initial: initial,
                    isBusiness: isBusiness
                });
            }
        }
        
        return purchases;
    }
    
    var purchases = generateUniquePurchases(1000);
    var currentIndex = 0;
    var popup = null;
    var intervalId = null;
    var timeoutId = null;
    
    function createPopup() {
        popup = document.createElement('div');
        popup.className = 'recent-purchase';
        popup.innerHTML = 
            '<div class="recent-purchase-avatar" id="rpAvatar"></div>' +
            '<div class="recent-purchase-info">' +
                '<div><strong id="rpName"></strong><span id="rpFrom" style="color: #aaa;"></span></div>' +
                '<div>compró <span class="product" id="rpProduct"></span></div>' +
                '<div class="time" id="rpTime"></div>' +
            '</div>' +
            '<button class="recent-purchase-close" id="rpClose" aria-label="Cerrar">&times;</button>';
        
        document.body.appendChild(popup);
        
        document.getElementById('rpClose').addEventListener('click', function() {
            hidePopup();
            clearInterval(intervalId);
            sessionStorage.setItem('stikmania_rp_closed', 'true');
        });
    }
    
    function showPopup() {
        if (!popup) createPopup();
        if (sessionStorage.getItem('stikmania_rp_closed') === 'true') return;
        
        var purchase = purchases[currentIndex];
        
        document.getElementById('rpAvatar').textContent = purchase.initial;
        document.getElementById('rpName').textContent = purchase.name;
        
        // Si es negocio, no mostrar "de [ciudad]"
        var fromEl = document.getElementById('rpFrom');
        if (purchase.isBusiness) {
            fromEl.textContent = '';
        } else {
            fromEl.textContent = ' de ' + purchase.city;
        }
        
        document.getElementById('rpProduct').textContent = purchase.product;
        document.getElementById('rpTime').textContent = purchase.time;
        
        popup.classList.add('show');
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(hidePopup, 6000);
        
        currentIndex = (currentIndex + 1) % purchases.length;
        
        // Programar siguiente con intervalo aleatorio
        clearTimeout(intervalId);
        var nextInterval = intervals[Math.floor(Math.random() * intervals.length)];
        intervalId = setTimeout(showPopup, nextInterval);
    }
    
    function hidePopup() {
        if (popup) popup.classList.remove('show');
    }
    
    function startCycle() {
        var firstInterval = intervals[Math.floor(Math.random() * intervals.length)];
        setTimeout(function() {
            showPopup();
        }, firstInterval);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startCycle);
    } else {
        startCycle();
    }
})();