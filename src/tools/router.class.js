/**
 * @class    Router
 * @author   Ariel Saldana / http://ariel.io
 * TODO:     incrimentaldom example. in router.html on change!
 */

import {
    History
} from './history.class';

let routerInstance = null;

export class Router extends History {

    /**
     * Initialize
     * @constructor
     */
    constructor(options) {
        super();

        if (!routerInstance)
            routerInstance = this;

        this.options = {
            routerLinks: {
                selector: "pan-link",
                preventDefault: true
            },

            routes: []
        }

        if (options)
            Object.assign(this.options, options);

        this.routes = {};

        this.initLinks();
        this.initRoutes();

        return routerInstance;
    }

    // consider moving this to Pan.hash(), instead of in this class.
    hash(str) {
        var hash = 0,
            i, chr, len;
        if (str.length === 0) return hash;
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    initRoutes() {
        for (var route of this.options.routes) {
            var URL = this.createUrl(route.path);
            var hash = this.hash(URL.pathname);
            this.routes[hash] = route
        }
    }

    initLinks() {
        let links = document.querySelectorAll('[pan-link]');

        for (var link of links) {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                this.route(e.srcElement.pathname);
            })
        }
    }

    route(path) {
        var hash = this.hash(path);
        var route = this.routes[hash];

        if (route == undefined)
            console.warn("That is not a defined route.")
        else {
            this.push(route, route.title, route.path);
        }
    }
}