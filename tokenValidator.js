'use strict';

var jwt = require('jsonwebtoken');
var config = require('./config.json');

module.exports = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if(err) {
                return res.send({
                    error: true,
                    message: err
                })
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).send({
            error: true,
            message: "No Token Provided"
        })
    }
};