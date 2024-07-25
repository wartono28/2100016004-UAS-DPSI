## Dokumentasi API UAS DPSI

**# Dokumentasi API UAS DPSI**

## Ringkasan

Dokumentasi ini menjelaskan penggunaan API untuk UAS DPSI yang dikelola menggunakan Thunder Client. API ini mencakup fitur registrasi, login, pengelolaan produk, dan pembuatan pesanan.

## URL Dasar

```
https://uas-dpsi.vercel.app
```

## Endpoint

### 1. Registrasi

- **URL:** `/auth/register`
- **Metode:** `POST`
- **Header:** Tidak ada
- **Body:**
```json
{
    "username": "mabduh",
    "password": "mabduh",
    "email": "a@a",
    "role": "admin"
}
```
- **Deskripsi:** Endpoint ini digunakan untuk mendaftarkan pengguna baru.

### 2. Login

- **URL:** `/auth/login`
- **Metode:** `POST`
- **Header:** Tidak ada
- **Body:**
```json
{
    "username": "mabduh",
    "password": "mabduh",
    "email": "a@a",
    "role": "admin"
}
```
- **Deskripsi:** Endpoint ini digunakan untuk login pengguna yang sudah terdaftar.

### 3. Tambah Produk

- **URL:** `/products/`
- **Metode:** `POST`
- **Header:**
```json
{
    "Authorization": "Bearer <token>"
}
```
- **Body:**
```json
{
    "name": "Kayu Ukir Naruto",
    "desc": "Dengan kombinasi kayu yang sangat kuat dan tahan lama",
    "stock": "5",
    "price": "1000000",
    "userID": "1",
    "img": "/home/mabduh/Downloads/openCV.png"
}
```
- **Deskripsi:** Endpoint ini digunakan untuk menambahkan produk baru ke dalam sistem.

### 4. Buat Pesanan

- **URL:** `/order/`
- **Metode:** `POST`
- **Header:**
```json
{
    "Authorization": "Bearer <token>"
}
```
- **Body:**
```json
{
    "creditCard": "0973793783678",
    "totalPrice": 2000000,
    "quantity": 2,
    "productID": 1,
    "userID": 1
}
```
- **Deskripsi:** Endpoint ini digunakan untuk membuat pesanan baru.

## Otorisasi

Beberapa endpoint memerlukan token otorisasi. Token ini dapat diperoleh dengan melakukan login dan kemudian digunakan dalam header setiap permintaan yang membutuhkannya.

```json
{
    "Authorization": "Bearer <token>"
}
```

## Respons

Respons dari setiap permintaan akan berupa JSON yang memberikan informasi mengenai hasil dari permintaan yang dilakukan.

## Tester Postman File
https://drive.google.com/file/d/1rHZjONKuJg69DYIRzyjmRVr-zZkjhtxr/view?usp=sharing

## Contoh Penggunaan

### Registrasi

```bash
curl -X POST https://uas-dpsi.vercel.app/auth/register \
-H "Content-Type: application/json" \
-d '{
    "username": "mabduh",
    "password": "mabduh",
    "email": "a@a",
    "role": "admin"
}'
```

### Login

```bash
curl -X POST https://uas-dpsi.vercel.app/auth/login \
-H "Content-Type: application/json" \
-d '{
    "username": "mabduh",
    "password": "mabduh",
    "email": "a@a",
    "role": "admin"
}'
```

### Tambah Produk

```bash
curl -X POST https://uas-dpsi.vercel.app/products/ \
-H "Authorization: Bearer <token>" \
-H "Content-Type: multipart/form-data" \
-F "name=Kayu Ukir Naruto" \
-F "desc=Dengan kombinasi kayu yang sangat kuat dan tahan lama" \
-F "stock=5" \
-F "price=1000000" \
-F "userID=1" \
-F "img=@/home/mabduh/Downloads/openCV.png"
```

### Buat Pesanan

```bash
curl -X POST https://uas-dpsi.vercel.app/order/ \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{
    "creditCard": "097379378367