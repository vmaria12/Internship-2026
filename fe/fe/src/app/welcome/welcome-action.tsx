import { Card } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"
import { BookOpen, CircleUser, LayoutGrid } from "lucide-react"

const WelcomeAction = () => {
    return (
        <div className="grid grid-cols-3 gap-4" >
            <Link to="/coursants">
                <Card className="p-2 ">
                    <h2 className="text-blue-400 font-semibold">Cursant</h2>
                    <CircleUser className="size-12 text-blue-400" />
                    <p className="text-blue-400">Adaugă, editează sau șterge cursanți</p>
                </Card>
            </Link>

            <Link to="/courses">
                <Card className="p-2">
                    <h2 className="font-bold text-green-400">Cursuri</h2>
                    <BookOpen className="size-12 text-green-400" />
                    <p className="text-green-400">Adaugă, editează sau șterge cursuri pentru un cursant</p>
                </Card>
            </Link>
            <Card className="p-2">
                <h2 className="text-red-400 font-normal">Lecții</h2>
                <LayoutGrid className="size-12 text-red-400" />
                <p className="text-red-400">Adaugă, editează sau șterge lecții pentru un curs</p>
            </Card>
        </div >
    )
}

export default WelcomeAction