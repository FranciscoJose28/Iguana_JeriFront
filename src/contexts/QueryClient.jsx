"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
export const queryClient = new QueryClient()

const QueryProvider = ({children}) => {
    // const [queryClient] = useState(() => new QueryClient())
    
    return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    );
}
 
export default QueryProvider;