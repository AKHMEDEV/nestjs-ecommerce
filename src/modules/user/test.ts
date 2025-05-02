

export const getAllUsers = 
`SELECT 
        u.id AS user_id,
        u.full_name,
        u.email,
        json_agg(
          json_build_object(
            'id', o.id,
            'product_name', o.product_name,
            'quantity', o.quantity,
            'total_price', o.total_price
          )
        ) AS orders
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id
      GROUP BY u.id
    `