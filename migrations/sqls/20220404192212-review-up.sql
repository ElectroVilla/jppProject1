CREATE TABLE reviews (
    id SERIAL PRIMARY KEY NOT NULL, 
	product bigint REFERENCES products(id),
	stars integer NOT NULL,
    comments varchar(255) NOT NULL, 
	"user" bigint REFERENCES users(id)
);
