module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1589206630882, function(require, module, exports) {
class TcbRouter {

    constructor({ event = {} } = {}) {

        // 中间件
        this._routerMiddlewares = {};
        this._req = { event, url: event.$url };
        this._res = {};
    }

    /**
     * add path to _routerMiddlewares
     * @param {String} path
     */
    _addRoute(path) {
        if (!this._routerMiddlewares.hasOwnProperty(path)) {
            this._routerMiddlewares[path] = {
                middlewares: []
            };
        }
    }

    /**
     * add middleware to _routerMiddlewares
     * @param {String|Array} path
     * @param {Function} middleware
     */
    _addMiddleware(path, middleware) {
        let paths = [];

        if (Array.isArray(path)) {
            paths = path;
        }
        else {
            paths = [path];
        }

        paths.forEach((p) => {
            this._addRoute(p);
            this._routerMiddlewares[p].middlewares.push(middleware);
        });
    }

    /**
     * use middleware for all routes
     * @param {String} path
     * @param {Function} middleware
     */
    use() {
        let path = null;
        let handler = null;

        if (arguments.length === 1) {
            path = '*';
            handler = arguments[0];
        }
        else if (arguments.length > 1) {
            path = arguments[0];
            handler = arguments[1];
        }

        if (typeof handler !== 'function') {
            return console.warn('Handler should be a function. The middleware is not installed correctly.');
        }

        this._addMiddleware(path, handler);
    }

    /**
     * set routes
     * @param {String|Array} path 
     * @param {Function} middleware
     */
    router(path = '*') {

        for (let i = 1, len = arguments.length; i < len; i++) {
            let handler = arguments[i];
            if (typeof handler !== 'function') {
                return console.warn('Handler should be a function. The middleware is not installed correctly.');
            }

            this._addMiddleware(path, handler);
        }
    }

    /**
     * start the route server
     */
    serve() {

        let _routerMiddlewares = this._routerMiddlewares;
        let url = this._req.url;

        // try to  match path
        if (_routerMiddlewares.hasOwnProperty(url)
            || _routerMiddlewares.hasOwnProperty('*')) {
            let middlewares = (_routerMiddlewares[url]) ? _routerMiddlewares[url].middlewares : [];
            // put * path middlewares on the queue head
            if (_routerMiddlewares['*']) {
                middlewares = [].concat(_routerMiddlewares['*'].middlewares, middlewares);
            }

            const fn = compose(middlewares);

            return new Promise((resolve, reject) => {
                fn(this).then((res) => {
                    resolve(this.body);
                }).catch(reject);
            });
        }
        else {
            return new Promise((resolve) => {
                resolve();
            });
        }

    }
}

function compose(middleware) {
    if (!Array.isArray(middleware)) {
        throw new TypeError('Middleware must be an array!');
    }
    for (const fn of middleware) {
        if (typeof fn !== 'function') {
            throw new TypeError('Handler should be a function. The middleware is not installed correctly.');
        }
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return function (context, next) {
        // parameter 'next' is empty when this the main flow
        // last called middleware #
        let index = -1;

        // dispatch the first middleware
        return dispatch(0);

        function dispatch(i) {
            if (i <= index) {
                return Promise.reject(new Error('next() called multiple times'));
            }

            index = i;

            // get the handler and path of the middlware
            let handler = middleware[i];

            // reach the end, call the last handler 
            if (i === middleware.length) {
                handler = next;
            }

            // if handler is missing, just return Promise.resolve
            if (!handler) {
                return Promise.resolve();
            }

            try {
                // handle request, call handler one by one using dispatch
                // Promise.resolve will help trigger the handler to be invoked
                return Promise.resolve(handler(context, dispatch.bind(null, i + 1)));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
    }
}

module.exports = TcbRouter;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1589206630882);
})()
//# sourceMappingURL=index.js.map