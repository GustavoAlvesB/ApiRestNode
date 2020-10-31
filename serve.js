// biblioteca referente requesiçoes em http
const http = require('http');
//chamando express que esat em app.js
const app = require('./app');
// porta que iremos usar ou porta 3000
const port = process.env.PORT || 3000;
// criando servidor, e passando para ela o app onde esta o express
const server = http.createServer(app);




//ouvindo serve, esat linha deve ser sempre a ultima.
server.listen(port);

