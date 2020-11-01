const express = require("express");
const app = express();
//biblioteca responsavel por passar parametros que chagam em json para o corpo da pagina
const bodyParser = require("body-parser");

//vamos aceitar somente dados simples
app.use(bodyParser.urlencoded({extended :false}));
//vamos aceita somente dados em json
app.use(bodyParser.json());

//configuração de acesso de tipo de dados esta é uma configuração de segurança de CORS.
app.use((req, res,next)=>{
    res.header('Acess-Control-Allow-Origin','*');
    res.header('Acess-Control-Allow-Header',
                'Origin, x-Requirested-Win, Content-Type, Accept,Authorization');
    if(req.method==="OPTIONS"){
        res.header('Access-Control-Allow-Methods','PUT,POST,DELETE,GET');
        return res.status(200).send();
    };

    next();
});

//importando metodos de rotas de produtos
const rotasProdutos = require("./routes/produtos")
const rotasPedidos = require("./routes/pedidos")

// aqui estamos indicando qual arquivo chamar em caso da rota ser produtos
app.use('/produtos',rotasProdutos);
// aqui estamos indicando qual arquivo chamar em caso da rota ser pedidos
app.use('/pedidos',rotasPedidos);


app.use('/teste',(req, res, next)=>{
    res.status(200).send({
        mensagem: 'tudo bem até aqui.'
    });
});

module.exports = app;

/*as rotas estão sendo criados de acordo com cada paginas, deixando particonado,
desse jeito quando quiser criar um novo metodo para uma pagina especifica ésó ir no arquivo responsavel*/