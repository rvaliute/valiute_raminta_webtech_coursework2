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



//LOG THE USER IN
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



//VIEW MESSAGES
router.get('/messages', function(req, res) {
	//res.render('messages', {title: "Inbox", extra2: './images/pug.gif'});
	
	var username = req.cookies.UserDetails;
	var showmsg = [];
	
	//db.get(`select * from messages where receiver = "${username}"`, function(err,row)
	db.serialize(function(){
	db.all(`select * from messages where receiver = "${username}"`, function(err,result,row)
		{
			if(err)
			{
				throw err;
				console.log("error");
			}
			if(result)
			{
				result.forEach(function(value)
				{	
					var sender=value.sender;
					//var yoursentmsg=value.receiver;
					//decode
					var message = value.message.toLowerCase().split(" ").sort().join(" ");
					var shift = 13;
					var output = "";
		
					for (var i = 0; i < message.length; i ++) {
						var character = message[i];
						var code = message.charCodeAt(i);
			
						character = String.fromCharCode(((+code - +97 + +shift) % 26) + +97);
						/*window.alert((+code - +97 + +shift) % 26)*/
				
						output += character;
					}
					
						var receivedmsg=sender+(": ")+output+("\n");
										
				showmsg.push(receivedmsg);
				});
				
				res.render('messages', {title: "Inbox", extra: showmsg, extra2: './images/pug.gif'});
			} 
			else
				
			{
				res.render('messages', {title: 'Problem retrieving messages.', extra: 'Please try again.', extra2: './images/pug.gif'});
			}
		})
	});
});
	

router.get('/logout', function(req, res) {
	res.redirect('/');
});

router.get('/send', function(req, res) {
	res.render('send', {title: "Send a message", extra2: './images/shiba.gif'})
});
	

//SEND A MESSAGE
router.post('/sendmessage', function(req, res) {
	var recipient = req.body.recipient;
	//var message = req.body.message;
	var username = req.cookies.UserDetails;
	
	//encode
		var message = req.body.message.toLowerCase().split(" ").join(" ");
		var shift = 13;
		var output = "";
		
		for (var i = 0; i < message.length; i ++) {
			var character = message[i];
			var code = message.charCodeAt(i);
			
                character = String.fromCharCode(((+code - +97 + +shift) % 26) + +97);
				
			output += character;
		}
		
		res.render('messages', {title: output, extra2: './images/corgi.gif'});
	
	
//insert encoded into db
	db.run(`INSERT INTO messages (sender,receiver,message) VALUES ('${username}', '${recipient}', '${output}')`, function (err)
			{
			if(err) {
				console.log(err);
				res.render('send', {title: "Something's gone wrong, please try again.", extra2: './images/shiba.gif'})
			} else 
			{
				console.log("Success.");
				res.render('messages', {title: "Message sent!", extra2: './images/corgi.gif'});
				}
			}) 
});
		


module.exports = router;