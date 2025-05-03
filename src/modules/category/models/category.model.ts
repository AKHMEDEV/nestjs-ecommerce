// Category jadvalini yaratish
export const CategoryTableModel = `
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INTEGER,
    CONSTRAINT fk_category_parent
      FOREIGN KEY(category_id) REFERENCES categories(id)
  );
`;