"use client";
import React from "react";
import { Box, Group } from "@mantine/core";
import { ThemeToggleButton } from "../theme-toggle-button";
import UserProfileButton from "@/components/profiles/profile-button";
import { Brand } from "../brand";

function Header() {
  // const path = usePathname();
  // const items = tabs.map((tab, index) => (
  //   <UnstyledButton
  //     key={index}
  //     className={
  //       path.includes(tab.path)
  //         ? tab.path.includes(path.split("/")[1])
  //           ? styles.navBarListButtonActive
  //           : styles.navBarListButton
  //         : tab.path === "/"
  //         ? styles.navBarListButtonActive
  //         : styles.navBarListButton
  //     }
  //     component={Link}
  //     href={tab.path}
  //   >
  //     <span className="w-[30px] h-[30px] flex items-center justify-center bg-[var(--holder-bg)] rounded-full">
  //       {tab.icon}
  //     </span>
  //     <Text fz={15} fw={600} color="var(--text-p-color)">
  //       {tab.label}
  //     </Text>
  //   </UnstyledButton>
  // ));
  return (
    <header className="glass flex items-center h-[58px] w-full max-[600px]:h-[50x] fixed top-0">
      <Box visibleFrom="md" className="w-full">
        <nav className=" pr-16 pl-6 text-white w-full">
          <Group
            gap="xs"
            className="w-full items-center gap-5 justify-between "
          >
            <Brand />

            <Group>
              <UserProfileButton />
              <ThemeToggleButton />
            </Group>
          </Group>
        </nav>
      </Box>
      <Box hiddenFrom="md" px="xs" className="w-full">
        <Group
          gap="xs"
          className=" items-center w-full gap-5 justify-between pt-2 text-white"
        >
          <Brand />
          <Group>
            <UserProfileButton />
            <ThemeToggleButton />
          </Group>
        </Group>
      </Box>

      {/* <BottomNavBar items={tabs} /> */}
    </header>
  );
}

export default Header;
