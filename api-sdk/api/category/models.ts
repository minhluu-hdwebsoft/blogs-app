export interface Category {
  id: string;
  name: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryQueryParam {
  name: string;
}

export type UpdateCategoryQueryParam = Omit<Category, "is_deleted" | "created_at" | "updated_at">;
export type CreateCategoryQueryParam = Omit<Category, "id" | "is_deleted" | "created_at" | "updated_at">;
