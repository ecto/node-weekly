
/**
 * Module dependencies.
 */

var express = require('express'),
    app     = module.exports = express.createServer(),
    mail    = require('mailchimp');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Node Weekly - Node.js News'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
