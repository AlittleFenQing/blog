
var mongoose=require('mongoose');
var usersChema=require('../schemas/users');

module.exports = mongoose.model('User',usersChema);