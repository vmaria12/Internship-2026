import type { PaginatedCourse } from "@/app/course/types/course"
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const getPaginatedCourse = async ({ page, size }: { page: number, size: number }): Promise<PaginatedCourse> => {
    const response = await axios.get<PaginatedCourse>(`/course/v2-page?page=${page}&size=${size}`);
    return response.data;
}

const queryPaginatedCourse = ({ page, size }: { page: number, size: number }) => {
    return useQuery({
        queryKey: ['courses', page, size],
        queryFn: () => getPaginatedCourse({ page, size }),
    })
}

export default queryPaginatedCourse;