import { patch } from '../dom/pandom'
import { Component } from './component.class';

export function Render(element, on) {
    if ( element instanceof Component) {
        element.mountedOn = on;
        patch(on, element.node);
    }
}