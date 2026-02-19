import useAllCourses from "@/app/api/course/get-all-courses";
import CourseItem from "./course-item";
import { Spinner } from "@/components/ui/spinner";
import type { Course } from "../types/course";

const CourseList = () => {
    const { data: courses, isLoading, error } = useAllCourses();

    if (isLoading) return <div><Spinner /></div>
    if (error) return <div>Error</div>
    return (
        <div className="flex flex-col gap-6">
            {courses?.map((course: Course) => (
                <CourseItem key={course.id} course={course} />
            ))}
        </div>
    );
};

export default CourseList;