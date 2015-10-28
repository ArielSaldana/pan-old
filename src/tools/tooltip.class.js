/**
 * @class    Tooltip
 * @author   Ariel Saldana / http://ahhriel.com
 * @info     methods of convering html data into objects or bytes for transport.
 */
( function()
{
    'use strict';

    Pan.Tools.Tooltip = Pan.Core.Abstract.extend(
    {
        static  : 'html_serializer',
        options :
        {

        },

        /**
         * Initialise and merge options
         * @constructor
         * @param {object} options Properties to merge with defaults
         */
        construct : function( options )
        {
            this._super( options );
            this.tooltipArray = document.querySelectorAll('[data-toggle]');
            this.tooltipTopOffset = 8;

            this.listen_to_events();
        },
        /**
         * setup listeners
         * @return object context
         */
        listen_to_events : function(){
          var that = this;
          [].forEach.call(
            this.tooltipArray,function(e){
              e.addEventListener('mouseover',function(){that.mouseEnter(e)},false),
              e.addEventListener('mouseout',function(){that.mouseLeave(e)},false)
            }
          )
          return this;
        },

        /**
         * handle the mouseover event
         */
        mouseEnter : function(e){
          var idToSet = 'tooltip'+ (Math.floor(Math.random()*90000) + 10000);
          e.setAttribute('aria-describedby',idToSet);
          this.createTooltipElement(idToSet, e);
        },

        /**
         * handle the mouseout event
         */
        mouseLeave : function(e){
          var idToRemove = e.getAttribute('aria-describedby');
          Element.prototype.remove = function() {
              this.parentElement.removeChild(this);
          },
          document.getElementById(idToRemove).remove();

          e.removeAttribute('aria-describedby');

          return this;
          //console.log('Left');
        },

        /**
         * create a tooltip element on the dom
         * @return object context
         */
        createTooltipElement : function(id, parentElement){
          var that = this;
          var innerText = parentElement.getAttribute('data-content');
          var tooltip = document.createElement('div');
          tooltip.innerHTML = innerText;
          tooltip.className = "pan-tooltip pan-tooltip-initial";
          tooltip.id = id;

          document.body.appendChild(tooltip);

          // calculate left
          var toolTipInfo = tooltip.getBoundingClientRect();
          var parentInfo = parentElement.getBoundingClientRect();
          var middleOfParent = (parentInfo.left + parentInfo.right) / 2;
          var middleOfTooltip= (toolTipInfo.left + toolTipInfo.right) / 2;
          var widthOfTooltip = (toolTipInfo.right - toolTipInfo.left),
              halfToolTip    = widthOfTooltip / 2;

          tooltip.style.left = middleOfParent - halfToolTip + 'px';

          // calculate top
          var heightOfTooltip = toolTipInfo.bottom - toolTipInfo.top;
          tooltip.style.top = parentInfo.top - (this.tooltipTopOffset+8+heightOfTooltip) + 'px';

          tooltip.className = 'pan-tooltip pan-tooltip-load';
          // setTimeout(function () {
          //   tooltip.style.top = parentInfo.top - (this.tooltipTopOffset+heightOfTooltip) + 'px';
          // }, 10);

          window.setTimeout(function(){
             tooltip.style.top = parentInfo.top - (that.tooltipTopOffset+heightOfTooltip) + 'px';
            console.log('fukc');
          }, 10);

          // tooltip.style.top = parentInfo.top - (this.tooltipTopOffset+heightOfTooltip) + 'px';

          return this;
        },

        /**
         * get the cumulativeOffset
         * @return x / y coordinate of top left corner
         */

        cumulativeOffset : function(element){
          var top = 0, left = 0;
          do {
              top += element.offsetTop  || 0;
              left += element.offsetLeft || 0;
              element = element.offsetParent;
          } while(element);

          return {
              top: top,
              left: left
          };
        }
    });
})();
