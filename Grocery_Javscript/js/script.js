let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick=()=>
{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick=()=>
{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');
document.querySelector('#login-btn').onclick=()=>
{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick=()=>
{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll=()=>
{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}
var swiper = new Swiper(".product-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay:{
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
  });

  var swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay:{
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
  });
  document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.total');
    let cart = {};

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productBox = this.closest('.box');
            const productId = productBox.dataset.productId;
            const productName = productBox.dataset.productName;
            const productPrice = parseInt(productBox.dataset.productPrice);

            if (!cart[productId]) {
                cart[productId] = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                };
                addToCartUI(productId, productName, productPrice);
            } else {
                cart[productId].quantity++;
                updateCartUI(productId);
            }

            updateTotal();
        });
    });

    function addToCartUI(productId, productName, productPrice) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.dataset.productId = productId;
        cartItem.innerHTML = `
            <img src="image/product-1.png">
            <div class="content">
                <h3>${productName}</h3>
                <span class="price">Rs. ${productPrice}/-</span>
                <span class="quantity">Qty: <span class="qty">${cart[productId].quantity}</span></span>
                <div class="quantity-controls">
                    <button class="decrease">-</button>
                    <button class="increase">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);

        cartItem.querySelector('.decrease').addEventListener('click', function() {
            cart[productId].quantity--;
            if (cart[productId].quantity === 0) {
                delete cart[productId];
                cartItem.remove();
            } else {
                updateCartUI(productId);
            }
            updateTotal();
        });

        cartItem.querySelector('.increase').addEventListener('click', function() {
            cart[productId].quantity++;
            updateCartUI(productId);
            updateTotal();
        });
    }

    function updateCartUI(productId) {
        const cartItem = cartItemsContainer.querySelector(`.cart-item[data-product-id="${productId}"]`);
        cartItem.querySelector('.qty').textContent = cart[productId].quantity;
    }

    function updateTotal() {
        let total = 0;
        for (let productId in cart) {
            total += cart[productId].price * cart[productId].quantity;
        }
        totalElement.textContent = `total : Rs. ${total}/-`;
    }
});


document.addEventListener("DOMContentLoaded", () => {
  const cart = {};
  const cartContainer = document.querySelector(".shopping-cart");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
      button.addEventListener("click", () => {
          const productElement = button.closest(".box");
          const productId = productElement.id;
          const productName = productElement.querySelector("h1").innerText;
          const productPrice = parseFloat(productElement.querySelector(".price").dataset.price);

          if (!cart[productId]) {
              cart[productId] = { name: productName, price: productPrice, quantity: 1 };
          } else {
              cart[productId].quantity++;
          }
          renderCart();
      });
  });

  function renderCart() {
      cartContainer.innerHTML = '<h3>Your Cart</h3>';

      let total = 0;
      for (const productId in cart) {
          const cartItem = cart[productId];
          const itemTotal = cartItem.price * cartItem.quantity;
          total += itemTotal;

          const cartItemElement = document.createElement("div");
          cartItemElement.classList.add("cart-item");
          cartItemElement.innerHTML = `
              <span>${cartItem.name} - Rs. ${cartItem.price}</span>
              <div>
                  <button class="decrease" data-id="${productId}">-</button>
                  <span>${cartItem.quantity}</span>
                  <button class="increase" data-id="${productId}">+</button>
              </div>
              <span>Rs. ${itemTotal}</span>
          `;
          cartContainer.appendChild(cartItemElement);
      }

      const totalElement = document.createElement("div");
      totalElement.classList.add("cart-total");
      totalElement.innerText = `Total: Rs. ${total}`;
      cartContainer.appendChild(totalElement);

      addCartButtonsEvents();
  }

  function addCartButtonsEvents() {
      const decreaseButtons = document.querySelectorAll(".decrease");
      const increaseButtons = document.querySelectorAll(".increase");

      decreaseButtons.forEach(button => {
          button.addEventListener("click", () => {
              const productId = button.dataset.id;
              if (cart[productId].quantity > 1) {
                  cart[productId].quantity--;
              } else {
                  delete cart[productId];
              }
              renderCart();
          });
      });

      increaseButtons.forEach(button => {
          button.addEventListener("click", () => {
              const productId = button.dataset.id;
              cart[productId].quantity++;
              renderCart();
          });
      });
  }
});

// create a new div element with the class "box"
const newBox = document.createElement("div");
newBox.className = "box";

// create the image element and set its source and alt attributes
const newImage = document.createElement("img");
newImage.src = "path/to/product/image.jpg";
newImage.alt = "Product Name";

// add the image to the new box
newBox.appendChild(newImage);

// create the product name element and set its text content
const newProductName = document.createElement("h3");
newProductName.textContent = "Product Name";

// add the product name to the new box
newBox.appendChild(newProductName);

// create the price element and set its text content
const newPrice = document.createElement("span");
newPrice.className = "price";
newPrice.textContent = "Rs. 120/-";

// add the price to the new box
newBox.appendChild(newPrice);

// get the shopping cart div
const shoppingCart1 = document.querySelector(".shopping-cart");

// add the new box to the shopping cart div
shoppingCart1.appendChild(newBox);