import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useAuth } from "features/Auth/Context";
import { useLogout } from "features/Auth/hooks";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

const AuthHeader = () => {
  const { identity } = useAuth();
  const { logout } = useLogout();

  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
          <HStack>
            <Avatar size={"sm"} src={identity?.avatar} />
            <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spacing="1px" ml="2">
              <Text fontSize="sm">{identity?.name}</Text>
              <Text fontSize="xs" color="gray.600">
                {identity?.email}
              </Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList bg={useColorModeValue("white", "gray.900")} borderColor={useColorModeValue("gray.200", "gray.700")}>
          <MenuItem>Profile</MenuItem>
          <MenuDivider />
          <MenuItem onClick={logout}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default AuthHeader;
