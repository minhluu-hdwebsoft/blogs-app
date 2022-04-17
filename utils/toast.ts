import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast({
  defaultOptions: {
    duration: 2000,
    variant: "solid",
    isClosable: true,
    position: "top",
  },
});

export default toast;
