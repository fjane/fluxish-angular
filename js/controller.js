export default ($scope, ScreenStore, VendorStore) => {
    $scope.state = ScreenStore.state;
    $scope.missingProducts = VendorStore.state.missingProducts;
    console.log($scope.missingProducts);
    console.log($scope.state.products);
}