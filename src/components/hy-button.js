angular.module("hyGui")

.factory("HyButton", [
    "HyComponent",
    function HyButton (
        HyComponent
    ) {

        var HyButton = HyComponent.extend("HyButton", {

            _template: "",

            _action: "",
           
            _text: "",

            _html: "",

            init: function HyButtonInit () 
            {

                this.$init();

                this.setBindings({
                    "text": "=",
                    "temp": "@"
                });

                this.setDefaults({
                    text: "",
                });

                this.setController(function ($scope) {

                    this.click = function () {
                        
                        $scope.$emit("click", {
                            scope: $scope,
                            action: this.component.getAction(),
                        });

                        this.text = "Changing Text";

                    }
                });
                
                this.setTemplate([
                    // "<% block button %>", 
                    "<button",
                        "type='button'",
                        "ng-class='$ctrl.class'",
                        "ng-click='$ctrl.click()'",
                    ">{{ $ctrl.text }}</button>",
                    // "<% endblock %>",
                ]);

            },

            // getters and setters
            getAction: function ()
            {
                return (
                    this._action ? this._action : (
                        this._text ? this._text : (
                            this._html ? 
                                angular.element(this._html).text() : 
                                "default"
                        )
                    )
                );
            },

            setAction: function ($action)
            {
                this._action = $action;
                return this;
            },

            getText: function ()
            {
                return this._text;
            },

            setText: function ($text)
            {
                this._text = $text;
                return this;
            },

            getHTML: function ()
            {
                return this._html;
            },

            setHTML: function ($html)
            {
                this._html = $html;
                return this;
            }

        });

        return HyButton;
    }
])

.directive("hyButton", [
    "HyButton",
    function (
        HyButton
    ) {

        /*
         * HyButton Component Instance
         */
        return HyButton.new().getComponent();

    }
])
