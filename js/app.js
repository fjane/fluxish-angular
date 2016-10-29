import angular from "angular";

import flowLogger from "./flowLogger";

import VendingMachineAction from "./action/VendingMachineAction";
import ScreenStore from "./store/ScreenStore";
import MainController from "./controller";
import controlPadComponent from "./directives/controlPadComponent";
import productImageDirective from "./directives/productImageDirective";

import ProductsData from "./data";

import jkFlux from "./jkFlux";

import dbProductStorage from './dbProductStorage';

angular.module('vmApp', [])
    .constant('dispatcher', new  jkFlux.Dispatcher())
    .factory('VendingMachineAction', ['dispatcher', 'flowLogger', VendingMachineAction])
    .factory('ScreenStore', ['dispatcher', 'dbProductStorage', 'flowLogger', ScreenStore])
    .factory('flowLogger', flowLogger)
    .factory('dbProductStorage', ['VendingMachineProducts', dbProductStorage])
    
    .controller('vmCtrl', ['$scope', 'ScreenStore', MainController])
    .directive('actionPad', ['VendingMachineAction', 'flowLogger', controlPadComponent])
    .directive('productImage', ['$compile', productImageDirective])
    .value('VendingMachineProducts', ProductsData)
    .run(function (ScreenStore, VendingMachineAction, flowLogger, dbProductStorage) {
        flowLogger.actionEvent("application initialization");
        dbProductStorage.setProducts();
        VendingMachineAction.init();
    });

