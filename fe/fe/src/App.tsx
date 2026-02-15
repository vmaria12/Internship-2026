import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider, createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./root";
import Welcome from "@/app/welcome/welcome";

const queryClient = new QueryClient();

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Welcome,
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = createRouter({
    routeTree,
    context: {
        queryClient,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
})


declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col-2">
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </div>
        </QueryClientProvider>
    )
}

export default App;