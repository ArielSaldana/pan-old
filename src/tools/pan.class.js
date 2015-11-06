/**
 * @class    pan
 * @author   Ariel Saldana / http://ahhriel.com
 * @function this executes automatically and defines pan and _ referencing pan.
 */
( function()
{
    'use strict';



    Pan.Tools.Pan = Pan.Core.Event_Emitter.extend(
    {
        static  : 'pan',

        construct : function( options )
        {
            this._super( options );
            return this;
        },

        func : function(_func) {
          var that = this;

          this._func = _func;

          return function(){
            alert('Called a function');
            that._func();
          }
        },

        pan : function(){
          new this.func(function(){

          })
        },

        // pan: function(_pan)
        // {
        //   this._pan = _pan;
        //
        //   return function(){
        //     alert('called a function');
        //     this._func();
        //   }
        //   console.log('yep');
        // },

        on : function (el, eventName, handler)
        {
            if (el.addEventListener) {
              el.addEventListener(eventName, handler);
            }
            else {
              el.attachEvent('on' + eventName, function(){
                handler.call(el);
              });
            }
        },

        off : function(el, eventName, handler)
        {
          if (el.removeEventListener)
            el.removeEventListener(eventName, handler);
          else
            el.detachEvent('on'+ eventName, handler);
        },

        ready : function(fn)
        {
          if (document.readyState != 'loading'){
            fn();
          }
          else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
          }
          else {
            document.attachEvent('onreadystatechange', function(){
              if (document.readyState != 'loading')
                fn();
            })
          }
        },

        fadeIn : funcion (el)
        {
          var opacity = 0;

          el.style.opacity = 0;
          el.style.filter = '';

          var last = +new Date();
          var tick = function() {
            opacity += (new Date() - last) / 400;
            el.style.opacity = opacity;
            el.style.filter = 'alpha(opacity=' + (100 * opacity)|0 + ')';

            last = +new Date();

            if (opacity < 1) {
              (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
          };
          tick();
        },

        empty : function(el)
        {
          while(el.firstChild)
          el.removeChild(el.firstChild);
        }




    } );

    var pan = new Pan.Tools.Pan();

    // return pan;
    return (window.pan = window._ = pan)
    // return (Pan.tools.Pan)




} )(this);
