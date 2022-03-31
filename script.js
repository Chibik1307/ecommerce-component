const menuItems = [
    {
        image: "./images/1.png",
        name: "French Fries with Ketchup",
        description: "Картошка фри с кетчупом",
        price: 2.23,
        count: 0,
        id: "1"
    },
    {
        image: "./images/2.png",
        name: "Salmon and Vegetables",
        description: "Лосось с овощами",
        price: 5.12,
        count: 0,
        id: "2"
    },
    {
        image: "./images/3.png",
        name: "Spaghetti with Meat Sauce",
        description: "Спагетти с мясным соусом",
        price: 7.82,
        count: 0,
        id: "3"
    },
    {
        image: "./images/4.png",
        name: "Chicken Salad with Parmesean",
        description: "Салат с курицей и пармезаном",
        price: 6.98,
        count: 0,
        id: "4"
    },
    {
        image: "./images/5.png",
        name: "Fish Sticks and Fries",
        description: "Рыбные палочки с картошкой фри",
        price: 6.34,
        count: 0,
        id: "5"
    },
    {
        image: "./images/6.png",
        name: "Ravioli",
        description: "Равиоли",
        price: 6.45,
        count: 0,
        id: "6"
    },
    {
        image: "./images/7.png",
        name: "Tortellini",
        description: "Пельмени",
        price: 6.05,
        count: 0,
        id: "7"
    },
    {
        image: "./images/8.png",
        name: "Bacon, Eggs, and Toast",
        description: "Яичница с беконом и тостом",
        price: 5.99,
        count: 0,
        id: "8"
    },
];



function renderMenuItem (obj) {
    return `<li>
                <img class="plate" width="145px" height="145px" src="${obj.image}"
                    alt="${obj.description}">
                <div class="content">
                    <h2>${obj.name}</h2>
                    <p>$${obj.price}</p>
                    <button class="${obj.count > 0 ? 'added' : 'not-added'}" data-id="${obj.id}" id="btn_add">
                        ${obj.count > 0 ? 'In Cart' : 'Add To Cart'}
                    </button>
                </div>
            </li>`;
}

const menu = document.querySelector(".menu");

function createMenu () {
    menuItems.forEach(elem => {
        menu.insertAdjacentHTML("beforeend", renderMenuItem(elem));
    });
}
createMenu();

function clearMenu () {
    menu.innerHTML = "";
}

let cartItems = [];

function renderCartItem (item) {
    return `<li>
                <div class="cart_plate">
                    <img width="64px" height="64px" src="${item.image}"
                        alt="${item.description}">
                    <span>${item.count}</span>
                </div>
                <div class="cart_content">
                    <h2>${item.name}</h2>
                    <p>$${item.price}</p>
                    <div class="count">
                        <button class="less btn" data-id="${item.id}">
                            <svg width="12" height="19" viewBox="0 0 12 19" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M10.9228 0.844515C10.1417 0.063466 8.87538 0.0634658 8.09433 0.844514L1.13116 7.80769C0.756085 8.18276 0.545372 8.69147 0.545372 9.2219C0.545372 9.75233 0.756085 10.261 1.13116 10.6361L8.09433 17.5993C8.87538 18.3803 10.1417 18.3803 10.9228 17.5993C11.7038 16.8182 11.7038 15.5519 10.9228 14.7709L5.3738 9.2219L10.9228 3.67294C11.7038 2.89189 11.7038 1.62556 10.9228 0.844515Z"
                                    fill="white" />
                            </svg>
                        </button>
                        <span class="portion">${item.count}</span>
                        <button class="more btn" data-id="${item.id}">
                            <svg transform="rotate(180)" width="12" height="19" viewBox="0 0 12 19" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M10.9228 0.844515C10.1417 0.063466 8.87538 0.0634658 8.09433 0.844514L1.13116 7.80769C0.756085 8.18276 0.545372 8.69147 0.545372 9.2219C0.545372 9.75233 0.756085 10.261 1.13116 10.6361L8.09433 17.5993C8.87538 18.3803 10.1417 18.3803 10.9228 17.5993C11.7038 16.8182 11.7038 15.5519 10.9228 14.7709L5.3738 9.2219L10.9228 3.67294C11.7038 2.89189 11.7038 1.62556 10.9228 0.844515Z"
                                    fill="white" />
                            </svg>
                        </button>
                        <p class="sum">$${(item.count * item.price).toFixed(2)}</p>
                    </div>
                </div>
            </li>`;
}

