import angular from "angular";

import VendingMachineAction from "./action/VendingMachineAction";
import ScreenStore from "./store/ScreenStore";
import MainController from "./controller";
import controlPadComponent from "./directives/controlPadComponent";
import productImageDirective from "./directives/productImageDirective";

import ProductsData from "./data";


angular.module('vmApp', [])
    .constant('dispatcher', new simflux.Dispatcher())
    .factory('VendingMachineAction', ['dispatcher', VendingMachineAction])
    .factory('ScreenStore', ['dispatcher', 'VendingMachineProducts', ScreenStore])
    .controller('vmCtrl', ['$scope', 'ScreenStore', MainController])
    .directive('actionPad', controlPadComponent)
    .directive('productImage', ['$compile', productImageDirective])
    .value('VendingMachineProducts', ProductsData)
    .run(function (ScreenStore, VendingMachineAction) {
        VendingMachineAction.init();
    });

