import { PackageItemDTO } from '@/types/tracking.types';

/**
 * TODO: Replace this mock data once the backend API provides `items` and `orderNumber`
 * fields in the tracking response endpoint (/api/public/tracking/:code).
 */
export const DEFAULT_MOCK_PACKAGE_ITEMS: PackageItemDTO[] = [
  {
    name: 'ATELIX Tech Sling Pro 14"',
    quantity: 1,
    variant: 'Matte Stealth Black / Cordura® 500D',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Magnetic Cable Organizer & Hub Clip',
    quantity: 2,
    variant: 'Space Gray / Dual Pack',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ergonomic Foldable Aluminum Laptop Riser',
    quantity: 1,
    variant: 'Titanium Anodized / Universal 13-16"',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Waterproof Tech Accessories Pouch Compact',
    quantity: 1,
    variant: 'Storm Gray / YKK Aquaguard',
    imageUrl: '', // Deliberately empty to showcase fallback Package icon
  },
];

export const DEFAULT_MOCK_ORDER_NUMBER = 'ORD-2026-889104';

