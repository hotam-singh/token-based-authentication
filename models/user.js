var mongoose = require('mongoose');
mongoose.Promise = require('bluebird').Promise;

var Schema = mongoose.Schema;

var userSchema = new Schema({
    "username": { type: String, required: true, unique: true },
    "password": { type: String, required: true }
});

mongoose.connect('mongodb://localhost:27017/jsonwebtoken', { useMongoClient: true });

module.exports = mongoose.model('users', userSchema);