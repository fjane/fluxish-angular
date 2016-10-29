import Immutable from "immutable";
export default (dispatcher, VendingMachineProducts, flowLogger) =>
    dispatcher.registerStore({
        storeName: 'screenStore',
        
        state: {
            products: {},
            ledMessage: "You haven't purchased anything!",
            code: "__"
        },

        'action:init': function() {
            flowLogger.storeLog('screenStore.action:init');
            this.state.products = VendingMachineProducts;
        },

        'action:purchase': function(payload) {
            flowLogger.storeLog('screenStore.action:purchase');
            const product = this.state.products[payload.code];

            if(!product) {
                this.state.ledMessage = "Invalid purchase code!";
            }
            else {
                if(product.quantity === 0) {
                    this.state.ledMessage = `No products! Try something else.`;
                }
                else {
                    --this.state.products[payload.code].quantity;
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