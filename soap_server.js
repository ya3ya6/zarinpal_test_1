const http = require('http')
const soap = require('soap')
const express = require('express')
const bodyParser = require('body-parser')
var myService = {
  MyService: {
      MyPort: {
          MyFunction: function(args) {
			  console.log('hi')
              return {
                  name: args.name
              };
          },

          // This is how to define an asynchronous function.
          MyAsyncFunction: function(args, callback) {
              // do some work
              callback({
                  name: args.name
              });
          },

          // This is how to receive incoming headers
          HeadersAwareFunction: function(args, cb, headers) {
              return {
                  name: headers.Token
              };
          },

          // You can also inspect the original `req`
          reallyDetailedFunction: function(args, cb, headers, req) {
              console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
              return {
                  name: headers.Token
              };
          }
      }
  }
 };

  var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');
 
 /*
 //http server example
 var server = http.createServer(function(request,response) {
  response.end('404: Not Found: ' + request.url);
 });

 server.listen(8000);
 soap.listen(server, '/wsdl', myService, xml);
 */

 //express server example
 var app = express();
 app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
 app.listen(8000, function(){
 soap.listen(app, '/wsdl', myService, xml);
});
