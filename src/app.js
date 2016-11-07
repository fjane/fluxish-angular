import angular from "angular";

import flowLogger from "./flowLogger";

import VendingMachineAction from "./action/VendingMachineAction";
import ScreenStore from "./store/ScreenStore";
import VendorStore from "./store/VendorStore";
import MainController from "./controller";

import controlPadDirective from "./directives/padDirective";
import productImageDirective from "./directives/productDirective";
import vendorPanelDirective from "./directives/vendorDirective";

import ProductsData from "./storage/data";

import jkFlux from "./dispatcher/jkFlux";

import dbProductStorage from './storage/dbProductStorage';

angular.module('vmApp', [])
    // Dispatcher instance
    .constant('dispatcher', new jkFlux.Dispatcher())

    // Initial products
    .value('VendingMachineProducts', ProductsData)

    // action services
    .factory('VendingMachineAction', ['dispatcher', 'flowLogger', VendingMachineAction])

    // storage service
    .factory('ScreenStore', ['dispatcher', 'dbProductStorage', '$injector', 'flowLogger', ScreenStore])

    // storage service
    .factory('VendorStore', ['dispatcher', 'dbProductStorage', 'flowLogger' , 'ScreenStore', VendorStore])

	// logger
    .factory('flowLogger', flowLogger)

    // DB services
    .factory('dbProductStorage', ['VendingMachineProducts', dbProductStorage])

    .controller('vmCtrl', ['$scope', 'ScreenStore', 'VendorStore', MainController])

    // directives
    .directive('actionPad', ['VendingMachineAction', 'flowLogger', controlPadDirective])
    .directive('productImage', ['$compile', productImageDirective])
    .directive('vendorPanel', ['VendingMachineAction', 'flowLogger', vendorPanelDirective])

    .value('VendingMachineProducts', ProductsData)
    .run(function (ScreenStore, VendorStore, VendingMachineAction, flowLogger, dbProductStorage) {
        flowLogger.actionEvent("application initialization");
        dbProductStorage.setProducts();
        VendingMachineAction.init();
    });

