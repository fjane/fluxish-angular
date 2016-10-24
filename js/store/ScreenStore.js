module.exports = (dispatcher, VendingMachineProducts) =>
    dispatcher.registerStore({
        products: [],
        boughtProduct: "You haven't boughjt anything!",

        code: "__",

        'action:init': function() {
            this.products = VendingMachineProducts;
        },
        'action:purchase': function (payload) {
            this.boughtProduct = `Congratulation! You have just bought ${payload.name}`;
            console.log(this.boughtProduct);
        },



        'action:enterCode': function(codeCharacter) {
            if(this.code === "__") this.code = "_" + codeCharacter;
            else this.code = this.code[1] + codeCharacter;
            return this.code;
        },
        'action.resetCode': function() {
            this.code = "__";
        }
    });