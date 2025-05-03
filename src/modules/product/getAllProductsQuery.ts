export const getAllProducts = `
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      p.description AS product_description,
      p.price,
      p.quantity,
      p.image_url,
      c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id;
`;
