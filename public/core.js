// public/core.js
var scotchTodo = angular.module('Oz', []);

function mainController($scope, $http) {
    $scope.formUserData = {};

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
                if (resp.Email != null && resp.LoginTicket != null) {
                    window.location.href = 'dashboard.html';
                }
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
}