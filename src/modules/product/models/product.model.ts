export const ProductTableModel = `
    CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        count INT NOT NULL,
        price INT NOT NULL,
        category_id INT REFERENCES categories(id)
    );
`