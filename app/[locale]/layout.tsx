// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "sonner";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kaizen Network",
    description: "Server Minecraft yang fokus pada pengalaman bermain terbaik",
};

export default async function RootLayout({
                                             children,
                                             params,
                                         }: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className={`${inter.className} bg-gray-900 text-white min-h-screen pt-24 flex flex-col`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <Toaster position="bottom-center" />
            <SiteFooter />
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
