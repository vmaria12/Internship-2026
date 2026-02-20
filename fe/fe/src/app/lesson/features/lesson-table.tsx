import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
import DeleteLessonDialog from "./delete-lesson-delete"
import EditLessonDialog from "./edit-lesson-dialog"
import usePaginatedLessons from "@/app/api/lesson/paginated-lessons"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Lesson } from "../types/lesson"
import { ChevronLeft, ChevronRight } from "lucide-react"

const LessonTable = () => {
    const [page, setPage] = useState(0)

    const { data, isLoading, error } = usePaginatedLessons({ page, size: 5 })

    if (isLoading) {
        return <div><Spinner /></div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (

        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[90%]">Lesson</TableHead>
                        <TableHead className="w-[10%]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content?.map((lesson: Lesson) => (
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
            <div className="flex items-center justify-center gap-2">
                <Button onClick={() => setPage(page - 1)} disabled={page === 0}><ChevronLeft /></Button>
                {page + 1} / {data?.totalPages}
                <Button onClick={() => setPage(page + 1)} disabled={page === data?.totalPages - 1}><ChevronRight /></Button>
            </div>
        </>
    )
}

export default LessonTable