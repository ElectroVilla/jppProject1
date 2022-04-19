CREATE TABLE images (
    id SERIAL PRIMARY KEY NOT NULL, 
	imagename varchar(255) NOT NULL,
    productid bigint REFERENCES products(id)
);