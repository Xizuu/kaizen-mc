import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Kaizen Network",
    description: "Server Minecraft yang fokus pada pengalaman bermain terbaik",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="id">
        <body className={`${inter.className} bg-gray-900 text-white min-h-screen pt-24 flex flex-col`}>
        <SiteHeader />
            <main className="flex-1">{children}</main>
        <SiteFooter />
        </body>
        </html>
    )
}

