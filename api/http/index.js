
'use strict';

var express = require('express');
var jwt = require('jsonwebtoken');
var Router = express.Router();
var User = require('../../models/user');
var config = require('../../config.json');

Router.get('/', function (req, res) {
    res.send('hello world');
});

Router.post('/addUser', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.find({ username: username }, function(err, user) {
        var response = {};
        if(err) {
            response.error = true;
            response.message = err;
            res.send(response);
        }
        if(user.length != 0) {
            response.error = false;
            response.message = 'User Is Already Found';
            res.send(response);
        } else {
            var newUser = new User({
                username: username,
                password: password
            });
            newUser.save(function(err) {
                if(err) {
                    response.error = true;
                    response.message = err;
                    return res.send(response);
                }
                response.error = false;
                response.message = 'User Is Added Successfully';
                return res.send(response);
            })
        }
    })
});

Router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var data = {
        username: username,
        password: password
    }
    User.find({ username: username }, function(err, user) {
        var response = {};
        if(err) {
            response.error = true;
            response.message = err;
            return res.send(response);
        }
        if(user.length != 0) {
            // response.error = false;
            // response.message = 'User Is Already Found';
            // res.send(response);
            if(user[0].password != password) {
                response.error = true;
                response.message = 'password does not match';
                return res.send(response);
            }
            var token = jwt.sign(data, config.secret, {
                expiresIn: 1440 // expires in 1 hours
            });
            return res.send({
                error: false,
                message: "validation successfyl",
                token: token
            });
        } else {
            response.error = true;
            response.message = 'User Not Found';
            return res.send(response);
        }
    });
});

module.exports = Router;