create database ApiNode;
show databases;
use ApiNode;
create table tb_produto
(
id_produto int primary key not null auto_increment,
nome varchar(100) not null,
preco float not null
);

create table tb_pedido (
id_pedido int primary key not null auto_increment,
id_produto int,
quantidade int not null,

CONSTRAINT fk_id_ped_id_prod FOREIGN KEY (id_produto) REFERENCES tb_produto (id_produto) 
);


/*Inner Join entre tabelas*/
SELECT pedido.id_pedido,
       pedido.quantidade,
       produto.id_produto,
       produto.nome,
       produto.preco
FROM tb_pedido as pedido 
INNER JOIN tb_produto as produto
      ON pedido.id_produto = produto.id_produto;