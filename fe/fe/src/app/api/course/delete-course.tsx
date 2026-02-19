import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const deleteCourse = async ({ id }: { id: string }) => {
    const response = await axios.delete(`/course/${id}`)
    return response.data
}

const deleteCourseMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteCourse({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] })
        }

    })

}

export default deleteCourseMutation;