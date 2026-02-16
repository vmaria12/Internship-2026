import type { Course } from "@/app/course/types/course";

export type Coursant = {
    id: string,
    firstName: string,
    lastName: string,
    age: number,
    coursesList: Course[],
}