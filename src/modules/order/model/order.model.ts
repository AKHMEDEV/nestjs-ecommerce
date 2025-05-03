export const OrderTableModel = `
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    total_price NUMERIC NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  );
`;
