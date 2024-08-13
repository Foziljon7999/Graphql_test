CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    content VARCHAR(255),
    user_id INT REFERENCES users(id)
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id),
    user_id INT REFERENCES users(id),
    text TEXT
);