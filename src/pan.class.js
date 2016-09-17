/**
 * @class    pan
 * @author   Ariel Saldana / http://ariel.io
 */
var Pan = {};

Pan.enableMouse = function(){
    Pan.mouse = new Mouse();
}

Pan.enableKeyboard = function(){
    Pan.keyboard = new Keyboard();
}

Pan.enableViewport = function(){
    Pan.viewport = new Viewport();
}

Pan.enableTicker = function(){
    Pan.ticker = new Ticker();
}


Pan.enableTools = function() {
    Pan.viewport = new Viewport();
    Pan.keyboard = new Keyboard();
    Pan.mouse = new Mouse();
    Pan.ticker = new Ticker();
}