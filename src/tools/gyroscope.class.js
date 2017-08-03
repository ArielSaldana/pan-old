/**
 * @class    Gyroscope
 * @author   Ariel Saldana / http://ariel.io
 */

import { EventEmitter } from '../core/event_emitter.class';

let gyroscopeInstance = null;

export class Gyroscope extends EventEmitter {
    
    /**
     * Initialise 
     * @constructor
     */
    constructor (options) {
        super(options);
        
        if (!gyroscopeInstance)
            gyroscopeInstance = this;

        this.options = {};

        if (options)
            Object.assign(this.options, options);

        this.alpha = 0;
        this.beta = 0;
        this.gamma = 0;

        this.listen_to_events();
            
        return gyroscopeInstance;
    }

    listen_to_events() {
        let handle_motion = (e) => {
        };

        let handle_orientation = (e) => {
            this.trigger('orientation', [e.alpha, e.beta, e.gamma]);
        }

        // window.addEventListener("devicemotion", this.handle_motion, false );
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handle_orientation, false);
        }


        // window.fireEvent("deviceorientation");
        // window.dispatchEvent(new Event('deviceorientation'));
    }
}