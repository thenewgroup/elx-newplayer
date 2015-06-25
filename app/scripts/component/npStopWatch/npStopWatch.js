/* jshint -W003, -W117 */
(function () {
    'use strict';
    angular
            .module('newplayer.component')
            /** @ngInject */
            .controller('npStopWatchController',
                    function ($log, $scope, $rootScope, $element, AssessmentService) {
                        var ROOT = this,
                                cmpData = $scope.component.data,
                                autoStart = cmpData.autoStart,
                                hideNavigation = cmpData.hideNavigation,
                                report = cmpData.report,
                                reportTime = 'undefined',
                                Stopwatch = 'undefined',
                                npStopWatchNavigation = 'undefined',
                                npStopWatch = 'undefined',
                                content = null;
                        ROOT.content = cmpData.content;
                        ROOT.showNavigation = hideNavigation;
                        var reportTime = ROOT.reportTime = reportTime;
                        autoStart = cmpData.autoStart;
                        npStopWatchNavigation = $element.find('.stopwatch-navigation');
//                        npStopWatch = $element.find('.np-stopwatch');
                        npStopWatch = $element.context;
                        //////////////////////////////////////////////////////////////////////////////////////
                        // Stopwatch method
                        //////////////////////////////////////////////////////////////////////////////////////
                        console.log(
                                '\n::::::::::::::::::::::::::::::::::::::npStopWatchController::cmpData:::::::::::::::::::::::::::::::::::::::::::::::::',
                                '\n::$scope::', $scope,
                                '\n::$element::', $element,
                                '\n::$element.context::', $element.context,
                                '\n::npStopWatch::', npStopWatch,
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
                                    clearButton: ""
//                                    clearButton: "<a href=\"#\" class=\"btn btn-primary\" ng-click=\"npStopWatch.clear();\">Clear</a>"
                                },
                                init: function () {
                                    stopWatchSettings = this.settings;
                                    setInterval(this.timer, 1);
                                },
                                clear: function () {
                                    stopWatchSettings.i = 1,
                                            stopWatchSettings.times = ["00:00:01"],
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
                                    if (!!report) {
                                        reportTime = stopWatchSettings.times[1];
                                    }
                                },
                                report: function () {
                                    stopWatchSettings.times.push(("0" + stopWatchSettings.mins).slice(-2) + ":"
                                            + ("0" + stopWatchSettings.secs).slice(-2) + ":"
                                            + ("0" + stopWatchSettings.mills).slice(-2));
                                    reportTime = stopWatchSettings.times[stopWatchSettings.i];
                                    stopWatchSettings.i++;
//                                    console.log(
//                                            '\n::::::::::::::::::::::::::::::::::::::npStopWatchController::report:::::::::::::::::::::::::::::::::::::::::::::::::',
//                                            '\n::reportTime::', reportTime,
//                                            '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::'
//                                            );
                                    AssessmentService.setAssessmentTime(reportTime);
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
                        };
//                        $scope.$on('goToNextPageEvent', function () {
//                            console.log(
//                                    '\n::::::::::::::::::::::::::::::::::::::npStopWatchController::goToNextPageEvent:::::::::::::::::::::::::::::::::::::::::::::::::',
//                                    '\n::npStopWatch ::', npStopWatch,
//                                    '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::'
//                                    );
//                        });
                        //////////////////////////////////////////////////////////////////////////////////////
                        // Stopwatch
                        //////////////////////////////////////////////////////////////////////////////////////
                        if (!!autoStart) {
                            Stopwatch.init();
                        }
                        //////////////////////////////////////////////////////////////////////////////////////
                        // if Stopwatch is set to report do reporting before unload
                        //////////////////////////////////////////////////////////////////////////////////////
                        if (!!report) {
                            window.onbeforeunload = function () {
                                Stopwatch.report();
                                return undefined;
                            };
                        }
                        $rootScope.$on('stopWatchReportEvent', function () {
//                            console.log(
//                                    '\n::::::::::::::::::::::::::::::::::::::npStopWatchController::stopWatchReportEvent:::::::::::::::::::::::::::::::::::::::::::::::::',
////                                    '\n::stopWatchReportEvent ::', stopWatchReportEvent,
//                                    '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::'
//                                    );
                            Stopwatch.report();
                        });
                    }
            )
            /** @ngInject */
            .run(
                    function ($log, $rootScope) {
                        $log.debug('npStopWatch::component loaded!');
                    }
            );
})();