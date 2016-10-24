module.exports = ($scope, VendingMachineAction, ScreenStore, CounterStore) => {

    $scope.products = ScreenStore.products;
    $scope.tekst = ScreenStore.boughtProduct;
    $scope.counter = CounterStore.count;


    

    $scope.purchaseEvent = (product) => {
        VendingMachineAction.purchase(product);
        $scope.tekst = ScreenStore.boughtProduct;
        $scope.counter = CounterStore.count;
    }
}