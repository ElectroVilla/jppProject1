CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL, 
    first_name varchar(50) NOT NULL, 
    last_name varchar(50) NOT NULL, 
    email varchar(100) NOT NULL UNIQUE, 
    phone VARCHAR(20),
    address1 varchar(255) NOT NULL,
	address2 varchar(255) NOT NULL,
	auth integer NOT NULL,
	password varchar(255) NOT NULL,
	status integer NOT NULL
);
