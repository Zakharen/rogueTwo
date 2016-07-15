// public/core.js
var scotchTodo = angular.module('Oz', []);

function mainController($scope, $http) {
    $scope.formUserData = {};

    // when submitting the add form, send the text to the node API
    $scope.loginUser = function() {
        $http.post('/api/login', $scope.formUserData)
            .success(function(data) {
                debugger;
                var resp = JSON.parse(data.body);
                var msg = 'Email > ' + resp.Email + '\nLoginProvider > ' + resp.LoginProvider + '\nLoginTicket > ' + resp.LoginTicket;
                alert(msg);
                $scope.formData = {}; // clear the form so our user is ready to enter another
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}