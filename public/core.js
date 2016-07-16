// public/core.js
var scotchTodo = angular.module('Oz', []);

function mainController($scope, $http) {
    $scope.formUserData = {};
    $scope.selectedOwners = {};

    // when submitting the add form, send the text to the node API
    $scope.loginUser = function() {
        console.log($scope.formUserData);
        $http.post('/api/login', $scope.formUserData)
            .success(function(data) {
                //console.log(data.body);
                var resp = JSON.parse(data.body);
                var msg = 'Email > ' + resp.Email + '\nLoginProvider > ' + resp.LoginProvider + '\nLoginTicket > ' + resp.LoginTicket;
                document.cookie = "ticket=" + resp.LoginTicket;
                alert(msg);
                $scope.formData = {}; // clear the form so our user is ready to enter another
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getTicket = function (){
        $http.get('/api/getticket').success(function(data){
            console.log(data);
        }).error(function(data){
            console.log('Error: ' + data);
        });
    };

    // возвращает cookie с именем name, если есть, если нет, то undefined
    $scope.getCookie = function (name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    $scope.getOwners = function() {
        var t = $scope.getCookie('ticket');
        //console.log(t);
        $http.get('/api/getowners?ticket=' + t)
            .success(function (data) {
                $scope.selectedOwners = JSON.parse(data.body);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.$watch('selectedOwners', function (newVal, oldVal) {
       if ($scope.selectedOwners) {
           $scope.owners = $scope.selectedOwners;
           console.log('in watch');
       }
    });
}