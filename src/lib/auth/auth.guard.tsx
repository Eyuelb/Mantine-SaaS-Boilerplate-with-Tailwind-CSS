"use client";
import { redirect, usePathname } from "next/navigation";
import { useUser } from "./auth.hooks";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Center, Loader, Text } from "@mantine/core";

export function useIsMounted() {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return isMounted;
}

export const ProtectedLayout = (props: PropsWithChildren) => {
  const isMounted = useIsMounted();
  const pathname = usePathname();
  const user = useUser();

  if (!isMounted)
    return (
      <Center h="100dvh">
        <Loader size="sm" mr="sm" />
        <Text size="sm" c="gray.5">
          Loading
        </Text>
      </Center>
    );

  if (!user) {
    if (pathname) {
      redirect(`/auth/login?callback=${pathname}`);
    }
    redirect(`/auth/login`);
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export const ProfileRequiredLayout = (props: PropsWithChildren) => {
  const isMounted = useIsMounted();
  const pathname = usePathname();

  if (!isMounted)
    return (
      <Center h="100dvh">
        <Loader size="sm" mr="sm" />
        <Text size="sm" c="gray.5">
          Loading Profile
        </Text>
      </Center>
    );

  if (!pathname.includes("onboarding")) {
    redirect(`/onboarding`);
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};
