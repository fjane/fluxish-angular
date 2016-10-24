module.exports = (dispatcher) =>
    dispatcher.registerActionCreator({
        init: () => {
            dispatcher.dispatch('action:init');
        },
        purchase: (product) => {
            dispatcher.dispatch('action:purchase', product);
        },

        enterCode: (code) => {
            dispatcher.dispatch('action:enterCode', code);
        },

        resetCode: () => {
            dispatcher.dispatch('action.resetCode');
        }
    });