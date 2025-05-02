// cart.js

// Get cart data from localStorage (or use a default empty array if no data exists)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Ensure all items have a valid quantity
cart = cart.map(item => {
  if (!item.quantity || item.quantity < 1) {
    item.quantity = 1;  // Default to 1 if quantity is invalid or undefined
  }
  return item;
});

// Function to render the cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Clear previous items

  cart.forEach(item => {
    // Ensure price is a valid number
    const price = parseFloat(item.price);
    if (isNaN(price)) {
      console.warn(`Invalid price for product: ${item.title}. Setting price to $0.00`);
      item.price = 0;  // Set to 0 if price is invalid
    }

    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="item-info">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
      <div class="item-quantity">
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
      <div class="remove-item" onclick="removeItem(${item.id})">
        <i class="fas fa-trash-alt"></i>
      </div>
      <div class="item-total-price">
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemDiv);

  });
  
  // Update total price
  updateTotalPrice();
  updateHeader();
}

// Function to update the quantity of an item
function updateQuantity(id, value) {
  const item = cart.find(product => product.id === id);

  // If the value is a number, update quantity directly
  if (typeof value === 'number') {
    item.quantity += value;

    // Make sure quantity doesn't go below 1
    if (item.quantity < 1) item.quantity = 1;
  } else {
    item.quantity = parseInt(value);
    if (item.quantity < 1) item.quantity = 1;
  }

  // Save updated cart data to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Recalculate total price and update localStorage
  updateTotalPrice();

  renderCartItems();
}

// Function to remove an item from the cart
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));

  // Recalculate total price and update localStorage
  updateTotalPrice();

  renderCartItems();
}

// Function to calculate and update the total price
function updateTotalPrice() {
  const newTotalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  localStorage.setItem('totalPrice', newTotalPrice.toFixed(2));  // Save total price to localStorage


  // Update the UI with the new total price
  document.getElementById('total-price').textContent = `$${newTotalPrice.toFixed(2)}`;
  document.getElementById('summary-total').textContent = `$${newTotalPrice.toFixed(2)}`;
}



function updateHeader() {
  // Get the cart data from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];


  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((total, item) => {
    // Ensure item.quantity is a valid number and default to 1 if it's invalid
    const quantity = isNaN(item.quantity) || item.quantity < 1 ? 1 : item.quantity;
    return total + quantity;
  }, 0);


  // Update the cart icon with the number of items
  document.getElementById('cart-item-count').textContent = totalItems || 0;
}


// Checkout functionality (for demonstration)
function checkout() {

  updateTotalPrice();
  // to confirm it was set from local storage we will display it from there
  const totalPrice = localStorage.getItem('totalPrice');
  // You can now use this value in the payment page, redirecting to the payment page (if necessary)
  alert(`Total price: $${totalPrice}. Proceeding to checkout...`);


  window.location.href = 'payment.html'
}

// Initial rendering of cart items
renderCartItems();
