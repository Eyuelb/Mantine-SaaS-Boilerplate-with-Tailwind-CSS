"use client";
import { Center, Group } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { ThemeToggleButton } from "@/components/common/theme-toggle-button";
import TooltipButton from "@/components/common/tooltip-button";
import { useWindowScroll } from "@mantine/hooks";

export function Footer() {
  const scrollTo = useWindowScroll()[1];

  return (
    <footer className="bg-[var(--card)] border-t w-full  flex items-center justify-center md:p-0">
      <Center className="w-full max-w-[1200px]">
        <Group
          justify="space-between"
          className="w-full py-4 pb-2 gap-2 px-4"
          wrap="nowrap"
        >
          <span />
          <Group fz={13} gap={4} ta="center">
            Copyright &copy;
            <span>Allora-Groups</span>
            {new Date().getFullYear()}
          </Group>
          <Group className=" rounded-xl border gap-1" wrap="nowrap">
            <ThemeToggleButton />
            <TooltipButton
              variant="outline"
              color="current"
              tooltip="Top"
              onClick={() => scrollTo({ y: 0 })}
              className="cursor-pointer rounded-full"
            >
              <IconArrowUp size={18} />
            </TooltipButton>
          </Group>
        </Group>
      </Center>
    </footer>
  );
}
