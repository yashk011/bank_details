var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} =  require('./db/mongoose');
var {Bank} = require('./models/bank');

var app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// Api for Posting bank_details

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

// Apis for getting bank_details for all banks 

app.get('/banks' , (req,res) => {
    Bank.find().then((banks) => {
        res.status(200).send({
            banks})
    } ,(e) => {
        res.status(400).send(e)
    })
})

app.get('/banks/:ifsc' , (req,res) => {
    var ifsc_code =  req.params.ifsc;
    Bank.find({ifsc_code}).then((bank) => {
        if(!bank)
            return res.status(404).send()
        else    
            return res.status(200).send({bank})    
    },(e) => {
            return res.status(400).send(e)
    })
})

app.get('/banks/findNameCity/:name/:city' , (req,res) => {
    var bank_name = req.params.name;
    var city = req.params.city;

        Bank.find({ city : city , bank_name:bank_name}).then((banks) => {

            if(banks.length<1)
                return res.status(404).send();
            else
               return res.status(200).send({banks});   
         },(e) => {
               return res.status(400).send(e);
    })
})

app.listen(3000 , () => {
    console.log(`Started on Port ${PORT}`);
})
