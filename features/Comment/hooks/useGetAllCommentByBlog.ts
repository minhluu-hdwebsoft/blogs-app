import api from "api";
import { Order } from "models";
import useSWR from "swr";
import { PAGE_SIZE } from "../config";

export const useGetAllCommentByBlog = (blogId: string) => {
  const { data, isValidating } = useSWR([`/blog/${blogId}/comment`, 1], async (_, page) => {
    const response = await api.comment.list(
      undefined,
      {
        blogId: blogId as string,
      },
      page,
      PAGE_SIZE,
      "created_at",
      Order.DESC,
    );
    return response.data;
  });

  return {
    data: data,
    comments: data,
    isLoading: isValidating,
  };
};
