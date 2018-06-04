export class EventEmitter {
    private static _instance: EventEmitter;
    private map: any;
    // private constructor() {
    //     this.map = {};
    // }

    protected constructor() {
        this.map = {};
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    on(identifier: string, callback: Function) {
        let key = this.map[identifier];

        if (key === undefined || key === null) {
            this.map[identifier] = new Array();
        }
        this.map[identifier].push(callback);
    }

    protected emit(identifer: string, ... args: any[]) {
        let callbacks = this.map[identifer];

        if (callbacks === undefined || callbacks === null) {
            return;
        }

        for (const callback of callbacks) {
            callback(... args);
        }
    }
}
