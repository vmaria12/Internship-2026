import { createRoute } from "@tanstack/react-router"
import { Route as rootRoute } from "@/root"
import LessonTable from "./features/lesson-table"
import AddLessonDialog from "./features/add-lesson-dialog"

const LessonLayout = () => {
    return (
        <div className="w-full min-h-screen p-8">
            <div className="flex justify-between">
                <h1 className="text-red-400">Lecții</h1>
                <AddLessonDialog />
            </div>
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