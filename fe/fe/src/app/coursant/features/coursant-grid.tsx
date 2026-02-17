import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Coursant } from "../types/coursant";
import useGetAllCoursants from "@/app/api/coursant/get-all-coursants";
import { Cake } from "lucide-react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { getInitials } from "../utils/coursant-initials";
import DeleteCoursantDialog from "./delete-coursant-dialog";

const CoursantGrid = () => {
    const { data, isLoading, isError } = useGetAllCoursants();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return (
        <div className="grid grid-cols-2 gap-4">
            {data?.map((coursant: Coursant) => (
                <Card key={coursant.id}>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar >
                            <AvatarFallback className="p-2 rounded-full bg-blue-400 text-white">{getInitials(coursant.firstName, coursant.lastName)}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{coursant.firstName} {coursant.lastName}</CardTitle>
                    </CardHeader>
                    <CardFooter className="flex flex-row items-center gap-2">
                        <Cake />
                        <p>{coursant.age}</p>
                        <p>ani</p>
                        <DeleteCoursantDialog id={coursant.id} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default CoursantGrid