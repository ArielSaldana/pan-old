/**
 * @class    ajax.class.js
 * @author   Ariel Saldana / http://ariel.io
 * TODO:     Add support to add options to he ajax request. (Headers)
 */
offlineInstance = null;

class Offline extends EventEmitter {

    constructor(options) {
        super(options);

        // super(options);

        if (!offlineInstance)
            offlineInstance = this;

        this.options = {
            classes: {
                active: true,
                target: document.body,
                offline: 'offline',
                online: 'online'
            }
        };

        this.status = null;
        this.listen_to_events();

        return offlineInstance;
    }

    listen_to_events() {
        // online
        var change = () => {
            console.log('change');
            if (navigator.online) {
                if (this.options.classes.active) {
                    this.options.classes.target.classList.remove(this.options.classes.offline);
                    this.options.classes.target.classList.add(this.options.classes.online);
                }

                // update status
                this.status = 'online';

                // Trigger bang bang
                this.trigger('online');
                this.trigger('change', [this.status]);
            }

            else {
                if (this.options.classes.active) {
                    this.options.classes.target.classList.remove(this.options.classes.online);
                    this.options.classes.target.classList.add(this.options.classes.offline);
                }

                // update status
                this.status = 'online';

                // trigger
                this.trigger('offline');
                this.trigger('change', [this.status]);

            }
        }

        function test() {
            console.log('shit');
        }

        if (window.addEventListener) {
            window.addEventListener('online', test, false);
            window.addEventListener('offline', test, false);
        }

        else {
            document.body.ononline = change;
            document.body.offline = change;
        }

        window.addEventListener('online', function(e) {
            console.log('fuck');
}, false);

        change();

        return this;

    }
}