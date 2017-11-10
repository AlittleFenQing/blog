
var mongoose=require('mongoose');
var categoriesSChema=require('../schemas/categories');

module.exports = mongoose.model('Category',categoriesSChema);