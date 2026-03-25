import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export const TaskApp = () => {

    const queryCliente = new QueryClient();

    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <QueryClientProvider client={queryCliente}>
                <App />
                {/* <ReactQueryDevtools initialIsOpen={true} /> */}
            </QueryClientProvider>
        </ClerkProvider>
    )
}
