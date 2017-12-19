var express = require('express');
var bodyParser = require('body-parser');
var tokenValidator = require('./tokenValidator');
var router = express.Router();

var config = require('./config');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./api/http'));

app.use('/account', tokenValidator);

app.use(require('./api/http/account'));

app.listen(process.env.PORT || config.app.port);
if (process.env.PORT) {
    console.log('server running on port : ' + process.env.PORT);
} else {
    console.log('server running on port : ' + config.app.port);
}
