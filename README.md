# Ochiq Byudjet — Қўшкўпир тумани

Қўшкўпир тумани бюджет ташаббусларини кўрсатувчи веб-саҳифа.

## 🚀 Deploy (Shared Hosting — FTP)

Bu loyiha **bitta HTML fayldan** iborat. Har qanday hostingga joylash mumkin:

1. `index.html` faylini yuklab oling
2. Hosting panelingizga FTP orqali ulaning
3. `index.html` ni `public_html/` papkasiga yuklang
4. Tayyor! Saytingiz ishga tushdi

## ⚠️ Muhim eslatma

`openbudget.uz` API si faqat **O'zbekiston ichidan** ishlaydi. 
Chet eldan kirilsa, ma'lumotlar yuklanmaydi.

## 🖥️ Lokal ishga tushirish (ixtiyoriy)

Agar lokal kompyuterda ishlatmoqchi bo'lsangiz:

```bash
npm install
node server.js
# http://localhost:3000 da ochiladi
```

## 📁 Fayl tuzilmasi

| Fayl | Tavsif |
|------|--------|
| `index.html` | Asosiy sahifa (HTML + CSS + JS) |
| `server.js` | Lokal dev server (ixtiyoriy) |
| `api/budget.js` | Vercel serverless function (ixtiyoriy) |
| `api/board.js` | Vercel serverless function (ixtiyoriy) |

## 📊 Ma'lumot manbai

Barcha ma'lumotlar [openbudget.uz](https://openbudget.uz) dan olinadi.
