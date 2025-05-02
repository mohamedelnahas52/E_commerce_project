// Function to calculate the total cost and display the cart items
const displayCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  // Retrieve cart from localStorage
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice'))

    const totalCostElement = document.getElementById('total-cost');
    
    if (cart.length === 0) {
      totalCostElement.textContent = '0.00';
      return;
    }
  
  
    totalCostElement.textContent = totalPrice.toFixed(2);  // Display total cost rounded to two decimal places
  };
  
  // Call the displayCart function when the page loads
  window.onload = () => {
    displayCart();
};
  
  // Handle form submission
  document.getElementById('payment-form').onsubmit = (event) => {
    event.preventDefault();  // Prevent the default form submission
  
    // Retrieve the form data
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
  
    // Example: Print form data to the console (simulate form submission)
    

    // You would integrate a payment API here (e.g., Stripe, PayPal)

    // Optionally, redirect to a confirmation page after successful submission
    let currentDate = new Date();

    // Add 5 days to the current date
    currentDate.setDate(currentDate.getDate() + 5);

    // Format the new date in a readable format (optional)
    let formattedDate = currentDate.toDateString(); // This returns a formatted date like "Mon Apr 13 2025"

    // Display the alert with the date
    alert(`Payment successful! You will receive your order on ${formattedDate}.`);

    // alert('Payment successful! you will receive your order in 5 days...');
    window.location.href = 'index.html';  // Redirect to a confirmation page (or elsewhere)
  };


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

  updateHeader();