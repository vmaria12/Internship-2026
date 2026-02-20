import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import useDeleteLessonMutation from "@/app/api/lesson/delete-lesson"
import useDismissModal from "@/hooks/useDismissModal"

const DeleteLessonDialog = ({ id }: { id: string }) => {
    const mutation = useDeleteLessonMutation()
    const { dismiss } = useDismissModal();

    const deleteLesson = (id: string) => {
        mutation.mutate(id, {
            onSuccess: () => {
                dismiss();
            }
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="!bg-red-400 !rounded-full"><Trash2 /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Lesson</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this lesson?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button className="!bg-red-400 !rounded-full" onClick={() => deleteLesson(id)}> <Trash2 />Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteLessonDialog