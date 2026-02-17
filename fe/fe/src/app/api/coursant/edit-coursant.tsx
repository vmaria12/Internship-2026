import type { EditCoursantBody } from "@/app/coursant/types/coursant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// 1. Definim un tip pentru argumentul unic al mutației
interface EditCoursantArgs {
    id: string;
    body: EditCoursantBody;
}

// 2. Funcția de API primește acum obiectul cu cele două proprietăți
const editCoursantReq = async ({ id, body }: EditCoursantArgs) => {
    const response = await axios.patch(`/coursant/${id}`, body);
    return response.data;
}

const useEditCoursantMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // mutationFn primește acum un singur obiect (EditCoursantArgs)
        mutationFn: (args: EditCoursantArgs) => editCoursantReq(args),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['coursants'] });
        },
    });
}

export default useEditCoursantMutation;