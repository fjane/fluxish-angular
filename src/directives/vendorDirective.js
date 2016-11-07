export default (VendingMachineAction, flowLogger) => ({
    restrict: 'E',
    scope: {
        missingProducts: '=',
    },
    templateUrl: 'src/template/vendorPanel.html',
    link: function(scope) {

        scope.refillProducts = function(){
            VendingMachineAction.refill();
        }
    },
})