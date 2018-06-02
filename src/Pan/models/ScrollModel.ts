export interface ScrollModel {
    position: ScrollPosition;
    delta: ScrollDelta;
};

export interface ScrollPosition {
    x: number;
    y: number;
};

export interface ScrollDelta extends ScrollPosition {};