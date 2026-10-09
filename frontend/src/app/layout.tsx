import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Auth Lifecycle Kit",
        template: "%s | Auth Lifecycle Kit",
    },
    description:
        "A production-ready, modular authentication and account lifecycle baseline built with Next.js, Better Auth, and PostgreSQL.",
    keywords: [
        "authentication",
        "nextjs",
        "better-auth",
        "typescript",
        "session management",
    ],
    authors: [{ name: "Diponkor Roy" }],
    robots: { index: false, follow: false }, // Dev kit — not for public indexing
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body>
                {children}
                <Toaster
                    position="top-right"
                    richColors
                    theme="dark"
                    toastOptions={{
                        style: {
                            background: "#1c1c1f",
                            border: "1px solid #27272a",
                            color: "#fafafa",
                        },
                    }}
                />
            </body>
        </html>
    );
}
