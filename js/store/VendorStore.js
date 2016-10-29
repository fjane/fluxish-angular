export default (dispatcher, dbProductStorage) =>
    dispatcher.registerStore({
        storeName: 'vendorStore',

        state: {
            missingProducts: [],
            threshold: 2,
            orderTruckShow: false,
        },

        'action:init': function() {
            this.state.missingProducts = dbProductStorage.getMissingProducts();
        },

        'action:refillProducts': function () {
            for(let product in this.state.missingProducts){
                product.quantity = Math.floor(Math.random() * 6) + 2;
            }
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