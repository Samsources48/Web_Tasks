import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const TaskApp = () => {

    const queryCliente = new QueryClient();

    return (
        <QueryClientProvider client={queryCliente}>
            <App />
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </QueryClientProvider>
    )
}
