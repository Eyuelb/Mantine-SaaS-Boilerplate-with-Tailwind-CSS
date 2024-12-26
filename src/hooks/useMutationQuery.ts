import { getQueryClient } from "@/providers/queryClient.client";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

interface MutationParams<TArgs> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: TArgs;
  headers?: Headers;
}
interface UseMutationParams<TResponse, TArgs> {
  mutationParams: MutationParams<TArgs>;
  invalidateTags?: QueryKey;
  options?: UseMutationOptions<TResponse, unknown, TArgs, unknown>;
}
const defaultHeaders = new Headers();
defaultHeaders.append("Content-Type", "application/json");
async function mutateData<TResponse, TArgs>({
  url,
  method,
  body,
  headers = defaultHeaders,
}: MutationParams<TArgs>): Promise<TResponse> {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.message ?? "Error on request");
  }

  return response.json();
}

export function useMutationQuery<TResponse, TArgs>({
  mutationParams,
  invalidateTags,
  options,
}: UseMutationParams<TResponse, TArgs>) {
  return useMutation<TResponse, unknown, TArgs>({
    mutationFn: (body) =>
      mutateData<TResponse, TArgs>({ ...mutationParams, body }),
    ...options,
    onSuccess: (data: TResponse, variables: TArgs, context: unknown) => {
      if (invalidateTags) {
        getQueryClient.invalidateQueries({
          queryKey: invalidateTags as QueryKey,
        });
      }

      if (options?.onSuccess) options?.onSuccess(data, variables, context);
    },
  });
}
