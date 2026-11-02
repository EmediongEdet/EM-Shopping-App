
import { getLocalStorage, setLocalStorage } from "./util.js";

export default class cartList {

    constructor() {
        this.total = 0;
    }

    async init() {

        const product = await getLocalStorage("so-cart") || [];

        this.createTemplate(product);
        this.calculateTotal(product);

    }

    createTemplate(product) {

        const parent = document.querySelector(".productDesc");

        if (!parent) return;

        parent.innerHTML = "";

        product.forEach((item) => {

            const div = document.createElement("div");
            div.classList.add("delbtn");

            const par = document.createElement("p");

            par.innerHTML = `${item._ProductName_}`;

            const span = document.createElement("span");
            span.classList.add("price");
            span.innerHTML = `$${item._ProductAmount_}`;

            const button = document.createElement("button");
            button.innerHTML = '<i class="fa-solid fa-trash"></i>';
            button.type = "button";

            button.addEventListener("click", async () => {

                await this.deleteItem(item._ProductId_);

            });

            par.appendChild(span);
            div.appendChild(par);
            div.appendChild(button);

            parent.appendChild(div);

        });

    }

    async deleteItem(id) {

        let product = await getLocalStorage("so-cart") || [];

        product = product.filter(item =>
            item._ProductId_ !== id
        );

        await setLocalStorage("so-cart", product);
        await setLocalStorage("no_of_items", product.length);

        const no_of_items = document.querySelector(".cart-items");

        if (no_of_items) {
            no_of_items.innerHTML = product.length;
        }

        this.createTemplate(product);
        this.calculateTotal(product);

    }

    calculateTotal(product) {

        const amounts = product.map(item =>
            Number(item._ProductAmount_)
        );

        this.total = amounts.reduce((sum, item) => sum + item, 0);

        const amount = document.querySelector(".amount");

        if (amount) {
            amount.innerHTML = `$${this.total}`;
        }

    }

}
