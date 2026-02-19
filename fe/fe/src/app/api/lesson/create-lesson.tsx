import type { Lesson } from "@/app/lesson/types/lesson";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createLesson = async (content: string): Promise<Lesson> => {
    const response = await axios.post<Lesson>("/lesson/create", { content })
    return response.data
}

const useCrateLessonMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (content: string) => createLesson(content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lessons'] })
        }
    })
}

export default useCrateLessonMutation