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
                return res.status(200).send({ response : resultado});
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
            [req.body.id_produto],
            (error,resultado,field)=>{
                conn.release;
                //se der erro                 
                if(error){return res.status(500).send({ error: error}); }               
                return res.status(200).send({ response : resultado});
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
                conn.release;
                if(error){
                    return res.status(500).send({
                        error: error,
                        response : null
                    });
                }
                //passando codigo da operação e mensagem alem de resumo de produto
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    Id_produto:resultado.insertId   
                    });
            }
        )
    })
  
});

router.patch("/:id_produto",(req, res, next)=>{
    res.status(201).send({
        mensagem: 'Usando rota patch de produtos.'
    });
});


router.delete("/:id_produto",(req, res, next)=>{
   /*  testando rota
    res.status(201).send({
        mensagem: 'Usando rota delete de produtos.'
    });*/
    mysql.getConnection((error,conn)=>{   
        if (error) {
            return res.status(500).send({error: error})
        }     
        conn.query(
            'DELETE * FROM tb_produto where id_produto = ?',
            [req.body.id_produto],
            (error,resultado,field)=>{
                conn.release;
                //se der erro                 
                if(error){return res.status(500).send({ error: error}); }               
                return res.status(200).send({ response : resultado});
            }
        )
    })
});


module.exports = router;

