import { createRoute } from "@tanstack/react-router"
import { Route as rootRoute } from "@/root"
import LessonTable from "./features/lesson-table"

const LessonLayout = () => {
    return (
        <div className="w-full min-h-screen p-8">
            <h1 className="text-red-400">Lecții</h1>
            <LessonTable />
        </div>
    )
}

export const lessonRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/lessons',
    component: LessonLayout,
})

export default LessonLayout