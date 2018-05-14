import { EventEmitter } from "../core/event-emitter";

class ViewportModel {
    width: number;
    height: number;
    devicePixelRatio: number;
    aspectRatio: number;

    constructor(width?: number, height?: number, devicePixelRatio?: number, aspectRatio?: number) {
        this.width = width || 0;
        this.height = height || 0;
        this.devicePixelRatio = devicePixelRatio || 0;
        this.aspectRatio = aspectRatio || 0;
    }

    setWidth(width: number) {
        this.width = width;
    }

    setHeight(height: number) {
        this.height = height;
    }

    setDevicePixelRatio(devicePixelRatio: number) {
        this.devicePixelRatio = devicePixelRatio;
    }

    setAspectRatio(aspectRatio: number) {
        this.aspectRatio = aspectRatio;
    }
}

export class Viewport extends EventEmitter {
    private static _viewportInstance: Viewport;
    private viewportModel : ViewportModel;

    protected constructor() {
        super();

        this.viewportModel = new ViewportModel();

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