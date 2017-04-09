// TODO : new component functionality.

import { h, patch } from '../dom/pandom.ts';
import { thunk } from '../dom/thunk.ts';

export abstract class Component {

    _refs :Map<String, any> = new Map;

    private _node : any;
    public get node() : any {
        return this._node;
    }
    public set node(v : any) {
        this._node = v;
    }

    private _mountedOn : any;
    public get mountedOn() : any {
        return this._mountedOn;
    }
    public set mountedOn(v : any) {
        this._mountedOn = v;
    }

    private _props : Object = {};
    public get props() : Object {
        return this._props;
    }
    public set props(v : Object) {
        this._props = v;
    }

    beforeMount() {

    }

    constructor() {

        this.beforeMount();

        try {
            this._node = this.render();
            if (this._node !== undefined) {
                // clone props
                this.props = (Object.assign(this._node.data, this.props))
            }
            else {
                throw new Error("Pan.Component.Render() did not return a node.");
            }
        }
        catch(e) {
            console.log(e);
        }

        this.findRefs(undefined);

        return this;
    }

    setProps(props : Object) {
        for ( let key in props) {
            if (props.hasOwnProperty(key)) {
                this.props[key] = props[key];
            }
        }
        console.log(this.props);
        this.update()
    }

    
    update() {
        patch(this.node, this.render());
    }

    findRefs(node) {

        if (node === null) {
            return;
        }

        if (node === undefined) {
            node = this.node;
        }

        if (node.data.ref) {
            this._refs.set(node.data.ref, node);
        }

        if (node.children) {
            for (let child of node.children) {
                this.findRefs(child);
            }
        }
    }


    abstract render(): void;
}