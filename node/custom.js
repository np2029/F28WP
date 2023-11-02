var http = require('http');
var socket = require('socket.io')


const httpServer = http.createServer( function (request, response) {
    console.log(request.url);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello Web World");
})
const io = new http.Server(httpServer)

io.on("connection", (socket) => {
    //stuff to do when someone connects
    console.log("connection detected");
} )

httpServer.listen(8080, function() {console.log('Node: port 8080');});