const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const Readings = require('./api/models/readinModel')
const readingRouter =require('./api/routes/reading')


const fs = require('fs');
var path = require('path'); 
const morgan = require('morgan');




var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
// app.use(morgan('dev'))
 const uri = "mongodb://ambeedev:Ambee90526@ambee-db1-shard-00-00-jwqfm.mongodb.net:27017,ambee-db1-shard-00-01-jwqfm.mongodb.net:27017,ambee-db1-shard-00-02-jwqfm.mongodb.net:27017/test-ambee?ssl=true&replicaSet=ambee-db1-shard-0&authSource=admin"
mongoose.connect(uri,{useNewUrlParser:true})
// localhost mongo connection
// mongoose.connect('mongodb://127.0.0.1:27017/test-ambee',{ useNewUrlParser: true } )

// use bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// cors handling
app.use((req, res, next) => {
    // * can be replaced by any http://somthing.com
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );  
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')    
        return res.status(200).json({});
    }
    next();
});

app.get('/',(req,res,next) => {
    res.status(200).json({
        message:" server is running ",
        credit:"powered by -Ambee"
    })
})

app.use('/readings',readingRouter)



module.exports = app;
