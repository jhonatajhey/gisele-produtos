// Dados dos produtos
const products = [
    // Maquiagem
    {
        id: 1,
        name: "Base Líquida HD",
        description: "Base de alta cobertura com acabamento natural e longa duração",
        price: 89.90,
        originalPrice: 119.90,
        category: "maquiagem",
        image: "images/maquiagem_4.jpg",
        rating: 4.8,
        reviews: 156,
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: "Paleta de Sombras Nude",
        description: "12 tons neutros para looks do dia a dia e ocasiões especiais",
        price: 129.90,
        originalPrice: 159.90,
        category: "maquiagem",
        image: "images/maquiagem_6.jpg",
        rating: 4.9,
        reviews: 203,
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "Batom Matte Longa Duração",
        description: "Batom cremoso com acabamento matte e 12h de duração",
        price: 45.90,
        originalPrice: 59.90,
        category: "maquiagem",
        image: "images/maquiagem_4.jpg",
        rating: 4.7,
        reviews: 89,
        inStock: true,
        featured: false
    },
    {
        id: 4,
        name: "Máscara de Cílios Volume",
        description: "Máscara que proporciona volume e alongamento extremos",
        price: 69.90,
        originalPrice: 89.90,
        category: "maquiagem",
        image: "images/maquiagem_6.jpg",
        rating: 4.6,
        reviews: 134,
        inStock: true,
        featured: false
    },
    {
        id: 5,
        name: "Corretivo Líquido",
        description: "Corretivo de alta cobertura para olheiras e imperfeições",
        price: 39.90,
        originalPrice: 49.90,
        category: "maquiagem",
        image: "images/maquiagem_4.jpg",
        rating: 4.5,
        reviews: 67,
        inStock: true,
        featured: false
    },
    {
        id: 6,
        name: "Blush Compacto",
        description: "Blush com pigmentação intensa e longa duração",
        price: 55.90,
        originalPrice: 69.90,
        category: "maquiagem",
        image: "images/maquiagem_6.jpg",
        rating: 4.8,
        reviews: 92,
        inStock: true,
        featured: false
    },

    // Cuidados com a Pele
    {
        id: 7,
        name: "Sérum Vitamina C",
        description: "Sérum antioxidante que ilumina e protege a pele",
        price: 149.90,
        originalPrice: 189.90,
        category: "cuidados-pele",
        image: "images/cuidados_pele_5.jpg",
        rating: 4.9,
        reviews: 245,
        inStock: true,
        featured: true
    },
    {
        id: 8,
        name: "Hidratante Facial Anti-idade",
        description: "Creme hidratante com ácido hialurônico e peptídeos",
        price: 179.90,
        originalPrice: 219.90,
        category: "cuidados-pele",
        image: "images/cuidados_pele_6.jpg",
        rating: 4.8,
        reviews: 178,
        inStock: true,
        featured: true
    },
    {
        id: 9,
        name: "Protetor Solar FPS 60",
        description: "Proteção solar com base e hidratação para o rosto",
        price: 89.90,
        originalPrice: 109.90,
        category: "cuidados-pele",
        image: "images/cuidados_pele_5.jpg",
        rating: 4.7,
        reviews: 156,
        inStock: true,
        featured: false
    },
    {
        id: 10,
        name: "Água Micelar",
        description: "Remove maquiagem e impurezas sem ressecar a pele",
        price: 49.90,
        originalPrice: 59.90,
        category: "cuidados-pele",
        image: "images/cuidados_pele_6.jpg",
        rating: 4.6,
        reviews: 123,
        inStock: true,
        featured: false
    },
    {
        id: 11,
        name: "Esfoliante Facial",
        description: "Esfoliante suave com microesferas para renovação celular",
        price: 69.90,
        originalPrice: 84.90,
        category: "cuidados-pele",
        image: "images/cuidados_pele_5.jpg",
        rating: 4.5,
        reviews: 89,
        inStock: true,
        featured: false
    },
    {
        id: 12,
        name: "Máscara Facial Hidratante",
        description: "Máscara intensiva com ácido hialurônico e colágeno",
        price: 79.90,
        originalPrice: 99.90,
        category: "cuidados-pele",
        image: "images/cuidados_pele_6.jpg",
        rating: 4.8,
        reviews: 167,
        inStock: true,
        featured: false
    },

    // Cabelo
    {
        id: 13,
        name: "Shampoo Hidratante",
        description: "Shampoo com óleo de argan para cabelos secos e danificados",
        price: 59.90,
        originalPrice: 74.90,
        category: "cabelo",
        image: "images/cabelo_2.jpg",
        rating: 4.7,
        reviews: 134,
        inStock: true,
        featured: true
    },
    {
        id: 14,
        name: "Máscara Capilar Reparadora",
        description: "Tratamento intensivo para cabelos danificados e ressecados",
        price: 89.90,
        originalPrice: 109.90,
        category: "cabelo",
        image: "images/cabelo_7.jpg",
        rating: 4.9,
        reviews: 198,
        inStock: true,
        featured: true
    },
    {
        id: 15,
        name: "Condicionador Nutritivo",
        description: "Condicionador com manteiga de karité e vitamina E",
        price: 49.90,
        originalPrice: 64.90,
        category: "cabelo",
        image: "images/cabelo_2.jpg",
        rating: 4.6,
        reviews: 112,
        inStock: true,
        featured: false
    },
    {
        id: 16,
        name: "Óleo Capilar Multifuncional",
        description: "Óleo nutritivo para pontas ressecadas e proteção térmica",
        price: 79.90,
        originalPrice: 94.90,
        category: "cabelo",
        image: "images/cabelo_7.jpg",
        rating: 4.8,
        reviews: 156,
        inStock: true,
        featured: false
    },
    {
        id: 17,
        name: "Leave-in Protetor",
        description: "Creme sem enxágue com proteção UV e térmica",
        price: 69.90,
        originalPrice: 84.90,
        category: "cabelo",
        image: "images/cabelo_2.jpg",
        rating: 4.5,
        reviews: 87,
        inStock: true,
        featured: false
    },
    {
        id: 18,
        name: "Spray Finalizador",
        description: "Spray para fixação e brilho com proteção anti-umidade",
        price: 55.90,
        originalPrice: 69.90,
        category: "cabelo",
        image: "images/cabelo_7.jpg",
        rating: 4.7,
        reviews: 98,
        inStock: true,
        featured: false
    }
];

// Função para obter produtos por categoria
function getProductsByCategory(category) {
    if (category === 'todos') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Função para obter produtos em destaque
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Função para obter produto por ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Função para buscar produtos
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

// Função para formatar preço
function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

// Função para gerar estrelas de avaliação
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Função para criar card de produto
function createProductCard(product) {
    const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    return `
        <div class="product-card" data-product-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-actions">
                    <button class="action-btn wishlist-btn" title="Adicionar aos favoritos" data-product-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="action-btn quick-view-btn" title="Visualização rápida" data-product-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                ${discountPercentage > 0 ? `<div class="discount-badge">-${discountPercentage}%</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <div class="price-container">
                        <span class="price">R$ ${formatPrice(product.price)}</span>
                        ${product.originalPrice > product.price ? `<span class="original-price">R$ ${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="rating">
                        ${generateStars(product.rating)}
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? '<i class="fas fa-shopping-bag"></i> Adicionar ao Carrinho' : 'Fora de Estoque'}
                </button>
            </div>
        </div>
    `;
}

// Exportar para uso global
window.productsData = {
    products,
    getProductsByCategory,
    getFeaturedProducts,
    getProductById,
    searchProducts,
    formatPrice,
    generateStars,
    createProductCard
};

