export default class DBProductStorage {
    constructor(ProductsData) {
        this.productsData = ProductsData;
    }

    setProducts (products) {
        if(products) {
            window.localStorage.setItem('products', JSON.stringify(products));
        }
        else {
            window.localStorage.setItem('products', JSON.stringify(this.productsData));
        }
    }

    getProducts () {
        return JSON.parse(window.localStorage.getItem('products'));
    }

    getProductByKey (code) {
        return this.getProducts()[code];
    }

    decreaseProduct (code) {
        let products = this.getProducts();
        --products[code].quantity;
        window.localStorage.setItem('products', JSON.stringify(products));
    }

    getMissingProducts () {
        let products = this.getProducts();
        let missingProducts = {};
        for (let product in products) {
            if (products[product].quantity === 0) {
                missingProducts[product] = products[product];
            }
        }
        return missingProducts;
    }

    updateMissingProducts (missingProducts) {
        let products = this.getProducts();
        for(let code in products) {
            for(let codeMissing in missingProducts) {
                if(code === codeMissing) {
                    products[code].quantity = missingProducts[codeMissing].quantity
                }
            }
        }
        this.setProducts(products);
    }
}