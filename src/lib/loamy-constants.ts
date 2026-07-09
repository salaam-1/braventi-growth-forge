export const USER_CATEGORIES = [
  { value: "farmer", label: "Farmer" },
  { value: "trader", label: "Trader" },
  { value: "exporter", label: "Exporter" },
  { value: "warehouse_owner", label: "Warehouse Owner" },
  { value: "logistics_provider", label: "Logistics Provider" },
  { value: "growth_partner", label: "Growth Partner" },
  { value: "input_supplier", label: "Input Supplier" },
  { value: "buyer", label: "Buyer" },
] as const;

export type UserCategory = (typeof USER_CATEGORIES)[number]["value"];

export const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  USER_CATEGORIES.map((c) => [c.value, c.label]),
);

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export const COMMODITIES = [
  "Maize", "Rice", "Sesame", "Soybeans", "Ginger", "Cocoa", "Cashew",
  "Groundnut", "Shea", "Sorghum", "Millet", "Cotton", "Beans", "Yam",
  "Cassava", "Palm Produce", "Tomato", "Pepper", "Onion", "Wheat",
];

export const INTERESTS = [
  "Financing", "Marketplace", "Logistics", "Warehousing", "Export",
  "AI Market Intelligence", "Digital Identity", "Input Financing",
  "Commodity Financing",
];
