import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import createCourseMutation from "@/app/api/course/create-course"
import useDismissModal from "@/hooks/useDismissModal"

const CreateCourseDialog = () => {

    const { dismiss } = useDismissModal();
    // P1: zod
    const courseSchema = z.object({
        title: z.string().min(2, 'Titlul trebuie sa aiba minim 2 caractere'),
        description: z.string().min(2, 'Descrierea trebuie sa aiba minim 2 caractere')
    })

    // type
    type CourseSchema = z.infer<typeof courseSchema>
    // register
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<CourseSchema>({
        resolver: zodResolver(courseSchema),
        values: {
            title: '',
            description: ''
        }
    });

    // mutation
    const mutation = createCourseMutation();

    const onSubmit = (data: CourseSchema) => {
        if (!isValid) {
            alert("Formular invalid");
            return;
        }
        mutation.mutate(data, {
            onSuccess: () => {
                reset();
                dismiss();
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
                        <Button type="submit">Adaugă curs</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCourseDialog

