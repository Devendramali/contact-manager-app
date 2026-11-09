import React, { Suspense } from "react";
import { ContactForm } from "@/app/_components/ContactForm";
import { UpdateContactAction } from "@/app/actions/contact";
import { getContactById } from "@/app/api/contact";
import { getSession } from "@/app/_lib/session";
import { redirect, notFound } from "next/navigation";
import { FiEdit } from "react-icons/fi";

async function EditContactContent({ params }: { params: Promise<{ id: string }> }) {
    const user = await getSession();
    if (!user) redirect("/login");

    const { id } = await params;
    const contact = await getContactById(id, user.id);
    if (!contact) notFound();

    return (
        <div className="flex min-h-[calc(100vh-96px)] w-full items-start justify-center px-[15px] py-[35px] max-[640px]:min-h-0 max-[640px]:px-0 max-[640px]:py-2.5">
            <section className="w-full max-w-[510px] rounded-[18px] border border-slate-200 bg-white p-8 shadow-[0_15px_45px_rgba(30,64,120,0.09)] max-[640px]:px-5 max-[640px]:py-[25px]">
                <div className="mb-[27px] text-center">
                    <span className="mx-auto mb-[17px] grid h-[55px] w-[55px] place-items-center rounded-2xl bg-blue-50 text-[25px] text-blue-600"><FiEdit /></span>
                    <p className="mb-2 text-[10px] font-extrabold tracking-[1.7px] text-slate-400">ADDRESS BOOK</p>
                    <h1 className="text-[29px] font-extrabold tracking-[-0.7px] text-slate-900">Edit Contact</h1>
                    <p className="mt-2 text-[13px] text-slate-500">Keep this contact&apos;s details up to date.</p>
                </div>
                <ContactForm action={UpdateContactAction} contact={contact} />
            </section>
        </div>
    );
}

export default function EditContact({ params }: { params: Promise<{ id: string }> }) {
    return <Suspense fallback={<div className="mx-auto my-[70px] max-w-[700px] rounded-2xl border border-slate-200 bg-white p-14 text-center text-slate-500">Loading contact...</div>}><EditContactContent params={params} /></Suspense>;
}
