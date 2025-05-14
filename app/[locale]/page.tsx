"use client"

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import Image from "next/image"
import {Check, Gamepad2, Server, Trophy, Users} from "lucide-react";
import {GamemodeSection} from "@/components/gamemode-section";
import React from "react";
import {toast} from "sonner";
import {useTranslations} from "next-intl";

export default function Home() {
    const t = useTranslations()
    const handleCopyIp = () => {
        navigator.clipboard.writeText("play.kaizenmc.id")
            .then(() =>
                toast(
                    <div className="flex items-center justify-center gap-2"> {/* Pastikan semua konten berada di tengah */}
                        <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
                            <Check className="w-4 h-4 text-black" />
                        </div>
                        <p className="font-bold text-center">
                            play.kaizenmc.id <span className="font-normal">disalin ke clipboard!</span>
                        </p>
                    </div>
                )
            );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-6 opacity-0 animate-fade-in">
                <h1 className="text-5xl font-bold">
                    {t.rich('home.hero.title', {
                        gradient: (chunks) => (
                            <span className="block mt-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-transparent bg-clip-text animate-gradient">
                                {chunks}
                            </span>
                        )
                    })}
                </h1>

                <p className="text-gray-400">Dunia dengan kemungkinan tak terbatas!</p>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 text-sm">
                    <div className="w-2.5 h-2.5 rounded-full mr-2 bg-green-500">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    </div>
                    <span className="text-sm font-medium text-gray-300">Server online · 117 Players · Main Sekarang</span>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <Button
                        size="lg"
                        className="px-8 py-3 rounded-lg text-lg font-medium transition-colors w-full sm:w-auto flex items-center justify-center text-center bg-[#f8cb08] hover:brightness-110 text-black group relative shadow-[0_0_0_rgba(248,203,8,0)] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_8px_16px_rgba(248,203,8,0.15)] hover:bg-yellow-400/90"
                        onClick={handleCopyIp}
                    >
                        <Gamepad2 size={100} />
                        Main Sekarang
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-lg w-full sm:w-auto flex items-center justify-center text-center border-gray-500 hover:border-white group relative px-8 py-3 text-lg font-medium border shadow-[0_0_0_rgba(255,255,255,0)] transition-[background,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_8px_16px_rgba(255,255,255,0.08)] hover:border-white/20 hover:bg-white/[0.03]">
                        <Image
                            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20127.14%2096.36'%3e%3cpath%20fill='%23fff'%20d='M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z'/%3e%3c/svg%3e" alt="Discord" className="w-6 h-6 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                            width={9}
                            height={9}
                        />
                        Gabung Discord
                    </Button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    {
                        icon: <Users className="h-8 w-8"/>,
                        color: "green",
                        value: "90",
                        label: "Pemain Online",
                        delay: "100",
                    },
                    {
                        icon: <Server className="h-8 w-8"/>,
                        color: "blue",
                        value: "1.20 - 1.21.4",
                        label: "Versi Server",
                        delay: "200",
                    },
                    {
                        icon: <Trophy className="h-8 w-8"/>,
                        color: "yellow",
                        value: "76,000+",
                        label: "Total Pemain",
                        delay: "300",
                    },
                ].map((stat, index) => (
                    <Card key={index}
                          className={`p-6 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 opacity-0 animate-fade-in animation-delay-${stat.delay}`}>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#f8cb08]/10 rounded-lg text-[#f8cb08]">
                                {stat.icon}
                                {/*<div className={`w-2 h-2 rounded-full bg-green-500`} />*/}
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        </div>
                    </Card>
                ))}
            </section>

            <GamemodeSection />
        </div>
    )
}

