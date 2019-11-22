angular.module("hyGui")

.factory("HyButton", [
    "HyComponent",
    function HyButton (
        HyComponent
    ) {

        var HyButton = HyComponent.extend("HyButton", {

            _template: "",

            init: function HyButtonInit () {

                this.$init();

                this.setController(function ($scope) {
                    this.click = function () {
                        console.log(this.helper);
                    }
                });
                
                this.setTemplate([
                    // "<% block button %>",
                    "<button",
                        "type='button'",
                        "ng-class='$ctrl.class'",
                        "ng-click='$ctrl.click()'",
                    ">{{ $ctrl.text }} test</button>",
                    // "<% endblock %>",
                ]);

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
