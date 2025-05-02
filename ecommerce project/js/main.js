
// ! Carousel content

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}

setInterval(() => {
  plusSlides(1);
}, 3000);

///////////////////////////////////////////////////////////////////////////////////////////////

// ! cart

// Function to add an item to the cart
function addToCart(product) {
  // Check if the product is already in the cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex >= 0) {
    // If the item already exists in the cart, update the quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // If it's not in the cart, add the product to the cart with a quantity of 1
    product.quantity = 1;
    cart.push(product);
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // alert(`${product.title} added to the cart!`);
  
}

function updateHeader() {
  // Get the cart data from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Log cart to verify its structure
  

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((total, item) => {
    // Ensure item.quantity is a valid number and default to 1 if it's invalid
    const quantity = isNaN(item.quantity) || item.quantity < 1 ? 1 : item.quantity;
    return total + quantity;
  }, 0);

  // Log the totalItems to see if it's calculated correctly
  

  // Update the cart icon with the number of items
  document.getElementById('cart-item-count').textContent = totalItems || 0;
}


/////////////////////////////////////////////////////////////////////////////////////////////////
//! Scroll to top button 
// Get the button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// When the user scrolls down 20px from the top, show the button
window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.classList.add('show'); // Show the button
  } else {
    scrollToTopBtn.classList.remove('show'); // Hide the button
  }
};

// When the user clicks the button, scroll to the top of the page
scrollToTopBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};



