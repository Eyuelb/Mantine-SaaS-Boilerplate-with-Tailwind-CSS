"use client";

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderPrimitive,
} from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error) => {
          // Don't retry on 404s
          if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 404
          ) {
            return false;
          }

          if (failureCount < 3) {
            return true;
          }

          return false;
        },
      },
    },
  });
}
export const getQueryClient: QueryClient = makeQueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient;

  return (
    <QueryClientProviderPrimitive client={queryClient}>
      {children}
    </QueryClientProviderPrimitive>
  );
};

export { QueryClientProvider };
