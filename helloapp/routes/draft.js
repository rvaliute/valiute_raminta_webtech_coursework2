function Rot13Encode(e) {
		var str = textarea.value.toLowerCase().split(" ").sort().join(" ");
		var shift = document.getElementById("shiftSelect").value = e.target.value
		var output = "";
		
		for (var i = 0; i < str.length; i ++) {
			var character = str[i];
			var code = str.charCodeAt(i);
			
                character = String.fromCharCode(((+code - +97 + +shift) % 26) + +97);
				/*window.alert((+code - +97 + +shift) % 26)*/
				
			output += character;
		}
		
		textarea2.value = output;
}



if(typeof row == "undefined"){
				console.log("error");
				res.render('messages', {title: 'Problem retrieving messages.', extra: 'Please try again.'});
			} else {
				
				console.log("Success.");
				console.log(message);
				res.render('messages', {extra: db.get, extra2: './images/corgi.gif'});
			}



var cookiedetails = cookieSignature.sign('username',username);
	
	var exists = false;
	
	//create cookie called userdetails
				res.setHeader('Set-Cookie',cookie.serialize('UserDetails',cookiedetails,{
							maxAge:60*60*24
					}));
					
//add cookie to database
				db.run(`update user set cookie ='${cookiedetails}' where username = '${username}'`);


				
			//insert data into messages table
	db.run(`INSERT INTO messages (sender,receiver,message) VALUES '${username}', '${recipient}', '${message}'`, function(err,row)
			{
				if(err)console.log(err);
				res.render('send', {title: "Something's gone wrong, please try again.", extra2: './images/shiba.gif'})
			} else {
				res.render('profileLanding', {title: "Message sent!", extra2: './images/corgi.gif'});
			})
				
				

var express = require('express');
var parseurl = require('parseurl');
var bodyParser = require('body-parser');
var session = require('express-session'); //npm install express-session

var data = require('./userData.js'); /* login username db */
var data2 = require('./data.js'); /* profile data, messages */

var router = express.Router();

/* GET home page, i.e '/', is root. */
router.get('/', function(req, res){
	res.redirect('/login');
})
	
router.get('/login', function(req, res){
	res.render('index', {title: 'Welcome'});
});

router.user(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));

router.use(function(req, res, next) {
	var views = req.session.views;
	
	if (!views) {
		views = req.session.views = {};
	}
	
	//get the url pathname
	var pathname = parseurl(req).pathname;
	
	//count the views
	views[pathname] = (views[pathname] || 0) + 1
	
	next();
})

function authenticate(req, username, userpass) {
	var authenticatedUser = data.users.find(function (user) {
		if (username === user.username && password ===
		user.password) {
			req.session.authenticated = true;
			console.log('User & Password Authenticated');
		} else {
			return false
		}
	});
	console.log(req.session);
	return req.session;
}

router.post('/', function(req, res){
	var username = req.body.username;
	var userpass = req.body.password;
	authenticate(req, username, userpass);
	if (req.session && req.session.authenticated){
		res.render('profileLanding', {title: data2.users });
	} else {
		res.redirect('/');
	}
})

//validate against db
	//check against db
	db.get(select distinct * from users where username = '${username}', function(err,result,row){
				if(err)
				{
					throw err;
					console.log(result);
				}
				if(result)
				{
					if(req.body.userPassword == result.Password){
						db.run(update User set cookie ='${usercookie}' where username = '${username}');
						res.setHeader('Set-Cookie',cookie.serialize('UserInfo',usercookie,{
							maxAge:60*60*24
						}));
					}
				}
			}
	
//check db v2
//post in response to login form
router.post('/', function(req, res) {
	var username = req.body.uname;
	var password = req.body.upass;
	
	function authenticate(username, password, cb){
	var exists = false;
	
	//check against db
	db.get("SELECT * FROM users WHERE username = '"+username+"' AND password='"+password+"' "), function(err,row){
	if(err)console.log(err);
	if(typeof row == "undefined"){
		exists = false;
		console.log("Invalid username or password.");
		cb(exists);
	} else {
		exists = true;
		console.log("Success.");
		cb(exists);
		res.render('profileLanding', {title: username}); //render name of user logged in
		}
	}
}
});



//sqlite setup
var path = require('path');
var sqlite3 = require('sqlite3').verbose(); //npm install sqlite3 into nodejs
// var dbpath = path.resolve(__dirname, './LoginDetails.db')
var db = new sqlite3.Database('./LoginDetails.db', (err) => {
	if(err) {
		return console.error(err.message);
	}
	console.log('Connected to SQlite database.');
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
	
	function authenticate(username, password, cb){
	var exists = false;
	
	//check against db
	db.get(`select distinct * from users where username = ${username} AND password=${password}`, function(err,row)
		{
			if(err)console.log(err);
	
			if(typeof row == "undefined"){
				exists = false;
				console.log("Invalid username or password.");
				cb(exists);
			} else {
			exists = true;
				console.log("Success.");
				cb(exists);
				res.render('/profileLanding', {title: username});
			}
		})
	}
	
	res.render('./index', {title: 'Invalid username or password.', extra: 'Please try again.'});
});

router.get('/messages', function(req, res) {
	res.render('messages', {title: "Inbox"});

});
module.exports = router;