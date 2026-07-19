import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const categories = [
  "Indoor",
  "Outdoor",
  "Succulent",
  "Flowering",
  "Air-Purifying",
  "Herb",
  "Other",
] as const;

export const careDifficulties = ["Easy", "Medium", "Hard"] as const;

export const lightRequirements = ["Low", "Medium", "Bright Indirect", "Full Sun"] as const;
