export namespace Pan {
    export class EventEmitter {
        private static _instance: EventEmitter;
        private constructor() {

        }

        log() {
            console.log("logged");
        }

        public static get Instance() {
            return this._instance || (this._instance = new this());
        }
    }
}
