/* ============================================
   STIKMANIA - Cotizador Unificado (v4)
   Precios base actualizados + Entrega por municipio
   ============================================ */

(function() {
    // Precios de entrega por municipio
    var deliveryPrices = {
        'no': 0,
        'la-lisa': 3,
        'playa': 5,
        'marianao': 5,
        'boyeros': 7,
        'plaza': 7,
        'cerro': 7,
        'centro-habana': 7,
        'habana-vieja': 8,
        'diez-de-octubre': 8,
        'arroyo-naranjo': 8,
        'regla': 10,
        'san-miguel': 10,
        'cotorro': 12,
        'habana-del-este': 12,
        'guanabacoa': 12
    };
    
    // Nombres de municipios para mostrar
    var deliveryNames = {
        'no': '',
        'la-lisa': 'La Lisa',
        'playa': 'Playa',
        'marianao': 'Marianao',
        'boyeros': 'Boyeros',
        'plaza': 'Plaza',
        'cerro': 'Cerro',
        'centro-habana': 'Centro Habana',
        'habana-vieja': 'Habana Vieja',
        'diez-de-octubre': 'Diez de Octubre',
        'arroyo-naranjo': 'Arroyo Naranjo',
        'regla': 'Regla',
        'san-miguel': 'San Miguel del Padrón',
        'cotorro': 'Cotorro',
        'habana-del-este': 'Habana del Este',
        'guanabacoa': 'Guanabacoa'
    };
    
    // Configuración por defecto (Precios base actualizados)
    var defaultConfig = {
        costVinyl: 0.18,        // Actualizado
        costPhoto: 0.12,        // Actualizado
        costTransparent: 0.20,  // Se mantiene
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
    
    // Cargar configuración desde config.json (si existe)
    function loadConfig() {
        fetch('/config.json?v=' + Date.now())
            .then(function(response) {
                if (!response.ok) throw new Error('Config no disponible');
                return response.json();
            })
            .then(function(data) {
                if (data && data.calculator) {
                    config = {
                        costVinyl: data.calculator.costVinyl || 0.18,
                        costPhoto: data.calculator.costPhoto || 0.12,
                        costTransparent: data.calculator.costTransparent || 0.20,
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
        var deliveryEl = document.getElementById('calc-delivery');
        
        if (!qtyEl || !widthEl || !heightEl || !materialEl || !deliveryEl) return;
        
        var qty = parseInt(qtyEl.value) || 10;
        var w = parseFloat(widthEl.value) || 5;
        var h = parseFloat(heightEl.value) || 5;
        var material = materialEl.value;
        var delivery = deliveryEl.value;
        
        // Validaciones
        if (qty < 10) qty = 10;
        if (w < 2) w = 2;
        if (h < 2) h = 2;
        if (w > 30) w = 30;
        if (h > 30) h = 30;
        
        // Precio base según material (ACTUALIZADO)
        var basePrice = 0;
        var matName = '';
        if (material === 'vinyl') {
            basePrice = 0.18; // Nuevo precio
            matName = 'Vinilo Impermeable';
        } else if (material === 'photo') {
            basePrice = 0.12; // Nuevo precio
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
        
        // Descuentos por volumen
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
        
        // Costo de entrega
        var deliveryCost = deliveryPrices[delivery] || 0;
        var deliveryName = deliveryNames[delivery] || '';
        var totalWithDelivery = total + deliveryCost;
        
        // Actualizar interfaz
        var summaryEl = document.getElementById('calc-summary');
        var priceEl = document.getElementById('calc-price');
        var discountEl = document.getElementById('calc-discount');
        var deliveryCostEl = document.getElementById('calc-delivery-cost');
        var resultBox = document.getElementById('calc-result');
        var whatsappBtn = document.getElementById('calc-whatsapp');
        
        if (summaryEl) {
            summaryEl.textContent = qty + ' unidades de ' + w + 'x' + h + ' cm en ' + matName;
        }
        if (priceEl) {
            priceEl.textContent = '$' + totalWithDelivery.toFixed(2) + ' USD';
        }
        if (discountEl) {
            discountEl.textContent = discountText;
            discountEl.style.display = discountText ? 'block' : 'none';
        }
        if (deliveryCostEl) {
            if (deliveryCost > 0) {
                deliveryCostEl.textContent = 'Entrega a domicilio en ' + deliveryName + ': +$' + deliveryCost.toFixed(2) + ' USD';
                deliveryCostEl.style.display = 'block';
            } else {
                deliveryCostEl.textContent = '';
                deliveryCostEl.style.display = 'none';
            }
        }
        
        // Mensaje de WhatsApp
        var msg = '*PEDIDO STIKMANIA*\n\n' +
                  'Cantidad: ' + qty + ' unidades\n' +
                  'Tamaño: ' + w + 'x' + h + ' cm\n' +
                  'Material: ' + matName + '\n' +
                  'Subtotal: $' + total.toFixed(2) + ' USD';
        
        if (discountPercent > 0) {
            msg += '\nDescuento aplicado: ' + discountPercent + '%';
        }
        if (bonus > 0) {
            msg += '\nStickers de regalo: ' + bonus;
        }
        
        if (deliveryCost > 0) {
            msg += '\n\n*Entrega a domicilio*\nMunicipio: ' + deliveryName + '\nCosto de entrega: $' + deliveryCost.toFixed(2) + ' USD\n*Total con entrega: $' + totalWithDelivery.toFixed(2) + ' USD*';
        } else {
            msg += '\n\n*Total: $' + total.toFixed(2) + ' USD*\nEntrega: Recojo en punto acordado';
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
        var inputs = document.querySelectorAll('#calc-qty, #calc-width, #calc-height, #calc-material, #calc-delivery');
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