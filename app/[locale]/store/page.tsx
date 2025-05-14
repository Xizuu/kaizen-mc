import { Card } from "@/components/ui/card"
import { Link } from "@/i18n/navigation";
import {points} from "@/lib/product-list";
import Image from "next/image";

export default function Store() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="text-center space-y-4 opacity-0 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                    <span className="font-bold text-yellow-400 mb-2">Toko Premium Points</span>
                </h1>
                <p className="text-lg text-gray-300">Beli Premium Points untuk membuka fitur eksklusif</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {points.map((point) => (
                    <Link key={point.id} href={`/store/product/${point.id}`} className="block">
                        <Card className={`bg-gray-900/50 overflow-hidden opacity-0 animate-fade-in animation-delay-${point.delay} cursor-pointer`}>
                            <div className="relative aspect-square">
                                <Image
                                    src={point.image || "/placeholder.svg"}
                                    alt={`${point.amount} Premium Points`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

        </div>
    )
}

