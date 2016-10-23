module.exports = (dispatcher, VendingMachineProducts) => {
    const counter = (array) => {
        let count = 0;
        for(let i =0; i< array.length;i++) {
            count += array[i].quantity;
        }
        return count;
    }
    return dispatcher.registerStore({
        count: counter(VendingMachineProducts),

        "action:purchase": function(payload) {
            this.count --;
            console.log(this.count);
        },
    })
}