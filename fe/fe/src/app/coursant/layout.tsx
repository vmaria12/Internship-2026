import { Route as rootRoute } from "@/root"
import { createRoute } from "@tanstack/react-router"
import CoursantGrid from "./features/coursant-grid"
import CreateCoursantDialog from "./features/create-coursant-dialog"


const CoursantLayout = () => {
    return (
        <div className="h-screen w-screen p-12">
            <div className="flex justify-between">
                <h1 className="text-blue-400 font-semibold mb-4">Cursanți</h1>
                <CreateCoursantDialog />
            </div>

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
