import angular from "angular";

import flowLogger from "./flowLogger";

import VendingMachineAction from "./action/VendingMachineAction";
import ScreenStore from "./store/ScreenStore";
import MainController from "./controller";
import controlPadComponent from "./directives/controlPadComponent";
import productImageDirective from "./directives/productImageDirective";

import ProductsData from "./data";

import F from "./ourFlux";

/*console.log(new F.Dispatcher());*/


angular.module('vmApp', [])
    .constant('dispatcher', new  F.Dispatcher())
    .factory('VendingMachineAction', ['dispatcher', 'flowLogger', VendingMachineAction])
    .factory('ScreenStore', ['dispatcher', 'VendingMachineProducts', 'flowLogger', ScreenStore])
    .factory('flowLogger', flowLogger)
    .controller('vmCtrl', ['$scope', 'ScreenStore', MainController])
    .directive('actionPad', ['VendingMachineAction', 'flowLogger', controlPadComponent])
    .directive('productImage', ['$compile', productImageDirective])
    .value('VendingMachineProducts', ProductsData)
    .run(function (ScreenStore, VendingMachineAction, flowLogger) {
        flowLogger.actionEvent("application initialization");
        VendingMachineAction.init();
    });

