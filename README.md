# 🛍️ Mini E-Commerce Backend (NestJS + SQLShell)

Bu loyiha kichikroq e-commerce backend tizimi bo‘lib, `NestJS` frameworkida yozilgan. Loyha SQLShell orqali ma’lumotlar bazasiga ulanadi va avtomatik ravishda jadval (table) larni yaratadi. Har bir modul mustaqil shaklda tuzilgan va modular arxitekturani qo‘llaydi.

---

## 🎯 Loyha Maqsadi

- NestJS yordamida toza va modular backend tuzish
- SQLShell orqali real jadval yaratish va ulanishni o‘rganish
- DTO, Service, Controller, Interface, Model qismlarini alohida ajratish
- Mahsulot, foydalanuvchi, buyurtma va kategoriya boshqaruvini tashkil etish
- Keyinchalik file upload (rasm yuklash) funksiyasini qo‘shish

---

## 🧩 Loyha Tuzilishi


---

## 📦 Modullar

### 1. `users`  
- Foydalanuvchilar ro‘yxati  
- Jadval: `id`, `name`, `email`

### 2. `products`  
- Mahsulotlar ro‘yxati  
- Jadval: `id`, `title`, `price`, `category_id`

### 3. `category`  
- Kategoriyalar ro‘yxati  
- Jadval: `id`, `name`

### 4. `orders`  
- Buyurtmalar ro‘yxati  
- Jadval: `id`, `user_id`, `product_id`, `quantity`

---

## 🔗 Ma’lumotlar Bazasi Ulanishlari

- **Product - Category**: `Many-to-One` (har bir product bir categoryga tegishli)
- **Order - User**: `Many-to-One` (har bir order bir userga tegishli)
- **Order - Product**: `Many-to-One` (har bir order bir mahsulotga tegishli)

---

## 🛠️ Model: Table Yaratuvchi Kod

```ts
// example: users/model/user.tableModel.ts
export const userTableModel = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
  );
`;
