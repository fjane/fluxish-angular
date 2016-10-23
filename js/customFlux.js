var simflux;

(function() {

    var Flux = (typeof window !== 'undefined') && window.Flux;

    if (!Flux && ((typeof module !== 'undefined' && module.exports) || typeof define == 'function' && typeof define.amd == 'object' && define.amd)) {
        Flux = require('flux');
    }

    simflux = {
        version: 'pre-beta',
        Dispatcher: SimfluxDispatcher,
        dispatchers: []
    };

    function SimfluxDispatcher(name) {
        simflux.dispatchers.push(this);
        this.name = name;
        this.fluxDispatcher = new Flux.Dispatcher();
        this.actionCreators = [];
        this.stores = [];
    }

    SimfluxDispatcher.prototype.registerStore = function(store) {
        this.stores.push(store);
        store.$$$stack = new Error().stack;
        store.$$$dispatcherToken = this.fluxDispatcher.register(function(payload) {
            if (store[payload.action]) store[payload.action].apply(store, payload.args);
        });
        return store;
    };

    SimfluxDispatcher.prototype.unregisterStore = function(store) {
        this.fluxDispatcher.unregister(store.$$$dispatcherToken);
        delete store.$$$dispatcherToken;
        return store;
    };

    // unlike Facebook's dispatcher, the first argument is action and after that
    // we can pass in any number of arguments
    //
    // Original: dispatcher.dispatch({ type: 'ACTION_TYPE', data: {whatever:data} })
    //      New: dispatcher.dispatch('ACTION_TYPE', arg1, arg2, ...)
    SimfluxDispatcher.prototype.dispatch = function(action) {

        return this.fluxDispatcher.dispatch({
            action: action,
            args: Array.prototype.slice.call(arguments, 1)
        });
    };

    // waitFor takes a list of stores instead of tokens
    SimfluxDispatcher.prototype.waitFor = function (stores) {
        var tokens = [];
        for (var i=0; i<stores.length; i++) {
            tokens.push(stores[i].$$$dispatcherToken);
        }
        return this.fluxDispatcher.waitFor(tokens);
    };

    // todo: use prototypical inheritance instead
    SimfluxDispatcher.prototype.isDispatching=function() {
        return this.fluxDispatcher.isDispatching();
    };

    SimfluxDispatcher.prototype.registerActionCreator = function (ac) {
        ac.$$$stack = new Error().stack;
        this.actionCreators.push(ac);
        return ac;
    };

    // requirejs compatibility
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        define(function() {
            return simflux;
        });
    } else {
        if (typeof window !== 'undefined') window.simflux = simflux;
    }

})();

if (typeof module !== 'undefined' && module.exports) module.exports = simflux;
