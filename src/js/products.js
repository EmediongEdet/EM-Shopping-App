
import buildElectronicCards from "./util.js";

const requestUrl = "/json/data.json";

export default class getElectronics {

    constructor(prodId) {
        this.products = {};
    }

    async init() {

        try {

            const response = await fetch(requestUrl);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            console.log(data);

            buildElectronicCards(data);

        } catch (error) {

            console.error("Error loading products:", error);

        }

    }

}
