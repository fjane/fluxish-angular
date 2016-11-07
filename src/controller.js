export default ($scope, ScreenStore, VendorStore) => {
    $scope.state = ScreenStore.state;
    $scope.vendor = VendorStore.state;
}