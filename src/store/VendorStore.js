export default (dispatcher, dbProductStorage, flowLogger, ScreenStore) =>
    dispatcher.registerStore({
        state: {
            missingProducts: [],
            threshold: 2,
            orderTruckShow: false,
        },

        'action:init': function() {
            dispatcher.waitForStores([ScreenStore]);
            flowLogger.storeLog('vendorStore.action:init');
            this.state.missingProducts = dbProductStorage.getMissingProducts();
        },

        'action:purchase': function(){
            let missingProducts = dbProductStorage.getMissingProducts();
            this.state.orderTruckShow = true;
            this.state.missingProducts = missingProducts; 
        },

        'action:refillProducts': function () {
            //this.state.missingProducts = [];
            for(let code in this.state.missingProducts){
                this.state.missingProducts[code].quantity = Math.floor(Math.random() * 6) + 2;
            }
            dbProductStorage.updateMissingProducts(this.state.missingProducts);
            this.state.missingProducts = dbProductStorage.getMissingProducts();
        },
    });