export type Category = (typeof categories)[number];
export const categories = [
  { name: "Wszystkie", value: "all", icon: "📦" },
  { name: "Owoce", value: "fruits", icon: "🍎" },
  { name: "Warzywa", value: "vegetables", icon: "🥦" },
  { name: "Nabiał", value: "dairy", icon: "🥛" },
  { name: "Mięso", value: "meat", icon: "🍖" },
];

export type Unit = (typeof units)[number];
export const units = [
  { name: "sztuk", value: "pcs" },
  { name: "kilogramów", value: "kg" },
  { name: "litrów", value: "l" },
];

export type Product = {
  id: string;
  name: string;
  category: Category["value"];
  unit: Unit["value"];
  description: string;
  stock: number;
  added: string;
};
