CREATE TABLE orders (
    id SERIAL PRIMARY KEY NOT NULL, 
    status integer NOT NULL, 
	userId bigint REFERENCES users(id),
    date date NOT NULL,
    payment text NOT NULL, 
	coupon bigint REFERENCES coupons(id)
);