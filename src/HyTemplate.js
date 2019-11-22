/* global angular */

angular.module("hyGui")

.factory("HyTemplateConfig", [
    function HyTemplateConfig () {
        var 
        
        config = {
            $open: "<%",
            $close: "%>",
        },

        factory = {

            getOpen: function _getOpen_ ()
            {
                return config.$open;
            },

            setOpen: function _setOpen_ ($open)
            {
                config.$open = $open;
                return this;
            },

            getClose: function _getClose_ ()
            {
                return config.$close;
            },

            setClose: function _setClose_ ($close)
            {
                config.$close = $close;
                return this;
            },

            block: function _block_ ($name, $html)
            {
                if (angular.isUndefined($html))
                {
                    $html = "";
                }

                return [
                    config.$open, "block ", $name, config.$close,
                    angular.isArray($html) ? $html.join(" "): $html,
                    config.$open, "endblock", config.$close
                ].join("");
            }
        };

        return factory;
    }
])

.factory("HyTemplate", [
        "HyObject",
        "HyTemplateConfig",
    function HyTemplateFactory (
        HyObject,
        HyTemplateConfig
    ) {

        return HyObject.extend("HyTemplate", {

            // the template's html 
            $html: "",

            // constructor
            init: function () 
            {
                this.$html = [
                    /*
                    "<% block name %>",
                        "<p>pre text</p>",
                        "<% block inner %>",
                            "<p>inner text</p>",
                        "<% endblock %>",
                        "<span>test</span>",
                    "<% endblock %>"
                    */
                ].join(" ");
            },

            // public interface

            getHTML: function _getHTML_ ()
            {
                return this.$html;
            },

            setHTML: function _setHTML_ ($html)
            {
                this.$html = $html;
                return this;
            },

            groupTemplate: function _groupTemplate_ ($template)
            {
                var openTag = hyTemplateConfig.getOpen(),
                    closeTag = hyTemplateConfig.getClose(),
                    tagStack = [],
                    order = [],
                    group = {
                        global: ""
                    },
                    openSplit = $template.split(openTag),
                    closeSplit;

                for (var i = 0; i < openSplit.length; i++)
                {
                    closeSplit = openSplit[i].split(closeTag);
                    for (var j = 0; j < closeSplit.length; j++)
                    {
                        if (0 < i && j === 0)
                        {
                            var tag = closeSplit[j].trim().toLowerCase(),
                                name = "";
                            switch (tag)
                            {
                                case "endblock":

                                    break;

                                case "parent":

                                    break;
                                
                                default:
                                    tag = tag.split(" ");
                                    name = tag.pop();
                                    tag = tag.shift();
                                    
                                    group[tag] = "";
                                    tagStack.push(tag);
                                    order.push(tag);
                                    break;
                            }
                        }

                        else
                        {
                            for (var p in group)
                            {
                                group[p] += closeSplit[j];
                            }
                        }
                    }
                }

                return {
                    order: order,
                    group: group
                };
            },

            compile: function _compile_ ()
            {

                // temporarily do this 
                return this.$html;

                var ref = this,
                    templates = [];

                while (ref)
                {
                    if (ref.$html)
                    {
                        templates.push(
                            this.groupTemplate(ref.$html));
                    }
                    ref = this.$parent;
                }

                console.log(templates);
                return "";
            },

            toString: function _toString_ ()
            {
                return this.compile();
            }
        });


    }
]);