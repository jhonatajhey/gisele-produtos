// JavaScript Principal - Espaço Sorelle
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização
    initializeApp();
    
    // Carregar produtos iniciais
    loadProducts();
    
    // Configurar eventos
    setupEventListeners();
    
    // Configurar animações
    setupAnimations();
});

// Inicializar aplicação
function initializeApp() {
    // Configurar header fixo
    setupStickyHeader();
    
    // Configurar navegação suave
    setupSmoothScrolling();
    
    // Configurar menu mobile
    setupMobileMenu();
    
    // Configurar busca
    setupSearch();
    
    // Configurar filtros de produtos
    setupProductFilters();
    
    // Configurar newsletter
    setupNewsletter();
}

// Header fixo
function setupStickyHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Esconder/mostrar header baseado na direção do scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Navegação suave
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menu mobile
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Animar ícone do hamburger
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (mobileMenuBtn.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Fechar menu ao clicar em link
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}

// Sistema de busca
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(e.target.value);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }
}

// Realizar busca
function performSearch(query) {
    if (!query.trim()) {
        loadProducts();
        return;
    }
    
    const results = window.productsData.searchProducts(query);
    displayProducts(results);
    
    // Scroll para produtos
    const productsSection = document.getElementById('produtos');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Mostrar mensagem se não encontrar resultados
    if (results.length === 0) {
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente buscar por outros termos ou explore nossas categorias.</p>
                </div>
            `;
        }
    }
}

// Filtros de produtos
function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            btn.classList.add('active');
            
            // Filtrar produtos
            const category = btn.dataset.filter;
            const products = window.productsData.getProductsByCategory(category);
            displayProducts(products);
        });
    });
}

// Carregar produtos
function loadProducts(category = 'todos', limit = 8) {
    const products = window.productsData.getProductsByCategory(category);
    const productsToShow = products.slice(0, limit);
    displayProducts(productsToShow);
    
    // Configurar botão "Carregar Mais"
    setupLoadMoreButton(products, limit);
}

// Exibir produtos
function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>Nenhum produto encontrado</h3>
                <p>Não há produtos disponíveis nesta categoria no momento.</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = products.map(product => 
        window.productsData.createProductCard(product)
    ).join('');
    
    // Atualizar botões de wishlist
    setTimeout(() => {
        window.cart.updateWishlistButtons();
    }, 100);
    
    // Adicionar animação aos cards
    animateProductCards();
}

// Configurar botão "Carregar Mais"
function setupLoadMoreButton(allProducts, currentLimit) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    if (allProducts.length <= currentLimit) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
        
        loadMoreBtn.onclick = () => {
            const newLimit = currentLimit + 8;
            const productsToShow = allProducts.slice(0, newLimit);
            displayProducts(productsToShow);
            setupLoadMoreButton(allProducts, newLimit);
        };
    }
}

// Newsletter
function setupNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = e.target.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simular inscrição
                window.cart.showNotification('Inscrição realizada com sucesso!', 'success');
                e.target.reset();
            }
        });
    }
}

// Configurar eventos gerais
function setupEventListeners() {
    // Clique nas categorias
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const filterBtn = document.querySelector(`[data-filter="${category}"]`);
            
            if (filterBtn) {
                filterBtn.click();
                
                // Scroll para produtos
                const productsSection = document.getElementById('produtos');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Clique nos produtos para visualização rápida
    document.addEventListener('click', (e) => {
        if (e.target.closest('.product-card') && !e.target.closest('button')) {
            const productCard = e.target.closest('.product-card');
            const productId = parseInt(productCard.dataset.productId);
            window.cart.showProductModal(productId);
        }
    });
    
    // Tecla ESC para fechar modais
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.cart.hideCartModal();
            window.cart.hideProductModal();
        }
    });
}

// Configurar animações
function setupAnimations() {
    // Intersection Observer para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.section-header, .category-card, .about-content, .newsletter-content').forEach(el => {
        observer.observe(el);
    });
}

// Animar cards de produtos
function animateProductCards() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading para imagens
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}

// Inicializar recursos adicionais
setTimeout(() => {
    setupLazyLoading();
    trackPerformance();
}, 1000);

// Exportar funções úteis
window.espacoSorelle = {
    loadProducts,
    displayProducts,
    performSearch,
    animateProductCards
};

