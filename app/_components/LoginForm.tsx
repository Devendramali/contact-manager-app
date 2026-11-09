"use client";

import React, { useState } from "react";
import { loginAction } from "../actions/auth";
import { FiLock, FiMail } from "react-icons/fi";

export const LoginForm = () => {
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleLogin = async (formData: FormData) => {
        setError("");
        setPending(true);
        try {
            const result = await loginAction(formData);
            if (result?.success === false) setError(result.message);
        } finally {
            setPending(false);
        }
    };

    return (
        <form action={handleLogin} className="flex flex-col gap-[18px]">
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[13px] font-bold text-slate-700">Email address</label>
                <div className="relative"><FiMail className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400" /><input id="email" name="email" type="email" placeholder="Enter email" autoComplete="email" required className="h-[47px] w-full rounded-[9px] border border-slate-300 bg-white pl-[43px] pr-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/10" /></div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-[13px] font-bold text-slate-700">Password</label>
                <div className="relative"><FiLock className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400" /><input id="password" name="password" type="password" placeholder="Enter password" autoComplete="current-password" required className="h-[47px] w-full rounded-[9px] border border-slate-300 bg-white pl-[43px] pr-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/10" /></div>
            </div>
            {error && <p className="m-0 text-xs text-red-600">{error}</p>}
            <button type="submit" disabled={pending} className="mt-1 inline-flex min-h-12 w-full items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-600 to-blue-700 px-5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-wait cursor-pointer disabled:opacity-60">{pending ? "Logging in..." : "Login"}</button>
        </form>
    );
};
