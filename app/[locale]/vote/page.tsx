import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

const votingSites = [
    {
        name: "Minecraft-MP",
        url: "https://minecraft-mp.com/server/xxx/vote/",
    },
    {
        name: "TopMinecraftServers",
        url: "https://topminecraftservers.org/server/xxx",
    },
    {
        name: "MinecraftPocket-Servers",
        url: "https://minecraftpocket-servers.com/server/xxx/vote/",
    },
]

export default function VotePage() {
    return (
        <div className="container max-w-2xl mx-auto px-4 py-8">
            <div className="text-center space-y-4 mb-12 opacity-0 animate-fade-in">
                <h1 className="text-4xl font-bold text-yellow-400">Vote untuk Server Kami</h1>
                <p className="text-gray-400 max-w-lg mx-auto">
                    Dukung kami dengan vote di platform ini! Setiap vote membantu kami berkembang dan memberi hadiah untuk Anda.
                </p>
            </div>

            <div className="space-y-4">
                {votingSites.map((site, index) => (
                    <Card
                        key={site.name}
                        className="p-6 bg-gray-900/50 opacity-0 animate-fade-in"
                        style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="font-semibold text-lg flex items-center gap-2">
                                {site.name}
                                <ExternalLink className="w-4 h-4 text-gray-400" />
                            </div>
                            <Link href={site.url} target="_blank" rel="noopener noreferrer">
                                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black min-w-[160px] rounded-xl">Vote Sekarang</Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

