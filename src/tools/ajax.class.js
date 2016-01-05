/**
 * @class    Fit.js
 * @author   Ariel Saldana / http://ahhriel.com
 * TODO:     Add support to add options to he ajax request. (Headers)
 */
P.Tools.Ajax = P.Core.Abstract.extend({
    static: 'ajax',
    options: {

    },

    construct: function(options) {
        this._super(options);

    },

    /**
     * Remove get json data over ajax
     * @param  {string}   url        url
     * @param  {function} callback   error and data callback
     * @return {object}              object context
     */

    getJson: function(url, callback) {
        var that = this;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onreadystatechange = function() {

            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    var data = JSON.parse(this.responseText);
                    callback(false, this.responseText);
                    return that;

                } else {
                    // Error :(
                    callback(true);
                    return that;
                }
            }
        };

        request.send();
        request = null;
    },

    /**
     * Remove get json data over ajax
     * @param  {string}   url        url
     * @return {object}              object context
     */

    postJson: function(url) {
        this.request.open('POST', url, true);
        this.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        this.request.send(data);

        return this;
    }
});
