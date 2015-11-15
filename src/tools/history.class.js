/**
 * @class    History
 * @author   Ariel Saldana / http://ahhriel.com
 */

Pan.Tools.History = Pan.Core.Event_Emitter.extend({
    static: 'history',
    options: {
        parse: true,
        classes: {
            container: 'b-ajax-container',
            to_set: 'b-ajax',
            set: 'b-ajax-set',
            link_class: 'pan-link'
        }
    },

    /**
     * CONSTRUCT
     */
    construct: function(options) {
        this._super(options);

        // Set up
        this.browser = new Pan.Tools.Browser();
        this.instance = null;
        //this.$           = {};
        //this.$.container = $( '.' + this.options.classes.container ); // vatiable to hold container;
        //this.$.title     = $( 'title' );
        //this.$.body      = $( 'body' );

        // Parse
        //if( this.options.parse )
        //    this.parse();

        // Init
        //this.init_navigation();
        this.init_links();
    },


    doSomething: function(e) {
        event.preventDefault();
        // console.log(e);
        // console.log(this);
        // console.log(e.target.getAttribute('href'));
        this.trigger('link-clicked', [e.target.getAttribute('href')]);
        event.stopPropagation();
    },

    init_links: function() {
        var that = this;
        var activeLinks = document.getElementsByClassName(this.options.classes.link_class);
        console.log(activeLinks);



        // [].forEach.call(activeLinks, function(e) {
        //     e.addEventListener('click', function(e){
        //       e.preventDefault();
        //       console.log('meow');
        //       e.stopPropagation();
        //     }, false);
        // });

        [].map.call(activeLinks, function(e) {
            e.addEventListener('click', function(e) {
                that.doSomething(e);
            }, false);
        });
        return this;

        // // optimized loop - where order doesn't matter.
        // for (var i = activeLinks.length; i--;)
        // {
        //   var that = this;
        //   console.log(activeLinks[i]);
        //
        //   //activeLinks.item(i).style.color = 'red';
        //
        //   // [].map.call(activeLinks, function(e) {
        //   //     e.addEventListener("click", that.doSomething(e), false);
        //   // });
        //
        // }

        // iterate through that list backwards for speed performanc gains..
    }
});
