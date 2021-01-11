const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require('jsonwebtoken');

//metodo de autenticação de token, com estemetodo eu consigo gtavar meu toke  no hedear type assim sempre que precisar verificar se o usuario esta logado eu chamo o toke.
exports.obrigatorio =  ( req, res, next) => {
    try {
     const token = req.headers.authorization.split('')[1];
     const decode = jwt.verify(token, process.env.JWT_TOKEN);
     req.usuario = decode;
     next();
} catch(error){
    return res.status(401).send({mensagem : 'Falha na autenticação.'});
    }
exports.opcional  =  ( req, res, next) => {
        try {
         const token = req.headers.authorization.split('')[1];
         const decode = jwt.verify(token, process.env.JWT_TOKEN);
         req.usuario = decode;
         next();
    } catch(error){
        return res.status(401).send({mensagem : 'Falha na autenticação.'});
        }
    }
}