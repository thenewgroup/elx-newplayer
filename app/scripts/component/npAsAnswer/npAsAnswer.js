(function () {
    'use strict';
    angular
            .module('newplayer.component')
            /** @ngInject */
            .controller('npAsAnswerController',
                    function ($log, $scope, $sce, $element) {
                        var vm = this;
                        var cmpData = $scope.component.data || {};
                        this.id = cmpData.id;
                        this.label = $sce.trustAsHtml(cmpData.label);
                        vm.isCorrect = cmpData.correct;
                        vm.id = cmpData.id;
                        vm.label = $sce.trustAsHtml(cmpData.label);
                        vm.question = null;
                        vm.checked = false;
                        vm.answer = vm;
                        vm.setQuestion = function (idx, question) {
                          $log.debug('setQuestion', idx, question);
                            //$scope.question = question;
                            question.registerAnswer(idx, this);
                        };
                    }
            )
            .directive('npAsAnswerCheckbox', function () {
                return function ($scope, $element, $sce, $log) {
                    var cmpData = $scope.component.data || {};
                    setTimeout(function () {
                        $scope.$apply(function () {
                            //////////////////////////////////////////////////////////////////////////////////////
                            //set states
                            //////////////////////////////////////////////////////////////////////////////////////
                            var checkboxX = $element.find('.checkbox-x');
                            TweenMax.set(checkboxX, {autoAlpha: 0, scale: 2.5, force3D: true});
                            $scope.update = function (event) {
                                var clickedCheckbox = event.currentTarget;
                                var $checkbox = $(clickedCheckbox).find('.checkbox-x');
                                $checkbox.attr('checked', !$checkbox.attr('checked'), ('true'));
                                //////////////////////////////////////////////////////////////////////////////////////
                                //update states on click
                                //////////////////////////////////////////////////////////////////////////////////////
                                if ($checkbox.attr('checked') === 'checked') {
//                                    console.log(
//                                            '\n::::::::::::::::::::::::::::::::::::::npAsAnswerCheckbox::inside:::::::::::::::::::::::::::::::::::::::::::::::::',
//                                            '\n::this::', this,
//                                            '\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::'
//                                            );
                                    $scope.npAnswer.checked = true;
                                    TweenMax.to($(clickedCheckbox).find('.checkbox-x'), 0.75, {
                                        autoAlpha: 1,
                                        scale: 0.7,
                                        ease: Power3.easeOut
                                    });
                                } else if ($checkbox.attr('checked') !== 'checked') {
                                    TweenMax.to($(clickedCheckbox).find('.checkbox-x'), 0.25, {
                                        autoAlpha: 0,
                                        scale: 2.5,
                                        ease: Power3.easeOut
                                    });
                                  $scope.npAnswer.checked = false;
                                }
                            };
                        });
                    });
                };
            })
            /** @ngInject */
            .run(
                    function ($log, $rootScope) {
                        //$log.debug('npAsAnswer::component loaded!');
                    }
            );
})();
