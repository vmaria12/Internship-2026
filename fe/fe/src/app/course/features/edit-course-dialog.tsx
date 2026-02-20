import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit2 } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import type { Course } from "../types/course"
import editCourseMutation from "@/app/api/course/edit-course"
import useDismissModal from "@/hooks/useDismissModal"

const EditCourseDialog = ({ id, course }: { id: string, course: Course }) => {
    const { dismiss } = useDismissModal();
    // 1, zod
    const editCourseSchema = z.object({
        title: z.string().min(2, 'Titlul trebuie sa aiba minim 2 caractere'),
        description: z.string().min(2, 'Descrierea trebuie sa aiba minim 2 caractere')
    })

    // type
    type EditCourseSchema = z.infer<typeof editCourseSchema>
    // react hook form
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<EditCourseSchema>({
        resolver: zodResolver(editCourseSchema),
        values: {
            title: course.title,
            description: course.description
        }
    });

    // mutation
    const mutation = editCourseMutation();

    const onSubmit = (data: EditCourseSchema) => {
        if (!isValid) {
            alert("Formular invalid");
            return;
        }
        mutation.mutate({ id, body: data }, {
            onSuccess: () => {
                reset();
                dismiss();
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
                        <Button type="submit">Editează</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditCourseDialog