/* jshint -W003, -W117 */
(function () {
    'use strict';
    angular
            .module('newplayer.component')
            /** @ngInject */
            .controller('npStopWatchController',
                    function ($log, $scope, $rootScope, $element) {
                        var ROOT = this,
                                cmpData = $scope.component.data,
                                autoStart = cmpData.autoStart,
                                hideNavigation = cmpData.hideNavigation,
                                Stopwatch = 'undefined',
                                npStopWatch = 'undefined',
                                content = null;
                        ROOT.content = cmpData.content;
                        ROOT.showNavigation = hideNavigation;
                        autoStart = cmpData.autoStart;
                        npStopWatch = $element.find('.stopwatch-navigation');
                        //////////////////////////////////////////////////////////////////////////////////////
                        // Stopwatch method
                        //////////////////////////////////////////////////////////////////////////////////////
                        console.log(
                                '\n::::::::::::::::::::::::::::::::::::::npStopWatchController::cmpData:::::::::::::::::::::::::::::::::::::::::::::::::',
                                '\n::cmpData::', cmpData,
                                '\n::autoStart::', autoStart,
                                '\n::hideNavigation::', hideNavigation,
                                '\n::ROOT.hideNavigation::', ROOT.hideNavigation,
                                '\n::cmpData.autoStart::', cmpData.autoStart,
                                '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::'
                                );
                        Stopwatch = (function () {
                            var stopWatchSettings;
                            return {
                                settings: {
                                    stop: 0,
                                    sw: document.querySelectorAll(".np-stopwatch-counter")[0],
                                    results: document.querySelectorAll(".np-stopwatch-results")[0],
                                    mills: 0,
                                    secs: 0,
                                    mins: 0,
                                    i: 1,
                                    times: ["00:00:00"],
                                    clearButton: "<a href=\"#\" class=\"btn btn-primary\" ng-click=\"npStopWatch.clear();\">Clear</a>"
                                },
                                init: function () {
                                    stopWatchSettings = this.settings;
                                    setInterval(this.timer, 1);
                                },
                                clear: function () {
                                    stopWatchSettings.i = 1,
                                            stopWatchSettings.times = ["00:00:00"],
                                            stopWatchSettings.results.innerHTML = stopWatchSettings.clearButton;
                                },
                                capture: function () {
                                    if (stopWatchSettings.i === 1) {
                                        stopWatchSettings.results.innerHTML = stopWatchSettings.clearButton;
                                    }
                                    stopWatchSettings.times.push(("0" + stopWatchSettings.mins).slice(-2) + ":"
                                            + ("0" + stopWatchSettings.secs).slice(-2) + ":"
                                            + ("0" + stopWatchSettings.mills).slice(-2));
                                    var diffTime = ("0" + Math.floor(stopWatchSettings.times[stopWatchSettings.i].split(":")[0]
                                            - stopWatchSettings.times[stopWatchSettings.i - 1].split(":")[0])).slice(-2)
                                            + ":"
                                            + ("0" + Math.floor(stopWatchSettings.times[stopWatchSettings.i].split(":")[1]
                                                    - stopWatchSettings.times[stopWatchSettings.i - 1].split(":")[1])).slice(-2)
                                            + ":"
                                            + ("0" + (stopWatchSettings.times[stopWatchSettings.i].split(":")[2]
                                                    - stopWatchSettings.times[stopWatchSettings.i - 1].split(":")[2])).slice(-2);
                                    stopWatchSettings.results.innerHTML = stopWatchSettings.results.innerHTML + "<tr><td>"
                                            + stopWatchSettings.times[stopWatchSettings.i] + "</td><td>"
                                            + diffTime + "</td></tr>";
                                    stopWatchSettings.i++;
                                    console.log(
                                            '\n::::::::::::::::::::::::::::::::::::::npStopWatchController::capture:::::::::::::::::::::::::::::::::::::::::::::::::',
                                            '\n::stopWatchSettings.results::', stopWatchSettings.results.innerHTML,
                                            '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::'
                                            );
                                },
                                restart: function () {
                                    stopWatchSettings.mills = 0,
                                            stopWatchSettings.secs = 0,
                                            stopWatchSettings.mins = 0;
                                    ROOT.start();
                                },
                                start: function () {
                                    stopWatchSettings.stop = 0;
                                },
                                stop: function () {
                                    stopWatchSettings.stop = 1;
                                },
                                timer: function () {
                                    if (stopWatchSettings.stop === 0) {
                                        if (stopWatchSettings.mills === 100) {
                                            stopWatchSettings.secs++;
                                            stopWatchSettings.mills = 0;
                                        }
                                        if (stopWatchSettings.secs === 60) {
                                            stopWatchSettings.mins++;
                                            stopWatchSettings.secs = 0;
                                        }
                                        stopWatchSettings.sw.innerHTML = ("0" + stopWatchSettings.mins).slice(-2) + ":"
                                                + ("0" + stopWatchSettings.secs).slice(-2) + ":"
                                                + ("0" + stopWatchSettings.mills).slice(-2);
                                        stopWatchSettings.mills++;
                                    }
                                    var elem = $element.find('#stopwatch-second-hand');
                                    TweenMax.set(elem, {
                                        rotation: (stopWatchSettings.secs * 6),
                                        transformOrigin: "50% 80%"
                                    });
                                }
                            };
                        })();
                        //////////////////////////////////////////////////////////////////////////////////////
                        // internal stopwatch method calls
                        //////////////////////////////////////////////////////////////////////////////////////
                        ROOT.start = function () {
                            Stopwatch.init();
                            Stopwatch.start();
                        };
                        ROOT.capture = function () {
                            Stopwatch.capture();
                        };
                        ROOT.stop = function () {
                            Stopwatch.stop();
                        };
                        ROOT.restart = function () {
                            Stopwatch.init();
                            Stopwatch.restart();
                        };
                        ROOT.clear = function () {
                            Stopwatch.clear();
                            console.log(
                                    '\n::::::::::::::::::::::::::::::::::::::npStopWatchController::clear:::::::::::::::::::::::::::::::::::::::::::::::::',
//                                            '\n::stopWatchSettings.results::', stopWatchSettings.results.innerHTML,
                                    '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::'
                                    );
                        };
                        //////////////////////////////////////////////////////////////////////////////////////
                        // Stopwatch
                        //////////////////////////////////////////////////////////////////////////////////////
                        if (!!autoStart) {
                            Stopwatch.init();
                        }
//                        if (!showNavigation) {
//                            console.log(
//                                    '\n::::::::::::::::::::::::::::::::::::::npStopWatchController::!showNavigation:::::::::::::::::::::::::::::::::::::::::::::::::',
////                                            '\n::stopWatchSettings.results::', stopWatchSettings.results.innerHTML,
//                                    '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::'
//                                    );
//                            TweenMax.set(npStopWatch, {
//                                autoAplpha: 0
//                            });
//                        }
                    }
            )
            /** @ngInject */
            .run(
                    function ($log, $rootScope) {
                        $log.debug('npStopWatch::component loaded!');
                    }
            );
})();
