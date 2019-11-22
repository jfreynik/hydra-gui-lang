
angular.module("hyGui").factory("HyComponent", 
[
    "HyObject",
    // "HyTemplate",
    function HyComponentFactory (
        HyObject,
        // HyTemplate
    ) {

        var 
        
        ng = angular,

        Comp = HyObject.extend("HyComponent", {

            _type: null,

            _name: null,

            _template: "", 

            _transclude: false,

            _controller: null,

            _defaults: {},

            _bindings: {},

            _params: {},

            _children: [],

            _controllerAs: "$ctrl",

            init: function hyComponentInit () 
            {
                this.$init();

                this._type = "E";
            },

            getController: function ()
            {
                return this._controller;
            },

            setController: function ($controller)
            {
                $controller.prototype.helper = this;
                this._controller = $controller;
                return this;
            },

            getTemplate: function () 
            {
                return this._template;
            },

            setTemplate: function ($template)
            {
                if (ng.isArray($template))
                {
                    $template = $template.join(" ");
                }

                this._template = $template;

                return this;
            },

            compile: function ()
            {
                // custom compile function

            },

            getComponent: function ()
            {
                // TODO - compile the template
                return {
                    type: this._type,
                    template: this.getTemplate(),
                    controller: this.getController(),
                    controllerAs: this._controllerAs
                };
            },

            new: function ($bindings)
            {
                
                return this.$new();
            }

        });

        return Comp;

    }
]);