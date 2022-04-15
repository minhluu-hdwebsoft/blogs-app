import { useState } from "react";

export const useLoading = (defaultValue: boolean) => {
  const [loading, setLoading] = useState(defaultValue || false);

  return {
    isLoading: loading,
    toggleLoading: () => setLoading((prev) => !prev),
  };
};
