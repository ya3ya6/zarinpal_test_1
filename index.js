const express = require('express')
const app = express()
  var soap = require('soap');
  //var url = 'https://www.zarinpal.com/pg/services/WebGate/wsdl';
  //var url = 'http://127.0.0.1:8000/wsdl?wsdl';
  var url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
  var args = {
    'MerchantID' : 0,
    'Amount' : 15000,
    'Description' : '',
    'Email' : '',
    'Mobile' : '',
    'CallbackURL' : 'http://localhost:3000/paymentDone'
  };
  var args2 = {name: 'yaya'}
  var args3 = {
                'nCdServico':'40010',
                'sCepOrigem':'11060000',
                'sCepDestino':'11070000'
            }
app.get('/', (req, res) => {
  soap.createClient(url, function(err, client) {
      //client.PaymentRequest(args, function(err, result) {
      client.CalcPrazo(args3, function(err, result) {
          logj(err);
          res.send(result);
      });
  });	
})
  function logj(a){return console.log(JSON.stringify(a, null, 2))}