const emptyCartText = document.querySelector(".case > p");


function getEventEveryBtn () {
    const btnAddToCart = document.querySelectorAll("#btn_add");
    btnAddToCart.forEach(elem => {
        elem.addEventListener("click", addToCart);
    });
}
getEventEveryBtn();

function moreClickBtn() {
    const findBtnCart = cartItems.find(item => item.id === this.toString());
    findBtnCart.count++;
    clearCart();
    clearCount();
    showCount();
    createCart();
    getEventEveryBtn();
    getEventEveryCartBtn();
}

function lessClickBtn() {
    const findBtnCart = cartItems.find(item => item.id === this.toString());
    findBtnCart.count--;

    if (findBtnCart.count === 0) {
        cartItems = cartItems.filter((item) => item !== findBtnCart);
        emptyCartText.innerHTML = "Your cart is empty";
    }
    
    clearCart();
    clearCount();
    if (cartItems.length > 0) {
        showCount();
    }
    clearMenu();
    createMenu();
    createCart();
    getEventEveryBtn();
    getEventEveryCartBtn();
}

function findCart(id) {
    const checkedMenuItem = menuItems.find(item => item.id === id);
    const checkedBasketItem = cartItems.find(item => item === checkedMenuItem);

    if (checkedBasketItem) {
        checkedBasketItem.count++;
    }
    else {
        cartItems.push(checkedMenuItem);
        checkedMenuItem.count++;
    }
    clearCart();
    clearCount();
    if (cartItems.length > 0) {
        showCount();
    }
    createCart();
    getEventEveryBtn();
    getEventEveryCartBtn();
}

function addToCart(event) {
    event.target.classList.add("added");
    event.target.classList.remove("not-added");
    event.target.innerHTML = "In Cart";
    emptyCartText.innerHTML = "";

    const cartId = event.target.dataset.id;
    findCart(cartId);
}

const cart = document.querySelector(".cart");
const amount = document.querySelector(".amount");

function createCart() {
    cartItems.forEach(elem => {
        cart.insertAdjacentHTML("beforeend", renderCartItem(elem));
    });
}

function clearCart() {
    cart.innerHTML = "";
}

function clearCount() {
    amount.innerHTML = "";
}

function showCount () {
    const subtotal = cartItems.reduce((acc, current) => {
        return acc + (current.price * current.count);
    }, 0);
    const tax = 0.0975 * subtotal;
    const total = subtotal + tax;

    const insertCount = () => {
        return `<p>Subtotal:</p>
                <p>Tax:</p>
                <p>Total:</p>
                <span class="sum" id="subtotal">$${(subtotal).toFixed(2)}</span>
                <span class="sum" id="tax">$${(tax).toFixed(2)}</span>
                <span class="sum" id="total">$${(total).toFixed(2)}</span>`;
        };
    amount.insertAdjacentHTML("afterbegin", insertCount());
}

function getEventEveryCartBtn() {
    const btnMore = document.querySelectorAll(".more");
    const btnLess = document.querySelectorAll(".less");

    btnMore.forEach(elem => {
        const id = elem.dataset.id;
        elem.addEventListener("click", moreClickBtn.bind(id));
    });
    btnLess.forEach(elem => {
        const id = elem.dataset.id;
        elem.addEventListener("click", lessClickBtn.bind(id));
    });
}