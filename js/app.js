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
    // Dispatcher instance
    .constant('dispatcher', new  jkFlux.Dispatcher())

    // Initial products
    .value('VendingMachineProducts', ProductsData)

    // action services
    .factory('VendingMachineAction', ['dispatcher', 'flowLogger', VendingMachineAction])

    // storage service
    .factory('ScreenStore', ['dispatcher', 'dbProductStorage', 'flowLogger', ScreenStore])

    // logger
    .factory('flowLogger', flowLogger)

    // DB services
    .factory('dbProductStorage', ['VendingMachineProducts', dbProductStorage])
    
    .controller('vmCtrl', ['$scope', 'ScreenStore', MainController])

    // directives
    .directive('actionPad', ['VendingMachineAction', 'flowLogger', controlPadComponent])
    .directive('productImage', ['$compile', productImageDirective])

    .run(function (ScreenStore, VendingMachineAction, flowLogger, dbProductStorage) {
        flowLogger.actionEvent("application initialization");
        dbProductStorage.setProducts();
        VendingMachineAction.init();
    });

