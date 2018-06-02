import { EventEmitter } from "../core/event-emitter";
import { MouseModel } from "../models/MouseModel";
import { Viewport } from "./Viewport";

export class Mouse extends Viewport {
    private static _mouseInstance: Mouse;
    private mouseModel: MouseModel;

    protected constructor() {
        super();
        this.mouseModel = {
            position: {
                page: {x: 0, y: 0, ratio: {x: 0, y:0}},
                viewport: {x: 0, y: 0, ratio: {x: 0, y:0}},
            },
            delta: {
                x: 0,
                y: 0
            },
            element: null,
            mouseDown: false
        }

        this.initEvents();
    }

    public static get Instance() {
        return this._mouseInstance || (this._mouseInstance = new this());
    }

    initEvents() {
        document.addEventListener('mousemove', this.mouseMoveEvent.bind(this));
        document.addEventListener('mousedown', this.mouseDownEvent.bind(this));
        document.addEventListener('mouseup', this.mouseUpEvent.bind(this));
    }

    // events

    mouseEvent(ev: MouseEvent) {
        ev.preventDefault();
        ev.stopPropagation();

        this.mouseModel.position.page.x = ev.pageX;
        this.mouseModel.position.page.y = ev.pageY;
        this.mouseModel.position.viewport.x = ev.clientX;
        this.mouseModel.position.viewport.y = ev.clientY;
        this.mouseModel.position.viewport.ratio.x = ev.clientX / this.viewportModel.width;
        this.mouseModel.position.viewport.ratio.y = ev.clientY / this.viewportModel.height;

        this.mouseModel.element = ev.target;
        this.mouseModel.delta.x = ev.movementX;
        this.mouseModel.delta.y = ev.movementY;
    }

    mouseUpEvent (ev: MouseEvent) {
        this.mouseEvent(ev);
        this.mouseModel.mouseDown = false;
        this.emit('up', this.mouseModel);
    }

    mouseDownEvent(ev: MouseEvent) {
        this.mouseEvent(ev);
        this.mouseModel.mouseDown = true;
        this.emit('down', this.mouseModel);
    }

    mouseMoveEvent(ev: MouseEvent) {
        this.mouseEvent(ev);
        this.emit('move', this.mouseModel);
    }
}