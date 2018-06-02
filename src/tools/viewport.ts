import { EventEmitter } from "../core/event-emitter";
import { ViewportModel } from "../models/ViewportModel"

export class Viewport extends EventEmitter {
    private static _viewportInstance: Viewport;
    protected viewportModel : ViewportModel;

    protected constructor() {
        super();

        this.viewportModel = {
            aspectRatio: 0,
            devicePixelRatio:0,
            height: 0,
            width: 0,
        };

        this.initEvents();
        this.resizeCallback();
    }

    public static get Instance() {
        return this._viewportInstance || (this._viewportInstance = new this());
    }

    initEvents() {
        window.addEventListener('resize', (e) => {this.resizeCallback(e)});
    }

    resizeCallback(e?: any) {
        this.viewportModel.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.viewportModel.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.viewportModel.devicePixelRatio = window.devicePixelRatio;
        this.viewportModel.aspectRatio = this.viewportModel.width / this.viewportModel.height;
       
        this.emit('resize', this.viewportModel);
    }

    public emitUpdate() {
        this.resizeCallback();
    }
}