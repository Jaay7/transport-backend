create database transport_service;
use transport_service;

CREATE TABLE IF NOT EXISTS dealer (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    mobile varchar(10) NOT NULL,
    natureOfMaterial varchar(255) NOT NULL,
    weightOfMaterial float NOT NULL,
    quantity float NOT NULL,
    city varchar(255) NOT NULL,
    state varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS driver (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    age int NOT NULL,
    truckNumber varchar(30) NOT NULL,
    mobile varchar(10) NOT NULL,
    truckCapacity float NOT NULL,
    transporterName varchar(255) NOT NULL,
    drivingExperience float NOT NULL,
    route1 varchar(255) NOT NULL,
    route2 varchar(255) NOT NULL,
    route3 varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cart (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dealerId int NOT NULL references dealer.id,
    driverId int NOT NULL references driver.id,
    reqByDealer varchar(255) NOT NULL DEFAULT 'none',
    accByDriver varchar(255) NOT NULL DEFAULT 'none',
    reqDate timestamp DEFAULT CURRENT_TIMESTAMP
);

select * from dealer;
select * from driver;
select * from cart;

drop table cart;

update dealer set city='Chennai',state='Tamil Nadu' where id=1;

select * from driver where route1 regexp "Chennai" or route2 regexp 'Chennai' or route3 regexp 'Chennai';

UPDATE cart SET reqByDealer = 'done', accByDriver = 'accepted' WHERE id = 2 and dealerId = 2 and driverId = 3;

select cart.id as cartId, cart.dealerId, cart.reqByDealer, cart.accByDriver, driver.name, cart.driverId from cart inner join driver on cart.driverId = driver.id where cart.dealerId=2;

select driver.*, ifnull(cart.id, 0) as cartId, ifnull(cart.reqByDealer, 'none') as reqByDealer, ifnull(cart.accByDriver, 'none') as accByDriver from driver left join cart on cart.driverId = driver.id where driver.route1 regexp "Vizag" or driver.route2 regexp 'Vizag' or driver.route3 regexp 'Vizag';