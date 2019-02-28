var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // set upto use Promises  
mongoose.connect('mongodb://localhost:27017/bank_data');

module.exports = {mongoose};