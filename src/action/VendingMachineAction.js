module.exports = (dispatcher, flowLogger) =>
    dispatcher.registerAction({
        init: () => {
            flowLogger.actionLog('vendingMachineAction.init()');
            dispatcher.dispatch('action:init');
        },
        purchase: (code) => {
            flowLogger.actionLog('vendingMachineAction.purchase()', `product code: ${code}`);
            dispatcher.dispatch('action:purchase', {code});
        },

        enterCode: (character) => {
            flowLogger.actionLog('vendingMachineAction.enterCode()', `pressed pad key: ${character}`);
            dispatcher.dispatch('action:enterCode', {character});
        },

        resetCode: () => {
            flowLogger.actionLog('vendingMachineAction.resetCode()');
            dispatcher.dispatch('action.resetCode');
        },

        refill: () => {
            flowLogger.actionLog('vendingMachineAction.refill()');
            dispatcher.dispatch('action:refillProducts');
            dispatcher.dispatch('action:goToWarehouse');
        },
    });