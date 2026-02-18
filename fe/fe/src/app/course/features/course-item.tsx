import { Bookmark } from "lucide-react";

const CourseItem = () => {
    return (
        <div className="border-2 border-green-400 rounded-lg p-2 flex flex-row">
            <Bookmark className="text-green-400" />
            <h6>Course Item</h6>
        </div>
    );
};

export default CourseItem;