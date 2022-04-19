CREATE TABLE products (
    id SERIAL PRIMARY KEY NOT NULL, 
    name varchar(255) NOT NULL, 
    coverImage varchar(255) NOT NULL, 
    description text NOT NULL, 
    price float NOT NULL,
    introductionDate date NOT NULL,
	brand bigint REFERENCES brands(id),
	category bigint REFERENCES categories(id),
	featured integer NOT NULL,
	new integer NOT NULL,
	review float NOT NULL,
    tag varchar(255) NOT NULL
);