
import {
    findItemById,
    getParams,
    getLocalStorage,
    setLocalStorage,
    alertMessage,
    deleteMessage
} from "./util.js";


async function init() {

    const _id = getParams("product");

    const product = await findItemById(_id);

    const container = document.querySelector(".product_detail");

    // Display product details
    if (product && container) {

        const img = document.createElement("img");

        img.setAttribute("src", product._ProductImage_);
        img.setAttribute("alt", product._ProductName_);
        img.classList.add("img");

        const div = document.createElement("div");
        div.classList.add("detail");

        const par1 = document.createElement("p");
        par1.textContent = `Name: ${product._ProductName_}`;

        const par2 = document.createElement("p");
        par2.textContent = `Amount: $${product._ProductAmount_}`;

        const par3 = document.createElement("p");
        par3.textContent = `Details: ${product._ProductDetails_}`;

        const par4 = document.createElement("p");
        par4.textContent = `Seller: ${product._ProductSeller_}`;

        div.appendChild(par1);
        div.appendChild(par2);
        div.appendChild(par3);
        div.appendChild(par4);

        container.appendChild(img);
        container.appendChild(div);

    }

    if (!product) {
        console.error("Product not found:", _id);
        return;
    }


    // Add product to cart
    const addToCart = document.querySelector(".add-to-cart");

    if (addToCart) {

        addToCart.addEventListener("click", async (e) => {

            e.preventDefault();

            let cartItems = await getLocalStorage("so-cart") || [];

            const found = cartItems.find(data =>
                data._ProductId_ === product._ProductId_
            );

            if (!found) {

                cartItems.push(product);

                await setLocalStorage("so-cart", cartItems);

                alertMessage(
                    `${product._ProductName_} has been Added to Cart!`
                );

            } else {

                alert("Product already exists");

            }

            const no_of_items = document.querySelector(".cart-items");

            if (no_of_items) {
                no_of_items.innerHTML = cartItems.length;
            }

            await setLocalStorage("no_of_items", cartItems.length);

        });

    }


    // Remove product from cart
    const removeItem = document.querySelector(".removeItem");

    if (removeItem) {

        removeItem.addEventListener("click", async (e) => {

            e.preventDefault();

            await deleteItem(_id);

        });

    }


    async function deleteItem(id) {

        let cartItems = await getLocalStorage("so-cart") || [];

        cartItems = cartItems.filter(item =>
            item._ProductId_ !== id
        );

        await setLocalStorage("so-cart", cartItems);

        await setLocalStorage("no_of_items", cartItems.length);

        const no_of_items = document.querySelector(".cart-items");

        if (no_of_items) {
            no_of_items.innerHTML = cartItems.length;
        }

        deleteMessage(`${product._ProductName_} has been Deleted!`);

    }

}

init();
