export default (dispatcher, dbProductStorage, flowLogger, ScreenStore, $timeout) =>
    dispatcher.registerStore({
        state: {
            missingProducts: [],
            threshold: 2,
            orderTruckShow: false,
            truckClass: '',
        },

        'action:init': function () {
            dispatcher.waitForStores([ScreenStore]);
            flowLogger.storeLog('vendorStore.action:init');
            this.state.missingProducts = dbProductStorage.getMissingProducts();
        },

        'action:purchase': function () {
            let missingProducts = dbProductStorage.getMissingProducts();
            this.state.orderTruckShow = true;
            this.state.missingProducts = missingProducts;
        },

        'action:refillProducts': function () {
            //this.state.missingProducts = [];
            for (let code in this.state.missingProducts) {
                this.state.missingProducts[code].quantity = Math.floor(Math.random() * 6) + 2;
            }
            dbProductStorage.updateMissingProducts(this.state.missingProducts);
            this.state.missingProducts = dbProductStorage.getMissingProducts();
        },

        'action:goToWarehouse': function () {
            this.state.truckClass = 'to-warehouse';

            $timeout(
                function () {
                    this.state.truckClass = 'to-vending-machine';
                }.bind(this),
                3000
            );

        },

    });