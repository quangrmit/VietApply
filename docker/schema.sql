CREATE TABLE cvs (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    data bytea,
    FOREIGN KEY (user_id) REFERENCES users(id)
);