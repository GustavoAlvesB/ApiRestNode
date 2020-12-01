const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;


/*aqui estamso implementenado todos 
os metodos que vamos usar em produtos*/

router.get("/",(req, res, next)=>{
    mysql.getConnection((error,conn)=>{   
        if (error) {
            return res.status(500).send({error: error})
        }     
        conn.query(
            'SELECT*FROM tb_produto',
            (error,resultado,field)=>{
                //se der erro                 
                if(error){return res.status(500).send({ error: error}); }               
                //uma forma de documentar oq o metodo faz
                const response = {
                    quantidade : resultado.length,
                    produtos : resultado.map( prod =>{
                        return {
                            id_produto : prod.id_produto,
                            nome: prod.nome,
                            preco : prod.preco,
                            request: {
                                tipo : "GET",
                                descricao :"Retorna todos os produtos para serem detalhados",
                                url : "http://localhost:3000/produtos/"+prod.id_produto
                            }
                        }
                    }) 
                }

                return res.status(200).send({response});
            }
        )
    })
});
router.get("/:id_produto",(req, res, next)=>{
    mysql.getConnection((error,conn)=>{   
        if (error) {
            return res.status(500).send({error: error})
        }     
        conn.query(
            'SELECT * FROM tb_produto where id_produto = ?',
            [req.params.id_produto],
            (error,resultado,field)=>{
                conn.release();
                //se der erro                 
                if(error){
                    return res.status(500).send({ error: error}); }
                    if (resultado == 0) {
                        return res.status(404).send({mensagem:"Nenhum produto encontrado"})
                    }
                    const response = {
                             produto :{
                                    id_produto : resultado[0].id_produto,
                                    nome: resultado[0].nome,
                                    preco : resultado[0].preco,
                                    request: {
                                        tipo : "GET",
                                        descricao :"Retorna todos os produto",
                                        url : "http://localhost:3000/produtos/"
                                    }
                                }
                            }
                            return res.status(200).send({ response});
                        }                                
        )
    })
});

//recebendo os dados via post e passando para html com bodyparse
router.post("/",(req, res, next)=>{
 /*  para verificar se paramentros estão chegando
     const produto = {
        nome : req.body.nome,
        preco : req.body.preco
    };*/
    /*usando abiblioteca de mysql para fazer conexão e inserção de dados ao mesmo tempo. passando como paremetro um erro e uma conexão*/
    mysql.getConnection((error,conn)=>{   
        if (error) {
            return res.status(500).send({error: error})
        }     
        conn.query(
            'INSERT INTO tb_produto (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],            
            (error,resultado,field)=>{
                //fechando conexão
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error,
                        response : null
                    });
                }
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado : {
                            id_produto : resultado.id_produto,
                            nome: req.body.nome,
                            preco : req.body.preco,
                            request: {
                                tipo : "POST",
                                descricao :"Insere um produto",
                                url : "http://localhost:3000/produtos/"
                            }
                        }                     
                }
                //passando codigo da operação e mensagem alem de resumo de produto
                res.status(201).send(response);
            }
        )
    })
  
});

router.patch("/",(req, res, next)=>{
    /*res.status(201).send({
        mensagem: 'Usando rota patch de produtos.'
    });*/
    mysql.getConnection((error,conn)=>{   
        if (error) {
            return res.status(500).send({error: error})
        }     
        conn.query(
            'UPDATE tb_produto SET nome = ?, preco = ? WHERE id_produto = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error,resultado,field)=>{
                //fechando conexão
                conn.release();
                if(error) {return res.status(500).send({ error: error}); }
                const response = {
                        mensagem: 'Produto Atualizado com sucesso',
                        produtoAtualizado : {
                                id_produto : req.body.id_produto,
                                nome: req.body.nome,
                                preco : req.body.preco,
                                request: {
                                    tipo : "GET",
                                    descricao :"Retorna detalhes do produto atualizado",
                                    url : "http://localhost:3000/produtos/" + req.body.id_produto
                                }
                        }                     
                }
                //passando codigo da operação e mensagem alem de resumo de produto
                return res.status(202).send(response);
            }
        )
    });
});


router.delete("/",(req, res, next)=>{
   /*  testando rota
    res.status(201).send({
        mensagem: 'Usando rota delete de produtos.'
    });*/
    mysql.getConnection((error,conn)=>{   
        if (error) {
            return res.status(500).send({error: error})
        }     
        conn.query(
            'DELETE  FROM tb_produto WHERE id_produto = ?',
            [req.body.id_produto],
            (error,resultado,field)=>{
                //fechando conexão
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error,
                        response : null
                    });
                }
                const response = {
                    mensagem: 'Produto Removido com sucesso',
                    request: {
                                tipo : "GET",
                                descricao :"Retorna todos produtos",
                                url : "http://localhost:3000/produtos/" 
                            }
                    }                                 
                //passando codigo da operação e mensagem alem de resumo de produto
                 return res.status(201).send({response});
            }
        )
    })
});


module.exports = router;

