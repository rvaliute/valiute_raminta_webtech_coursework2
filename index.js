//sqlite setup
var path = require('path');
var dbpath = path.resolve(__dirname, './LoginDetails.db')
var sqlite3 = require('sqlite3').verbose(); //npm install sqlite3 into nodejs

/*
var db = new sqlite3.Database('helloapp\users.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('connected to users database');
});

/*db.serialize(function() {
	db.run("INSERT INTO  users (ID, username, password) VALUES (?, ?)", "helloapp", 0);
});
*/

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
	
	var today = new Date();
	var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days

	function setCookie(name, value)
	{
		document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
	}

	function putCookie(form)
    //this should set the UserName cookie to the proper value;
	{
		setCookie("userName", form[0].username.value);
		return true;
	}
	
	res.render('profileLanding', {title: username}); //render name of user logged in
});

router.get('/success', function(req, res){
	res.redirect('profile');
});

router.get('/profile', function(req, res){
	//render the profile page. all users will use the same pug.
	//also remder the same messages page
	});
	
module.exports = router;
