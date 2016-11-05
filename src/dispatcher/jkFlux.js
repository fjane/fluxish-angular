import Flux from 'flux';
import flowLogger from '../flowLogger';

class JKDispatcher {
    constructor() {
        this.fluxDispatcher = new Flux.Dispatcher();
        this.actions = [];
        this.stores = [];
    }

    registerStore(store) {
        this.stores.push(store);
        store.$dispatcherToken = this.fluxDispatcher.register(function(payload) {
            if(store[payload.action]) {
                store[payload.action].apply(store, payload.args);
            }
        });
        return store;
    }

    dispatch(action) {
        flowLogger().dispatcherLog(action);
        return this.fluxDispatcher.dispatch({
            action:action,
            args: Array.prototype.slice.call(arguments, 1)
        });
    }

    registerAction(ac) {
        this.actions.push(ac);
        return ac;
    }

    waitForStores(stores) {
        var tokens = [];
        for (let i=0; i < stores.length; i++) {
            tokens.push(stores[i].$dispatcherToken);
        }
        return this.fluxDispatcher.waitFor(tokens);
    }
}

module.exports = {
    Dispatcher: JKDispatcher
};