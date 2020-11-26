create database ApiNode;
show databases;
use ApiNode;
create table tb_produto
(
id_produto int primary key not null auto_increment,
nome varchar(100) not null,
preco float not null
);
create table tb_pedido
(
id_pedido int primary key not null auto_increment,
id_produto int not null,
quantidade int not null,
 constraint FOREIGN KEY (id_produto) REFERENCES tb_produto(id_produto)
);

