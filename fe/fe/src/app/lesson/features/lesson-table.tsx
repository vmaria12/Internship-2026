import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash } from "lucide-react"
import useGetAllLessons from "@/app/api/lesson/get-all-lessons"
import { Spinner } from "@/components/ui/spinner"
import DeleteLessonDialog from "./delete-lesson-delete"
import EditLessonDialog from "./edit-lesson-dialog"

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
                            <EditLessonDialog id={lesson.id} lesson={lesson} />
                            <DeleteLessonDialog id={lesson.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default LessonTable