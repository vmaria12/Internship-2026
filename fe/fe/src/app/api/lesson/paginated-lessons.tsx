import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getPaginatedLessons = async ({ page, size }: { page: number, size: number }) => {
    const response = await axios.post(`/lesson/v2-page?page=${page}&size=${size}`)
    return response.data
}


// use query
const usePaginatedLessons = ({ page, size }: { page: number, size: number }) => {
    return useQuery({
        queryKey: ['lessons', page, size],
        queryFn: () => getPaginatedLessons({ page, size })
    })
}

export default usePaginatedLessons
