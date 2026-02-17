import type { CreateCoursantBody } from "@/app/coursant/types/coursant"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const createCoursant = async (body: CreateCoursantBody) => {
    const response = await axios.post('/coursant/create', body)
    return response.data
}


const createCoursantMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: CreateCoursantBody) => createCoursant(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['coursants'] })
        },
    })
}


export default createCoursantMutation


