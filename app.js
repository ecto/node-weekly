
/**
 * Module dependencies.
 */

var express = require('express'),
    app     = module.exports = express.createServer(),
    mail    = require('mailchimp').MailChimpAPI;
    apiKey  = '7f4275e0bc768c9aab28a0d0836c552d-us2',
    chimp   = new mail(apiKey, { version : '1.3', secure : false });

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.logger());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Node.js News',
    state: req.session.status || 'false'
  });
});

app.post('/', function(req, res){
  if (req.body.email && validateEmail(req.body.email)) {
    chimp.listSubscribe({ id: '809b49010b', email_address: req.body.email }, function(data){
      console.log(data);
      req.session.status = data.error || data;
      res.redirect('/');
    });
  } else {
    req.session.status = 'Please enter a valid email address.';
    res.redirect('/');
  }
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

//Helper functions

function validateEmail(e) { 
  var p = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return p.test(e);
}
