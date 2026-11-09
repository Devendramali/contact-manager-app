"use client";

import React, { useActionState, useEffect } from "react";
import { ContactType } from "../_types/contact";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiMail, FiUser } from "react-icons/fi";

type ContactFormProps = {
    action: (prevState: any, formData: FormData) => Promise<any>;
    contact?: ContactType;
};

export const ContactForm = ({ action, contact }: ContactFormProps) => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(action, null);

    useEffect(() => {
        if (state?.success) router.push("/contact");
    }, [state, router]);

    return (
        <form action={formAction} className="flex flex-col gap-[18px]">
            <input type="hidden" name="id" value={contact?.id || ""} />
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[13px] font-bold text-slate-700">Full name</label>
                <div className="relative">
                    <FiUser className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400" />
                    <input id="name" name="name" type="text" placeholder="Enter name" defaultValue={contact?.name || ""} required className="h-[47px] w-full rounded-[9px] border border-slate-300 bg-white pl-[43px] pr-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/10" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[13px] font-bold text-slate-700">Email address</label>
                <div className="relative">
                    <FiMail className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400" />
                    <input id="email" name="email" type="email" placeholder="Enter email" defaultValue={contact?.email || ""} required className="h-[47px] w-full rounded-[9px] border border-slate-300 bg-white pl-[43px] pr-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/10" />
                </div>
            </div>
            {state?.error && <p className="m-0 text-xs text-red-600">{state.error}</p>}
            <button type="submit" disabled={isPending} className="mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-blue-600 cursor-pointer to-blue-700 px-5 text-sm font-bold text-white shadow-[0_7px_16px_rgba(21,94,239,0.17)] transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg disabled:cursor-wait disabled:opacity-60">
                {isPending ? "Saving..." : contact ? "Update Contact" : "Save Contact"}
            </button>
            <Link href="/contact" className="mt-px flex items-center justify-center gap-2 text-[13px] font-semibold text-slate-500 transition hover:text-blue-700"><FiArrowLeft /> Back to contacts</Link>
        </form>
    );
};
