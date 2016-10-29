export default (dispatcher, dbProductStorage, flowLogger) =>
    dispatcher.registerStore({
        storeName: 'screenStore',
        
        state: {
            products: {},
            ledMessage: "You haven't purchased anything!",
            code: "__"
        },

        'action:init': function() {
            flowLogger.storeLog('screenStore.action:init');
            this.state.products = dbProductStorage.getProducts();
        },

        'action:purchase': function(payload) {
            flowLogger.storeLog('screenStore.action:purchase');
            const product =  dbProductStorage.getProductByKey(payload.code);

            if(!product) {
                this.state.ledMessage = "Invalid purchase code!";
            }
            else {
                if(product.quantity === 0) {
                    this.state.ledMessage = `No products! Try something else.`;
                }
                else {
                    dbProductStorage.decreaseProduct(payload.code);
                    this.state.products = dbProductStorage.getProducts();
                    this.state.ledMessage = `You just bought: ${product.name}.`;
                }
            }
            this.state.code = '__';
        },

        'action:enterCode': function(payload) {
            flowLogger.storeLog('screenStore.action:enterCode');
            const code = this.state.code;
            this.state.code = (code === "__") ?
                "_" + payload.character :
                 code[1] + payload.character;
        },

        'action.resetCode': function() {
            flowLogger.storeLog('screenStore.action.resetCode');
            this.state.code =  "__";
        }
    });