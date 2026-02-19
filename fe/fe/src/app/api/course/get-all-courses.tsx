import type { Course } from "@/app/course/types/course"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getAllCourses = async (): Promise<Course[]> => {
    const response = await axios.get<Course[]>("/course/all")
    return response.data
}

const useAllCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: getAllCourses,
    })
}

export default useAllCourses