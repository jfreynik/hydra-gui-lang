/* global angular */
angular.module("hyGui").factory("hyTemplate", [

    function TemplateFactory (

    ) {

        var 
        
        ng = angular, 
        
        Template = {
            
            /**
             * 
             */
            $parent: null,

            /**
             * 
             */
            $template: "{(block base)}{(end base)}",

            extends: function extends ($template)
            {
                this.$parent = Object.create($template);
                return this;
            },

            setTemplate: function ($template)
            {
                if (ng.isArray($template))
                {
                    $template = $template.implode("\n");
                }

            },

            getTemplate: function getTemplate ()
            {
                return this.$template;
            },

            compile: function compile ()
            {
                
            }
        };

        return Template;
    }
]);