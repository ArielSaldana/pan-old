/**
 * @class    page.js
 * @author   Ariel Saldana / http://ahhriel.com
 */
( function()
{
    'use strict';

    Pan.Tools.Page = Pan.Core.Abstract.extend(
    {
        static  : 'page',
        options : {

        },

        construct : function(options){
          this._super( options );

        },

        scrollTo: function(){

        },

        scrollFrom : function(){
          
        }

        /**
         * Remove get json data over ajax
         * @param  {string}   url        url
         * @param  {function} callback   error and data callback
         * @return {object}              object context
         */
    } );
} )();
