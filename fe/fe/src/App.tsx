import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider, createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./root";
import Welcome from "@/app/welcome/welcome";
import { coursantRoute } from './app/coursant/layout';
import { courseRoute } from './app/course/layout';

export const queryClient = new QueryClient();

export const welcomeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Welcome,
})

const routeTree = rootRoute.addChildren([welcomeRoute, coursantRoute, courseRoute])

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
            <div className="w-full min-h-screen">
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </div>
        </QueryClientProvider>
    )
}

export default App;