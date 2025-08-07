// Gerenciamento do Carrinho de Compras
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.wishlist = this.loadWishlist();
        this.init();
    }

    init() {
        this.updateCartCount();
        this.updateWishlistCount();
        this.bindEvents();
    }

    // Carregar carrinho do localStorage
    loadCart() {
        const saved = localStorage.getItem('espacoSorelleCart');
        return saved ? JSON.parse(saved) : [];
    }

    // Salvar carrinho no localStorage
    saveCart() {
        localStorage.setItem('espacoSorelleCart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // Carregar wishlist do localStorage
    loadWishlist() {
        const saved = localStorage.getItem('espacoSorelleWishlist');
        return saved ? JSON.parse(saved) : [];
    }

    // Salvar wishlist no localStorage
    saveWishlist() {
        localStorage.setItem('espacoSorelleWishlist', JSON.stringify(this.wishlist));
        this.updateWishlistCount();
    }

    // Adicionar produto ao carrinho
    addToCart(productId, quantity = 1) {
        const product = window.productsData.getProductById(productId);
        if (!product || !product.inStock) {
            this.showNotification('Produto indisponível', 'error');
            return false;
        }

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: productId,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.showNotification(`${product.name} adicionado ao carrinho!`);
        return true;
    }

    // Remover produto do carrinho
    removeFromCart(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    // Atualizar quantidade do produto
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    // Limpar carrinho
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Carrinho limpo!');
    }

    // Adicionar/remover da wishlist
    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        const product = window.productsData.getProductById(productId);
        
        if (index === -1) {
            this.wishlist.push(productId);
            this.showNotification(`${product.name} adicionado aos favoritos!`);
        } else {
            this.wishlist.splice(index, 1);
            this.showNotification(`${product.name} removido dos favoritos!`);
        }
        
        this.saveWishlist();
        this.updateWishlistButtons();
    }

    // Verificar se produto está na wishlist
    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    // Calcular total do carrinho
    getCartTotal() {
        return this.items.reduce((total, item) => {
            const product = window.productsData.getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    // Obter quantidade total de itens
    getCartItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Atualizar contador do carrinho
    updateCartCount() {
        const count = this.getCartItemCount();
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // Atualizar contador da wishlist
    updateWishlistCount() {
        const count = this.wishlist.length;
        const wishlistCountElement = document.getElementById('wishlistCount');
        if (wishlistCountElement) {
            wishlistCountElement.textContent = count;
            wishlistCountElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // Atualizar botões de wishlist
    updateWishlistButtons() {
        document.querySelectorAll('.wishlist-btn[data-product-id]').forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            const icon = btn.querySelector('i');
            
            if (this.isInWishlist(productId)) {
                icon.className = 'fas fa-heart';
                btn.classList.add('active');
            } else {
                icon.className = 'far fa-heart';
                btn.classList.remove('active');
            }
        });
    }

    // Exibir modal do carrinho
    showCartModal() {
        const modal = document.getElementById('cartModal');
        const overlay = document.getElementById('overlay');
        
        this.updateCartDisplay();
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Fechar modal do carrinho
    hideCartModal() {
        const modal = document.getElementById('cartModal');
        const overlay = document.getElementById('overlay');
        
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Atualizar exibição do carrinho
    updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');
        
        if (!cartItemsContainer || !cartTotalElement) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <h3>Seu carrinho está vazio</h3>
                    <p>Adicione alguns produtos incríveis!</p>
                </div>
            `;
        } else {
            cartItemsContainer.innerHTML = this.items.map(item => {
                const product = window.productsData.getProductById(item.id);
                if (!product) return '';
                
                return `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="cart-item-info">
                            <h4 class="cart-item-title">${product.name}</h4>
                            <p class="cart-item-price">R$ ${window.productsData.formatPrice(product.price)}</p>
                            <div class="cart-item-controls">
                                <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">
                                    <i class="fas fa-plus"></i>
                                </button>
                                <button class="remove-item" onclick="cart.removeFromCart(${item.id})" title="Remover item">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        cartTotalElement.textContent = window.productsData.formatPrice(this.getCartTotal());
    }

    // Finalizar compra
    checkout() {
        if (this.items.length === 0) {
            this.showNotification('Carrinho vazio!', 'error');
            return;
        }

        // Simular processo de checkout
        this.showNotification('Redirecionando para o pagamento...', 'info');
        
        setTimeout(() => {
            this.showNotification('Compra realizada com sucesso!', 'success');
            this.clearCart();
            this.hideCartModal();
        }, 2000);
    }

    // Exibir notificação
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        
        if (!notification || !notificationText) return;

        notificationText.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Vincular eventos
    bindEvents() {
        // Botão do carrinho
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.showCartModal());
        }

        // Fechar modal do carrinho
        const closeCartModal = document.getElementById('closeCartModal');
        if (closeCartModal) {
            closeCartModal.addEventListener('click', () => this.hideCartModal());
        }

        // Overlay
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.hideCartModal();
                this.hideProductModal();
            });
        }

        // Limpar carrinho
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja limpar o carrinho?')) {
                    this.clearCart();
                }
            });
        }

        // Finalizar compra
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Delegação de eventos para produtos dinâmicos
        document.addEventListener('click', (e) => {
            // Adicionar ao carrinho
            if (e.target.closest('.add-to-cart-btn')) {
                const btn = e.target.closest('.add-to-cart-btn');
                const productId = parseInt(btn.dataset.productId);
                this.addToCart(productId);
            }

            // Toggle wishlist
            if (e.target.closest('.wishlist-btn[data-product-id]')) {
                const btn = e.target.closest('.wishlist-btn[data-product-id]');
                const productId = parseInt(btn.dataset.productId);
                this.toggleWishlist(productId);
            }

            // Visualização rápida
            if (e.target.closest('.quick-view-btn')) {
                const btn = e.target.closest('.quick-view-btn');
                const productId = parseInt(btn.dataset.productId);
                this.showProductModal(productId);
            }
        });
    }

    // Exibir modal do produto
    showProductModal(productId) {
        const product = window.productsData.getProductById(productId);
        if (!product) return;

        const modal = document.getElementById('productModal');
        const overlay = document.getElementById('overlay');
        const modalTitle = document.getElementById('productModalTitle');
        const productDetails = document.getElementById('productDetails');

        modalTitle.textContent = product.name;
        productDetails.innerHTML = `
            <div class="product-modal-content">
                <div class="product-modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-modal-info">
                    <h3>${product.name}</h3>
                    <p class="product-modal-description">${product.description}</p>
                    <div class="product-modal-price">
                        <span class="price">R$ ${window.productsData.formatPrice(product.price)}</span>
                        ${product.originalPrice > product.price ? `<span class="original-price">R$ ${window.productsData.formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="product-modal-rating">
                        ${window.productsData.generateStars(product.rating)}
                        <span>(${product.reviews} avaliações)</span>
                    </div>
                    <div class="product-modal-actions">
                        <button class="btn btn-outline wishlist-btn" data-product-id="${product.id}">
                            <i class="${this.isInWishlist(product.id) ? 'fas' : 'far'} fa-heart"></i>
                            ${this.isInWishlist(product.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                        </button>
                        <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-bag"></i>
                            ${product.inStock ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Fechar modal do produto
    hideProductModal() {
        const modal = document.getElementById('productModal');
        const overlay = document.getElementById('overlay');
        
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Inicializar carrinho
const cart = new ShoppingCart();

// Fechar modal do produto
const closeProductModal = document.getElementById('closeProductModal');
if (closeProductModal) {
    closeProductModal.addEventListener('click', () => cart.hideProductModal());
}

// Exportar para uso global
window.cart = cart;

