var terminal = angular.module('Oz', []);

var terminalCtrl = function ($scope, $http, $location) {
  $scope.titleTm = "Список терминалов";

    $scope.selectedTerminals = {};

    // возвращает cookie с именем name, если есть, если нет, то undefined
    $scope.getCookie = function (name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    $scope.getParameterByName = function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    var ticket = $scope.getParameterByName('ticket',$location.$$absUrl);
    var owner = $scope.getParameterByName('owner',$location.$$absUrl);
    $http.get('/api/getterminals?ticket=' + ticket + '&owner=' + owner)
        .success(function (data) {
            $scope.selectedTerminals = JSON.parse(data.body);
            console.log(data.body);
        }).error(function(data) {
        console.log('Error: ' + data);
    });

    $scope.$watch('selectedTerminals', function (newVal, oldVal) {
        if ($scope.selectedTerminals) {
            $scope.terminals = $scope.selectedTerminals;
            console.log('in watch');
        }
    });
};


