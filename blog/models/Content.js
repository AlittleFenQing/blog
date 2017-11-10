
var mongoose=require('mongoose');
var contentsSChema=require('../schemas/contents');

module.exports = mongoose.model('Content',contentsSChema);