import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import deleteCoursantMutation from "@/app/api/coursant/delete-coursanr"

const DeleteCoursantDialog = ({ id }: { id: string }) => {

    const { mutateAsync: deleteCoursant } = deleteCoursantMutation()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <TrashIcon className="text-red-400" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Coursant</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this coursant?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => deleteCoursant(id)}> <TrashIcon className="text-red-400" />Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteCoursantDialog