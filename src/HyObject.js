angular.module("hyGui").factory("hyObject", [

    function HyObject ()
    {

        var 
        
        /*
         * POJO used to make creation and extension easier
         *
         */
        pojo = {

            $parent: null,

            $child: null,

            $chain: "HyObject",

            init: function _init_ ()
            {

            },

            is: function _is_ ($class)
            {
                return -1 < this.$chain.indexOf($class);
            },

            getParent: function _getParent_ ()
            {
                return this.$parent;
            },

            setParent: function _setParent_ ($parent)
            {
                this.$parent = $parent;
                return this;
            },

            getChild: function _getChild_ ()
            {
                return this.$child;
            },

            setChild: function _setChild_ ($child)
            {
                this.$child = $child;
                return this;
            },

            superCall: function _superCall_ ($method, $args, $level)
            {
                var ref = this.$parent;
                while (ref)
                {
                    if (angular.isFunction(ref[$method]))
                    {
                        return ref[$method].apply(this, $args);
                    }
                    ref = ref.$parent;
                }
            },

            childCall: function _childCall_ ($method, $args, $level)
            {

            },

            getSuperProp: function _getSuperProp_ ($prop)
            {
                return this.$parent[$prop];
            },

            setSuperProp: function _setSuperProp_ ($prop, $value)
            {
                this.$parent[$prop] = $value;
                return this;
            },

            unsetSuperProp: function _unsetSuperProp_ ($prop)
            {
                delete this.$parent[$prop];
                return this;   
            }
        },
        
        // Constructor Factory
        Factory = {

            $interface: pojo,

            new: function _new_ ()
            {
                // create a new object from the plain old javascript object
                var obj = angular.extend({}, this.$interface);
                obj.init.apply(obj, arguments);
                return obj;
            },

            extend: function _extend_ ($class,  $interface)
            {
                // create a new factory object
                var factory = angular.extend({}, this),
                    parent = angular.extend({}, factory.$interface),
                    init = $interface.init;

                $interface = angular.extend($interface, pojo);
                $interface.$chain = $class + ":" + parent.$chain;

                parent.$child = $interface;
                $interface.$parent = parent;
                $interface.init = init;
                
                factory.$interface = $interface;
                return factory;
            }
        };

        return Factory;
    }
]);