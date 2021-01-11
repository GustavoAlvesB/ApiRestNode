const express = require("express");
const router = express.Router();
//para ter um codigo mais lindo criamos os metodos neste arquivo e aqui invocamos eles
const controllerProdotudo = require("../controller/controllerProdutos")
//aqi estou importando o arquuvo de segurança do tokem para que quando for execitar certas operaçoes acha a onrifmação do token
const login = require('../middleware/login');
// esta biblioteca multer é utilizada para upload de arquivos apos instalar ela com o npm estamos usando seu metodo com um parametro de destino que será a pasta que ficara com os arvuivos.
const multer = require('multer');
//aqui estamos definindo o local que os arquivos serão salvos e seu nome.
const storege = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'/uploads/');        
    }, 
    filename:(req,file,cb)=>{
        cb(null, new Date().toISOString()+file.originalname);
    }
});
// aqui estamos especificando o tipo do arquivo que receberemos;
const fileFilter = (req,file,cd)=> {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb (null,true) ;      
    } else {
        cd (null,false);
    } }
//aqui estamos recebendo os parametos utilizados para salvr os arquivos como local e tamanho
const upload = multer({
    storage: storege,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});
router.get("/", controllerProdotudo.getListProdutos);
router.get("/:id_produto",controllerProdotudo.getProdutoPorId)
//recebendo os dados via post e passando para html com bodyparse, o metodo upload é para subir arquivos de imagems para o banco
router.post("/", login.obrigatorio, upload.single('produto_imagem'),controllerProdotudo.postCadastroDeProdutos);
router.patch("/:id_produto", login.obrigatorio, controllerProdotudo.pathAtualizarProduto) 
router.delete("/:id_produto", login.obrigatorio,controllerProdotudo.deleteExcluirProduto)

module.exports = router;

