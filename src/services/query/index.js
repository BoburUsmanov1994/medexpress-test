import React from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 3000,
            retryDelay: 1000,
        },
    },
})
const Query = ({children, ...rest}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'}/>
        </QueryClientProvider>
    );
};

export default Query;