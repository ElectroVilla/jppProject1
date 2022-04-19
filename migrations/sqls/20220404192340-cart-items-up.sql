CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY NOT NULL, 
	qty integer NOT NULL,
    productId bigint REFERENCES products(id),
	orderId bigint REFERENCES orders(id)
);