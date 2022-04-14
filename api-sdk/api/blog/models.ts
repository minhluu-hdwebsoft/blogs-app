import { Category } from "../category/models";

export interface Blog {
  id: string;
  title: string;
  html: string;
  feature_image: string;
  categories: Category[];
  author: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  is_deleted: boolean;
  created_at: string | number;
  updated_at: string | number;
}

export interface BlogQueryParam {
  author: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}

export type UpdateBlogQueryParam = Omit<Blog, "is_deleted" | "created_at" | "updated_at">;
export type CreateBlogQueryParam = Omit<Blog, "id" | "is_deleted" | "created_at" | "updated_at">;
