create database webapp;

use webapp;

create table user(
    uno int not null auto_increment,
    uname varchar(10) not null,
    pass varchar(10) not null,
    primary key (uno)
);

insert into user(uname,pass) values
('abc','123456'),
('qq101','098765'),
('qwer','zmxncb');