
angular.module("hyGui").factory("Component", [

    function ComponentFactory (

    
    ) {

        var ng = angular,
            Component = {

                _controller: function Controller () { },
                _template: "{% block base %}{% endblock %}",
                _bindings: {},
                _parent: null,

                inherit: function inherit ($object)
                {
                    var parent = Object.create($object);
                    this.setParent(parent);
                    return this;
                },

                getTemplate: function getTemplate ()
                {
                    var tmpl;
                    if (this._parent)
                    {
                        tmpl = this._parent.getTemplate();
                    }
                    return this._template;
                },

                setTemplate: function setTemplate ($template)
                {
                    this._template = $template;
                    return this;
                },

                getController: function getController ()
                {
                    return this._controller;
                },

                setController: function setController ($controller)
                {
                    this._controller = $controller;
                    return this;
                },

                getBindings: function getBindings ()
                {
                    return this._bindings;
                },

                setBindings: function setBindings ($bindings)
                {
                    this._bindings = $bindings;
                    return this;
                },

                getParent: function getParent ()
                {
                    return this._parent;
                },

                setParent: function setParent ($parent)
                {
                    this._parent = $parent;
                    return this;
                }

            };


        return Object.create(Component);
    }
]);