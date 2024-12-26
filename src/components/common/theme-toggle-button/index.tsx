"use client";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import React, { memo, useEffect, useMemo, useState } from "react";

import TooltipButton from "../tooltip-button";

function useIsMounted() {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return isMounted;
}

export const ThemeToggleButton = memo(() => {
  const isMounted = useIsMounted();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const color = useMemo(() => computedColorScheme, [computedColorScheme]);
  const icon =
    isMounted && color === "dark" ? (
      <IconSun size={20} color="yellow" stroke={1.6} />
    ) : (
      <IconMoon size={20} color="gray" stroke={1.6} />
    );
  return (
    <TooltipButton
      tooltip={color === "dark" ? "Light Mode" : "Dark Mode"}
      className=" cursor-pointer"
      onClick={() => setColorScheme(color === "light" ? "dark" : "light")}
      variant="transparent"
      color="current"
    >
      {icon}
    </TooltipButton>
  );
});
ThemeToggleButton.displayName = "ThemeToggleButton";
