CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE meals(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INT,
    quantity INT,
    category_id INT REFERENCES categories(id)
);