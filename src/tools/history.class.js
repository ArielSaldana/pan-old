/**
 * @class    History
 * @author   Ariel Saldana / http://ariel.io
 */

import { EventEmitter } from '../core/event_emitter.class';

let historyInstance = null;

export class History extends EventEmitter {
    
    /**
     * Initialise 
     * @constructor
     */
    constructor () {
        super();

        this.history = window.history;
        this.baseUrl = window.location;

        this.url = '';
        this.data = '';
        
        if (!historyInstance)
            historyInstance = this;
            
        return historyInstance;
    }

    /**
     * Evit a URL changed event_emitter
     * @return {object} Context
     */
    emitEvent() {
        this.trigger('change', [this.url, this.data]);
        return this;
    }

    /**
     * Create a URL Object
     * @param {string} path URL path
     * @return {object} URL context 
     */
    createUrl(path) {
        return new URL(path, this.baseUrl.href);
    }

    /** 
     * Move forward or backwards in history
     * @param {integer} amount The amount to go forward or backwards
     * @return {object} Context
     */
    go(amount) {
        if (!amount)
            throw new Error("missing ammount")
        this.history.go(amount);

        return this;
    }

    /**
     * Move backwards in History
     * @return {object} Context
     */
    goBack() {
        this.go(-1);
        return this;
    }

    /**
     * Move forward in History
     * @return {object} Context
     */
    goFoward() {
        this.go(1);
        return this;
    }

    /**
     * Returns the number of entries in History
     * @return {integer} length
     */
    getNumberOfEntries() {
        return this.history.length;
    }

    /**
     * Push state to history, use this if you want to record the state to history.
     * @param {object} stateObj A State object
     * @param {string} title The title of the page
     * @param {string} url The url
     * @return {object} Context
     */
    push(stateObj, title, url) {

        // update page title
        if (title)
            document.title = title;

        this.history.pushState(stateObj, title, url);

        this.url = this.createUrl(url);
        this.emitEvent();

        return this;
    }

    /**
     * replace state to history, using this method wont record the url change in history.
     * @param {object} stateObj A State object
     * @param {string} title The title of the page
     * @param {string} url The url
     * @return {object} Context
     */
    replace(stateObj, title, url) {
        return this;
    }
}