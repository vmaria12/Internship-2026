import CourseItem from "./course-item";

const CourseList = () => {
    return (
        <div className="flex flex-col gap-6">
            <CourseItem key={1} />
            <CourseItem key={2} />
        </div>
    );
};

export default CourseList;