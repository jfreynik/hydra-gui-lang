
angular.module("hyGui").factory("HyComponent", 
[
    "HyObject",
    // "HyTemplate",
    function HyComponentFactory (
        HyObject
        // HyTemplate
    ) {

        var 
        
        ng = angular,

        Comp = HyObject.extend("HyComponent", {

            _type: "E",

            _name: null,

            _template: "", 

            _transclude: false,

            _controller: null,

            _defaults: {},

            _bindings: {},

            _params: {},

            _children: [],

            _controllerAs: "$ctrl",

            _link: null,

            _postLink: null,

            _compile: null,

            _scope: true,

            init: function HyComponentInit () 
            {
                this.$init();

                this.setLink(function HyComponentLink (scope, element, attr, ctrl) {
                    var component = this.component,
                        bindings = component.getBindings(),
                        defaults = component.getDefaults(),
                        p = "", 
                        val = "", 
                        groupAt = [], 
                        groupLt = [],
                        groupEq = [],
                        groupAm = [];

                    if (ctrl && ctrl.$onDestroy)
                    {
                        scope.$on("$destroy", function () {
                            ctrl.$onDestroy();
                        });
                    }

                    if (ctrl && ctrl.$onInit)
                    {
                        ctrl.$onInit();
                    }



                    // TODO - p gets overwritted 
                    for (p in bindings) 
                    {
                        val = (!angular.isUndefined(attr[p]) ?
                            attr[p] : (!angular.isUndefined(defaults[p]) ?
                                defaults[p] : undefined));

                        if (!angular.isUndefined(val)) 
                        {
                            switch (bindings[p])
                            {
                                case "@":
                                    ctrl[p] = scope.$eval(attr[p]);
                                    break;

                                case "<":
                                    // ctrl[p] = scope.$eval(attr[p]);
                                    scope.$watch(p, function (val1, val2) {
                                        ctrl[p] = val1;
                                    });
                                    break;

                                case "=":
                                    // sets up two watches to change value back and fourth
                                    scope.$watch(p, function (val1, val2) {
                                        ctrl[p] = val1;
                                    });
                                    scope.$watch(function (scp) {
                                        return scp.$ctrl[p];
                                    }, function (val1, val2) {
                                        scope.$parent[p] = val1;
                                    });
                                    break;

                                case "&":
                                    break;
                            }
                        }
                    }
                });
            },

            getDefaults: function () 
            {
                return this._defaults;
            },

            setDefaults: function ($defaults)
            {
                this._defaults = $defaults;
                return this;
            },

            getController: function ()
            {
                return this._controller;
            },

            setController: function ($controller)
            {
                $controller.prototype.component = this;
                this._controller = $controller;
                return this;
            },

            getLink: function ()
            {
                return this._link;
            },

            setLink: function ($link)
            {
                $link.prototype.component = this;
                this._link = $link;
                return this;
            },

            getCompile: function ()
            {
                return this._compile;
            },

            setCompile: function ($compile)
            {
                $compile.prototype.component = this;
                this._compile = $compile;
                return this;
            },

            getBindings: function ()
            {
                return this._bindings;
            },

            setBindings: function ($bindings)
            {
                this._bindings = $bindings;
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
                    restrict: this._type,
                    template: this.getTemplate(),
                    controller: this.getController(),
                    controllerAs: this._controllerAs,
                    link: this._link,
                    postLink: this._postLink,
                    scope: this._scope,
                    component: this
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