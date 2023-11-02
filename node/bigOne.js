var fs = require('fs');
var http = require('http');
var url = require('url');
var svr = http.createServer( function (request, response) {
    var path = url.parse(request.url).pathname;
    var mimetype = "text/plain";
    var i = path.lastIndexOf(".");
      if ( i != -1 )
      switch ( path.substring(i) ) {
      case ".css": mimetype = "text/css"; break;
      case ".gif": mimetype = "image/gif"; break;
      case ".html": mimetype = "text/html"; break;
      case ".jpg": mimetype = "image/jpg"; break;
      case ".js": mimetype = "text/javascript"; break;
      case ".png": mimetype = "image/png"; break;
      case ".pdf": mimetype = "application/pdf"; break;
      case ".svg": mimetype = "image/svg+xml"; break;
      case ".xhtml": mimetype = "application/xhtml+xml"; break;
      case ".xml": mimetype = "text/xml"; break;
      default: i = -1;
    }
    console.log(path);//TESTING
    fs.readFile("." + path, function (err, data) {
      var code = 404;
      if ( err ) {
        mimetype = "text/plain";
        data = "file not found";
      } else if ( i == -1 ) {
        data = "invalid path";
      } else code = 200;
      response.writeHead( code, {'Content-Type': mimetype} );
      response.write( data );
      response.end();
    });
});
svr.on('error', function(err) {console.log('Server: ' + err);});
svr.listen(8080, function() {console.log('Node: port 8080');});