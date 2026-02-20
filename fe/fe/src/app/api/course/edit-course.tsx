import type { UpdateCourseBody } from "@/app/course/types/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


interface UpdateCourseParams {
    id: string,
    body: UpdateCourseBody,
}
const editCourse = async (id: string, data: UpdateCourseBody): Promise<UpdateCourseBody> => {
    const result = await axios.patch<UpdateCourseBody>(`/course/${id}`, data)
    return result.data
}

const editCourseMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: UpdateCourseParams) => editCourse(params.id, params.body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
        }
    })
}

export default editCourseMutation