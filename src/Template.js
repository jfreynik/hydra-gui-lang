/* global angular */

angular.module("hyGui")

.factory("hyTemplateConfig", [
    function hyTemplateConfig () {
        var 
        
        config = {
            $open: "<:",
            $close: ":>",
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
                    config.$open, $name, config.$close,
                    angular.isArray($html) ? $html.join(" "): $html,
                    config.$open, "/", $name, config.$close
                ].join("");
            }
        };

        return factory;
    }
])

.factory("hyTemplate", [
        "hyObject",
        "hyTemplateConfig",
    function TemplateFactory (
        hyObject,
        hyTemplateConfig
    ) {

        return hyObject.extend("hyTemplate", {
            
            // constructor
            init: function ($template) 
            {
                if (angular.isArray($template))
                {
                    this.setTemplate($template);
                }
            },

            $template: "template: " + hyTemplateConfig.block("base", ""),

            // public interface

            getTemplate: function _getTemplate_ ()
            {
                return this.$template;
            },

            setTemplate: function _setTemplate_ ($template)
            {
                this.$template = $template;
                return this;
            },

            compile: function _compile_ ()
            {
                var ref = this,
                    templates = [],
                    open = hyTemplateConfig.getOpen(),
                    close = hyTemplateConfig.getClose();

                while (ref && ref.$template)
                {
                    var batch1 = ref.$template.split(open),
                        batch2 = [],
                        template = [],
                        openTags = [],
                        group = {},
                        tmp;

                    for (var i = 0; i < batch1.length; i++)
                    {
                        batch2 = batch1[i].split(close);
                        for (var j = 0; j < batch2.length; j++) 
                        {
                            template.push(batch2[j]);
                        }
                    }

                    // -- need to do this ahead of time split into the different groups
                    for (i = 0; i < template.length; i++)
                    {
                        tmp = template[i].trim();
                        // if (tmp)
                    }
                    console.log(template);
                    
                    ref = this.$parent;
                }

                return templates.join("");
            },

            toString: function _toString_ ()
            {
                return this.compile();
            }
        });


    }
]);