const products = [
    {
        id: 1,
        name: "Classic Leather Tote",
        description: "Elegant leather tote bag perfect for everyday use",
        price: 89.99,
        emoji: "👜"
    },
    {
        id: 2,
        name: "Modern Backpack",
        description: "Stylish backpack with laptop compartment",
        price: 69.99,
        emoji: "🎒"
    },
    {
        id: 3,
        name: "Designer Handbag",
        description: "Luxurious handbag for special occasions",
        price: 149.99,
        emoji: "👜"
    },
    {
        id: 4,
        name: "Travel Duffel",
        description: "Spacious duffel bag for your adventures",
        price: 79.99,
        emoji: "🧳"
    },
    {
        id: 5,
        name: "Crossbody Bag",
        description: "Compact crossbody for hands-free convenience",
        price: 49.99,
        emoji: "👛"
    },
    {
        id: 6,
        name: "Gym Sports Bag",
        description: "Durable bag for your fitness needs",
        price: 59.99,
        emoji: "🎒"
    },
    {
        id: 7,
        name: "Evening Clutch",
        description: "Elegant clutch for special events",
        price: 39.99,
        emoji: "👝"
    },
    {
        id: 8,
        name: "Canvas Messenger",
        description: "Rustic canvas messenger bag",
        price: 54.99,
        emoji: "📮"
    }
];

let cart = [];

function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Thank you for your order! Total: $${total.toFixed(2)}`, 'success');
    cart = [];
    updateCart();
    toggleCart();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Message sent successfully!', 'success');
    e.target.reset();
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});