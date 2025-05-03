export const getAllUsers = 
`SELECT 
  u.id AS user_id,
  u.full_name,
  u.email,
  COALESCE(
    json_agg(
      json_build_object(
        'id', o.id,
        'product_name', o.product_name,
        'quantity', o.quantity,
        'total_price', o.total_price
      )
    ) FILTER (WHERE o.id IS NOT NULL), 
    '[]'
  ) AS orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
`;
