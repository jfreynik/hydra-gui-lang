angular.module("hyGui").factory("HyObject", [

    function HyObject ()
    {

        var 

        HyObject = {
            _chain: "HyObject",
            _class: "HyObject",

            init: function hyObjectInit ()
            {
                // empty constructor
            },

            is: function ($class)
            {
                return -1 < this._chain.indexOf($class);
            },

            getClass: function ()
            {
                return this._class;
            },

            new: function ()
            {
                var obj = angular.extend({}, this);

                obj.init();
                
                return obj;
            },

            extend: function ($class, $interface)
            {
                var obj = angular.extend({}, $interface),
                    prt = angular.extend({}, this),
                    p = "", i = 0,
                    prop = "",
                    props = [],
                    changed = false,
                    renamed = [];

                obj._chain = $class + ":" + prt._chain;
                obj._class = $class;

                for (p in prt)
                {
                    props.push(p);
                }

                props.sort(function ($e1, $e2) {
                    if ($e1.length !== $e2.length) {
                        return  $e1.length - $e2.length
                    }
                    return $e1 < $e2;
                });

                for (i = 0; i < props.length; i++) {
                    prop = props[i];
                    if (!angular.isUndefined(obj[prop]))
                    {
                        while (!angular.isUndefined(obj[prop]))
                        {
                            prop = "$" + prop;
                        }
                        renamed.push([props[i], prop]);
                        obj[prop] = prt[props[i]];
                    }

                    obj[prop] = prt[props[i]];
                }

                if (renamed.length) 
                {
                    // check if we need to update parent function references
                    for (p in prt) 
                    {
                        if (angular.isFunction(prt[p]))
                        {
                            var src = prt[p].toString(),
                                vrb = "";
                            for (i = 0; i < renamed.length; i++) {
                                if (-1 < renamed[i][0].indexOf("$") &&
                                    -1 < src.indexOf(renamed[i][0])
                                ) {
                                    changed = true;
                                    vrb = renamed[i][0].replace(/\$/g, "\\$");
                                    src = src.replace(
                                        new RegExp(vrb, "g"), 
                                            "$" + renamed[i][1]);
                                }
                            }

                            if (changed) 
                            {
                                // I don't like this *hack* maybe we can add
                                // the other method of just adding $ and not
                                // rewriting the functions
                                prt[p] = (new Function("return " + src)());
                                changed = false;
                            }
                        }
                    }

                    // loop one last time to add the adjusted functions to the object
                    obj = angular.extend({}, $interface);
                    obj._chain = $class + ":" + prt._chain;
                    obj._class = $class;

                    for (i = 0; i < props.length; i++) 
                    {
                        prop = props[i];
                        if (!angular.isUndefined(obj[prop]))
                        {
                            while (!angular.isUndefined(obj[prop]))
                            {
                                prop = "$" + prop;
                            }
                        }
                        obj[prop] = prt[props[i]];
                    }

                }

                return obj;
            }
        };

        return HyObject;

    }
]);