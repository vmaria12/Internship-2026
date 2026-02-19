import type { Lesson } from "@/app/lesson/types/lesson";

export type Course = {
    id: string,
    title: string,
    description: string,
    lessons: Lesson[],
}

export type CreateCourseBody = {
    title: string,
    description: string,
}

export type UpdateCourseBody = CreateCourseBody;
