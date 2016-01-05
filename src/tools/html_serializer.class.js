/**
 * @class    html_serializer
 * @author   Ariel Saldana / http://ahhriel.com
 * @info     methods of convering html data into objects or bytes for transport.
 */
P.Tools.HTML_Serializer = P.Core.Abstract.extend({
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
        this.paragraphs = [];
    },


    /**
     * Apply css on target and add every prefixes
     * @param  {HTMLElement} target   HTML element that need to be applied
     * @return {string}      serialized element content to json
     */
    applyJson: function(target) {
        var elementChildren = document.getElementById(target).children;

        for (var i = 0; i < elementChildren.length; i++) {
            if (elementChildren[i].nodeName === 'P') {
                var paragraph = {};
                // var paragraphText = elementChildren[i].innerText;
                paragraph.text = elementChildren[i].innerText;
                paragraph.type = 1;
                var markup = [];
                // var markupInfo = {};
                //var strlen = 0;
                var index = 0;
                var end = 0;
                for (var x = 0; x < elementChildren[i].childNodes.length; x++) {
                    if (elementChildren[i].childNodes[x].nodeType === 3) {
                        end += elementChildren[i].childNodes[x].wholeText.length;
                    } else {
                        var markupInfo = {};
                        end += elementChildren[i].childNodes[x].innerText.length;;
                        markupInfo.start = index;
                        markupInfo.end = end;

                        if (elementChildren[i].childNodes[x].nodeName === 'B') {
                            markupInfo.type = 2
                        } else if (elementChildren[i].childNodes[x].nodeName === 'I') {
                            markupInfo.type = 3
                        } else if (elementChildren[i].childNodes[x].nodeName === 'U') {
                            markupInfo.type = 4
                        } else if (elementChildren[i].childNodes[x].nodeName === 'A') {
                            markupInfo.type = 5
                        }
                        markup.push(markupInfo);
                        // markupInfo.end = end;
                    }
                    index += end;
                }
                //console.log(markup);
                paragraph.markup = markup
                this.paragraphs.push(paragraph);
                // console.log(paragraph);
            } else if (elementChildren[i].nodeName === 'FIGURE') {
                paragraph.type = 2;
                paragraph.text = "";
                paragraph.layout = 1;
                for (var x = 0; x < elementChildren[i].childNodes.length; x++) {

                }
                // dont push this yet...
                //this.paragraphs.push(paragraph);
            }
        }
        return this.paragraphs;
    }
});
