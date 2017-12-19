'use strict';
var express = require('express');
var jwt = require('jsonwebtoken');
var Router = express.Router();


Router.post('/account', function (req, res) {
    res.send({
        error: false,
        message: 'API authenticated with JWT'
    })
});


module.exports = Router;