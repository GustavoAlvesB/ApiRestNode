const express = require("express");
const router = express.Router();

/*aqui estamso implementenado todos 
os metodos que vamos usar em pedidos*/

router.get("/",(req, res, next)=>{
    res.status(200).send({
        mensagem: 'Usando rota get de pedidos.'
    });
});

router.get("/:id_pedido",(req, res, next)=>{
    res.status(200).send({
        mensagem: 'Usando rota get com id de pedidos.'
    });
});

//recebendo os dados via post e passando para html com bodyparse
router.post("/",(req, res, next)=>{
    const pedido = {
        id_produto : req.body.id_produto,
        quantidade : req.body.quantidade
    };
    //passando codigo da operação e mensagem alem de resumo de produto
    res.status(201).send({
        mensagem: 'Usando rota post de peidos.',
        produtoCriado: pedido
    });
});

/*router.patch("/:id_pedido",(req, res, next)=>{
    res.status(201).send({
        mensagem: 'Usando rota patch de pedidos.'
    });
});*/


router.delete("/:id_pedido",(req, res, next)=>{
    res.status(201).send({
        mensagem: 'Usando rota delete de pedidos.'
    });
});


module.exports = router;

