import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "@/root"
import CourseList from "./features/course-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CourseLayout = () => {
    return (
        <div className="w-full h-full  p-12 ">
            <div className="flex justify-between">
                <h1 className="text-green-400 ">Cursuri</h1>
                <Button><Plus />Adaugă</Button>
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