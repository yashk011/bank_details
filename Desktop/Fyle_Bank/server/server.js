var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} =  require('./db/mongoose');
var {Bank} = require('./models/bank');

var app = express();

app.use(bodyParser.json());

app.post('/banks' , (req,res) => {
    console.log(req.body);   
  
    var bank = new Bank({
        bank_name: req.body.bank_name ,
        branch_name : req.body.branch_name ,
        ifsc_code :  req.body.ifsc_code,
        city : req.body.city_name
    })
  
    bank.save().then((doc) => {
        res.status(200).send(doc)
    } , (e) => {
        res.status(404).send(e)
    })
})

app.get('/banks' , (req,res) => {
    Bank.find().then((banks) => {
        res.status(200).send({
            banks})
    } ,(e) => {
        res.status(400).send(e)
    })

})

app.listen(3000 , () => {
    console.log('Started on Port 3000');
})
