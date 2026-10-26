# ATELIX LOGISTICS — PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Project Name:** ATELIX Companion Shipping Tracking Portal  
**Target Consumer:** Customers & Logistics Operators tracking ATELIX hardware shipments  
**Live API Endpoint:** `https://atelix.henss.my.id/api/public/tracking/:trackingCode`  
**CORS Status:** Enabled (`Access-Control-Allow-Origin: *`)  
**Version:** 1.0.0 (Production Ready)  

---

## 1. EXECUTIVE SUMMARY & OBJECTIVE

ATELIX Companion Shipping Tracking Portal adalah aplikasi web mandiri (*standalone companion web app*) yang bertujuan memberikan pengalaman pelacakan pesanan perangkat keras teknologi (smartphone, audio, laptop, wearable) secara *real-time*, transparan, aman, dan tanpa hambatan.

Aplikasi ini dikembangkan oleh rekan tim di repository / laptop terpisah dan berkomunikasi secara langsung ke API Server ATELIX Storefront melalui endpoint publik CORS-enabled.

---

## 2. ARSITEKTUR KONEKSI & DOMAIN

### 2.1 Skema Komunikasi
```
[User Browser / Companion App]
        │
        │ HTTP GET (CORS Enabled)
        ▼
https://atelix.henss.my.id/api/public/tracking/:trackingCode
        │
        ▼
[ATELIX Storefront Core API] ──► Neon PostgreSQL Database (Shipment + Tracking Events)
```

### 2.2 Aturan Koneksi & Environment Variable
* **Production API Base URL:** `https://atelix.henss.my.id`
* **Local Development Base URL:** `http://localhost:3000` (opsional jika menjalankan storefront lokal)
* **Environment Variable:**
  ```env
  NEXT_PUBLIC_ATELIX_API_URL="https://atelix.henss.my.id"
  ```
* **CORS Header:** API ATELIX mengirim header `Access-Control-Allow-Origin: *`, sehingga aplikasi pelacakan dapat berjalan di `localhost:3000`, `localhost:5173`, atau domain Vercel teman Anda tanpa konfigurasi backend tambahan.

---

## 3. SPESIFIKASI DATA & KONTRAK API

### 3.1 Endpoint
```http
GET https://atelix.henss.my.id/api/public/tracking/:trackingCode
```

### 3.2 Privacy & PII Boundary (Keamanan Data Pelanggan)
API publik ini secara ketat **TIDAK MENGIRIMKAN** data pribadi (PII):
- ❌ Tidak ada nama lengkap penerima
- ❌ Tidak ada nomor telepon
- ❌ Tidak ada alamat rumah lengkap
- ❌ Tidak ada rincian nominal pembayaran
- ✅ Hanya status logistik, kurir, tanggal estimasi tiba, dan riwayat lokasi hub pergerakan paket.

### 3.3 TypeScript Data Contracts (DTO)
```typescript
export interface TrackingEventDTO {
  status: "PENDING" | "PICKED_UP" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "FAILED_ATTEMPT" | "RETURNED" | string;
  description: string;
  locationLabel: string;
  eventAt: string; // ISO 8601 UTC string (contoh: "2026-10-20T10:30:00.000Z")
  source: "ADMIN_MANUAL" | "SYSTEM_WEBHOOK" | string;
}

export interface TrackingResponseDTO {
  trackingCode: string;
  carrier: string;
  status: "PENDING" | "PICKED_UP" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "FAILED_ATTEMPT" | "RETURNED" | string;
  estimatedDelivery: string | null; // Format "YYYY-MM-DD" atau null
  events: TrackingEventDTO[];
}

export interface TrackingErrorDTO {
  error: {
    code: "INVALID_TRACKING_CODE" | "TRACKING_NOT_FOUND" | string;
    message: string;
  };
}
```

### 3.4 Nomor Resi Uji Coba Bawaan (Sandbox)
Untuk keperluan pengembangan tanpa harus membuat pesanan baru:
* `ATX-TRK-982410` (Resi aktif dengan riwayat hub perjalanan)
* `TEST` (Alias untuk resi pengujian cepat)

---

## 4. FITUR UTAMA & USER EXPERIENCE (UX)

### 4.1 Quick Search & Deep-Linking (`?code=`)
* Input pencarian resi otomatis membersihkan spasi dan mengubah huruf menjadi kapital.
* Mendukung query parameter URL: `https://your-tracking-app.vercel.app/?code=ATX-TRK-982410`.
  Ketika link tersebut dibuka, aplikasi otomatis menjalankan pencarian tanpa pengguna harus menekan tombol submit (sangat berguna untuk link dari email notifikasi ATELIX Storefront).

### 4.2 Status Badge & Visual Progress Stepper
Menampilkan progres tahapan pengiriman dalam 5 langkah linier:
1. **Dikonfirmasi / Diproses** (`PENDING` / `MANIFESTED`)
2. **Diserahkan ke Kurir** (`PICKED_UP`)
3. **Dalam Perjalanan / Hub Sortir** (`IN_TRANSIT`)
4. **Sedang Diantar ke Alamat** (`OUT_FOR_DELIVERY`)
5. **Paket Diterima** (`DELIVERED`)

### 4.3 Detailed Chronological Timeline
* Disusun berurutan dari kejadian terbaru (*latest on top*).
* Setiap node memiliki indikator status, label lokasi hub kurir, keterangan logistik, dan format waktu Indonesia (WIB).

### 4.4 One-Click Copy Tracking Code
Tombol salin nomor resi dengan animasi tooltip *"Tersalin!"*.

### 4.5 State Management & Error Handling
* **Idle State:** Menampilkan hero search yang elegan dengan tombol resi sampel (*Quick Pills*).
* **Loading State:** Skeleton loader pulsasi halus tanpa *layout shift*.
* **Not Found State (404):** Pesan jelas bahwa nomor resi tidak terdaftar, disertai tombol hubungi bantuan atau coba resi demo.
* **Offline / Network Error:** Deteksi saat internet terputus dengan opsi coba lagi (*retry*).

---

## 5. NON-FUNCTIONAL REQUIREMENTS (NFR)
1. **Performa:** Page load di bawah 1 detik, bundle ringan.
2. **Responsivitas:** 100% Mobile-first, nyaman digunakan di layar 360px hingga 4K.
3. **Accessibility:** Touch target $\ge 44 \times 44$ px, kontras warna WCAG AA, navigasi ramah keyboard.
