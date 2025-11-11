'use client';

import { type PropsWithChildren } from 'react';
import handleAxiosError from '@/utils/handleAxiosError';
import { isServer, MutationCache, QueryClient, QueryClientProvider as TanstackProvider } from '@tanstack/react-query';

const generateQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
      mutations: {},
    },
    mutationCache: new MutationCache({
      onError: (error) => handleAxiosError(error),
    }),
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    return generateQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = generateQueryClient();
  }

  return browserQueryClient;
};

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return <TanstackProvider client={queryClient}>{children}</TanstackProvider>;
};
