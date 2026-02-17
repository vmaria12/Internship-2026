import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteCoursant = async (id: string) => {
    const response = await axios.delete(`/coursant/${id}`)
    return response.data
}

const deleteCoursantMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteCoursant(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['coursants'] })
        },
    })
}

export default deleteCoursantMutation