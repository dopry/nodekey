

var express = require('express');
var everyauth = require('everyauth');



var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "FunkyTownJamesBrown" }));
  app.use(express.methodOverride());
  app.use(everyauth.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// we need an index for testing
app.get('/', function(req, res){
    res.render('publicKeyForm.jade', { title: 'My Site' });
});


// call back for client side certificate generation forms.
app.get('/v1/pages/generate-key', function(req, res){
    res.render('publicKeyForm.jade', { title: 'Public Key' });
});

app.get('/v1/forms/generate-key', function(req, res){
    res.partial('publicKeyForm.jade', { title: 'My Site' });
});


app.get('/v1/csrs', function(req, res) {

});


app.listen(Number(process.env.PORT || PORT));





