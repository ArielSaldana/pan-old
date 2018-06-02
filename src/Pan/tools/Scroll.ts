import { Viewport } from "./Viewport";
import { EventEmitter } from "../core/event-emitter";
import { ScrollModel } from "../models/ScrollModel";

export class Scroll extends EventEmitter {
    private static _scrollInstace: Scroll;

    private viewport: Viewport;

    scrollModel: ScrollModel;


    protected constructor() {
        super();
        this.viewport = Viewport.Instance;

        this.scrollModel = {
            position: { x : window.scrollX, y: window.scrollY},
            delta: { x: 0, y: 0}
        };

        this.initEvents();
    }

    public static get Instance() {
        return this._scrollInstace || (this._scrollInstace = new this());
    }

    initEvents() {
        window.addEventListener("scroll", this.scrollEvent.bind(this));
        window.addEventListener("wheel", this.wheelScrollEvent.bind(this));
    }

    scrollEvent(ev: Event) {
        ev.preventDefault();
        ev.stopPropagation();

        const xdiff = this.scrollModel.position.x - window.scrollX;
        const ydiff = window.scrollY - this.scrollModel.position.y;

        this.scrollModel.position.x = window.scrollX;
        this.scrollModel.position.y = window.scrollY;
        this.scrollModel.delta.x = xdiff;
        this.scrollModel.delta.y = ydiff;

        this.emit('scroll', this.scrollModel);
    }

    wheelScrollEvent(ev: WheelEvent) {
        this.scrollModel.position.x = window.scrollX;
        this.scrollModel.position.y = window.scrollY;
        this.scrollModel.delta.x = ev.deltaX;
        this.scrollModel.delta.y = ev.deltaY;

        this.emit('wheel', this.scrollModel);
    }
}