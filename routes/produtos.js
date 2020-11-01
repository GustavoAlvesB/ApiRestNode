const express = require("express");
const router = express.Router();

/*aqui estamso implementenado todos 
os metodos que vamos usar em produtos*/

router.get("/",(req, res, next)=>{
    res.status(200).send({
        mensagem: 'Usando rota get de produtos.'
    });
});

router.get("/:id_produto",(req, res, next)=>{
    res.status(200).send({
        mensagem: 'Usando rota get com id de produtos.'
    });
});

//recebendo os dados via post e passando para html com bodyparse
router.post("/",(req, res, next)=>{
    const produto = {
        nome : req.body.nome,
        preco : req.body.preco
    };
    //passando codigo da operação e mensagem alem de resumo de produto
    res.status(201).send({
        mensagem: 'Usando rota post de produtos.',
        produtoCriado: produto
    });
});

router.patch("/:id_produto",(req, res, next)=>{
    res.status(201).send({
        mensagem: 'Usando rota patch de produtos.'
    });
});


router.delete("/:id_produto",(req, res, next)=>{
    res.status(201).send({
        mensagem: 'Usando rota delete de produtos.'
    });
});


module.exports = router;

