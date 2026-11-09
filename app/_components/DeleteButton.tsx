"use client";

import React, { useActionState } from "react";
import { FiTrash2 } from "react-icons/fi";

type DeleteBtnProps = {
    action: (prevState: any, formData: FormData) => Promise<any>;
    contact?: string;
};

export const DeleteButton = ({ action, contact }: DeleteBtnProps) => {
    const [state, formAction] = useActionState(action, null);

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={contact || ""} />
            <button
                type="submit"
                onClick={(event) => {
                    if (!confirm("Are you sure you want to delete this contact?")) event.preventDefault();
                }}
                className="inline-flex min-h-[39px] items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-[13px] text-[13px] font-semibold text-red-600 transition hover:border-red-600 hover:bg-red-50"
                aria-label="Delete contact"
            >
                <FiTrash2 className="h-4 w-4" /> <span>Delete</span>
            </button>
            {state?.error && <span className="mt-1 block text-xs text-red-600">{state.error}</span>}
        </form>
    );
};
