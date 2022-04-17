import { Category } from "../category/models";

export interface Comment {
  id: string;
  blogId: string;
  content: string;
  author?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  is_deleted: boolean;
  created_at: string | number;
  updated_at: string | number;
}

export interface CommentQueryParam {
  blogId?: string;
  author?: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
}

export type UpdateCommentQueryParam = Omit<Comment, "is_deleted" | "created_at" | "updated_at">;
export type CreateCommentQueryParam = Omit<Comment, "id" | "is_deleted" | "created_at" | "updated_at">;
