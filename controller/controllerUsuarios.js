const express = require('express');
const mysql = require('../mysql').pool;
// biblioteca ára criptografar senhas, utlizaremos ela para nossas senhas
const bcrypt = require('bcrypt');
//Aqui estamos importando a biblioteca responsavel por gerencia o token
const jwt = require('jsonwebtoken')


exports.postCadastroUsuario = (req, res, next)=>{
    mysql.getConnection((err, conn)=>{
        if(err){ return res.status(500).send({error: error})}
        conn.query('SELECT * FROM tb_usuario WHERE emial = ?',
        [req.body.email],(error, results)=>{
         if(error){return res.status(500).send({error:error})}
         if(results.length > 0 ){
             res.status(409).send({mensagem : 'Usuário ja cadastrado'})
         }else {
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
         }
        })
        
 } );
};
exports.postLoginUsuario = (req,res, next)=>{
    mysql.getConnection((err, conn)=>{
        if(err){return res.status(500).send({error:error})}
        const query = 'SELECT + FROM bt_usuario WHERE email = ? ';
        conn.query(query, [req.body.email],(error,results,fields)=>{
            conn.release();
            if(error){return res.status(500).send({erro:error})};
            if(results.length< 1){ return res.send(401).send({ mensagem: 'Falha na autenticação.'})
        };
        bcrypt.compare( req.body.senha, results[0].senha, (err, result) =>{
            if(err) {
                return res.status(401).send({ mensagem: 'Falha na autenticação.'})
                }
            if (result) {
                //aqui estamos utilizano o metodo de geração de token da biblioteca jwt
                let token = jwt.sign({
                    id_usuarios : results[0].id_usuarios,
                    email : results[0].email,
                    },
                    process.env.JWT_TOKEN,
                    {
                        //temppo que vai durar o token
                        expiresIn : '1h'
                    });
                    return res.status(200).send({
                        mensagem:"autenticado com sucesso.",
                        token: token
                    })
                return res.status(201).send({ mensagem: 'Sucesso na autenticação.'})
                }
            return res.status(401).send({ mensagem: 'Falha na autenticação.'})
            });
        });
    });
};