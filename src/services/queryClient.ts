import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita refetch ao trocar de aba
      retry: 1, // Tenta novamente 1 vez em caso de erro
      staleTime: 1000 * 60 * 5, // Dados considerados frescos por 5 minutos
    },
  },
});