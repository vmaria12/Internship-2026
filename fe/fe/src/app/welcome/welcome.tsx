import { RightSidebar } from "./right-sidebar"
import WelcomeAction from "./welcome-action"

const Welcome = () => {
    return (
        <div className="h-screen w-screen p-4 flex flex-col gap-4 ">

            <h1 className="text-blue-400 text-semibold">E-Learning</h1>
            <div className="flex flex-row gap-4">
                <RightSidebar />
                <WelcomeAction />
            </div>

        </div>
    )
}

export default Welcome