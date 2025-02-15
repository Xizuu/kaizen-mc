"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
    { code: "id", name: "Indonesia", flag: "https://flagcdn.com/id.svg" },
    { code: "en", name: "English", flag: "https://flagcdn.com/gb.svg" },
]

export function LanguageSwitcher() {
    const router = useRouter()
    const [currentLang, setCurrentLang] = useState("id")

    useEffect(() => {
        const storedLang = localStorage.getItem("language")
        if (storedLang) {
            setCurrentLang(storedLang)
        }
    }, [])

    const switchLanguage = (langCode: string) => {
        localStorage.setItem("language", langCode)
        setCurrentLang(langCode)
        router.refresh()
    }

    const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 px-0">
                    <Image
                        src={currentLanguage.flag || "/placeholder.svg"}
                        alt={currentLanguage.name}
                        width={24}
                        height={16}
                        className="h-4 w-6"
                    />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <>
                    {languages.map((lang) => (
                        <DropdownMenuItem key={lang.code} onClick={() => switchLanguage(lang.code)}>
                            <Image
                                src={lang.flag || "/placeholder.svg"}
                                alt={lang.name}
                                width={24}
                                height={16}
                                className="h-4 w-6 mr-2"
                            />
                            {lang.name}
                        </DropdownMenuItem>
                    ))}
                </>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

