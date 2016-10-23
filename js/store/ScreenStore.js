module.exports = (dispatcher, VendingMachineProducts) =>
    dispatcher.registerStore({
        products: [],
        boughtProduct: "You haven't boughjt anything!",

        'action:init': function() {
            this.products = VendingMachineProducts;
        },
        'action:purchase': function (payload) {
            this.boughtProduct = `Congratulation! You have just bought ${payload.name}`;
            console.log(this.boughtProduct);
        }
    });