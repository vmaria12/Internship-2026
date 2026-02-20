export type Lesson = {
    id: string,
    content: string,
}

export type CreateLessonBody = {
    content: string,
}


export type PaginatedLessons = {
    content: Lesson[],
    pageable: {
        pageNumber: number,
        pageSize: number,
    }
    totalPages: number,
}