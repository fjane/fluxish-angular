import Flux from 'flux';
import flowLogger from './flowLogger';


let jkFlux = {
    Dispatcher: JKDispatcher
};

function JKDispatcher() {
    this.fluxDispatcher = new Flux.Dispatcher();
    this.actions = [];
    this.stores = [];
}

JKDispatcher.prototype.registerStore = function(store) {
    this.stores.push(store);
    store.$dispatcherToken = this.fluxDispatcher.register(function(payload) {
        if(store[payload.action]) {
            store[payload.action].apply(store, payload.args);
        }
    });
    return store;
}

JKDispatcher.prototype.unregisterStore = function(store) {
    this.fluxDispatcher.unregister(store.$$$dispatcherToken);
    delete store.$dispatcherToken;
    return store;
}

JKDispatcher.prototype.dispatch = function(action) {
    flowLogger().dispatcherLog(action);
    return this.fluxDispatcher.dispatch({
        action:action,
        args: Array.prototype.slice.call(arguments, 1)
    });
}

JKDispatcher.prototype.registerAction = function(ac) {
    this.actions.push(ac);
    return ac;
}

JKDispatcher.prototype.waitForStores = function(stores) {
    var tokens = [];
    for (let i=0; i < stores.length; i++) {
        tokens.push(stores[i].$dispatcherToken);
    }
    return this.fluxDispatcher.waitFor(tokens);
}

module.exports = jkFlux;