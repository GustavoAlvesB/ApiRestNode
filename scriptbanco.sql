create database ApiNode;
show databases;
use ApiNode;
create table tb_produto
(
id_produto int primary key not null auto_increment,
nome varchar(100),
preco float
);
create table tb_pedido
(
id_pedido int primary key not null,
id_produto int,
quantidade int,
 constraint FOREIGN KEY (id_produto) REFERENCES tb_produto(id_produto)
);

