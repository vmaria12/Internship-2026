import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Coursant } from "../types/coursant"
import useEditCoursantMutation from "@/app/api/coursant/edit-coursant"

const EditCoursantDialog = ({ id, coursant }: { id: string, coursant: Coursant }) => {

    // validation schema
    const coursantSchema = z.object({
        firstName: z.string().min(2, "First name must be at least 2 characters long"),
        lastName: z.string().min(2, "Last name must be at least 2 characters long"),
        age: z.number().min(18, "Age must be at least 1"),
    })

    type EditCoursantForm = z.infer<typeof coursantSchema>

    const { register, handleSubmit, formState: { errors }, reset } = useForm<EditCoursantForm>({
        resolver: zodResolver(coursantSchema),
        values: {
            firstName: coursant.firstName,
            lastName: coursant.lastName,
            age: coursant.age
        }
    })


    // mutation
    const { mutateAsync: editCoursant } = useEditCoursantMutation()

    const onSubmit = (data: EditCoursantForm) => {
        editCoursant({ id, body: data })
        reset()
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="!bg-green-400 !rounded-full" >
                    <PencilIcon className="text-black" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <DialogHeader>
                        <DialogTitle>Edit Coursant</DialogTitle>
                        <DialogDescription>
                            <div className="flex flex-col gap-2">
                                <Input placeholder="First Name" type="text" {...register("firstName")} />
                                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                                <Input placeholder="Last Name" type="text" {...register("lastName")} />
                                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                                <Input placeholder="Age" type="number" {...register("age", { valueAsNumber: true })} />
                                {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="!bg-green-400 !text-black" type="submit"> <PencilIcon className="text-black" />Edit</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditCoursantDialog
