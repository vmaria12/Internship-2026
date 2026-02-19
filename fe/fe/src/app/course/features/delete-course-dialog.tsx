import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import deleteCourseMutation from "@/app/api/course/delete-course"

const DeleteCourseDialog = ({ id }: { id: string }) => {

    const mutation = deleteCourseMutation();

    const handleDelete = (id: string) => {
        mutation.mutate(id)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="!rounded-full !bg-red-400"><Trash2 /></Button>
            </DialogTrigger>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Șterge cursul</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <p>Ești sigur că vrei să ștergi cursul?</p>
                    <p>Cursul va fi șters permanent.</p>
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={() => handleDelete(id)}> <Trash2 className="text-red-400" />Șterge</Button>
                </DialogFooter>


            </DialogContent>
        </Dialog>
    )
}

export default DeleteCourseDialog