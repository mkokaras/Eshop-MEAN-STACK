var express = require('express');
var app = express();
var morgan=require('morgan');
var mongoose=require('mongoose');
var bodyParser = require('body-parser');
var router =express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json())// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public')); // for parsing application/x-www-form-urlencoded
app.use('/api',appRoutes);

//to api einai gia na ksexwrizw ta backend routes

//database
mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true},function(err){
    if(err){
        console.log("Problem with server");
    }
    else {
        console.log("Server is running");
    }
});

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


//server port
app.listen(process.env.PORT || 8080,function(){
    console.log('Running the server');
});