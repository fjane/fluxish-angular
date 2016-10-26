import Immutable from "immutable";
export default (dispatcher, VendingMachineProducts) =>
    dispatcher.registerStore({
        
        state: {
            products: [],
            ledMessage: "You haven't purchased anything!",
            code: "__"
        },

        returnProductFromList: function (code) {
            for(var i=0; i< this.state.products.length; i++) {
                if(this.state.products[i].code === code) {
                    return this.state.products[i];
                }
            }
            return null;
        },

        'action:init': function() {
            this.state.products = VendingMachineProducts;
        },

        'action:purchase': function(payload) {
            const product = this.returnProductFromList(payload.code);

            if(!product) {
                this.state.ledMessage = "Invalid purchase code!";
            }
            else {
                this.state.ledMessage = `You just bought: ${product.name}`;
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