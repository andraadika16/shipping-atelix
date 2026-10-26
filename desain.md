# ATELIX LOGISTICS — DESIGN SYSTEM & VISUAL GUIDELINES (`desain.md`)

Dokumen ini adalah panduan desain resmi untuk membangun **ATELIX Companion Shipping Tracking Portal**. Seluruh palet warna, tipografi, dan gaya visual harus 100% konsisten dengan ekosistem **ATELIX: Everyday Tech Carry**.

---

## 1. COLOR PALETTE (STRICT HEX TOKENS)

Dilarang menggunakan warna generik browser. Gunakan token warna heksadesimal presisi berikut:

| Token Name | Hex Code | Penggunaan |
| :--- | :--- | :--- |
| **Background Dark** | `#0B0B0C` | Latar belakang utama aplikasi (`body`, canvas dasar) |
| **Surface 1** | `#171719` | Kartu utama, panel timeline, form input resi, modal |
| **Surface 2** | `#232326` | Hover state kartu, container ikon kurir, badge netral |
| **Border / Divider** | `#303034` | Garis batas kartu, garis penghubung stepper, garis input |
| **Text Primary** | `#F5F5F7` | Judul, nomor resi, teks status utama, keterangan penting |
| **Text Secondary** | `#A4A5AA` | Label waktu, deskripsi hub, subtitle hero, placeholder |
| **Primary Accent** | `#547BFF` | Tombol lacak, fokus input ring, node aktif stepper |
| **Status: Delivered** | `#2C8B66` | Badge status sukses, ikon centang paket terkirim |
| **Status: In Transit** | `#547BFF` | Badge status dalam perjalanan, node animasi berkedip |
| **Status: Warning** | `#B87516` | Percobaan antar gagal / kendala kurir |
| **Status: Error** | `#B84545` | Resi tidak ditemukan / paket retur |

---

## 2. TYPOGRAPHY SYSTEM

* **Primary Font:** Inter / Plus Jakarta Sans / system-ui (`sans-serif`).
* **Monospace Font (Khusus Nomor Resi):** `JetBrains Mono` / `ui-monospace` / `monospace`. Nomor resi wajib menggunakan `font-mono tracking-wider font-semibold` agar karakter alfanumerik mudah terbaca.
* **Heading Hierarchy:**
  * **Hero Title:** `text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F5F5F7]`
  * **Card Section Header:** `text-lg sm:text-xl font-bold text-[#F5F5F7]`
  * **Timeline Location:** `text-sm font-semibold text-[#F5F5F7]`
  * **Timestamp / Subtitle:** `text-xs font-normal text-[#A4A5AA]`

---

## 3. COMPONENT COMPOSITION & LAYOUT

### 3.1 Header / Navigation Bar
* **Tinggi:** `h-16` (64px)
* **Background:** `bg-[#0B0B0C]/90 backdrop-blur-md border-b border-[#303034]`
* **Komponen:**
  * Logo ATELIX (Monokrom `#F5F5F7` dengan badge kurir logistik: *"ATELIX Logistics"*).
  * Link kembali ke Storefront: `href="https://atelix.henss.my.id"` dengan ikon *External Link*.
  * Status Indikator API: Titik hijau berkedip (*Live API Status: Operational*).

### 3.2 Hero Search Section
* **Container:** Terpusat (*centered layout*), padding vertikal nyaman (`py-12 sm:py-20`).
* **Glass Search Input:**
  * Background: `#171719` dengan border `#303034`.
  * Efek Fokus: `border-[#547BFF] ring-2 ring-[#547BFF]/20`.
  * Ikon Kaca Pembesar di sebelah kiri.
  * Tombol CTA *"Lacak Paket"* di sebelah kanan (`bg-[#547BFF] hover:bg-[#547BFF]/90 text-white font-medium rounded-lg px-6 py-2.5`).
* **Quick Samples Pill (Resi Contoh):**
  * Di bawah input: *"Coba resi sampel:"*
  * Tombol Pill klik langsung: `ATX-TRK-982410` (Background `#232326`, border `#303034`, teks `#547BFF`, hover effect).

### 3.3 Main Tracking Result Card
* **Container:** `rounded-2xl border border-[#303034] bg-[#171719] p-6 sm:p-8 shadow-2xl`
* **Card Header:**
  * Nomor Resi dengan tombol Copy (`font-mono text-xl sm:text-2xl font-bold text-[#F5F5F7]`).
  * Nama Kurir (misal: *JNE Express*, *SiCepat Best*, *ATELIX Priority Courier*).
  * Badge Status Pengiriman dengan warna semantik (`#2C8B66` jika DELIVERED, `#547BFF` jika IN_TRANSIT).
  * Estimasi Tiba (Contoh: *"Estimasi Tiba: 24 Oktober 2026"*).

### 3.4 Progress Stepper (Visual Tahapan)
* 5 Lingkaran langkah dengan ikon:
  1. Box Dikonfirmasi (`PackageCheck`)
  2. Truk Diambil Kurir (`Truck`)
  3. Hub Sortir Transit (`Navigation` / `ArrowRightLeft`)
  4. Kurir Mengantar (`Bike` / `Car`)
  5. Centang Diterima (`CheckCircle2`)
* Garis penghubung antar lingkaran berubah warna menjadi `#547BFF` atau `#2C8B66` jika langkah tersebut sudah terlewati.
* Lingkaran yang sedang aktif memiliki animasi pulsasi (`animate-pulse ring-4 ring-[#547BFF]/20`).

### 3.5 Chronological Timeline Card
* Garis vertikal tipis `border-l-2 border-[#303034]` di sebelah kiri.
* Setiap titik riwayat (*timeline event*):
  * Node lingkaran berjarak rapi dengan warna sesuai status kejadian.
  * Waktu kejadian di-format dalam bahasa Indonesia: *"Senin, 20 Oktober 2026 • 14:30 WIB"*.
  * Lokasi Hub logistik (misal: *"Semarang Sorting Hub"* atau *"Warehouse Cengkareng"*).
  * Penjelasan deskriptif kronologis pergerakan barang.

### 3.6 Error & Empty States
* **Not Found (404):**
  * Ikon paket tanda tanya dengan aksen merah lembut (`#B84545`).
  * Pesan: *"Nomor resi tidak ditemukan. Pastikan nomor resi yang Anda masukkan sudah benar."*
  * Tombol *"Gunakan Resi Demo"* untuk menguji tampilan sukses.

---

## 4. MICRO-ANIMATIONS & TRANSITIONS
* Transisi hover halus pada semua tombol: `transition-all duration-200 ease-in-out`.
* Loading skeleton berdenyut lembut pada elemen kartu saat pengambilan data berlangsung.
* Toast pemberitahuan saat nomor resi berhasil disalin ke clipboard.
