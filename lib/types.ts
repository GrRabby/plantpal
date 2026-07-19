export type CareDifficulty = "Easy" | "Medium" | "Hard";
export type LightRequirement = "Low" | "Medium" | "Bright Indirect" | "Full Sun";
export type PlantCategory =
  | "Indoor"
  | "Outdoor"
  | "Succulent"
  | "Flowering"
  | "Air-Purifying"
  | "Herb"
  | "Other";

export interface Plant {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: PlantCategory;
  careDifficulty: CareDifficulty;
  lightRequirement: LightRequirement;
  waterFrequency: string;
  toxicity: "Pet-Safe" | "Toxic to Pets" | "Unknown";
  images: string[];
  location: string;
  sellerId: string;
  sellerName: string;
  status: "Active" | "Sold";
  rating: number;
  reviewCount: number;
  aiCareGuide?: string;
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  plantId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PlantListResponse {
  plants: Plant[];
  pagination: Pagination;
}

export interface IdentificationResult {
  species: string;
  confidence: "High" | "Medium" | "Low";
  summary: string;
  careTips: string[];
  toxicity: string;
  identificationId?: string;
}

export interface ApiSuccess<T> {
  success: true;
  statusCode: number;
  data: T;
  message: string;
}

export interface ApiFailure {
  success: false;
  message: string;
  errors: unknown[];
}
