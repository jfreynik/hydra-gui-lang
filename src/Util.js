(function(ng) {
    /**
     * HyUtil
     */
    module.exports = [
        "$q", "$filter", "$timeout", "$document", "$window",
        function HyUtil ($q, $filter, $timeout, $document, $window)
        {
            var uniqueInt = 0,

                log = {},

                Util = {

                    log: function ($message, $type)
                    {
                        if (ng.isUndefined(log[$type]))
                        {
                            log[$type] = [];
                        }
                        log[$type].push($message);
                        return this;
                    },

                    getLog: function _getLog_ ()
                    {
                        return log;
                    },

                    mySqlDate: function ($date)
                    {
                        if (ng.isDate($date))
                        {
                            return $filter("date")($date, "yyyy-MM-dd HH:mm:ss");
                        }
                        Util.log("Invalid date provided to Util::mySqlDate: [" + $date + "]", "warning");
                        return "";
                    },

                    serialize: function _serialize_ ($data)
                    {

                    },

                    unserialize: function _unserialize_ ($data)
                    {

                    },
                };


            return Util;
        }
    ];
/* global angular */
}(angular));