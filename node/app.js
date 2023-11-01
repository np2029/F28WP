var http = require("http");
var svr = http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello Web World");
})
.listen(8080);
svr.on("error", function(err){ console.log("Server: "+err); } );