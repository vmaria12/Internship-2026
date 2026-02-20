import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const deleteLesson = async ({ id }: { id: string }) => {
    const response = await axios.delete(`/lesson/${id}`)
    return response.data
}

// mutation

const useDeleteLessonMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteLesson({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] })
        }
    })
}

export default useDeleteLessonMutation