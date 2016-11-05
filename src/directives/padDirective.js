export default (VendingMachineAction, flowLogger) => {
    return {
        restrict: 'E',
        scope: {
            code: '='
        },
        templateUrl: './src/template/pad.html',
        link: function(scope) {

            scope.enterCode = (character) => {
                flowLogger.actionEvent("Pad key pressed");
                if(scope.code.indexOf("_") !== -1) {
                    VendingMachineAction.enterCode(character);
                }
            }

            scope.resetCode = () => {
                flowLogger.actionEvent("Reset button pressed");
                VendingMachineAction.resetCode();
            }

            scope.makePurchase = (code) => {
                flowLogger.actionEvent("Purchase button pressed");
                VendingMachineAction.purchase(code);
            }

        }
    }
}
