export default (ProductsData) => ({
    setProducts: function () {
        window.localStorage.setItem('products', JSON.stringify(ProductsData));
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
        let products = this.getProducts();
        for (let product in missingProducts) {
            products[product].quantity = missingProducts[product].quantity;
        }
        this.setProducts(products);
    },
})