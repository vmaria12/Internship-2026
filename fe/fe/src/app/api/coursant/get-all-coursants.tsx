import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Coursant } from "@/app/coursant/types/coursant";

export const getAllCoursants = async (): Promise<Coursant[]> => {
    const response = await axios.get<Coursant[]>('/coursant/all');
    return response.data;
}


export const useGetAllCoursants = () => {
    return useQuery({
        queryKey: ['coursants'],
        queryFn: getAllCoursants,
    });
};

export default useGetAllCoursants;
