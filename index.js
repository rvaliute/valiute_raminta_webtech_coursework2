//sqlite setup

var path = require('path');
var sqlite3 = require('sqlite3').verbose(); //npm install sqlite3 into nodejs
var db = new sqlite3.Database('./LoginDetails', (err) => {
	if(err) {
		return console.error(err.message);
	}
	console.log('Connected to SQLite database.');
});

var express = require('express');
var router = express.Router();
var userapp = express();
var cookie = require('cookie');
var cookieSignature = require('cookie-signature');

/* GET home page, i.e '/', is root. */
router.get('/', function(req, res){
	res.render('index', {title: 'Welcome'});
})

//post in response to login form
router.post('/', function(req, res) {
	var username = req.body.uname;
	var password = req.body.upass;
	//var cookiedetails = cookieSignature.sign('username', username);
	var cookiedetails = ('username',username);
	
	var exists = false;
	
	//create cookie called userdetails
				res.setHeader('Set-Cookie',cookie.serialize('UserDetails',cookiedetails,{
							maxAge:60*60*24
					}));
	
	//check against db
	db.get(`select distinct * from users where username = "${username}" AND password="${password}"`, function(err,row)
		{
			if(err)console.log(err);
	
			if(typeof row == "undefined"){
				exists = false;
				console.log("Invalid username or password.");
				res.render('index', {title: 'Invalid username or password.', extra: 'Please try again.'});
			} else {
			exists = true;
				console.log("Success.");
				//add cookie to database
				db.run(`update users set cookie ='${cookiedetails}' where username = '${username}'`);
				res.render('profileLanding', {title: username, extra2: './images/corgi.gif'});
			}
		})
});

router.get('/messages', function(req, res) {
	res.render('messages', {title: "Inbox", extra2: './images/pug.gif'});

});

router.get('/logout', function(req, res) {
	res.redirect('/');
});

router.get('/send', function(req, res) {
	res.render('send', {title: "Send a message", extra2: './images/shiba.gif'})
});
	

//post in response to send message
router.post('/sendmessage', function(req, res) {
	var recipient = req.body.recipient;
	var message = req.body.message;
	var username = req.cookies.UserDetails;
	
	//insert data into messages table
	db.run(`INSERT INTO messages (sender,receiver,message) VALUES '${username}', '${recipient}', '${message}'`, function(err,row)
			{
				if(err)console.log(err);
				res.render('send', {title: "Something's gone wrong, please try again.", extra2: './images/shiba.gif'})
			} else {
				res.render('profileLanding', {title: "Message sent!", extra2: './images/corgi.gif'});
			})
});


module.exports = router;