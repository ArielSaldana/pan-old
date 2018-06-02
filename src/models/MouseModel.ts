export interface MouseModel {
    position: MousePosition,
    mouseDown: boolean;
    element: any;
    delta: MouseDelta;
}

export interface position {
    x: number;
    y: number;
    ratio?: position
}

export interface MousePositionPage extends position {};

export interface MousePositionViewport extends position {};

export interface MouseDelta extends position {};

export interface MousePosition {
    page: MousePositionPage;
    viewport: MousePositionViewport;
}

