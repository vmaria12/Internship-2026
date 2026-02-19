import type { CreateCourseBody } from "@/app/course/types/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const crateCourse = async (body: CreateCourseBody) => {
    const response = await axios.post("/course/create", body)
    return response.data
}

const mutateCreateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CreateCourseBody) => crateCourse(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
        },
    })
}

export default mutateCreateCourse