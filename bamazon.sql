DROP DATABASE IF EXISTS bamazon_db;

  CREATE DATABASE bamazon_db;

  USE bamazon_db;

  CREATE TABLE products (

  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL, 
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
  );
  
   
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("flip flops", "summer goods", 5.99, 10), 
("sunscreen", "summer goods", 3.99, 9), 
("beach towel", "summer goods", 10.99, 8), 
("surfboard", "summer goods", 199.99, 9), 
("cooler", "summer goods", 39.99, 10), 
("skiis", "winter goods", 499.99, 9), 
("ski gloves", "winter goods", 19.99,8), 
("ski pants", "winter goods", 109.99, 9), 
("hot chocolate", "winter goods", 2.99, 10), 
("ski goggles", "winter goods", 59.99, 9), 
("hot hands", "winter goods", 1.99, 8)