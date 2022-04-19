CREATE TABLE branches (
    id SERIAL PRIMARY KEY NOT NULL, 
    name varchar(255) NOT NULL, 
    address varchar(255), 
    phone1 VARCHAR(255),
    phone2 varchar(255),
	googleMap varchar(255)
);