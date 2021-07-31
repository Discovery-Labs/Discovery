import React from "react";
import { Avatar } from "@chakra-ui/react";
import Link from "next/link";

const AvatarNavigation = () => {

  return (
    <Link href="/">
      <Avatar
        name="Discovery Dapp"
        size="sm"
        // src="/logo.png"
        cursor="pointer"
      />
    </Link>
  );
};

export default AvatarNavigation;
