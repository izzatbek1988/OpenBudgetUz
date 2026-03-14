# Ochiq Byudjet — Қўшкўпир тумани

Қўшкўпир тумани бюджет ташаббусларини кўрсатувчи веб-саҳифа.

## 🚀 Deploy (Shared Hosting — FTP)

Bu loyiha **ikkita fayldan** iborat. PHP va cURL qo'llab-quvvatlaydigan har qanday hostingga joylash mumkin:

1. `index.html` va `proxy.php` fayllarini yuklab oling
2. Hosting panelingizga FTP orqali ulaning
3. **Ikkala faylni ham** `public_html/` papkasiga yuklang
4. Tayyor! Saytingiz ishga tushdi

> **Muhim:** `index.html` **va** `proxy.php` — ikkalasi ham bir papkada bo'lishi shart.

## ⚙️ Hosting talablari

| Talab | Tavsif |
|-------|--------|
| **PHP** | PHP 7.0 yoki undan yuqori |
| **cURL** | PHP cURL kengaytmasi yoqilgan bo'lishi kerak |
| **Disk** | ~100 KB (ikkala fayl uchun yetarli) |

Odatda barcha shared hosting (Plesk, cPanel) bu talablarni qondiradi.

## ⚠️ Muhim eslatma

`openbudget.uz` API si faqat **O'zbekiston ichidan** ishlaydi.
Chet eldan kirilsa, ma'lumotlar yuklanmaydi.

## 🔧 Qanday ishlaydi (proxy)

```
Brauzer → proxy.php (hayrobod.uz serveri) → openbudget.uz API
```

`proxy.php` CORS muammosini hal qiladi: brauzer bir xil domenga (`hayrobod.uz`) murojaat qiladi, proxy esa server tomonidan `openbudget.uz` API siga so'rov yuboradi.

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
| `proxy.php` | PHP proksi — CORS muammosini hal qiladi (**deploy uchun kerak**) |
| `server.js` | Lokal dev server (ixtiyoriy) |
| `api/budget.js` | Vercel serverless function (ixtiyoriy) |
| `api/board.js` | Vercel serverless function (ixtiyoriy) |

## 📊 Ma'lumot manbai

Barcha ma'lumotlar [openbudget.uz](https://openbudget.uz) dan olinadi.

