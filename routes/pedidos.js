const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;


/*aqui estamso implementenado todos 
os metodos que vamos usar em pedidos*/
router.get("/",(req, res, next)=>{
    mysql.getConnection((error,conn)=>{   
        if (error) {return res.status(500).send({error: error})}     
        conn.query(
            `SELECT pedido.id_pedido,
                    pedido.quantidade,
                    produto.id_produto,
                    produto.nome,
                    produto.preco
            FROM tb_pedido as pedido 
            INNER JOIN tb_produto as produto
                    ON pedido.id_produto = produto.id_produto;`,
            (error,resultado,field)=>{
                //se der erro                 
                if(error){return res.status(500).send({ error: error}); }               
                //uma forma de documentar oq o metodo faz
                const response = {
                    quantidade : resultado.length,
                    pedidos : resultado.map( ped =>{
                        return {
                            id_pedido : ped.id_pedido,
                            quantidade : ped.quantidade,
                            produto :{
                                id_produto : ped.id_produto,
                                nome:ped.nome,
                                preco: ped.preco
                            },
                            request: {
                                tipo : "GET",
                                descricao :"Retorna todos os produtos para serem detalhados",
                                url : "http://localhost:3000/pedidos/"+ped.id_pedido
                            }
                        }
                    }) 
                }

                return res.status(200).send({response});
            }
        )
    })
});
router.get("/:id_pedido",(req, res, next)=>{
    mysql.getConnection((error,conn)=>{   
        if (error) {return res.status(500).send({error: error})}     
        conn.query(
            'SELECT * FROM tb_pedido where id_pedido = ?',
            [req.params.id_pedido],
            (error,resultado,field)=>{
                conn.release();
                //se der erro                 
                if(error){
                    return res.status(500).send({ error: error}); }
                    if (resultado == 0) {
                        return res.status(404).send({mensagem:"Nenhum pedido encontrado"})
                    }
                    const response = {
                             pedido :{
                                    id_pedido : resultado[0].id_pedido,
                                    id_produto: resultado[0].id_produto,
                                    quantidade : resultado[0].quantidade,
                                    request: {
                                        tipo : "GET",
                                        descricao :"Retorna todos os pedidos",
                                        url : "http://localhost:3000/pedidos/"
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
        if (error) {return res.status(500).send({error: error})}     
        conn.query(
            'INSERT INTO tb_pedido (id_produto, quantidade) VALUES (?,?)',
            [req.body.id_produto, req.body.quantidade],            
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
                    mensagem: 'Pedido inserido com sucesso',
                    pedidoCriado : {
                            id_pedido : resultado.id_pedido,
                            id_produto: req.body.id_produto,
                            quantidade : req.body.quantidade,
                            request: {
                                tipo : "POST",
                                descricao :"Insere um  pedido",
                                url : "http://localhost:3000/pedidos/"
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
            'UPDATE tb_pedido SET quantidade = ?, id_produto = ? WHERE id_pedido = ?',
            [req.body.quantidade, req.body.id_produto, req.body.id_pedido],
            (error,resultado,field)=>{
                //fechando conexão
                conn.release();
                if(error) {return res.status(500).send({ error: error}); }
                const response = {
                        mensagem: 'Pedido Atualizado com sucesso',
                        produtoAtualizado : {
                                id_pedido : req.body.id_pedido,
                                id_produto: req.body.id_produto,
                                quantidade : req.body.quantidade,
                                request: {
                                    tipo : "GET",
                                    descricao :"Retorna detalhes do pedido atualizado",
                                    url : "http://localhost:3000/pedidos/" + req.body.id_produto
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
        if (error) {return res.status(500).send({error: error})}     
        conn.query(
            'DELETE  FROM tb_pedido WHERE id_pedido = ?',
            [req.body.id_pedido],
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
                    mensagem: 'Pedido Removido com sucesso',
                    request: {
                                tipo : "GET",
                                descricao :"Retorna todos pedidos",
                                url : "http://localhost:3000/pedidos/" 
                            }
                    }                                 
                //passando codigo da operação e mensagem alem de resumo de produto
                 return res.status(201).send({response});
            }
        )
    })
});
module.exports = router;