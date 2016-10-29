import Flux from 'flux';
import flowLogger from './flowLogger';


let ourFlux = {
    Dispatcher: OurDispatcher
};

function OurDispatcher() {
    this.fluxDispatcher = new Flux.Dispatcher();
    this.actions = [];
    this.stores = [];
}

OurDispatcher.prototype.registerStore = function(store) {
    this.stores.push(store);
    store.$dispatcherToken = this.fluxDispatcher.register(function(payload) {
        if(store[payload.action]) {
            store[payload.action].apply(store, payload.args);
        }
    });
    return store;
}

OurDispatcher.prototype.unregisterStore = function(store) {
    this.fluxDispatcher.unregister(store.$$$dispatcherToken);
    delete store.$dispatcherToken;
    return store;
}

OurDispatcher.prototype.dispatch = function(action) {
    flowLogger().dispatcherLog(action);
    return this.fluxDispatcher.dispatch({
        action:action,
        args: Array.prototype.slice.call(arguments, 1)
    });
}

OurDispatcher.prototype.registerAction = function(ac) {
    this.actions.push(ac);
    return ac;
}

module.exports = ourFlux;