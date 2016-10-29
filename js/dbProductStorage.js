export default (ProductsData) => {
    return {
        setProducts: function() {
            window.localStorage.setItem('products', JSON.stringify(ProductsData));
        },
        getProducts: function() {
            return JSON.parse(window.localStorage.getItem('products'));
        },
        decreaseProduct: function(code) {

        },
        getMissingProducts: function() {
            
        }
    }
}