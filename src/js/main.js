import getElectronics from "./products.js";
import getWeather from "./weather.js";
import { getLocalStorage } from "./util.js";
import cartList from "./cart.js";

const products = new getElectronics();
// console.log(products);
const cart = new cartList()
cart.init();


const weather = new getWeather();
// console.log(weather);
    products.init();
   
    weather.apiFetch();

async function getItemQuantity () {
    let itemquantity = await getLocalStorage("no_of_items")
    const no_of_items = document.querySelector(".cart-items")

    no_of_items.innerHTML = itemquantity || 0;
}

getItemQuantity();