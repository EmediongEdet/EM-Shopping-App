
const requestUrl = "/json/data.json";

// Build electronic product cards
export default function buildElectronicCards(data) {

    const ElectronicCards = document.querySelector("#show-content");

    if (!ElectronicCards || !data || !data.Electronics) {
        return;
    }

    ElectronicCards.innerHTML = "";

    data.Electronics.forEach((electronic) => {

        let div = document.createElement("div");
        div.classList.add("box1");

        let link = document.createElement("a");
        let h4 = document.createElement("p");
        let p1 = document.createElement("p");
        let img = document.createElement("img");
        let btn = document.createElement("button");

        btn.setAttribute("type", "button");
        btn.classList.add("addToCart");

        link.classList.add("url-p");

        let ElectronicName = electronic._ProductName_;
        let ElectronicID = electronic._ProductId_;

        img.setAttribute("src", electronic._ProductImage_);
        img.setAttribute("alt", ElectronicName);
        img.setAttribute("loading", "lazy");

        link.setAttribute("href", `/detail.html?product=${encodeURIComponent(ElectronicID)}`);

        link.classList.add("product_container");

        h4.textContent = `Product Name: ${ElectronicName}`;
        btn.textContent = "Add To Cart";

        div.append(img, h4, p1);

        // Keep the existing product card navigation.
        link.appendChild(div);

        ElectronicCards.appendChild(link);

    });
}


// Retrieve data from localStorage
export async function getLocalStorage(key) {

    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;

}


// Save data to localStorage
export async function setLocalStorage(key, data) {

    localStorage.setItem(key, JSON.stringify(data));

}


// Get URL parameters
export function getParams(param) {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    return urlParams.get(param);

}


// Find product by ID
export async function findItemById(id) {

    const response = await fetch(requestUrl);

    if (!response.ok) {
        throw new Error("Unable to fetch product data");
    }

    const data = await response.json();

    const items = data.Electronics;

    const found = items.find(item =>
        String(item._ProductId_) === String(id)
    );

    return found;

}


// Convert response to JSON
export async function convertToJson(res) {

    const data = await res.json();

    if (res.ok) {

        return data;

    } else {

        throw {
            name: "servicesError",
            message: data.message || res.statusText
        };

    }

}


// Build weather cards
export function buildWeatherCards(weatherData) {

    const captionDesc = document.querySelector(".container-2");

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

    const desc = weatherData.weather[0].description;
    const speed = weatherData.wind.speed;
    const temp = weatherData.main.temp;
    const name = weatherData.name;
    const latitude = weatherData.coord.lat;
    const longitude = weatherData.coord.lon;
    let degrees = weatherData.wind.deg;

    let section = document.createElement("section");
    let image = document.createElement("img");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let h6 = document.createElement("h6");
    let p5 = document.createElement("p");
    let p6 = document.createElement("p");
    let p7 = document.createElement("p");

    let description = desc[0].toUpperCase() + desc.slice(1);

    image.setAttribute("src", iconsrc);
    image.setAttribute("alt", desc);

    p1.innerHTML = `<strong>Description:</strong> ${description}`;
    p2.innerHTML = `<strong>Speed:</strong> ${speed}`;
    p3.innerHTML = `<strong>Temperature:</strong> ${temp}`;
    h6.innerHTML = `Weather Forecast for <strong>${name}, GB</strong>`;
    p5.innerHTML = `<strong>Latitude:</strong> ${latitude}`;
    p6.innerHTML = `<strong>Longitude:</strong> ${longitude}`;
    p7.innerHTML = `<strong>${degrees}</strong>&degF`;

    section.appendChild(h6);
    section.appendChild(image);
    section.appendChild(p7);
    section.appendChild(p1);
    section.appendChild(p2);
    section.appendChild(p3);
    section.appendChild(p5);
    section.appendChild(p6);

    captionDesc.append(section);

}


// Display alert message
export function alertMessage(message, scroll = true) {

    const alert = document.createElement("div");

    alert.classList.add("alert");

    alert.innerHTML = `<p>${message}</p><span>X</span>`;

    alert.addEventListener("click", function(e) {

        if (e.target.tagName === "SPAN") {
            this.remove();
        }

    });

    const main = document.querySelector("main");

    main.prepend(alert);

    if (scroll) {
        window.scrollTo(0, 0);
    }

    setTimeout(() => {
        alert.style.display = "none";
    }, 3000);

}


// Display delete message
export function deleteMessage(message, scroll = true) {

    const del = document.createElement("div");

    del.classList.add("del");

    del.innerHTML = `<p>${message}</p><span>X</span>`;

    del.addEventListener("click", function(e) {

        if (e.target.tagName === "SPAN") {
            this.remove();
        }

    });

    const main = document.querySelector("main");

    main.prepend(del);

    if (scroll) {
        window.scrollTo(0, 0);
    }

    setTimeout(() => {
        del.style.display = "none";
    }, 3000);

}
