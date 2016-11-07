export default (ProductsData) => ({
    setProducts: function (products) {
        if(products) {
            window.localStorage.setItem('products', JSON.stringify(products));
        }
        else {
            window.localStorage.setItem('products', JSON.stringify(ProductsData));
        }

    },
    getProducts: function () {
        return JSON.parse(window.localStorage.getItem('products'));
    },
    getProductByKey: function (code) {
        return this.getProducts()[code];
    },
    decreaseProduct: function (code) {
        let products = this.getProducts();
        --products[code].quantity;
        window.localStorage.setItem('products', JSON.stringify(products));
    },
    getMissingProducts: function () {
        let products = this.getProducts();
        let missingProducts = {};
        for (let product in products) {
            if (products[product].quantity === 0) {
                missingProducts[product] = products[product];
            }
        }
        return missingProducts;
    },
    updateMissingProducts: function (missingProducts) {
        console.log(missingProducts);
        let products = this.getProducts();
        for(let code in products) {
            for(let codeMissing in missingProducts) {
                console.log(missingProducts[codeMissing]);
                if(code === codeMissing) {
                    products[code].quantity = missingProducts[codeMissing].quantity
                }
            }
        }
        this.setProducts(products);
    },
})