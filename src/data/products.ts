import { Product, ProductStatus } from "@/models/product";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 99.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
    ],
    category: {
      id: "cat-1",
      name: "Electronics",
      slug: "electronics",
    },
    tags: ["wireless", "bluetooth", "headphones", "audio"],
    stock: 50,
    sku: "WBH-001",
    status: ProductStatus.ACTIVE,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description:
      "Advanced fitness tracking, heart rate monitoring, and smartphone integration.",
    price: 249.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    ],
    category: {
      id: "cat-1",
      name: "Electronics",
      slug: "electronics",
    },
    tags: ["smartwatch", "fitness", "wearable"],
    stock: 30,
    sku: "SWP-002",
    status: ProductStatus.ACTIVE,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    name: "Organic Coffee Beans",
    description:
      "Premium organic coffee beans from Colombia. Medium roast with chocolate notes.",
    price: 24.99,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"],
    category: {
      id: "cat-2",
      name: "Food & Beverage",
      slug: "food-beverage",
    },
    tags: ["coffee", "organic", "colombian"],
    stock: 100,
    sku: "OCB-003",
    status: ProductStatus.ACTIVE,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "4",
    name: "Vintage Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection.",
    price: 59.99,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    ],
    category: {
      id: "cat-3",
      name: "Accessories",
      slug: "accessories",
    },
    tags: ["wallet", "leather", "vintage", "rfid"],
    stock: 0,
    sku: "VLW-004",
    status: ProductStatus.OUT_OF_STOCK,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
];

export const productCategories = [
  { id: "cat-1", name: "Electronics", slug: "electronics" },
  { id: "cat-2", name: "Food & Beverage", slug: "food-beverage" },
  { id: "cat-3", name: "Accessories", slug: "accessories" },
  { id: "cat-4", name: "Clothing", slug: "clothing" },
  { id: "cat-5", name: "Home & Garden", slug: "home-garden" },
];
