/**
 * @class    Tooltip
 * @author   Ariel Saldana / http://ahhriel.com
 * @info     methods of convering html data into objects or bytes for transport.
 */
Pan.Components.Tooltip = Pan.Core.Abstract.extend({
    static: 'html_serializer',
    options: {

    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct: function(options) {
        this._super(options);
        this.tooltipArray = document.querySelectorAll('[data-toggle]');
        this.tooltipTopOffset = 8;

        this.listen_to_events();
    },
    /**
     * setup listeners
     * @return object context
     */
    listen_to_events: function() {
        var that = this;
        [].forEach.call(
            this.tooltipArray,
            function(e) {
                e.addEventListener('mouseover', function() {
                        that.mouseEnter(e)
                    }, false),
                    e.addEventListener('mouseout', function() {
                        that.mouseLeave(e)
                    }, false)
            }
        )
        return this;
    },

    /**
     * handle the mouseover event
     */
    mouseEnter: function(e) {

        var dataPlacement = e.getAttribute('data-placement');
        var id = this.generateId();

        e.setAttribute('aria-describedby', id);

        if (dataPlacement === 'top') {
            this.showTop(e, id);
        } else if (dataPlacement === 'bottom') {
            this.showBottom(e, id);
        } else if (dataPlacement === 'left') {
            this.showLeft(e, id);
        } else if (dataPlacement === 'right') {
            this.showRight(e, id);
        }
    },

    /**
     * handle the mouseout event
     */
    mouseLeave: function(e) {
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
     * @return tooltip context
     */
    createTooltipElement: function(id, parentElement) {
        var that = this;

        var innerText = parentElement.getAttribute('data-content');
        var tooltip = document.createElement('div');
        tooltip.innerHTML = innerText;
        tooltip.className = "pan-tooltip pan-tooltip-initial";
        tooltip.id = id;
        document.body.appendChild(tooltip);

        return tooltip;
        //return this;
    },

    /**
     * create tooltip placement top
     * @return object context
     */

    showTop: function(e, id) {
        var that = this;

        var tooltip = this.createTooltipElement(id, e);

        var toolTipInfo = tooltip.getBoundingClientRect();
        var parentInfo = e.getBoundingClientRect();
        var middleOfParent = (parentInfo.left + parentInfo.right) / 2;
        var middleOfTooltip = (toolTipInfo.left + toolTipInfo.right) / 2;
        var widthOfTooltip = (toolTipInfo.right - toolTipInfo.left),
            halfToolTip = widthOfTooltip / 2;

        tooltip.style.left = middleOfParent - halfToolTip + 'px';

        // calculate top
        var heightOfTooltip = toolTipInfo.bottom - toolTipInfo.top;
        tooltip.style.top = parentInfo.top - (this.tooltipTopOffset + 8 + heightOfTooltip) + 'px';

        tooltip.className = 'pan-tooltip top pan-tooltip-load';

        window.setTimeout(function() {
            tooltip.style.top = parentInfo.top - (that.tooltipTopOffset + heightOfTooltip) + 'px';
        }, 10);

        return this;
    },

    /**
     * create tooltip placement left
     * @return object context
     */

    showLeft: function(e, id) {
        var that = this;

        var tooltip = this.createTooltipElement(id, e);

        var toolTipInfo = tooltip.getBoundingClientRect();
        var parentInfo = e.getBoundingClientRect();
        var leftOfParent = (parentInfo.left);
        var middleOfTooltip = (toolTipInfo.left + toolTipInfo.right) / 2;
        var widthOfTooltip = (toolTipInfo.right - toolTipInfo.left),
            halfToolTip = widthOfTooltip;

        tooltip.style.left = leftOfParent - halfToolTip - 16 + 'px';

        // calculate top
        var heightOfTooltip = toolTipInfo.bottom - toolTipInfo.top;
        var HeightOfParent = (parentInfo.bottom + parentInfo.top) / 2;

        // tooltip.style.top = parentInfo.top - (this.tooltipTopOffset+8+heightOfTooltip) + 'px';
        tooltip.style.top = HeightOfParent - (heightOfTooltip / 2) + 'px';
        tooltip.className = 'pan-tooltip left pan-tooltip-load';

        window.setTimeout(function() {
            tooltip.style.left = leftOfParent - halfToolTip - 9 + 'px';
        }, 10);

        return this;
    },

    /**
     * create tooltip placement right
     * @return object context
     */

    showRight: function(e, id) {
        var that = this;

        var tooltip = this.createTooltipElement(id, e);

        var toolTipInfo = tooltip.getBoundingClientRect();
        var parentInfo = e.getBoundingClientRect();
        var rightOfParent = (parentInfo.right);
        var middleOfTooltip = (toolTipInfo.left + toolTipInfo.right) / 2;
        var widthOfTooltip = (toolTipInfo.right - toolTipInfo.left),
            halfToolTip = widthOfTooltip;

        tooltip.style.left = rightOfParent + 16 + 'px';

        // calculate top
        var heightOfTooltip = toolTipInfo.bottom - toolTipInfo.top;
        var HeightOfParent = (parentInfo.bottom + parentInfo.top) / 2;

        // tooltip.style.top = parentInfo.top - (this.tooltipTopOffset+8+heightOfTooltip) + 'px';
        tooltip.style.top = HeightOfParent - (heightOfTooltip / 2) + 'px';
        tooltip.className = 'pan-tooltip right pan-tooltip-load';

        window.setTimeout(function() {
            tooltip.style.left = rightOfParent + 9 + 'px';
        }, 10);

        return this;
    },

    /**
     * create tooltip placement bottom
     * @return object context
     */

    showBottom: function(e, id) {
        var that = this;

        var tooltip = this.createTooltipElement(id, e);

        var toolTipInfo = tooltip.getBoundingClientRect();
        var parentInfo = e.getBoundingClientRect();
        var middleOfParent = (parentInfo.left + parentInfo.right) / 2;
        var middleOfTooltip = (toolTipInfo.left + toolTipInfo.right) / 2;
        var widthOfTooltip = (toolTipInfo.right - toolTipInfo.left),
            halfToolTip = widthOfTooltip / 2;

        tooltip.style.left = middleOfParent - halfToolTip + 'px';

        // calculate top
        var heightOfTooltip = toolTipInfo.bottom - toolTipInfo.top;
        tooltip.style.top = parentInfo.bottom + 16 + 'px';

        tooltip.className = 'pan-tooltip bottom pan-tooltip-load';

        window.setTimeout(function() {
            tooltip.style.top = parentInfo.bottom + 9 + 'px';
        }, 10);

        return this;
    },

    /**
     * TODO: bug when you hover on the tooltip in the center causes it to disappear and reappear.
     * create tooltip placement center
     * @return object context
     */

    showCenter: function(e, id) {
        var that = this;

        var tooltip = this.createTooltipElement(id, e);

        var toolTipInfo = tooltip.getBoundingClientRect();
        var parentInfo = e.getBoundingClientRect();
        var middleOfParent = (parentInfo.left + parentInfo.right) / 2;
        var middleOfTooltip = (toolTipInfo.left + toolTipInfo.right) / 2;
        var widthOfTooltip = (toolTipInfo.right - toolTipInfo.left),
            halfToolTip = widthOfTooltip / 2;

        tooltip.style.left = middleOfParent - halfToolTip + 'px';

        // calculate top
        var heightOfTooltip = toolTipInfo.bottom - toolTipInfo.top;
        tooltip.style.top = parentInfo.top + (this.tooltipTopOffset + 8 + heightOfTooltip) + 'px';

        tooltip.className = 'pan-tooltip bottom pan-tooltip-load';

        window.setTimeout(function() {
            tooltip.style.top = parentInfo.top + (that.tooltipTopOffset + heightOfTooltip) + 'px';
        }, 10);
        return this;
    },

    generateId: function() {
        var id = 'tooltip' + (Math.floor(Math.random() * 90000) + 10000);
        return id;
    },

    /**
     * get the cumulativeOffset
     * @return x / y coordinate of top left corner
     */

    cumulativeOffset: function(element) {
        var top = 0,
            left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);

        return {
            top: top,
            left: left
        };
    }
});
