import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./_components/navbar";

export const metadata: Metadata = {
    title: "Contact Manager",
    description: "Manage your contacts in one simple place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="m-0 min-h-screen bg-[radial-gradient(ellipse_at_75%_5%,#fff_0%,#f7f9ff_45%,#f1f5fc_100%)] font-sans text-slate-900">
                <div className="min-h-screen">
                    <Navbar />
                    <main className="min-h-screen ml-[254px] px-[38px] py-12 max-[900px]:ml-[218px] max-[900px]:px-6 max-[900px]:py-9 max-[640px]:ml-0 max-[640px]:min-h-[calc(100vh-110px)] max-[640px]:px-[15px] max-[640px]:py-7">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
