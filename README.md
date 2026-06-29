
## Setup & Menjalankan

```bash
npm install
npm run start:dev
```

Server berjalan di: http://localhost:3000

## Endpoint API

| Method | URL | Deskripsi |
|--------|-----|-----------|
| GET | /products | Semua produk |
| GET | /products/:id | Produk berdasarkan ID |
| GET | /products/available | Produk tersedia (stok > 0 & isAvailable = true) |
| GET | /products/category/:category | Filter by kategori |
| POST | /products | Tambah produk baru |
| PUT | /products/:id | Update produk |
| DELETE | /products/:id | Hapus produk |

## Kategori Produk
- `Dapur`
- `Laundry`
- `Pendingin`
- `Kebersihan`

## Contoh POST /products
```json
{
  "name": "Dispenser Galon Cosmos CWD-5888",
  "price": 380000,
  "category": "Dapur",
  "stock": 15,
  "isAvailable": true
}
```

## Contoh PUT /products/:id
```json
{
  "price": 4500000,
  "stock": 5
}
```

## Struktur Proyek
```
nestjs-elektronik-api-crud/
├── src/
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── main.ts
│   └── products/
│       ├── products.module.ts
│       ├── products.controller.ts
│       ├── products.service.ts
│       
└── package.json
```
