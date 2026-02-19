import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit2 } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import type { Course, UpdateCourseBody } from "../types/course"
import editCourseMutation from "@/app/api/course/edit-course"

const EditCourseDialog = ({ id, course }: { id: string, course: Course }) => {

    // 1, zod
    const editCourseSchema = z.object({
        title: z.string().min(2, 'Titlul trebuie sa aiba minim 2 caractere'),
        description: z.string().min(2, 'Descrierea trebuie sa aiba minim 2 caractere')
    })

    // react hook form
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(editCourseSchema),
        values: {
            title: course.title,
            description: course.description
        }
    });

    // mutation
    const mutation = editCourseMutation();

    const onSubmit = (data: UpdateCourseBody) => {
        mutation.mutate({ id, body: data }, {
            onSuccess: () => {
                reset();
            }
        });
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="!rounded-full !bg-green-400 !text-black"><Edit2 /></Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Editează curs</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex flex-col gap-4 py-4">
                        <Input placeholder="Titlu" {...register('title')} />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                        <Textarea placeholder="Descriere" {...register('description')} />
                        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit">Editează</Button>
                        </DialogClose>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditCourseDialog