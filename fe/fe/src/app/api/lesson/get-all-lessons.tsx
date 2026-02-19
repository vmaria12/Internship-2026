import type { Lesson } from "@/app/lesson/types/lesson";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAllLessons = async (): Promise<Lesson[]> => {
    const response = await axios.get<Lesson[]>('/lesson/all')
    return response.data;
}

const useGetAllLessons = () => {
    return useQuery({
        queryKey: ['lessons'],
        queryFn: getAllLessons,
    })
}

export default useGetAllLessons

