import angular from "angular";

import VendingMachineAction from "./action/VendingMachineAction";
import CounterStore from "./store/CounterStore";
import ScreenStore from "./store/ScreenStore";
import MainController from "./controller";


angular.module('vmApp', [])
  .constant('dispatcher', new simflux.Dispatcher())
  .factory('VendingMachineAction', ['dispatcher', VendingMachineAction])
  .factory('CounterStore', ['dispatcher', 'VendingMachineProducts', CounterStore])
  .factory('ScreenStore', ['dispatcher', 'VendingMachineProducts', ScreenStore])
  .controller('vmCtrl', ['$scope', 'VendingMachineAction', 'ScreenStore', 'CounterStore', MainController])
    .value('VendingMachineProducts', [
        {name: 'CocaCola', productId: 1, quantity: 5},
        {name: 'Sprite', productId: 2, quantity: 4},
        {name: 'Fanta', productId: 3, quantity: 8}
    ])
    .run(function(ScreenStore, CounterStore, VendingMachineAction) {
      VendingMachineAction.init();
  });
;
