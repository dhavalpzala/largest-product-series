(function() {
    var app = angular.module("largestProductSeries", []);
    app.controller("MainController", [ '$scope', '$sce', function($scope, $sce) {
        $scope.findSeries = function(inputString, length) {
            if(inputString && length && new RegExp("^[0-9]*$").test(inputString) ){
                var index, result = -1, tempResult = 0, loopLength = inputString.length - length + 1, selectedIndex = -1;

                for(index = 0; index < loopLength; index++){
                    var digit;
                    if(!tempResult){
                        tempResult = 1;
                        for(var innerIndex = 0; innerIndex < length; innerIndex++)
                        {
                            digit = inputString.charAt(index + innerIndex);
                            if(digit === '0'){
                                index = index + innerIndex;
                                tempResult = 0;
                                break;
                            }

                            tempResult *= digit;
                        }
                    }
                    else{
                        digit = inputString.charAt(index - 1);
                        tempResult /= digit;
                        digit = inputString.charAt(index + length - 1);
                        if(digit === '0'){
                            index = index + length - 1;
                            tempResult = 0;
                            continue;
                        }

                        tempResult *= digit;
                    }
                    if(tempResult > result){
                        result = tempResult;
                        selectedIndex = index;
                    }
                }

                this.result = result;
                if(selectedIndex >= 0){
                    this.resultString =$sce.trustAsHtml( inputString.substring(0,selectedIndex) + "<span class='red'> "+ inputString.substring(selectedIndex, selectedIndex + length) +"</span>" + inputString.substring(selectedIndex + length));
                }
                else{
                    this.resultString =$sce.trustAsHtml("<span class='red'>please enter valid inputs</span>");
                }
            }
            else{
                this.result = "";
                this.resultString =$sce.trustAsHtml("<span class='red'>please enter valid inputs</span>");
            }
        };
    } ]);
})();