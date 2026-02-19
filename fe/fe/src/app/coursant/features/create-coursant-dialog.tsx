import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import createCoursantMutation from "@/app/api/coursant/create-coursant"
import { PlusIcon } from "lucide-react"
import useDismissModal from "@/hooks/useDismissModal"

const CreateCoursantDialog = () => {
    const { dismiss } = useDismissModal();
    // 1. Definirea schemei de validare cu Zod
    const coursantSchema = z.object({
        firstName: z.string().min(2, "First name must be at least 2 characters long"),
        lastName: z.string().min(2, "Last name must be at least 2 characters long"),
        age: z.number().min(18, "Age must be at least 1"),
    })

    type CreateCoursantForm = z.infer<typeof coursantSchema>

    // 2. Extrage handleSubmit și formState pentru erori
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<CreateCoursantForm>({
        resolver: zodResolver(coursantSchema),
    })

    const mutation = createCoursantMutation()

    // 3. Funcția care primește datele DEJA validate
    const onSubmit = (data: CreateCoursantForm) => {
        if (!isValid) {
            alert("Formular invalid");
            return;
        }
        mutation.mutate(data, {
            onSuccess: () => {
                alert("Coursant created successfully");
                reset();
                dismiss();
            }
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button> <PlusIcon />Create</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Coursant</DialogTitle>
                </DialogHeader>
                {/* 4. Învelim totul într-un tag <form> */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input placeholder="First Name" {...register("firstName")} />
                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                    </div>

                    <div>
                        <Input placeholder="Last Name" {...register("lastName")} />
                        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                    </div>

                    <div>
                        {/* 5. ATENȚIE: valueAsNumber este critic aici pentru Zod */}
                        <Input
                            placeholder="Age"
                            type="number"
                            {...register("age", { valueAsNumber: true })}
                        />
                        {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                    </div>

                    <DialogFooter>
                        {/* 6. Buton de tip "submit" care declanșează handleSubmit */}
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Submitting..." : "Submit"}
                        </Button>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCoursantDialog