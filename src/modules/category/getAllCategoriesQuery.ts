export const getAllCategories = `
  SELECT 
    c.id AS category_id,
    c.name AS category_name,
    c.description AS category_description,
    COALESCE(
      json_agg(
        json_build_object(
          'id', p.id,
          'name', p.name,  -- mahsulotning nomi
          'price', p.price,
          'quantity', p.quantity  -- miqdor
        )
      ) FILTER (WHERE p.id IS NOT NULL), '[]'
    ) AS products
  FROM categories c
  LEFT JOIN products p ON c.id = p.category_id
  GROUP BY c.id;
`;
