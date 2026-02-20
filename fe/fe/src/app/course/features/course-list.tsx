import CourseItem from "./course-item";
import type { Course } from "../types/course";
import { useState } from "react";
import queryPaginatedCourse from "@/app/api/course/paginated-cours";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CourseList = () => {
    const [page, setPage] = useState(0);

    const { data, isLoading, error } = queryPaginatedCourse({ page, size: 5 });

    if (isLoading) {
        return <div><Spinner /></div>;
    }

    if (error) {
        return <div>A apărut o eroare la încărcarea cursurilor.</div>;
    }

    return (
        <>
            <div className="flex flex-col gap-6">
                {data?.content?.map((course: Course) => (
                    <CourseItem key={course.id} course={course} />
                ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
                <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
                    <ChevronLeft />
                </Button>
                {page + 1} / {data?.totalPages}
                <Button onClick={() => setPage(page + 1)} disabled={page === (data?.totalPages ?? 1) - 1}>
                    <ChevronRight />
                </Button>
            </div>
        </>
    );
};

export default CourseList;