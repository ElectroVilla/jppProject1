CREATE TABLE coupons (
    id SERIAL PRIMARY KEY NOT NULL, 
    name varchar(50) NOT NULL, 
	available integer NOT NULL,
    validTille date NOT NULL,
	discountType integer NOT NULL,
    discountValue integer NOT NULL, 
    minOrder integer NOT NULL
);