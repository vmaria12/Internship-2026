import type { Course } from "@/app/course/types/course";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import EditCourseDialog from "./edit-course-dialog";
import DeleteCourseDialog from "./delete-course-dialog";

const CourseItem = ({ course }: { course: Course }) => {
    return (
        <Card className="flex flex-col md:flex-row overflow-hidden w-full h-auto md:h-52  p-0 rounded-3xl">
            <div className="relative w-full md:w-64 shrink-0 h-52 md:h-full">
                <img
                    src={`https://picsum.photos/seed/${course.id}/200/300`}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col flex-1 p-6 justify-center">
                <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-hidden">
                    <CardDescription className="line-clamp-4">
                        {course.description}
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-row gap-2 pt-8 justify-end">
                    <EditCourseDialog id={course.id} course={course} />
                    <DeleteCourseDialog id={course.id} />
                </CardFooter>
            </div>
        </Card>
    );
};

export default CourseItem;