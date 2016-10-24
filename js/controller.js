module.exports = ($scope, VendingMachineAction, ScreenStore, CounterStore, VendingMachineProducts1) => {

    //$scope.products = ScreenStore.products;
    $scope.tekst = ScreenStore.boughtProduct;
    $scope.counter = CounterStore.count;

    /**************************/

    $scope.products = VendingMachineProducts1;

    $scope.code = ScreenStore.code;
    $scope.enterCode = (codeCharacter)=> {
        if($scope.code.indexOf("_") !== -1) {
            VendingMachineAction.enterCode(codeCharacter);
            $scope.code = ScreenStore.code;
        }
    }
    
    $scope.resetCode = () => {
        VendingMachineAction.resetCode();
        $scope.code = ScreenStore.code;
    }

    /*******************************/

    

    $scope.purchaseEvent = (product) => {
        VendingMachineAction.purchase(product);
        $scope.tekst = ScreenStore.boughtProduct;
        $scope.counter = CounterStore.count;
    }
}