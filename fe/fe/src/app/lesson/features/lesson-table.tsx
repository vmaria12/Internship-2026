import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"
import useGetAllLessons from "@/app/api/lesson/get-all-lessons"
import { Spinner } from "@/components/ui/spinner"

const LessonTable = () => {
    const { data, isLoading, error } = useGetAllLessons()

    if (isLoading) {
        return <div><Spinner /></div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[90%]">Lesson</TableHead>
                    <TableHead className="w-[10%]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((lesson) => (
                    <TableRow key={lesson.id}>
                        <TableCell>{lesson.content}</TableCell>
                        <TableCell className="flex gap-2">
                            <Button
                                variant="default"
                                size="sm"
                                className="!bg-blue-400 !rounded-full"
                            >
                                <Pencil />
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                className="!bg-red-400 !rounded-full"
                            >
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default LessonTable