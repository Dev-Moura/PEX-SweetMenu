export type Accent = "brand" | "accent" | "paper";

export type CategoryId = "doces" | "bolos" | "salgados" | "papelaria";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  accent: Accent;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  emoji: string;
  image?: string;
  unit?: string;
  featured?: boolean;
  available?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreHours {
  label: string;
  value: string;
}

export interface StoreInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  hours: StoreHours[];
  social: {
    instagram?: string;
    facebook?: string;
  };
}
