import { Route as rootRoute } from "@/root"
import { createRoute, getRouteApi } from "@tanstack/react-router"
import useGetAllCoursants from "../api/coursant/get-all-coursants"
import CoursantGrid from "./features/coursant-grid"

const route = getRouteApi('/coursants')

const CoursantLayout = () => {
    return (
        <div className="h-screen w-screen p-12">
            <h1 className="text-blue-400 font-semibold mb-4">Cursanți</h1>
            <CoursantGrid />
        </div>
    )
}

export const coursantRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/coursants',
    component: CoursantLayout,
})

export default CoursantLayout
