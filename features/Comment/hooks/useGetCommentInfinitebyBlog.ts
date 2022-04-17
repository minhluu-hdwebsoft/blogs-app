import api from "api";
import { Comment } from "api-sdk/api/comment/models";
import { Pagination } from "api-sdk/types";
import { Order } from "models";
import { unstable_serialize, useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import { PAGE_SIZE } from "../config";

const getKey = (blogId: string) => (pageIndex: number, previousPageData: Pagination<Comment>) => {
  // reached the end
  // if (!previousPageData) return null;

  // add the cursor to the API endpoint
  return [`/blog/${blogId}/comment`, pageIndex + 1];
};

export const useGetCommentInfiniteByBlog = (blogId: string) => {
  const { fallback } = useSWRConfig();
  const initialData = fallback[unstable_serialize([`/blog/${blogId}/comment`, 1])] as Pagination<Comment>;
  const totalPage = initialData.pagination?._totalRows ? Math.ceil(initialData.pagination?._totalRows / PAGE_SIZE) : 1;

  const { data, setSize, size, mutate } = useSWRInfinite(
    getKey(blogId),
    async (_, page) =>
      api.comment.list(
        undefined,
        {
          blogId: blogId as string,
        },
        page as number,
        PAGE_SIZE,
        "created_at",
        Order.DESC,
      ),

    {
      revalidateOnFocus: false,
      revalidateFirstPage: false,
      revalidateAll: true,
      initialSize: 1,
      fallbackData: [initialData],
    },
  );

  const create = (content: string) => {
    mutate(async () => {
      const comment = await api.comment.create({
        blogId,
        content,
      });

      const newData: Pagination<Comment> = {
        data: [comment],
        pagination: {},
      };

      return data ? [newData, ...data] : data;
    });
  };

  return {
    create,
    data: data ? data.reduce((result: Comment[], item) => result.concat(...item.data), [] as Comment[]) : [],
    isLoadingMore: size + 1 <= totalPage,
    loadMore: () => setSize((prev) => prev + 1),
  };
};
