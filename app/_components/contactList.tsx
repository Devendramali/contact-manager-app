import React from "react";
import { ContactType } from "../_types/contact";
import Link from "next/link";
import { FiEdit, FiUsers } from "react-icons/fi";
import { DeleteButton } from "./DeleteButton";
import { DeleteContactAction } from "../actions/contact";

const avatarColors = [
    "bg-gradient-to-br from-blue-400 to-blue-700",
    "bg-gradient-to-br from-purple-400 to-purple-700",
    "bg-gradient-to-br from-emerald-400 to-emerald-700",
    "bg-gradient-to-br from-orange-300 to-orange-600",
    "bg-gradient-to-br from-pink-400 to-pink-700",
];

export const ContactList = ({ contacts }: { contacts: ContactType[] }) => (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_7px_24px_rgba(35,64,110,0.045)]">
        {contacts.length > 0 ? (
            <div className="overflow-x-auto px-4 py-3 max-[640px]:px-2">
                <table className="w-full min-w-[650px] border-collapse text-left">
                    <thead>
                        <tr>
                            <th className="rounded-l-lg bg-slate-100 px-3.5 py-[17px] text-[13px] font-extrabold text-slate-700">Name</th>
                            <th className="bg-slate-100 px-3.5 py-[17px] text-[13px] font-extrabold text-slate-700">Email</th>
                            <th className="rounded-r-lg bg-slate-100 px-3.5 py-[17px] text-right text-[13px] font-extrabold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={contact.id} className="transition hover:bg-slate-50/80">
                                <td className="border-b border-slate-100 px-3.5 py-[13px]">
                                    <div className="flex min-w-[190px] items-center gap-3">
                                        <span className={`grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full text-[13px] font-extrabold text-white shadow-inner ${avatarColors[index % avatarColors.length]}`}>
                                            {contact.name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("")}
                                        </span>
                                        <span className="text-[15px] font-semibold text-slate-800">{contact.name}</span>
                                    </div>
                                </td>
                                <td className="border-b border-slate-100 px-3.5 py-[13px] text-sm text-slate-600">{contact.email}</td>
                                <td className="border-b border-slate-100 px-3.5 py-[13px]">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/contact/edit/${contact.id}`} className="inline-flex min-h-[39px] items-center justify-center gap-2 rounded-lg border border-blue-300 bg-white px-[13px] text-[13px] font-semibold text-blue-600 transition hover:border-blue-600 hover:bg-blue-50"><FiEdit className="h-4 w-4" /> <span>Edit</span></Link>
                                        <DeleteButton action={DeleteContactAction} contact={contact.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="flex min-h-[220px] items-center gap-7 rounded-2xl border border-slate-200 bg-white/90 px-[8%] py-9 shadow-sm max-[640px]:min-h-0 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-5 max-[640px]:p-6">
                <div className="relative grid h-[125px] w-[125px] shrink-0 place-items-center rounded-[35px] bg-gradient-to-br from-blue-50 to-blue-100 text-[68px] text-blue-600 after:absolute after:-bottom-1 after:-right-2 after:grid after:h-[37px] after:w-[37px] after:place-items-center after:rounded-full after:border-4 after:border-white after:bg-blue-600 after:text-2xl after:font-medium after:text-white after:content-['+'] max-[640px]:h-[92px] max-[640px]:w-[92px] max-[640px]:rounded-[25px] max-[640px]:text-5xl"><FiUsers /></div>
                <div>
                    <h2 className="mb-2 text-[21px] font-bold text-slate-900 max-[640px]:text-lg">You don&apos;t have any contacts yet.</h2>
                    <p className="mb-4 text-sm text-slate-500">Please add a contact to get started.</p>
                </div>
            </div>
        )}
    </section>
);
