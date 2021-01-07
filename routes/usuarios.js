const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
// biblioteca ára criptografar senhas, utlizaremos ela para nossas senhas
const bcrypt = require('bcrypt');

router.post('/cadastro',(req, res, next)=>{
       mysql.getConnection((err, conn)=>{
           if(err){ return res.status(500).send({error: error})}
           //o 10 é uma forma de complicar mais ainda a senha 
           bcrypt.hash(req.body.senha, 10, (errBcrypt,has)=>{
               if(errBcrypt){return res.status(500).send({error:errBcrypt})}
               conn.query('INSERT INTO tb_usuario(email, senha) VALUES (?, ?)'
               [req.body.email, hash],
               (error,results)=>{
                   conn.release();
                   if(error){return res.status(500).send({error:error})}
                   response = {
                    mensagem : 'Usuario criado com sucesso',
                    usuaroCriado : {
                        id_usuarios : results.insertId,
                        email: req.body.email
                    } 
                }
                    return res.status(201).send(response);
                })
        } );
    } );
})
module.exports = router;