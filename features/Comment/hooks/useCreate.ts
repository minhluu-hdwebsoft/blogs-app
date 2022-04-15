import api from "api";
import { useLoading } from "hooks";
import { useSWRConfig } from "swr";
import { useGetAllCommentByBlog } from "./useGetAllCommentByBlog";

export const useCreate = (blogId: string) => {
  const { isLoading, toggleLoading } = useLoading(false);
  const { data, comments } = useGetAllCommentByBlog(blogId);
  const { mutate } = useSWRConfig();

  const create = async (content: string) => {
    try {
      toggleLoading();
      await mutate(
        `/blog/${blogId}/comment`,
        async () => {
          const comment = await api.comment.create({
            blogId,
            content,
          });

          return comments ? { ...data, data: [comment, ...comments] } : data;
        },
        {
          revalidate: true,
        },
      );
    } catch (error) {
      console.log("🚀 Minh =====>  ~ file: useCreate.ts ~ line 21 ~ error", error);
    } finally {
      toggleLoading();
    }
  };

  return {
    create,
    isLoading,
  };
};
