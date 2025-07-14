# Edu Booking Bot

یک سامانه تحت وب برای هماهنگی وقت ملاقات بین معلم‌ها و دانش‌آموزها، با استفاده از ربات تلگرام به عنوان رابط کاربری.

---

## 📁 ساختار پروژه

```
my-app/
  front-end/   # رابط کاربری (Telegram WebApp)
  back-end/    # سرور و APIها (PHP/Laravel)
  README.md    # مستندات اصلی پروژه
```

---

## 🚀 ویژگی‌ها

- ثبت‌نام و ورود کاربران از طریق تلگرام
- داشبورد اختصاصی برای معلم و دانش‌آموز
- رزرو زمان ملاقات از بین زمان‌های آزاد معلم
- ارسال اعلان از طریق ربات تلگرام
- طراحی واکنش‌گرا برای موبایل و دسکتاپ
- استفاده از WebApp تلگرام

---

## ⚙️ راه‌اندازی پروژه

### 1. سرور (Back-end)

```bash
cd back-end
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

> مطمئن شوید که PHP، Composer و پایگاه‌داده نصب دارید.

---

### 2. رابط کاربری (Front-end)

```bash
cd front-end
npm install
npm run dev
```

> برای استفاده بهینه از WebApp، باید از طریق تلگرام باز شود. در محیط توسعه از مرورگر هم قابل استفاده است.

---

## 📦 پیش‌نیازها

- PHP 8.1+
- Composer
- Node.js 18+
- Telegram Bot Token
- MySQL یا SQLite

---

## 👤 توسعه‌دهنده

Iman Karimian – [GitHub @IK7D3](https://github.com/IK7D3)

---

## 📄 لایسنس

منتشر شده تحت مجوز MIT.
