export default (dispatcher, dbProductStorage) =>
    dispatcher.registerStore({
        storeName: 'vendorStore',

        state: {
            missingProducts: [],
            threshold: 2,
            orderTruckShow: false,
        },

        'action:refillProducts': function () {
            this.state.missingProducts.forEach(function(product){
                product.quantity = Math.floor(Math.random() * 6) + 2;
            });
            dbProductStorage.updateMissingProducts(this.state.missingProducts);
        },
        
        'action:purchase': function(){
            let missingProducts = dbProductStorage.getMissingProducts();
            if(Object.keys(missingProducts).length >= 2){
                this.state.orderTruckShow = true;
                this.state.missingProducts = missingProducts;
            }
        }
    });