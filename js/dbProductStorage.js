export default (ProductsData) => {
    return {
        setProducts: function() {
            window.localStorage.setItem('products', JSON.stringify(ProductsData));
        },
        getProducts: function() {
            return JSON.parse(window.localStorage.getItem('products'));
        },
        getProductByKey: function(code) {
            return this.getProducts()[code];
        },
        decreaseProduct: function(code) {
            let products = this.getProducts();
            --products[code].quantity;
            window.localStorage.setItem('products', JSON.stringify(products));
        },
        getMissingProducts: function() {
            
        },
        updateMissingProducts: function() {

        }
    }
}