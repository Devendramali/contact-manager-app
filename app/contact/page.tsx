import React, { Suspense } from "react";
import Link from "next/link";
import { FiPlus, FiUsers } from "react-icons/fi";
import { getSession } from "../_lib/session";
import { getContact } from "../api/contact";
import { ContactList } from "../_components/contactList";

async function ContactContent() {
    const user = await getSession();

    if (!user) {
        return (
            <section className="mx-auto my-[70px] max-w-[700px] rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
                <div className="text-[42px] text-blue-600"><FiUsers className="mx-auto" /></div>
                <h1 className="mb-2 mt-4 text-[25px] font-extrabold">Welcome to your contacts</h1>
                <p className="mb-6 text-slate-500">Please log in to view and manage your contacts.</p>
                <Link href="/login" className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700">Login to continue</Link>
            </section>
        );
    }

    const contacts = await getContact(user.id);

    return (
        <div className="mx-auto w-full max-w-[1500px]">
            <div className="mb-[27px] flex items-center justify-between gap-5 max-[640px]:flex-col max-[640px]:items-start">
                <div className="flex items-center gap-[17px]">
                    <span className="grid h-[58px] w-[58px] place-items-center rounded-[17px] bg-blue-50 text-[31px] text-blue-600 max-[640px]:h-[47px] max-[640px]:w-[47px] max-[640px]:text-[25px]"><FiUsers /></span>
                    <div>
                        <p className="mb-[7px] text-[10px] font-extrabold tracking-[1.7px] text-slate-400">YOUR ADDRESS BOOK</p>
                        <h1 className="text-[clamp(27px,3vw,37px)] font-extrabold leading-[1.1] tracking-[-1.1px]">Your Contacts</h1>
                        <p className="mt-[7px] text-sm text-slate-500">All your important connections, in one place.</p>
                    </div>
                </div>
                <Link href="/contact/new" className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-[10px] bg-gradient-to-br from-blue-600 to-blue-700 px-[21px] text-[15px] font-bold text-white shadow-[0_7px_16px_rgba(21,94,239,0.17)] transition hover:-translate-y-0.5 hover:shadow-lg max-[640px]:w-full"><FiPlus className="h-5 w-5" /> Add contact</Link>
            </div>
            <div className="mb-[17px] flex items-center justify-between rounded-[13px] border border-slate-200 bg-white/80 px-5 py-4 max-[640px]:px-3.5">
                <div className="flex items-center gap-3.5"><span className="text-[10px] font-extrabold tracking-[1.2px] text-slate-500">TOTAL CONTACTS</span><strong className="text-2xl text-blue-700">{contacts.length}</strong></div>
                <span className="text-xs text-slate-400">{contacts.length === 1 ? "1 connection saved" : `${contacts.length} connections saved`}</span>
            </div>
            {contacts.length > 0 ? <ContactList contacts={contacts} /> : (
                <section className="flex min-h-[220px] items-center gap-7 rounded-2xl border border-slate-200 bg-white/90 px-[8%] py-9 shadow-sm max-[640px]:min-h-0 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-5 max-[640px]:p-6">
                    <div className="relative grid h-[125px] w-[125px] shrink-0 place-items-center rounded-[35px] bg-gradient-to-br from-blue-50 to-blue-100 text-[68px] text-blue-600 after:absolute after:-bottom-1 after:-right-2 after:grid after:h-[37px] after:w-[37px] after:place-items-center after:rounded-full after:border-4 after:border-white after:bg-blue-600 after:text-2xl after:font-medium after:text-white after:content-['+'] max-[640px]:h-[92px] max-[640px]:w-[92px] max-[640px]:rounded-[25px] max-[640px]:text-5xl"><FiUsers /></div>
                    <div><h2 className="mb-2 text-[21px] font-bold text-slate-900 max-[640px]:text-lg">You don&apos;t have any contacts yet.</h2><p className="mb-4 text-sm text-slate-500">Your address book is waiting. Add your first contact to get started.</p><Link href="/contact/new" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800"><FiPlus /> Add your first contact</Link></div>
                </section>
            )}
        </div>
    );
}

export default function ContactPage() {
    return <Suspense fallback={<div className="mx-auto my-[70px] max-w-[700px] rounded-2xl border border-slate-200 bg-white p-14 text-center text-slate-500">Loading your contacts...</div>}><ContactContent /></Suspense>;
}
