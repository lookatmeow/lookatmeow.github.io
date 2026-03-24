const LIGHTNING_ADDRESS = 'lookatme@getalby.com';
const COP_PER_USD = 3850;
const USERS_STORAGE_KEY = 'lookatme_users_v1';
const SESSION_STORAGE_KEY = 'lookatme_session_email_v1';
const CURRENT_PAGE = window.location.pathname.split('/').pop()?.toLowerCase() || 'index.html';
function isLoginPage() {
    return CURRENT_PAGE === 'login.html';
}
function isProfilePage() {
    return CURRENT_PAGE === 'profile.html';
}
const products = [
    {
        id: 1,
        name: { en: 'Classic Aviator', es: 'Aviador Clasico' },
        brand: 'Ray-Ban',
        category: 'prescription',
        price: 350000,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
        description: { en: 'Iconic design with prescription lenses', es: 'Diseno iconico con lentes de formula' }
    },
    {
        id: 2,
        name: { en: 'Wayfarer Black', es: 'Wayfarer Negro' },
        brand: 'Ray-Ban',
        category: 'sunglasses',
        price: 420000,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
        description: { en: 'Classic aviator sunglasses', es: 'Gafas de sol aviador clasicas' }
    },
    {
        id: 3,
        name: { en: 'Modern Round', es: 'Redondo Moderno' },
        brand: 'LookatMe',
        category: 'prescription',
        price: 280000,
        image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
        description: { en: 'Trendy round frames for any prescription', es: 'Monturas redondas modernas para cualquier formula' }
    },
    {
        id: 4,
        name: { en: 'Sport Pro', es: 'Sport Pro' },
        brand: 'Oakley',
        category: 'sunglasses',
        price: 480000,
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop',
        description: { en: 'High-performance sports sunglasses', es: 'Gafas de sol deportivas de alto rendimiento' }
    },
    {
        id: 5,
        name: { en: 'Executive Rectangular', es: 'Ejecutivo Rectangular' },
        brand: 'LookatMe',
        category: 'prescription',
        price: 320000,
        image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop',
        description: { en: 'Professional look with blue light filter', es: 'Look profesional con filtro de luz azul' }
    },
    {
        id: 6,
        name: { en: 'Retro Cat Eye', es: 'Cat Eye Retro' },
        brand: 'Ray-Ban',
        category: 'sunglasses',
        price: 390000,
        image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=400&fit=crop',
        description: { en: 'Vintage-inspired cat eye sunglasses', es: 'Gafas de sol cat eye estilo vintage' }
    },
    {
        id: 7,
        name: { en: 'Welding Shield', es: 'Gafas para Soldadura ' },
        brand: 'LookatMe Safety',
        category: 'specialized',
        price: 520000,
        image: './assets/images/welder-using-s__11018.png',
        description: { en: 'Shade 5-8 filters for welding, foundry, and high-heat tasks', es: 'Filtros tono 5-8 para soldadura, fundicion y trabajos de alta temperatura' }
    },
    {
        id: 8,
        name: { en: 'Torch & Glass-Blowing', es: 'Fundicion y Soplado de Vidrio' },
        brand: 'LookatMe Safety',
        category: 'specialized',
        price: 560000,
        image: './assets/images/glassblowing.png',
        description: { en: 'Didymium-style lenses to cut sodium flare and heat for torch work', es: 'Lentes tipo didimio que reducen destellos de sodio y calor en trabajo con soplete' }
    },
    {
        id: 11,
        name: { en: 'Laser Protection L3', es: 'Laboratorios Laser L3' },
        brand: 'LookatMe Pro',
        category: 'specialized',
        price: 690000,
        image: './assets/images/laser.jpg',
        description: { en: 'OD-rated filters for lab lasers and medical devices', es: 'Filtros con densidad optica para laseres de laboratorio y equipos medicos' }
    }
];
const productSlides = {
    1: [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
        './assets/images/aviatormodel1.jpeg'
    ],
    2: [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
        './assets/images/warfarermodel1.jpeg'
    ],
    3: [
        'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
        './assets/images/waifarerprint1.jpeg'
    ],
    4: [
        'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop',
        './assets/images/eyecatmodel1.jpeg'
    ]
};
const state = {
    currentLang: 'es',
    cart: [],
    quotePriceCop: 250000,
    currentUser: null,
    authMode: 'register',
    accountTab: 'personal'
};
document.addEventListener('DOMContentLoaded', () => {
    bindUI();
    initTheme();
    renderProducts('all');
    initAccount();
    updateLanguage();
    calculateQuote();
});
function bindUI() {
    qs('#themeToggle')?.addEventListener('click', toggleTheme);
    qs('#langToggle')?.addEventListener('click', toggleLanguage);
    qs('#cartBtn')?.addEventListener('click', openCart);
    const quoteInputs = ['od_sph', 'od_cyl', 'od_axis', 'od_add', 'os_sph', 'os_cyl', 'os_axis', 'os_add', 'material', 'filter', 'frameStyle', 'antireflex', 'blueLight', 'scratch'];
    quoteInputs.forEach((id) => {
        const el = document.getElementById(id);
        el?.addEventListener('change', calculateQuote);
        el?.addEventListener('input', calculateQuote);
    });
    qsa('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            qsa('.filter-btn').forEach((b) => b.classList.remove('active', 'bg-primary-500', 'text-white'));
            btn.classList.add('active', 'bg-primary-500', 'text-white');
            renderProducts(btn.dataset.filter);
        });
    });
    qsa('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href') || '');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    qs('#authForm')?.addEventListener('submit', handleAuthSubmit);
    qs('#authModeToggle')?.addEventListener('click', toggleAuthMode);
    qs('#accountLogoutBtn')?.addEventListener('click', logout);
    qsa('.account-tab-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.accountTab;
            if (!tab)
                return;
            setAccountTab(tab);
        });
    });
    qs('#personalInfoForm')?.addEventListener('submit', handlePersonalInfoSave);
    qs('#securityForm')?.addEventListener('submit', handlePasswordChange);
    qs('#prefsForm')?.addEventListener('submit', handlePreferencesSave);
}
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem('theme');
    const shouldUseDark = stored === 'dark' || (!stored && prefersDark);
    if (shouldUseDark) {
        document.documentElement.classList.add('dark');
    }
}
function initAccount() {
    const activeEmail = localStorage.getItem(SESSION_STORAGE_KEY);
    if (activeEmail) {
        const users = readUsers();
        const user = users[activeEmail.toLowerCase()];
        if (user) {
            state.currentUser = user;
        }
    }
    if (isProfilePage() && !state.currentUser) {
        window.location.href = './login.html';
        return;
    }
    if (isLoginPage() && state.currentUser) {
        window.location.href = './profile.html';
        return;
    }
    renderAuthMode();
    renderAccountUI();
}
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const mode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
}
function toggleLanguage() {
    state.currentLang = state.currentLang === 'en' ? 'es' : 'en';
    updateLanguage();
    calculateQuote();
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter;
    renderProducts(activeFilter || 'all');
    updateCartUI();
    renderAccountUI();
}
function updateLanguage() {
    document.documentElement.lang = state.currentLang;
    const langToggle = qs('#langToggle');
    if (langToggle) {
        langToggle.textContent = state.currentLang === 'es' ? 'ES / EN' : 'EN / ES';
    }
    document.querySelectorAll('[data-en]').forEach((el) => {
        const element = el;
        const value = element.dataset[state.currentLang];
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
            el.placeholder = value || el.placeholder;
        }
        else if (el instanceof HTMLOptionElement) {
            el.textContent = value || el.textContent;
        }
        else {
            el.textContent = value || el.textContent;
        }
    });
    document.querySelectorAll('[data-lang-only]').forEach((el) => {
        const lang = el.dataset.langOnly;
        el.classList.toggle('hidden', lang !== state.currentLang);
    });
}
function renderProducts(filter) {
    const grid = qs('#productGrid');
    if (!grid)
        return;
    const filtered = filter === 'all' ? products : products.filter((p) => p.category === filter);
    grid.innerHTML = filtered
        .map((product) => {
        const numericId = typeof product.id === 'number' ? product.id : Number(product.id);
        const slides = Number.isFinite(numericId) ? (productSlides[numericId] ?? [product.image]) : [product.image];
        const hasSlides = slides.length > 1;
        const slideImgs = slides
            .map((src, idx) => `<img src="${src}" alt="${product.name[state.currentLang]}" class="product-slide w-full h-full object-cover${idx === 0 ? ' active' : ''}" loading="lazy">`)
            .join('');
        const dots = hasSlides
            ? `<div class="product-dots">${slides.map((_, idx) => `<button class="product-dot${idx === 0 ? ' active' : ''}" data-slide="${idx}" aria-label="Image ${idx + 1}"></button>`).join('')}</div>`
            : '';
        const edges = hasSlides
            ? `<div class="product-edge product-edge-left" data-edge="prev" aria-label="Prev"><span class="product-edge-icon"><i class="fas fa-chevron-left"></i></span></div><div class="product-edge product-edge-right" data-edge="next" aria-label="Next"><span class="product-edge-icon"><i class="fas fa-chevron-right"></i></span></div>`
            : '';
        return `
        <div class="glass-card rounded-2xl overflow-hidden smooth-transition hover-lift">
          <div class="relative overflow-hidden h-64 product-slider-wrap">
            <div class="product-slider">${slideImgs}</div>
            <div class="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
              ${product.brand}
            </div>
            ${edges}
            ${dots}
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">${product.name[state.currentLang]}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">${product.description[state.currentLang]}</p>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-primary-500">${formatDisplayPrice(product.price)}</span>
              <button class="px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg text-white smooth-transition hover:scale-105" data-add-to-cart="${product.id}">
                <i class="fas fa-cart-plus mr-1"></i>
                ${state.currentLang === 'en' ? 'Add' : 'Agregar'}
              </button>
            </div>
          </div>
        </div>
      `;
    })
        .join('');
    grid.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.addToCart);
            addToCart(id);
        });
    });
    initProductSliders();
}
function initProductSliders() {
    document.querySelectorAll('.product-slider-wrap').forEach((wrap) => {
        const slides = wrap.querySelectorAll('.product-slide');
        const dots = wrap.querySelectorAll('.product-dot');
        let current = 0;
        const goTo = (idx) => {
            if (slides.length === 0)
                return;
            current = (idx + slides.length) % slides.length;
            slides.forEach((slide) => slide.classList.remove('active'));
            dots.forEach((dot) => dot.classList.remove('active'));
            slides[current]?.classList.add('active');
            dots[current]?.classList.add('active');
        };
        dots.forEach((dot, idx) => dot.addEventListener('click', () => goTo(idx)));
        wrap.querySelectorAll('[data-edge]').forEach((edge) => {
            edge.addEventListener('click', () => {
                goTo(edge.dataset.edge === 'prev' ? current - 1 : current + 1);
            });
        });
    });
}
function calculateQuote() {
    let basePrice = 150000;
    const material = (qs('#material')?.value || 'policarbonato');
    const materialPrices = {
        policarbonato: 50000,
        polimero: 30000,
        silica: 40000,
        tallados: 70000
    };
    basePrice += materialPrices[material] || 0;
    const filter = (qs('#filter')?.value || 'none');
    const filterPrices = {
        solar: 30000,
        'blue-light': 40000,
        transition: 80000,
        'tinted-transition': 100000,
        especiales: 120000
    };
    basePrice += filterPrices[filter] || 0;
    if (qs('#antireflex')?.checked)
        basePrice += 35000;
    if (qs('#blueLight')?.checked)
        basePrice += 40000;
    if (qs('#scratch')?.checked)
        basePrice += 25000;
    const hasRx = ['od_sph', 'od_cyl', 'os_sph', 'os_cyl'].some((id) => {
        const value = qs(`#${id}`)?.value;
        return value !== undefined && value !== '';
    });
    if (hasRx)
        basePrice += 50000;
    state.quotePriceCop = basePrice;
    const priceElement = qs('#quotedPrice');
    if (priceElement)
        priceElement.textContent = formatDisplayPrice(basePrice);
}
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product)
        return;
    state.cart.push({ ...product, quantity: 1 });
    updateCartUI();
    showNotification(state.currentLang === 'en' ? 'Added to cart!' : 'Agregado al carrito!');
}
function addQuoteToCart() {
    const price = state.quotePriceCop;
    const material = qs('#material')?.value || 'policarbonato';
    const filter = qs('#filter')?.value || 'none';
    const frameStyle = qs('#frameStyle')?.value || 'wayfarer';
    const customItem = {
        id: `custom-${Date.now()}`,
        name: { en: `Custom Prescription - ${frameStyle}`, es: `Formula Personalizada - ${frameStyle}` },
        brand: 'LookatMe Custom',
        category: 'prescription',
        price,
        image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
        description: { en: `Material: ${material}, Filter: ${filter}`, es: `Material: ${material}, Filtro: ${filter}` },
        quantity: 1
    };
    state.cart.push(customItem);
    updateCartUI();
    showNotification(state.currentLang === 'en' ? 'Custom quote added to cart!' : 'Cotizacion personalizada agregada!');
}
function removeFromCart(index) {
    state.cart.splice(index, 1);
    updateCartUI();
}
function getCartTotal() {
    return state.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
}
function updateCartUI() {
    const cartCount = qs('#cartCount');
    const totalElement = qs('#cartTotal');
    const cartItems = qs('#cartItems');
    const total = getCartTotal();
    if (cartCount) {
        if (state.cart.length > 0) {
            cartCount.textContent = state.cart.length.toString();
            cartCount.classList.remove('hidden');
        }
        else {
            cartCount.classList.add('hidden');
        }
    }
    if (totalElement)
        totalElement.textContent = formatDisplayPrice(total);
    if (!cartItems)
        return;
    if (state.cart.length === 0) {
        cartItems.innerHTML = `
      <div class="text-center py-12 text-gray-500">
        <i class="fas fa-shopping-cart text-6xl mb-4 opacity-50"></i>
        <p>${state.currentLang === 'en' ? 'Your cart is empty' : 'Tu carrito esta vacio'}</p>
      </div>
    `;
        return;
    }
    cartItems.innerHTML = state.cart
        .map((item, index) => `
        <div class="flex items-center space-x-4 glass-card p-4 rounded-xl">
          <img src="${item.image}" alt="${item.name[state.currentLang]}" class="w-20 h-20 object-cover rounded-lg">
          <div class="flex-1">
            <h4 class="font-semibold">${item.name[state.currentLang]}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">${item.brand}</p>
            <p class="text-primary-500 font-semibold">${formatDisplayPrice(item.price)}</p>
          </div>
          <button class="text-red-500 hover:text-red-700 smooth-transition" data-remove-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `)
        .join('');
    cartItems.querySelectorAll('[data-remove-index]').forEach((btn) => {
        const idx = Number(btn.dataset.removeIndex);
        btn.addEventListener('click', () => removeFromCart(idx));
    });
}
function openCart() {
    const modal = qs('#cartModal');
    modal?.classList.remove('hidden');
    modal?.classList.add('flex');
}
function closeCart() {
    const modal = qs('#cartModal');
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
}
function openPaymentModal() {
    if (state.cart.length === 0) {
        showNotification(state.currentLang === 'en' ? 'Your cart is empty!' : 'Tu carrito esta vacio!');
        return;
    }
    closeCart();
    const modal = qs('#paymentModal');
    modal?.classList.remove('hidden');
    modal?.classList.add('flex');
}
function closePayment() {
    const modal = qs('#paymentModal');
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
}
async function selectPayment(method) {
    const messages = {
        payu: { en: 'Redirecting to PayU...', es: 'Redirigiendo a PayU...' },
        pse: { en: 'Redirecting to PSE...', es: 'Redirigiendo a PSE...' },
        metamask: { en: 'Connecting to MetaMask...', es: 'Conectando a MetaMask...' },
        lightning: { en: 'Generating Lightning invoice...', es: 'Generando factura Lightning...' }
    };
    showNotification(messages[method][state.currentLang]);
    try {
        if (method === 'metamask') {
            await handleMetaMaskPayment();
        }
        else if (method === 'lightning') {
            await handleLightningPayment();
        }
        else {
            showNotification(state.currentLang === 'en' ? 'Payment processing...' : 'Procesando pago...');
        }
        finalizeCheckout();
        closePayment();
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to process payment.';
        showNotification(message);
    }
}
async function handleMetaMaskPayment() {
    const provider = window.ethereum;
    if (!provider) {
        throw new Error(state.currentLang === 'en' ? 'MetaMask not detected.' : 'MetaMask no esta disponible.');
    }
    const accounts = (await provider.request({ method: 'eth_requestAccounts' }));
    const account = accounts[0];
    if (!account)
        throw new Error('No account found.');
    const chainId = (await provider.request({ method: 'eth_chainId' }));
    const total = getCartTotal();
    const message = `LookatMe purchase of ${formatCop(total)} COP`;
    try {
        await provider.request({ method: 'personal_sign', params: [message, account] });
    }
    catch (err) {
        console.warn('Signature skipped', err);
    }
    showNotification(`MetaMask: ${shorten(account)} on chain ${chainId}`);
}
async function handleLightningPayment() {
    const total = getCartTotal();
    if (total <= 0)
        throw new Error('Cart is empty.');
    const sats = await convertCopToSats(total);
    if (!sats)
        throw new Error(state.currentLang === 'en' ? 'Unable to fetch BTC price.' : 'No se pudo obtener el precio de BTC.');
    const webln = window.webln;
    if (webln) {
        await webln.enable();
        const invoice = await webln.makeInvoice({ amount: sats, defaultMemo: 'LookatMe Order' });
        const paymentRequest = invoice.paymentRequest || invoice.pr;
        if (paymentRequest) {
            await copyToClipboard(paymentRequest);
            showNotification(state.currentLang === 'en' ? 'Invoice copied to clipboard.' : 'Factura copiada al portapapeles.');
            if (webln.sendPayment)
                await webln.sendPayment(paymentRequest);
        }
        else {
            showNotification(state.currentLang === 'en' ? 'Invoice generated in your wallet.' : 'Factura generada en tu wallet.');
        }
    }
    else {
        const lightningUrl = `lightning:${LIGHTNING_ADDRESS}`;
        await copyToClipboard(lightningUrl);
        showNotification(state.currentLang === 'en' ? 'Lightning address copied. Pay from your wallet.' : 'Direccion Lightning copiada. Paga desde tu wallet.');
    }
}
function finalizeCheckout() {
    if (state.cart.length === 0)
        return;
    const total = getCartTotal();
    if (state.currentUser) {
        const order = {
            id: `ORD-${Date.now().toString().slice(-6)}`,
            date: new Date().toISOString(),
            total,
            status: 'pending',
            items: state.cart.map((item) => item.name[state.currentLang])
        };
        state.currentUser.pendingOrders.unshift(order);
        persistCurrentUser();
        renderAccountUI();
        showNotification(state.currentLang === 'en' ? 'Order saved in your pending orders.' : 'Pedido guardado en tus pedidos pendientes.');
    }
    else {
        showNotification(state.currentLang === 'en' ? 'Sign in to save this order in your history.' : 'Inicia sesion para guardar este pedido en tu historial.');
    }
    state.cart = [];
    updateCartUI();
}
async function convertCopToSats(copAmount) {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cop');
        if (!response.ok)
            return null;
        const data = (await response.json());
        const btcPriceCop = data.bitcoin?.cop;
        if (!btcPriceCop)
            return null;
        const btcAmount = copAmount / btcPriceCop;
        return Math.max(1, Math.round(btcAmount * 100000000));
    }
    catch (error) {
        console.error('Price fetch failed', error);
        return null;
    }
}
function toggleAuthMode() {
    state.authMode = state.authMode === 'register' ? 'login' : 'register';
    renderAuthMode();
}
function renderAuthMode() {
    const title = qs('#authTitle');
    const toggle = qs('#authModeToggle');
    const submit = qs('#authSubmitBtn span');
    const nameWrap = qs('#authNameWrap');
    const confirmWrap = qs('#authConfirmWrap');
    const newsletterWrap = qs('#authNewsletterWrap');
    const register = state.authMode === 'register';
    if (title) {
        title.textContent = register
            ? (state.currentLang === 'en' ? 'Create account' : 'Crear cuenta')
            : (state.currentLang === 'en' ? 'Sign in' : 'Iniciar sesion');
    }
    if (toggle) {
        toggle.textContent = register
            ? (state.currentLang === 'en' ? 'Already have account? Sign in' : 'Ya tienes cuenta? Inicia sesion')
            : (state.currentLang === 'en' ? 'Need account? Create one' : 'Necesitas cuenta? Crea una');
    }
    if (submit) {
        submit.textContent = register
            ? (state.currentLang === 'en' ? 'Create my account' : 'Crear mi cuenta')
            : (state.currentLang === 'en' ? 'Sign in with email' : 'Iniciar con correo');
    }
    nameWrap?.classList.toggle('hidden', !register);
    confirmWrap?.classList.toggle('hidden', !register);
    newsletterWrap?.classList.toggle('hidden', !register);
}
async function handleAuthSubmit(event) {
    event.preventDefault();
    const name = qs('#authName')?.value.trim() || '';
    const emailRaw = qs('#authEmail')?.value.trim() || '';
    const email = emailRaw.toLowerCase();
    const password = qs('#authPassword')?.value || '';
    const confirmPassword = qs('#authConfirmPassword')?.value || '';
    const newsletter = qs('#authNewsletter')?.checked || false;
    if (!isValidEmail(email)) {
        showNotification(state.currentLang === 'en' ? 'Please enter a valid email address.' : 'Ingresa un correo valido.');
        return;
    }
    const users = readUsers();
    if (state.authMode === 'register') {
        if (!name) {
            showNotification(state.currentLang === 'en' ? 'Please enter your full name.' : 'Ingresa tu nombre completo.');
            return;
        }
        if (password.length < 8) {
            showNotification(state.currentLang === 'en' ? 'Password must be at least 8 characters.' : 'La contrasena debe tener minimo 8 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            showNotification(state.currentLang === 'en' ? 'Passwords do not match.' : 'Las contrasenas no coinciden.');
            return;
        }
        if (users[email]) {
            showNotification(state.currentLang === 'en' ? 'An account with this email already exists.' : 'Ya existe una cuenta con este correo.');
            return;
        }
        const user = {
            email,
            password,
            profile: {
                fullName: name,
                phone: '',
                address: '',
                city: 'Bogota',
                country: 'Colombia'
            },
            newsletter,
            orderUpdates: true,
            pendingOrders: getSeedPendingOrders(),
            purchaseHistory: getSeedPurchaseHistory()
        };
        users[email] = user;
        writeUsers(users);
        localStorage.setItem(SESSION_STORAGE_KEY, email);
        state.currentUser = user;
        showNotification(state.currentLang === 'en' ? 'Account created successfully.' : 'Cuenta creada con exito.');
    }
    else {
        const existing = users[email];
        if (!existing || existing.password !== password) {
            showNotification(state.currentLang === 'en' ? 'Invalid email or password.' : 'Correo o contrasena invalidos.');
            return;
        }
        state.currentUser = existing;
        localStorage.setItem(SESSION_STORAGE_KEY, email);
        showNotification(state.currentLang === 'en' ? 'Welcome back!' : 'Bienvenido de nuevo!');
    }
    clearAuthForm();
    renderAccountUI();
    if (state.currentUser) {
        window.location.href = './profile.html';
    }
}
function logout() {
    state.currentUser = null;
    localStorage.removeItem(SESSION_STORAGE_KEY);
    renderAccountUI();
    showNotification(state.currentLang === 'en' ? 'Signed out.' : 'Sesion cerrada.');
    if (isProfilePage()) {
        window.location.href = './login.html';
    }
}
function renderAccountUI() {
    const guestPanel = qs('#authGuestPanel');
    const dashboard = qs('#accountDashboard');
    renderAuthMode();
    if (!state.currentUser) {
        guestPanel?.classList.remove('hidden');
        dashboard?.classList.add('hidden');
        return;
    }
    guestPanel?.classList.add('hidden');
    dashboard?.classList.remove('hidden');
    const greeting = qs('#accountGreeting');
    const email = qs('#accountEmail');
    if (greeting)
        greeting.textContent = state.currentUser.profile.fullName || 'LookatMe User';
    if (email)
        email.textContent = state.currentUser.email;
    fillProfileForm();
    fillPreferencesForm();
    renderOrders();
    setAccountTab(state.accountTab);
}
function setAccountTab(tab) {
    state.accountTab = tab;
    qsa('.account-tab-btn').forEach((btn) => {
        const active = btn.dataset.accountTab === tab;
        btn.classList.toggle('bg-primary-500', active);
        btn.classList.toggle('text-white', active);
    });
    qsa('.account-tab-panel').forEach((panel) => {
        panel.classList.add('hidden');
    });
    qs(`#accountTab-${tab}`)?.classList.remove('hidden');
}
function fillProfileForm() {
    if (!state.currentUser)
        return;
    setInputValue('#profileName', state.currentUser.profile.fullName);
    setInputValue('#profilePhone', state.currentUser.profile.phone);
    setInputValue('#profileAddress', state.currentUser.profile.address);
    setInputValue('#profileCity', state.currentUser.profile.city);
    setInputValue('#profileCountry', state.currentUser.profile.country);
}
function fillPreferencesForm() {
    if (!state.currentUser)
        return;
    const newsletter = qs('#newsletterOptIn');
    const updates = qs('#orderUpdatesOptIn');
    if (newsletter)
        newsletter.checked = state.currentUser.newsletter;
    if (updates)
        updates.checked = state.currentUser.orderUpdates;
}
function renderOrders() {
    if (!state.currentUser)
        return;
    const pendingContainer = qs('#pendingOrdersList');
    const historyContainer = qs('#orderHistoryList');
    if (pendingContainer) {
        pendingContainer.innerHTML = renderOrderCards(state.currentUser.pendingOrders, state.currentLang === 'en' ? 'No pending orders yet.' : 'No tienes pedidos pendientes.');
    }
    if (historyContainer) {
        historyContainer.innerHTML = renderOrderCards(state.currentUser.purchaseHistory, state.currentLang === 'en' ? 'No purchases yet.' : 'Aun no tienes compras registradas.');
    }
}
function renderOrderCards(orders, emptyText) {
    if (orders.length === 0) {
        return `
      <div class="glass-card rounded-2xl p-8 text-center text-gray-600 dark:text-gray-400">
        <i class="fas fa-box-open text-3xl mb-3 text-primary-500"></i>
        <p>${emptyText}</p>
      </div>
    `;
    }
    return orders
        .map((order) => {
        const badge = getStatusBadge(order.status);
        const date = new Date(order.date).toLocaleDateString(state.currentLang === 'en' ? 'en-US' : 'es-CO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        return `
        <article class="glass-card rounded-2xl p-5">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <div>
              <h4 class="text-lg font-semibold">${order.id}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">${date}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 rounded-full text-xs font-semibold ${badge.className}">${badge.label}</span>
              <strong class="text-primary-500">${formatDisplayPrice(order.total)}</strong>
            </div>
          </div>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            ${order.items.map((item) => `<li><i class="fas fa-circle text-[8px] mr-2 text-primary-500 align-middle"></i>${item}</li>`).join('')}
          </ul>
        </article>
      `;
    })
        .join('');
}
function getStatusBadge(status) {
    const labels = {
        pending: { en: 'Pending', es: 'Pendiente' },
        processing: { en: 'Processing', es: 'Procesando' },
        shipped: { en: 'Shipped', es: 'Enviado' },
        delivered: { en: 'Delivered', es: 'Entregado' }
    };
    const classes = {
        pending: 'bg-yellow-500/20 text-yellow-300',
        processing: 'bg-blue-500/20 text-blue-300',
        shipped: 'bg-purple-500/20 text-purple-300',
        delivered: 'bg-green-500/20 text-green-300'
    };
    return {
        label: labels[status][state.currentLang],
        className: classes[status]
    };
}
function handlePersonalInfoSave(event) {
    event.preventDefault();
    if (!state.currentUser)
        return;
    const fullName = qs('#profileName')?.value.trim() || '';
    const phone = qs('#profilePhone')?.value.trim() || '';
    const address = qs('#profileAddress')?.value.trim() || '';
    const city = qs('#profileCity')?.value.trim() || '';
    const country = qs('#profileCountry')?.value.trim() || '';
    if (!fullName) {
        showNotification(state.currentLang === 'en' ? 'Full name is required.' : 'El nombre completo es obligatorio.');
        return;
    }
    state.currentUser.profile = { fullName, phone, address, city, country };
    persistCurrentUser();
    renderAccountUI();
    showNotification(state.currentLang === 'en' ? 'Personal info updated.' : 'Datos personales actualizados.');
}
function handlePasswordChange(event) {
    event.preventDefault();
    if (!state.currentUser)
        return;
    const currentPassword = qs('#currentPassword')?.value || '';
    const newPassword = qs('#newPassword')?.value || '';
    const confirmPassword = qs('#confirmNewPassword')?.value || '';
    if (currentPassword !== state.currentUser.password) {
        showNotification(state.currentLang === 'en' ? 'Current password is incorrect.' : 'La contrasena actual es incorrecta.');
        return;
    }
    if (newPassword.length < 8) {
        showNotification(state.currentLang === 'en' ? 'New password must be at least 8 characters.' : 'La nueva contrasena debe tener minimo 8 caracteres.');
        return;
    }
    if (newPassword !== confirmPassword) {
        showNotification(state.currentLang === 'en' ? 'New passwords do not match.' : 'Las nuevas contrasenas no coinciden.');
        return;
    }
    state.currentUser.password = newPassword;
    persistCurrentUser();
    setInputValue('#currentPassword', '');
    setInputValue('#newPassword', '');
    setInputValue('#confirmNewPassword', '');
    showNotification(state.currentLang === 'en' ? 'Password updated successfully.' : 'Contrasena actualizada con exito.');
}
function handlePreferencesSave(event) {
    event.preventDefault();
    if (!state.currentUser)
        return;
    state.currentUser.newsletter = qs('#newsletterOptIn')?.checked || false;
    state.currentUser.orderUpdates = qs('#orderUpdatesOptIn')?.checked || false;
    persistCurrentUser();
    showNotification(state.currentLang === 'en' ? 'Preferences saved.' : 'Preferencias guardadas.');
}
function clearAuthForm() {
    setInputValue('#authName', '');
    setInputValue('#authEmail', '');
    setInputValue('#authPassword', '');
    setInputValue('#authConfirmPassword', '');
    const newsletter = qs('#authNewsletter');
    if (newsletter)
        newsletter.checked = false;
}
function readUsers() {
    try {
        const raw = localStorage.getItem(USERS_STORAGE_KEY);
        if (!raw)
            return {};
        return JSON.parse(raw);
    }
    catch {
        return {};
    }
}
function writeUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}
function persistCurrentUser() {
    if (!state.currentUser)
        return;
    const users = readUsers();
    users[state.currentUser.email] = state.currentUser;
    writeUsers(users);
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}
function getSeedPendingOrders() {
    return [
        {
            id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            total: 395000,
            status: 'processing',
            items: ['Future EX + Crizal Sapphire HR']
        }
    ];
}
function getSeedPurchaseHistory() {
    return [
        {
            id: 'ORD-813924',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 32).toISOString(),
            total: 280000,
            status: 'delivered',
            items: ['Modern Round Frame', 'Blue Light Filter']
        },
        {
            id: 'ORD-744120',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 68).toISOString(),
            total: 520000,
            status: 'delivered',
            items: ['Welding Shield Pro', 'High Contrast Coating']
        }
    ];
}
function setInputValue(selector, value) {
    const input = qs(selector);
    if (input)
        input.value = value;
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-4 glass-card px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-up';
    notification.innerHTML = `
    <div class="flex items-center space-x-3">
      <i class="fas fa-check-circle text-green-500 text-xl"></i>
      <span class="font-semibold">${message}</span>
    </div>
  `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
function scrollToProducts() {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}
function scrollToCustom() {
    document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth' });
}
function formatCop(amount) {
    return `$${amount.toLocaleString()} COP`;
}
function formatDisplayPrice(copAmount) {
    if (state.currentLang === 'en') {
        const usd = Math.round(copAmount / COP_PER_USD);
        return `$${usd.toLocaleString('en-US')} USD`;
    }
    return `$${Math.round(copAmount).toLocaleString('es-CO')} COP`;
}
function shorten(address) {
    if (address.length <= 10)
        return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
async function copyToClipboard(text) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
    }
    else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
    }
}
const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => Array.from(document.querySelectorAll(selector));
Object.assign(window, {
    addToCart,
    addQuoteToCart,
    closeCart,
    closePayment,
    openCart,
    openPaymentModal,
    removeFromCart,
    scrollToCustom,
    scrollToProducts,
    selectPayment
});
export {};
