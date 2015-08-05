(function() {
    var app = angular.module("largestProductSeries", []);
    app.controller("MainController", [ '$scope', '$sce', function($scope, $sce) {
        $scope.findSeries = function(inputString,
                length) {

            var index, result = -1, tempResult = 0, loopLength = inputString.length
            - length + 1, selectedIndex = -1;
            if (!validateInputs(inputString, length)) {
                setResult.call(this, inputString,
                        length, -1, "");
                return;
            }
            for (index = 0; index < loopLength; index++) {
                var digit, seriesMultiplicationResult;
                seriesMultiplicationResult = calculateSeriesMultiplication(
                        tempResult, inputString,
                        length, index);
                index = seriesMultiplicationResult.index;
                tempResult = seriesMultiplicationResult.tempResult;
                if (tempResult > result) {
                    result = tempResult;
                    selectedIndex = index;
                }
            }

            setResult.call(this, inputString, length,
                    selectedIndex, result);
        };
        function calculateSeriesMultiplication(
                tempResult, inputString, length, index) {
            if (!tempResult) {
                tempResult = 1;
                for (var innerIndex = 0; innerIndex < length; innerIndex++) {
                    digit = inputString.charAt(index
                            + innerIndex);
                    if (digit === '0') {
                        index = index + innerIndex;
                        tempResult = 0;
                        break;
                    }

                    tempResult *= digit;
                }
            } else {
                digit = inputString.charAt(index - 1);
                tempResult /= digit;
                digit = inputString.charAt(index
                        + length - 1);
                if (digit === '0') {
                    index = index + length - 1;
                    tempResult = 0;
                } else {
                    tempResult *= digit;
                }
            }

            return {
                index : index,
                tempResult : tempResult
            };
        }
        function validateInputs(inputString, length) {
            return inputString
            && length
            && new RegExp("^[0-9]*$")
            .test(inputString);
        }
        function setResult(inputString, length,
                selectedIndex, result) {
            if (selectedIndex >= 0) {
                this.result = result;
                this.resultString = $sce
                .trustAsHtml(inputString
                        .substring(0,
                                selectedIndex)
                                + "<span class='red'> "
                                + inputString
                                .substring(
                                        selectedIndex,
                                        selectedIndex
                                        + length)
                                        + "</span>"
                                        + inputString
                                        .substring(selectedIndex
                                                + length));
            } else {
                this.result = "";
                this.resultString = $sce
                .trustAsHtml("<span class='red'>please enter valid inputs</span>");
            }
        }
    } ]);
})();