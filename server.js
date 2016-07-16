// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var request = require('request');                       // create request app
    //var fs = require('fs');                                 // create app to file stream
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    //mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io


    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());




    // define model =================
    /*var Todo = mongoose.model('Todo', {
        text : String
    });*/
    var Login = function (login, password) {  
        this.login = login;
        this.password = password;
    };

    var ticket = "";

    // routes ======================================================================

       
    // api ---------------------------------------------------------------------

    // login and get token
    app.post('/api/login', function(req, res) {
        // get login data, information comes from AJAX request from Angular
        var owner = new Login(req.body.login, req.body.password);
        var jResult = {};
        //Lets configure and request
        request({
            url: 'http://epwebapi20160706110422.azurewebsites.net/api/Account/Login', //URL to hit
            qs: {login: req.body.login, password: req.body.password }, //Query string data
            method: 'POST',
            headers: {
                'Content-Type': 'MyContentType',
                'Custom-Header': 'Custom Value'
            }
        }, function(error, response, body){
            if(error) {
                console.log(error);
            } else {
                res.json(response);
                console.log(req.session);
                var objBody = JSON.parse(body);
                ticket = objBody.LoginTicket;
                //console.log(response.statusCode, body);
            }
        });

        //res.json(owner);
    });

    //get owners
    app.get('/api/getowners', function(req, res) {
        var ticket = req.query.ticket;
        console.log(ticket);
        var url = 'http://epwebapi20160706110422.azurewebsites.net/api/Owners?LoginTicket='+ticket;
        console.log(url);
        request({
            url: url, //URL to hit
            //qs: {LoginTicket: req.body.ticket }, //Query string data
            method: 'GET',
            headers: {
                'Content-Type': 'MyContentType',
                'Custom-Header': 'Custom Value'
            }
        }, function(error, response, body){
            if(error) {
                console.log(error);
            } else {
                res.json(response);
                //console.log(response.statusCode, body);
            }
        });
    });

    app.get('/api/getticket', function(req, res) {
        res.json(ticket);
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    // listen (start app with node server.js) ======================================
    app.listen(8077);
    console.log("App listening on port 8077");