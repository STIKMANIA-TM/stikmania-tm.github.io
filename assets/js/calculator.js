/* ============================================
   STIKMANIA - Cotizador Unificado (v2)
   Sin emojis | Mensaje limpio
   ============================================ */

(function() {
    // Configuración por defecto (fallback si falla config.json)
    var defaultConfig = {
        costVinyl: 2.00,
        costPhoto: 1.20,
        costTransparent: 2.50,
        formatVinyl: 'a4',
        formatPhoto: 'a4',
        cutMargin: 0.5,
        sheetMargin: 1,
        bonusSmall: 3,
        bonusMedium: 5,
        discVinyl: 1.00,
        discPhoto: 0.50
    };
    
    var config = defaultConfig;
    
    // Cargar configuración desde config.json
    function loadConfig() {
        fetch('/config.json?v=' + Date.now())
            .then(function(response) {
                if (!response.ok) throw new Error('Config no disponible');
                return response.json();
            })
            .then(function(data) {
                if (data && data.calculator) {
                    config = {
                        costVinyl: data.calculator.costVinyl || 2.00,
                        costPhoto: data.calculator.costPhoto || 1.20,
                        costTransparent: data.calculator.costTransparent || 2.50,
                        formatVinyl: data.calculator.formatVinyl || 'a4',
                        formatPhoto: data.calculator.formatPhoto || 'a4',
                        cutMargin: data.calculator.cutMargin || 0.5,
                        sheetMargin: data.calculator.sheetMargin || 1,
                        bonusSmall: data.calculator.bonusSmall || 3,
                        bonusMedium: data.calculator.bonusMedium || 5,
                        discVinyl: data.calculator.discVinyl || 1.00,
                        discPhoto: data.calculator.discPhoto || 0.50
                    };
                    console.log('Configuración cargada desde config.json');
                }
            })
            .catch(function(error) {
                console.log('Usando configuración por defecto:', error.message);
            });
    }
    
    // Cálculo principal
    function calculate() {
        var qtyEl = document.getElementById('calc-qty');
        var widthEl = document.getElementById('calc-width');
        var heightEl = document.getElementById('calc-height');
        var materialEl = document.getElementById('calc-material');
        
        if (!qtyEl || !widthEl || !heightEl || !materialEl) return;
        
        var qty = parseInt(qtyEl.value) || 10;
        var w = parseFloat(widthEl.value) || 5;
        var h = parseFloat(heightEl.value) || 5;
        var material = materialEl.value;
        
        // Validaciones
        if (qty < 10) qty = 10;
        if (w < 2) w = 2;
        if (h < 2) h = 2;
        if (w > 30) w = 30;
        if (h > 30) h = 30;
        
        // Precio base según material
        var basePrice = 0;
        var matName = '';
        if (material === 'vinyl') {
            basePrice = 0.15;
            matName = 'Vinilo Impermeable';
        } else if (material === 'photo') {
            basePrice = 0.10;
            matName = 'Papel Fotográfico';
        } else if (material === 'transparent') {
            basePrice = 0.20;
            matName = 'Vinilo Transparente';
        }
        
        // Factor de tamaño
        var area = w * h;
        var sizeMultiplier = 1;
        if (area > 25) sizeMultiplier = 1.5;
        if (area > 50) sizeMultiplier = 2.0;
        if (area > 100) sizeMultiplier = 2.8;
        
        var total = qty * basePrice * sizeMultiplier;
        
        // Descuentos por volumen (sin emojis)
        var discountText = '';
        var discountPercent = 0;
        if (qty >= 500) {
            discountPercent = 20;
            total = total * 0.80;
            discountText = 'Descuento del 20% aplicado por volumen mayorista';
        } else if (qty >= 200) {
            discountPercent = 10;
            total = total * 0.90;
            discountText = 'Descuento del 10% aplicado';
        } else if (qty >= 100) {
            discountPercent = 5;
            total = total * 0.95;
            discountText = 'Descuento del 5% aplicado';
        }
        
        // Stickers de regalo
        var bonus = 0;
        if (qty >= 100) {
            bonus = Math.floor(qty * 0.1);
            discountText += (discountText ? ' | ' : '') + '+' + bonus + ' stickers de regalo';
        }
        
        // Actualizar interfaz
        var summaryEl = document.getElementById('calc-summary');
        var priceEl = document.getElementById('calc-price');
        var discountEl = document.getElementById('calc-discount');
        var resultBox = document.getElementById('calc-result');
        var whatsappBtn = document.getElementById('calc-whatsapp');
        
        if (summaryEl) {
            summaryEl.textContent = qty + ' unidades de ' + w + 'x' + h + ' cm en ' + matName;
        }
        if (priceEl) {
            priceEl.textContent = '$' + total.toFixed(2) + ' USD';
        }
        if (discountEl) {
            discountEl.textContent = discountText;
            discountEl.style.display = discountText ? 'block' : 'none';
        }
        
        // Mensaje de WhatsApp SIN última oración y SIN emojis
        var msg = '*PEDIDO STIKMANIA*\n\n' +
                  'Cantidad: ' + qty + ' unidades\n' +
                  'Tamaño: ' + w + 'x' + h + ' cm\n' +
                  'Material: ' + matName + '\n' +
                  'Presupuesto: $' + total.toFixed(2) + ' USD';
        
        if (discountPercent > 0) {
            msg += '\nDescuento aplicado: ' + discountPercent + '%';
        }
        if (bonus > 0) {
            msg += '\nStickers de regalo: ' + bonus;
        }
        
        if (whatsappBtn) {
            whatsappBtn.href = 'https://wa.me/5359758756?text=' + encodeURIComponent(msg);
        }
        
        // Mostrar resultado
        if (resultBox) {
            resultBox.classList.add('show');
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // Inicializar
    function init() {
        loadConfig();
        
        var calculateBtn = document.getElementById('calc-submit');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', calculate);
        }
        
        // Recalcular automáticamente si ya hay resultado visible
        var inputs = document.querySelectorAll('#calc-qty, #calc-width, #calc-height, #calc-material');
        inputs.forEach(function(input) {
            input.addEventListener('change', function() {
                var resultBox = document.getElementById('calc-result');
                if (resultBox && resultBox.classList.contains('show')) {
                    calculate();
                }
            });
        });
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();