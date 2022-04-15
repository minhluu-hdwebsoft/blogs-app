import api from "api";
import { Order } from "models";
import useSWR from "swr";

export const useGetAllCommentByBlog = (blogId: string) => {
  const { data, isValidating } = useSWR(`/blog/${blogId}/comment`, () =>
    api.comment.list(
      undefined,
      {
        blogId: blogId as string,
      },
      1,
      10,
      "created_at",
      Order.DESC,
    ),
  );

  return {
    data: data,
    comments: data?.data,
    isLoading: isValidating,
  };
};
