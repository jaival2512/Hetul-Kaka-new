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
