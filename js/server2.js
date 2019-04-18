const { createServer } = require("http");

const PORT = process.env.PORT || 5000;

const server = createServer();

server.on("request", (request, response) => {
	response.setHeader("Set-Cookie",["fuckyall=chickenstrips", "type=vine", "name=yeet"]);
	response.end('Your cookies are: ${request.headers.cookie}');
});

server.listen(PORT, () => {
	console.log('starting server at port ${PORT}');
});