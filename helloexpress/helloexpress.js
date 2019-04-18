var express = require('express');
var app = express();

app.get('C:\Users\minty\Desktop\nodejs\cw2\index.html', function (req, res) {
	res.set('Content-Type', 'text/html');
	res.send('Hello Express');
	})

var server = app.listen(5000, "127.0.0.1", function() {
	var host = server.address().address
	var port = server.address().port
	
	console.log("Listening on http://%s:%s", host, port)
})