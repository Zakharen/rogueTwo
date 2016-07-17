var dashboard = angular.module('Oz', []);

var dashboardCtrl = function ($scope, $http) {
  $scope.titleOw = "Список владельцев";
  $scope.titleTm = "Список терминалов";

    $scope.selectedOwners = {};

    // возвращает cookie с именем name, если есть, если нет, то undefined
    $scope.getCookie = function (name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    $scope.t = $scope.getCookie('ticket');
    //console.log(t);
    $http.get('/api/getowners?ticket=' + $scope.t)
        .success(function (data) {
            $scope.selectedOwners = JSON.parse(data.body);
        }).error(function(data) {
        console.log('Error: ' + data);
    });

    /*$scope.getOwners = function() {
        var t = $scope.getCookie('ticket');
        //console.log(t);
        $http.get('/api/getowners?ticket=' + t)
            .success(function (data) {
                $scope.selectedOwners = JSON.parse(data.body);
            }).error(function(data) {
            console.log('Error: ' + data);
        });
    };*/

    $scope.$watch('selectedOwners', function (newVal, oldVal) {
        if ($scope.selectedOwners) {
            $scope.owners = $scope.selectedOwners;
            console.log('in watch');
        }
    });
};


