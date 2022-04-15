import api from "api";
import React from "react";
import useSWR from "swr";

const useGetBlogById = (blogId: string) => {
  // const { data, isValidating } = useSWR(`/blog/${blogId}`, () => api.blog.get(blogId));
  const { data, isValidating } = useSWR(`/blog/${blogId}`);

  return {
    data,
    isLoading: isValidating,
  };
};

export default useGetBlogById;
