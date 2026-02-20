import type { CreateLessonBody } from "@/app/lesson/types/lesson"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface EditLessonParams {
    id: string;
    body: CreateLessonBody;
}

const editLesson = async ({ id, body }: EditLessonParams) => {
    const response = await axios.patch(`/lesson/${id}`, body)
    return response.data
}

// mutation
const useEditLessonMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, body }: EditLessonParams) => editLesson({ id, body }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] })
        }
    })
}

export default useEditLessonMutation