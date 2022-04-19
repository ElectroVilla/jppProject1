CREATE TABLE carousel (
    id SERIAL PRIMARY KEY NOT NULL, 
    image varchar(255) NOT NULL, 
    haveLink integer NOT NULL, 
    link varchar(255) NOT NULL
);