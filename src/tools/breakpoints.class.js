/**
 * @class    breakpoints.class.js
 * @author   Ariel Saldana / http://ariel.io
 * TODO:     Add support to add options to he ajax request. (Headers)
 */
breakpointsInstance = null;

class Breakpoints {

    constructor(options) {

        super(options);

        if (!breakpointsInstance)
            breakpointsInstance = this;

        this.viewport = new Viewport();
        this.all = {};
        this.actives = {};
        this.first_test = true;

        this.add(this.options.breakpoints);

        return breakpointsInstance;

    }

    init_events() {
        this.viewport.on('resize', function () {
            this.test();
        })
    }

    add(breakpoints, silent) {
        silent = typeof silent === 'undefined' ? true : false;

        if (!(breakpoints instanceof Array))
            breakpoints = [breakpoints];

        for (var i = 0; i < breakpoints.length; i++) {
            var breakpoint = breakpoints[i];
            this.all[breakpoint.name] = breakpoint;
        }

        // test breakpoints

        if (!silent)
            this.test();

        return this;

    }

    remove(breakpoints, silent) {

        if (!(breakpoints instanceof Array))
            breakpoints = [breakpoints.name];

        if (typeof breakpoint === 'object' && typeof breakpoint.name === 'string')
            breakpoints = breakpoing.name;

        silent = typeof silent === 'undefined' ? false : true;

        for (var i = 0; i < breakpoints.length; i++) {
            delete this.all[breakpoints[i]];
        }

        if (!silent)
            this.test();

        return this;
    }

    test() {

    }

}