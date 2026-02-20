
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import useDismissModal from "@/hooks/useDismissModal"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useEditLessonMutation from "@/app/api/lesson/edit-lesson"
import type { Lesson } from "../types/lesson"

const EditLessonDialog = ({ id, lesson }: { id: string, lesson: Lesson }) => {
    const { dismiss } = useDismissModal();
    // 1: zod:
    const editLessonSchema = z.object({
        content: z.string().min(1, "Conținutul lecției este obligatoriu"),
    })

    // 2: type
    type EditLessonSchema = z.infer<typeof editLessonSchema>
    // 3: react hook form:
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<EditLessonSchema>({
        resolver: zodResolver(editLessonSchema),
        values: {
            content: lesson.content,
        },
    })

    // 3: create lesson mutation:
    const editLessonMutation = useEditLessonMutation();
    // 4: on submit:
    const onSubmit = (data: EditLessonSchema) => {
        if (!isValid) {
            alert("Formular invalid");
            return;
        };
        editLessonMutation.mutate({ id, body: data }, {
            onSuccess: () => {
                dismiss();
                reset();
            }
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size="sm" className="!bg-blue-400 !rounded-full"> <Pencil /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>   Edit Lesson</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Textarea placeholder="Conținut lecție" {...register("content")} />
                        {errors.content && (
                            <p className="text-red-500">{errors.content.message}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={editLessonMutation.isPending}  >
                            {editLessonMutation.isPending ? "Se salvează..." : "Submit"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditLessonDialog