// script.js

let allProducts = []; // Store all products

// Fetch data from Fake Store API
const fetchProducts = async () => {
  try {

    const response = await fetch('https://fakestoreapi.com/products');
    allProducts = await response.json(); // Store the products data
    // 
    // Show the default category (for example, Electronics)
    displayProducts(allProducts);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


// Function to filter products based on category
const filterProducts = async (category) => {
  try{
    const response = await fetch(`https://fakestoreapi.in/api/products/category?type=${category}`);
    responseObj = await response.json(); // Store the products data
    let products = responseObj.products
    // 
    displayProducts(products);


  } catch (error) {
  console.error('Error fetching data:', error);
}

};





const saveProducts = (product) => {
  // Get the current cart from localStorage, or initialize it if it doesn't exist
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    // If the product already exists, increase the quantity
    cart[existingProductIndex].quantity += 1;
  } else {
    // If the product does not exist, add it to the cart with a quantity of 1
    product.quantity = 1;
    cart.push(product);
  }

  // Save the updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Optionally, log the cart to confirm it's saved
  alert(`${product.title} added to the cart!`);
  
  
  // Update the header/cart icon
  updateHeader();
};


// Function to display products in a grid layout
const displayProducts = (products) => {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = ''; // Clear the container before adding new products

  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    // Truncate the title to 50 characters
    const truncatedTitle = product.title.length > 50
      ? product.title.substring(0, 50) + '...'
      : product.title;

    // Truncate the description to 100 characters
    const truncatedDescription = product.description.length > 100
      ? product.description.substring(0, 100) + '...'
      : product.description;

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${truncatedTitle}</h3>
      <p>${truncatedDescription}</p>
      <div class="payContainer">
        <p class="price">$${product.price}</p>
        <i class="fas fa-shopping-cart payCart"></i>
      </div>
    `;

    // Append the product div to the container
    productContainer.appendChild(productDiv);

    // Add event listener for the cart icon
    const cartIcon = productDiv.querySelector('.payCart');
    cartIcon.addEventListener('click', () => saveProducts(product));
  });
};







// Call the fetch function to load all products when the page loads
fetchProducts();
updateHeader()

// [11,12,65]

