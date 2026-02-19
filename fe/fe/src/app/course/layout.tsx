import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "@/root"
import CourseList from "./features/course-list";
import CreateCourseDialog from "./features/create-course-dialog";

const CourseLayout = () => {
    return (
        <div className="w-full h-full  p-12 ">
            <div className="flex justify-between">
                <h1 className="text-green-400 ">Cursuri</h1>
                <CreateCourseDialog />
            </div>

            <CourseList />
        </div>
    );
};


export const courseRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/courses',
    component: CourseLayout,
})

export default CourseLayout;