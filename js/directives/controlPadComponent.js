export default (VendingMachineAction) => {
    return {
        restrict: 'E',
        scope: {
            code: '='
        },
        templateUrl: './template/pad.html',
        link: function(scope) {

            scope.enterCode = (character) => {
                if(scope.code.indexOf("_") !== -1) {
                    VendingMachineAction.enterCode(character);
                }
            }

            scope.resetCode = () => {
                VendingMachineAction.resetCode();
            }

            scope.makePurchase = (code) => {
                VendingMachineAction.purchase(code);
            }

        }
    }
}
