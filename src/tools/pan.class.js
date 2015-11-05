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

        on : function (element, eventName, handler)
        {
            if (element.addEventListener) {
              el.addEventListener(eventName, handler);
            }
            else {
              element.attachEvent('on' + eventName, function(){
                handler.call(element);
              });
            }
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
        }


    } );

    var pan = new Pan.Tools.Pan();

    function pan(s, s2) {
      console.log('called');
    }

    return (window.pan = window._ = pan)

} )(this);
