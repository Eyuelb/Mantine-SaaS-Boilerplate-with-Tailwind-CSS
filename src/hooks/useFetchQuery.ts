import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

interface FetchParams<TArgs> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: TArgs;
  headers?: Headers;
}

interface UseFetchParams<TResponse, TArgs> {
  key: QueryKey;
  fetchParams: FetchParams<TArgs>;
  options?: Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">;
}
const defaultHeaders = new Headers();
defaultHeaders.append("Content-Type", "application/json");
async function fetchData<TResponse, TArgs>({
  url,
  method,
  body,
  headers = defaultHeaders,
}: FetchParams<TArgs>): Promise<TResponse> {
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export function useFetchQuery<TResponse, TArgs>({
  key,
  fetchParams,
  options,
}: UseFetchParams<TResponse, TArgs>) {
  return useQuery<TResponse>({
    queryKey: key,
    queryFn: () => fetchData<TResponse, TArgs>(fetchParams),
    ...options,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
