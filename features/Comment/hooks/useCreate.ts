import api from "api";
import { Pagination } from "api-sdk/types";
import { useLoading } from "hooks";
import { unstable_serialize } from "swr/infinite";
import { useSWRConfig } from "swr";
import { useGetAllCommentByBlog } from "./useGetAllCommentByBlog";
import { Comment } from "api-sdk/api/comment/models";

export const useCreate = (blogId: string) => {
  const { isLoading, toggleLoading } = useLoading(false);
  const { mutate } = useSWRConfig();

  const create = async (content: string) => {
    try {
      toggleLoading();
      await mutate(
        unstable_serialize(() => [`/blog/${blogId}/comment`, 1]),
        async (data: Pagination<Comment>[]) => {
          const comments: Comment[] = data[0].data;
          const comment: Comment = await api.comment.create({
            blogId,
            content,
          });

          const newData = [...data];
          newData[0] = {
            ...data[0],
            data: comments ? [comment, ...comments] : comments,
          };

          console.log("🚀 Minh =====>  ~ file: useCreate.ts ~ line 27 ~ newData", newData);
          return newData;
        },
        {
          revalidate: true,
        },
      );
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoading();
    }
  };

  return {
    create,
    isLoading,
  };
};
