module.exports = (dispatcher) =>
    dispatcher.registerActionCreator({
        init: () => {
            dispatcher.dispatch('action:init');
        },
        purchase: (code) => {
            dispatcher.dispatch('action:purchase', {code});
        },

        enterCode: (character) => {
            dispatcher.dispatch('action:enterCode', {character});
        },

        resetCode: () => {
            dispatcher.dispatch('action.resetCode');
        }
    });