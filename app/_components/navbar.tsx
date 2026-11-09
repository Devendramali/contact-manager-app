import Link from "next/link";
import React, { Suspense } from "react";
import { FiUsers, FiHome, FiLogIn, FiUserPlus, FiBookOpen } from "react-icons/fi";
import LogOutBtn from "./LogOutBtn";
import { getSession } from "../_lib/session";

const NavbarContent = async () => {
    const session = await getSession();

    return (
        <>
            {session ? (
                <>
                    <Link href="/contact" className="flex min-h-14 w-full items-center gap-4 rounded-xl bg-blue-400/40 px-5 text-left text-[17px] font-semibold text-white transition hover:translate-x-0.5 hover:bg-blue-400/50 max-[640px]:min-h-10 max-[640px]:w-auto max-[640px]:gap-2 max-[640px]:px-3 max-[640px]:text-[13px]">
                        <FiHome className="h-[22px] w-[22px] shrink-0 max-[640px]:h-[17px] max-[640px]:w-[17px]" /> <span>Contacts</span>
                    </Link>
                    <div className="mt-3 flex items-center gap-3 border-t border-white/20 px-2.5 pb-4 pt-6 max-[640px]:hidden">
                        <div className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-white font-extrabold text-blue-800">{session.name?.charAt(0)?.toUpperCase() || "U"}</div>
                        <div className="flex min-w-0 flex-col gap-1">
                            <strong className="truncate text-[13px] text-white">{session.name}</strong>
                            <span className="truncate text-[11px] text-blue-100">{session.email}</span>
                        </div>
                    </div>
                    <LogOutBtn />
                </>
            ) : (
                <>
                    <Link href="/login" className="flex min-h-14 w-full items-center gap-4 rounded-xl px-5 text-left text-[17px] font-semibold text-white transition hover:bg-blue-400/40 max-[640px]:min-h-10 max-[640px]:w-auto max-[640px]:gap-2 max-[640px]:px-3 max-[640px]:text-[13px] cursor-pointer"><FiLogIn /> <span>Login</span></Link>
                    <Link href="/register" className="flex min-h-14 w-full items-center gap-4 rounded-xl px-5 text-left text-[17px] font-semibold text-white transition hover:bg-blue-400/40 max-[640px]:min-h-10 max-[640px]:w-auto max-[640px]:gap-2 max-[640px]:px-3 max-[640px]:text-[13px] cursor-pointer"><FiUserPlus /> <span>Register</span></Link>
                </>
            )}
        </>
    );
};

export const Navbar = () => (
    <aside className="fixed inset-y-0 left-0 z-20 flex min-h-screen w-[254px] flex-col bg-[linear-gradient(160deg,#174da9_0%,#123f91_55%,#10377e_100%)] px-3.5 pb-[22px] pt-[34px] text-white shadow-[8px_0_28px_rgba(20,58,125,0.10)] max-[900px]:w-[218px] max-[640px]:relative max-[640px]:min-h-0 max-[640px]:w-full max-[640px]:px-3.5 max-[640px]:py-[13px]">
        <Link href="/" className="flex items-center gap-[15px] px-[18px] pb-12 pt-1 text-[25px] font-extrabold leading-[1.08] tracking-[-0.6px] text-white max-[900px]:text-[22px] max-[640px]:gap-2.5 max-[640px]:px-1 max-[640px]:pb-[13px] max-[640px]:text-xl">
            <span className="grid h-[50px] w-[50px] shrink-0 place-items-center text-[42px] max-[640px]:h-[37px] max-[640px]:w-[37px] max-[640px]:text-[31px]"><FiUsers /></span>
            <span>Contact<br />Manager</span>
        </Link>
        <nav className="flex flex-col gap-2.5 max-[640px]:flex-row max-[640px]:flex-wrap max-[640px]:items-center max-[640px]:gap-[7px]">
            <Suspense fallback={<div className="p-4 text-[13px] text-blue-100">Loading menu...</div>}>
                <NavbarContent />
            </Suspense>
        </nav>
        <div className="mt-auto flex items-center gap-2.5 px-3 pt-4 text-[11px] leading-relaxed text-blue-100 max-[640px]:hidden">
            <FiBookOpen className="shrink-0" />
            <span>Keep your connections organized.</span>
        </div>
    </aside>
);
