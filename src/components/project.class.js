/**
 * @class    project.class.js
 * @author   Ariel Saldana / http://ahhriel.com
 */
( function()
{
    'use strict';

    Pan.Components.Project = Pan.Core.Event_Emitter.extend(
    {

        options : {

        },

        construct : function(options){
          this._super( options ),

          this.browser = new Pan.Tools.Browser,
          this.type = "project",
          this.active = !0,
          this.$.main = $(".page.project"),
          this.$.links = this.$.main.find(".links"),
          this.$.to_top = this.$.links.find(".to-top"),
          this.$.to_down = this.$.main.find(".intro .arrow"),
          this.$.lines = this.$.main.find(".line"),
          this.$.lines_resize = this.$.lines.not(".line-to-screen-size"),
          this.resize(),
          this.init_events()

        },

        init_events : function() {
          var that = this;
          this.$.to_top.on("click", function(){
            return that.trigger("gotoline", [0]), !1
          }),
          this.$.to_down.on("click", function(){
            return t.trigger("gotoline", [1]), !1
          }),
          this.browser.on("resize", function(){
            that.resize()
          })

        },

        resize : function() {
          if (this.browser.width < 900) {
                  var t = this.$.main.width(),
                      e = t,
                      n = e / 1.8 + 120;
                  this.$.lines_resize.css({
                      height: Math.round(n),
                      top: "50%",
                      marginTop: Math.round(-n / 2)
                  })
              } else this.$.lines_resize.css({
                  height: "100%",
                  top: 0,
                  marginTop: 0
              })
        },

        update_line : function(t) {
          t > 0 ? this.$.to_top.removeClass("hidden") : this.$.to_top.addClass("hidden")
        }

        /**
         * Remove get json data over ajax
         * @param  {string}   url        url
         * @param  {function} callback   error and data callback
         * @return {object}              object context
         */
    } );
} )();
