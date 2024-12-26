import React from "react";
import {
  IconLogin,
  IconLogout,
  IconUser,
  IconUserCircle,
  IconUserPlus,
} from "@tabler/icons-react";
import { Box, Button, Group, Menu } from "@mantine/core";
import Link from "next/link";
import { useAuth, useSession } from "@/lib/auth/auth.hooks";
import TooltipButton from "../common/tooltip-button";

const UserProfileButton = () => {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useSession();
  const authStatus = isSignedIn
    ? { state: "Sign Out", icon: <IconLogout size="0.9rem" stroke={1.5} /> }
    : { state: "Sign In", icon: <IconLogin size="0.9rem" stroke={1.5} /> };
  return (
    <Box className="relative">
      {isSignedIn ? (
        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          withinPortal
        >
          <Menu.Target>
            <Button
              variant="outline"
              size="compact-sm"
              fz={13}
              fw={300}
              justify="space-around"
              radius="md"
              color="white"
              leftSection={<IconUserCircle size={18} stroke={1.6} />}
            >
              {user?.firstName}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              href="/profile"
              leftSection={<IconUser size="0.9rem" stroke={1.5} />}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              leftSection={authStatus.icon}
              onClick={async () => {
                if (isSignedIn) {
                  await signOut();
                }
                const isBrowser = typeof window !== "undefined";
                if (isBrowser) {
                  window.location.reload();
                }
              }}
            >
              {authStatus.state}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Group className="gap-2">
          <Button radius="lg" component={Link} href="/auth/login">
            Login
          </Button>
          <TooltipButton
            c="white"
            variant="transparent"
            component={Link}
            href="/auth/register"
            tooltip="Sign up"
          >
            <IconUserPlus />
          </TooltipButton>
          {/* <Button radius="lg" variant='subtle' c={'white'} className="  border-l-0" component={Link} href="/auth/register">Sign up</Button> */}
        </Group>
      )}
    </Box>
  );
};

export default UserProfileButton;
