import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { APP_CONFIG, HERO_CONFIG } from '@/constants/tracking.constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${APP_CONFIG.BRAND_NAME} — Companion Shipping Tracking`,
  description: HERO_CONFIG.SUBTITLE,
  keywords: ['ATELIX', 'Logistics', 'Tracking Resi', 'Lacak Paket', 'Pengiriman ATELIX'],
  authors: [{ name: 'ATELIX Engineering Team' }],
  metadataBase: new URL(APP_CONFIG.STOREFRONT_URL),
  openGraph: {
    title: `${APP_CONFIG.BRAND_NAME} — Lacak Paket Real-Time`,
    description: HERO_CONFIG.SUBTITLE,
    url: APP_CONFIG.STOREFRONT_URL,
    siteName: APP_CONFIG.BRAND_NAME,
    locale: 'id_ID',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0B0C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#0B0B0C] text-[#F5F5F7] font-sans selection:bg-[#547BFF]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
