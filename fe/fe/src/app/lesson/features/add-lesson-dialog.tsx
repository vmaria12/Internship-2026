import useCrateLessonMutation from "@/app/api/lesson/create-lesson"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import useDismissModal from "@/hooks/useDismissModal"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const AddLessonDialog = () => {
    const { dismiss } = useDismissModal();
    // 1: zod:
    const createLessonSchema = z.object({
        content: z.string().min(1, "Conținutul lecției este obligatoriu"),
    })

    // 2: type
    type CreateLessonSchema = z.infer<typeof createLessonSchema>
    // 3: react hook form:
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<CreateLessonSchema>({
        resolver: zodResolver(createLessonSchema),
        defaultValues: {
            content: "",
        },
    })

    // 3: create lesson mutation:
    const createLessonMutation = useCrateLessonMutation();
    // 4: on submit:
    const onSubmit = (data: CreateLessonSchema) => {
        if (!isValid) {
            alert("Formular invalid");
            return;
        };
        createLessonMutation.mutate(data.content, {
            onSuccess: () => {
                dismiss();
                reset();
            }
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default"> <PlusIcon />Adaugă</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Lesson</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Textarea placeholder="Conținut lecție" {...register("content")} />
                        {errors.content && (
                            <p className="text-red-500">{errors.content.message}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={createLessonMutation.isPending}  >
                            {createLessonMutation.isPending ? "Se salvează..." : "Submit"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddLessonDialog