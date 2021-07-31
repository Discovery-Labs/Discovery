import React from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Tooltip,
  SimpleGrid,
} from "@chakra-ui/react";
import { Mail, MailOutline, Menu } from "heroicons-react";
import MobileMenuButton from "./mobile-menu-button";
import MobileMenuItem from "./mobile-menu-item";

const MobileMenuToggle = ({ mobile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box>
      <Tooltip label="Newsletter">
        <MobileMenuButton label="Menu" icon={<Menu />} onClick={onOpen} />
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent borderTopRadius="6px">
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody pb={4}>
              <VStack>
                <MobileMenuItem href="/" title="Home" />
                <MobileMenuItem href="/link" title="Get started" />
                <MobileMenuItem href="/link" title="Paths" />
                <MobileMenuItem href="/link" title="Get Involved" />
                <SimpleGrid columns={2} spacing={2} w="100%">
                  <MobileMenuItem href="/link" title="Github" />
                  <MobileMenuItem href="/link" title="Community" />
                </SimpleGrid>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default MobileMenuToggle;
