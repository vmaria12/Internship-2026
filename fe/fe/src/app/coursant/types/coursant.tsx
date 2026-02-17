import type { Course } from "@/app/course/types/course";

export type Coursant = {
    id: string,
    firstName: string,
    lastName: string,
    age: number,
    coursesList: Course[],
}

export type CreateCoursantBody = {
    firstName: string,
    lastName: string,
    age: number,
}

export type EditCoursantBody = CreateCoursantBody;