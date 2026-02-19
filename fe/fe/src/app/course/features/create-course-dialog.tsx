import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import type { CreateCourseBody } from "../types/course"
import createCourseMutation from "@/app/api/course/create-course"

const CreateCourseDialog = () => {

    // P1: zod
    const courseSchema = z.object({
        title: z.string().min(2, 'Titlul trebuie sa aiba minim 2 caractere'),
        description: z.string().min(2, 'Descrierea trebuie sa aiba minim 2 caractere')
    })

    // register
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(courseSchema),
        values: {
            title: '',
            description: ''
        }
    });

    // mutation
    const mutation = createCourseMutation();

    const onSubmit = (data: CreateCourseBody) => {
        mutation.mutate(data, {
            onSuccess: () => {
                reset();
            }
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><Plus />Adaugă curs</Button>
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>Adaugă curs</DialogTitle>
                    </DialogHeader>

                    <Input placeholder="Titlu"  {...register('title')} />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}

                    <Textarea placeholder="Descriere" {...register('description')} />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}


                    <DialogFooter>
                        <DialogClose disabled={mutation.isPending} asChild>
                            <Button type="submit">Adaugă curs</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCourseDialog

