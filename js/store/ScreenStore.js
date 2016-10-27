import Immutable from "immutable";
export default (dispatcher, VendingMachineProducts) =>
    dispatcher.registerStore({
        
        state: {
            products: {},
            ledMessage: "You haven't purchased anything!",
            code: "__"
        },

        'action:init': function() {
            this.state.products = VendingMachineProducts;
        },

        'action:purchase': function(payload) {
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
            const code = this.state.code;
            this.state.code = (code === "__") ?
                "_" + payload.character :
                 code[1] + payload.character;
        },

        'action.resetCode': function() {
            this.state.code =  "__";
        }
    });