(function () {
  document.documentElement.classList.add('js');

  // Hide header on scroll-down, show on scroll-up — rAF-throttled, transform-only (GPU, 60fps).
  var header = document.querySelector('.site-header');
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      var hidden = y > lastY && y > 140;
      header.classList.toggle('is-hidden', hidden);
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // Close the mobile nav <details> panel after tapping a link.
  var mobileNav = document.querySelector('.nav-mobile-details');
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileNav.removeAttribute('open'); });
    });
  }

  // ================= CART =================
  var WA_NUMBER = '919560709231';
  var CART_KEY = 'tulipsOvenCart';

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage unavailable, cart just won't persist */ }
  }

  var cart = loadCart();

  function money(n) { return '₹' + n; }

  function cartCount() {
    var n = 0;
    for (var key in cart) n += cart[key].qty;
    return n;
  }
  function cartTotal() {
    var t = 0;
    for (var key in cart) t += cart[key].qty * cart[key].price;
    return t;
  }

  function updateBadges() {
    var count = cartCount();
    document.querySelectorAll('.cart-badge').forEach(function (b) {
      b.textContent = count > 0 ? String(count) : '';
    });
  }

  function renderCart() {
    var list = document.getElementById('cart-items');
    var footer = document.getElementById('cart-footer');
    if (!list) return;
    var names = Object.keys(cart);
    if (names.length === 0) {
      list.innerHTML = '<p class="cart-empty">Your cart is empty. <a href="' + (location.pathname.indexOf('/blog') === 0 ? '/' : '#menu') + '">Browse the menu</a> and add your favourites.</p>';
      if (footer) footer.style.display = 'none';
      return;
    }
    if (footer) footer.style.display = '';
    list.innerHTML = names.map(function (name) {
      var item = cart[name];
      return '' +
        '<div class="cart-row" data-name="' + escapeHtml(name) + '">' +
          '<div class="cart-row-name"><span class="name">' + escapeHtml(name) + '</span><span class="price">' + money(item.price) + ' each</span></div>' +
          '<div class="cart-qty">' +
            '<button type="button" data-cart-action="dec" aria-label="Decrease quantity">−</button>' +
            '<span class="qty-val">' + item.qty + '</span>' +
            '<button type="button" data-cart-action="inc" aria-label="Increase quantity">+</button>' +
          '</div>' +
          '<button type="button" class="cart-row-remove" data-cart-action="remove" aria-label="Remove ' + escapeHtml(name) + '">×</button>' +
        '</div>';
    }).join('');
    var totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = money(cartTotal());
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function addToCart(name, price) {
    if (!cart[name]) cart[name] = { price: price, qty: 0 };
    cart[name].qty += 1;
    saveCart(cart);
    updateBadges();
    renderCart();
  }

  function changeQty(name, delta) {
    if (!cart[name]) return;
    cart[name].qty += delta;
    if (cart[name].qty <= 0) delete cart[name];
    saveCart(cart);
    updateBadges();
    renderCart();
  }

  function removeItem(name) {
    delete cart[name];
    saveCart(cart);
    updateBadges();
    renderCart();
  }

  function clearCart() {
    cart = {};
    saveCart(cart);
    updateBadges();
    renderCart();
  }

  function openCart() {
    var backdrop = document.getElementById('cart-backdrop');
    var drawer = document.getElementById('cart-drawer');
    if (!backdrop || !drawer) return;
    renderCart();
    backdrop.classList.add('is-open');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    var backdrop = document.getElementById('cart-backdrop');
    var drawer = document.getElementById('cart-drawer');
    if (!backdrop || !drawer) return;
    backdrop.classList.remove('is-open');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function buildWhatsAppMessage() {
    var names = Object.keys(cart);
    var lines = ["Hi! I'd like to order:"];
    names.forEach(function (name) {
      var item = cart[name];
      lines.push('- ' + name + ' x' + item.qty + ' - ' + money(item.qty * item.price));
    });
    lines.push('');
    lines.push('Total: ' + money(cartTotal()));
    return lines.join('\n');
  }

  // Add-to-cart buttons (event delegation — works for any number of items).
  document.addEventListener('click', function (e) {
    var addBtn = e.target.closest('[data-add-to-cart]');
    if (addBtn) {
      var name = addBtn.getAttribute('data-name');
      var price = parseFloat(addBtn.getAttribute('data-price'));
      addToCart(name, price);
      addBtn.classList.add('is-added');
      var label = addBtn.textContent;
      addBtn.textContent = 'Added ✓';
      setTimeout(function () {
        addBtn.classList.remove('is-added');
        addBtn.textContent = label;
      }, 1100);
      return;
    }

    if (e.target.closest('[data-cart-open]')) { openCart(); return; }
    if (e.target.closest('[data-cart-close]')) { closeCart(); return; }
    if (e.target.id === 'cart-backdrop') { closeCart(); return; }

    var qtyBtn = e.target.closest('[data-cart-action]');
    if (qtyBtn) {
      var row = qtyBtn.closest('.cart-row');
      var itemName = row.getAttribute('data-name');
      var action = qtyBtn.getAttribute('data-cart-action');
      if (action === 'inc') changeQty(itemName, 1);
      else if (action === 'dec') changeQty(itemName, -1);
      else if (action === 'remove') removeItem(itemName);
      return;
    }

    if (e.target.closest('[data-cart-clear]')) { clearCart(); return; }

    if (e.target.closest('[data-cart-checkout]')) {
      if (Object.keys(cart).length === 0) return;
      var msg = buildWhatsAppMessage();
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      return;
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCart();
  });

  updateBadges();
})();
