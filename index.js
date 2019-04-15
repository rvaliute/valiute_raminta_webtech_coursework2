//sqlite setup

var path = require('path');
//var dbpath = path.resolve(__dirname, './LoginDetails.db')
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

/* GET home page, i.e '/', is root. */
router.get('/', function(req, res){
	res.redirect('/login');
})

router.get('/login', function(req, res){
	res.render('index', {title: 'Welcome'});
});

//post in response to login form
router.post('/', function(req, res) {
	var username = req.body.uname;
	var password = req.body.upass;
	
	var exists = false;
	
	//check against db
	db.get(`select distinct * from users where username = "${username}" AND password="${password}"`, function(err,row)
		{
			if(err)console.log(err);
	
			if(typeof row == "undefined"){
				exists = false;
				console.log("Invalid username or password.");
			} else {
			exists = true;
				console.log("Success.");
				res.render('profileLanding', {title: username});
			}
			res.render('index', {title: 'Invalid username or password.', extra: 'Please try again.'});
		})
	
	
});

router.get('/messages', function(req, res) {
	res.render('messages', {title: "Inbox"});

});



module.exports = router;