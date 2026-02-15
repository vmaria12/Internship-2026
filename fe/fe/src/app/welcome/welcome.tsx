import WelcomeAction from "./welcome-action"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

const Welcome = () => {
    return (
        <div className="h-screen w-screen p-4 flex flex-col gap-4 ">
            <Badge variant="default" className="flex justify-center w-full">
                <Info size={16} />
                Se vor folosi diacritice dacă veți face aplicația în română
            </Badge>
            <h1 className="text-blue-400 text-semibold">E-Learning</h1>

            <ol className="list-decimal pl-5">
                <li>Pagina cursanți: grid</li>
                <li>Pagina cursuri: listă</li>
                <li>Pagina lecții: tabel</li>
            </ol>

            <WelcomeAction />
        </div>
    )
}

export default Welcome