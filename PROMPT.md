# ATELIX SHIPPING TRACKING — MASTER AI PROMPT

> **Petunjuk Penggunaan:**  
> Berikan seluruh teks di bawah ini kepada rekan tim Anda untuk disalin dan ditempelkan (*copy-paste*) ke dalam AI Coding Assistant pilihannya (seperti **Cursor**, **Antigravity**, **Claude**, **ChatGPT**, atau **Windsurf**).  
> Prompt ini sudah dirancang untuk menghasilkan aplikasi web mandiri yang langsung terhubung ke API live Anda tanpa kendala konfigurasi!

---

```markdown
# TASK: BUILD "ATELIX LOGISTICS — COMPANION SHIPPING TRACKING WEB PORTAL"

You are acting as a Senior Full-Stack Frontend Engineer. You are tasked with creating a standalone, high-performance, dark-themed Shipping Tracking Web Application called **"ATELIX Logistics"**.

This app connects directly to the live production e-commerce API server of ATELIX Storefront to fetch real-time parcel movement tracking events.

---

## 1. TECH STACK & SETUP REQUIREMENTS
- **Framework:** Next.js (App Router, Next.js 15/16) with TypeScript.
- **Styling:** Tailwind CSS with Lucide Icons (`lucide-react`).
- **State & Fetching:** React Hooks + native fetch with clean state management (`idle | loading | success | not_found | error`).
- **Date Formatting:** Format all ISO dates into human-readable Indonesian time (WIB), e.g., "Senin, 20 Oktober 2026 • 14:30 WIB".

---

## 2. API ENDPOINT CONTRACT (LIVE PRODUCTION)
The API is already hosted and live. It supports CORS (`Access-Control-Allow-Origin: *`):

- **Live Base URL:** `https://atelix.henss.my.id`
- **Endpoint:** `GET https://atelix.henss.my.id/api/public/tracking/:trackingCode`
- **Environment Variable (`.env.local`):**
  ```env
  NEXT_PUBLIC_ATELIX_API_URL="https://atelix.henss.my.id"
  ```

### TypeScript Data Interfaces:
```typescript
export interface TrackingEventDTO {
  status: string;
  description: string;
  locationLabel: string;
  eventAt: string; // ISO 8601 UTC string
  source: string;
}

export interface TrackingResponseDTO {
  trackingCode: string;
  carrier: string;
  status: string;
  estimatedDelivery: string | null;
  events: TrackingEventDTO[];
}

export interface TrackingErrorDTO {
  error: {
    code: string;
    message: string;
  };
}
```

### Sandbox Test Tracking Code:
- `ATX-TRK-982410` (Always returns valid 200 OK test tracking history for instant testing).
- `TEST` (Alias for the same test tracking response).

---

## 3. STRICT VISUAL DESIGN GUIDELINES & COLOR PALETTE
Do NOT use default browser colors. Strictly implement the official ATELIX dark theme color tokens:
- **Background Dark:** `#0B0B0C` (Main body & container canvas)
- **Surface 1:** `#171719` (Cards, panels, input wrappers)
- **Surface 2:** `#232326` (Hover states, badges, icon containers)
- **Border / Divider:** `#303034` (Card borders, dividers, stepper lines)
- **Text Primary:** `#F5F5F7` (Headings, tracking code, primary copy)
- **Text Secondary:** `#A4A5AA` (Timestamps, labels, subtitles, descriptions)
- **Primary Accent:** `#547BFF` (Buttons, active step indicators, focus rings)
- **Status Semantic Colors:**
  - Delivered / Success: `#2C8B66`
  - In Transit / Active: `#547BFF`
  - Warning / Attempt: `#B87516`
  - Error / Not Found: `#B84545`

---

## 4. MANDATORY FEATURES & COMPONENTS TO IMPLEMENT

### 4.1 Navbar / Header (`src/components/Navbar.tsx`)
- Sleek glassmorphic header (`bg-[#0B0B0C]/90 backdrop-blur-md border-b border-[#303034]`).
- Brand Logo: "ATELIX Logistics" with a glowing tech badge.
- Status indicator: Pulsing green dot with text "API Server: Connected".
- External link button to Storefront: `https://atelix.henss.my.id` with external link icon.

### 4.2 Hero Tracking Search Section (`src/components/TrackingSearch.tsx`)
- Headline: "Lacak Pengiriman Perangkat ATELIX" with subtitle "Pantau pergerakan pesanan teknologi Anda secara real-time dari pusat logistik hingga ke tangan Anda."
- High-contrast search input with search icon, auto-uppercase, and auto-trim.
- Primary CTA Button: "Lacak Paket".
- Quick Pills: "Contoh Resi: [ATX-TRK-982410]" clickable to instantly populate and trigger search.
- **Deep-linking Support:** Read `?code=` from URL search parameters on initial page load (e.g., `/?code=ATX-TRK-982410`) and automatically execute the tracking lookup.

### 4.3 Shipment Overview Card (`src/components/ShipmentCard.tsx`)
- Display Tracking Code with a 1-click "Salin Resi" copy button (shows "Tersalin!" badge on click).
- Carrier Name (e.g., "JNE Express", "ATELIX Priority Courier").
- Semantic Status Pill badge with matching color.
- Estimated Delivery date badge formatted nicely.

### 4.4 5-Step Visual Progress Stepper (`src/components/TrackingStepper.tsx`)
Linear progress indicators with icons:
1. Pesanan Dikonfirmasi (`PackageCheck`)
2. Diambil Kurir (`Truck`)
3. Dalam Perjalanan (`ArrowRightLeft`)
4. Diantar Kurir (`Bike`)
5. Paket Diterima (`CheckCircle2`)
- Solid color line for completed steps, pulsating glow on current step.

### 4.5 Chronological Timeline (`src/components/TrackingTimeline.tsx`)
- Vertical timeline with continuous connecting line (`#303034`).
- Latest event at the top with glowing node indicator.
- Each event displays:
  - Timestamp (formatted with day, date, month, time in WIB).
  - Hub/Location tag (e.g., "Semarang Sorting Hub").
  - Detailed description message.

### 4.6 Error, Loading & Empty States
- **Loading:** Smooth pulsing skeleton cards.
- **Not Found (404):** Clean card with clear explanation and a button to load demo tracking code `ATX-TRK-982410`.
- **Network Error:** Retry button and fallback message.

### 4.7 Footer (`src/components/Footer.tsx`)
- Minimalist dark footer with copyright and link to ATELIX Storefront.

---

## 5. PROJECT STRUCTURE RECOMMENDATION
```
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── TrackingSearch.tsx
│   │   ├── ShipmentCard.tsx
│   │   ├── TrackingStepper.tsx
│   │   ├── TrackingTimeline.tsx
│   │   ├── TrackingSkeleton.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useTracking.ts
│   └── types/
│       └── tracking.types.ts
├── .env.local
└── tailwind.config.ts
```

Please proceed to build this application cleanly with zero `any` types and modular, reusable components!
```
