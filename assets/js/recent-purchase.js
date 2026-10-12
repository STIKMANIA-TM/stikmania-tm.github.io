/* ============================================
   STIKMANIA - Recent Purchase Popup
   Prueba social en vivo (estilo stickers.com)
   ============================================ */

(function() {
    // Base de datos de compras recientes (datos realistas cubanos)
    var purchases = [
        {
            name: 'Carlos M.',
            city: 'Vedado, La Habana',
            product: 'Pack Anime Legendario',
            time: 'hace 3 minutos',
            initial: 'C'
        },
        {
            name: 'Mariana L.',
            city: 'Miramar, La Habana',
            product: 'Etiquetas para jabones artesanales',
            time: 'hace 11 minutos',
            initial: 'M'
        },
        {
            name: 'Javier R.',
            city: 'Santiago de Cuba',
            product: 'Pack Street & Skate',
            time: 'hace 23 minutos',
            initial: 'J'
        },
        {
            name: 'Dariel P.',
            city: 'Centro Habana',
            product: 'Pack Gamer Ultimate',
            time: 'hace 38 minutos',
            initial: 'D'
        },
        {
            name: 'Yanelis G.',
            city: 'Cienfuegos',
            product: 'Pack Memes Cubanos',
            time: 'hace 1 hora',
            initial: 'Y'
        },
        {
            name: 'Ash Soap Cuba',
            city: 'La Habana',
            product: '100 etiquetas premium',
            time: 'hace 2 horas',
            initial: 'A'
        },
        {
            name: 'Roberto F.',
            city: 'Playa, La Habana',
            product: 'Pack Cine & Series',
            time: 'hace 3 horas',
            initial: 'R'
        },
        {
            name: 'Nova Events',
            city: 'La Habana',
            product: '500 stickers corporativos',
            time: 'hace 4 horas',
            initial: 'N'
        },
        {
            name: 'Lía T.',
            city: 'Camagüey',
            product: 'Pack Personalizado',
            time: 'hace 5 horas',
            initial: 'L'
        },
        {
            name: 'Munchies Cuba',
            city: 'La Habana',
            product: 'Etiquetas para envases',
            time: 'hace 6 horas',
            initial: 'M'
        },
        {
            name: 'Adrián V.',
            city: 'Habana Vieja',
            product: 'Pack Anime Legendario',
            time: 'hace 8 horas',
            initial: 'A'
        },
        {
            name: 'Carla D.',
            city: 'Varadero',
            product: 'Stickers para botella',
            time: 'ayer',
            initial: 'C'
        }
    ];
    
    var currentIndex = 0;
    var popup = null;
    var intervalId = null;
    var timeoutId = null;
    
    // Crear el popup en el DOM
    function createPopup() {
        popup = document.createElement('div');
        popup.className = 'recent-purchase';
        popup.innerHTML = 
            '<div class="recent-purchase-avatar" id="rpAvatar"></div>' +
            '<div class="recent-purchase-info">' +
                '<div><strong id="rpName"></strong> de <span id="rpCity"></span></div>' +
                '<div>compró <span class="product" id="rpProduct"></span></div>' +
                '<div class="time" id="rpTime"></div>' +
            '</div>' +
            '<button class="recent-purchase-close" id="rpClose" aria-label="Cerrar">&times;</button>';
        
        document.body.appendChild(popup);
        
        // Evento de cerrar
        document.getElementById('rpClose').addEventListener('click', function() {
            hidePopup();
            clearInterval(intervalId);
            // Recordar que el usuario cerró (no volver a mostrar esta sesión)
            sessionStorage.setItem('stikmania_rp_closed', 'true');
        });
    }
    
    // Mostrar popup con datos aleatorios
    function showPopup() {
        if (!popup) createPopup();
        
        // Si el usuario ya cerró esta sesión, no mostrar
        if (sessionStorage.getItem('stikmania_rp_closed') === 'true') return;
        
        var purchase = purchases[currentIndex];
        
        document.getElementById('rpAvatar').textContent = purchase.initial;
        document.getElementById('rpName').textContent = purchase.name;
        document.getElementById('rpCity').textContent = purchase.city;
        document.getElementById('rpProduct').textContent = purchase.product;
        document.getElementById('rpTime').textContent = purchase.time;
        
        popup.classList.add('show');
        
        // Auto-ocultar después de 6 segundos
        clearTimeout(timeoutId);
        timeoutId = setTimeout(hidePopup, 6000);
        
        // Siguiente compra
        currentIndex = (currentIndex + 1) % purchases.length;
    }
    
    function hidePopup() {
        if (popup) popup.classList.remove('show');
    }
    
    // Iniciar ciclo
    function startCycle() {
        // Primera aparición a los 5 segundos
        setTimeout(function() {
            showPopup();
            
            // Luego cada 45 segundos
            intervalId = setInterval(showPopup, 45000);
        }, 5000);
    }
    
    // Solo activar si hay body (página cargada)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startCycle);
    } else {
        startCycle();
    }
})();