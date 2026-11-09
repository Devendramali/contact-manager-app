"use client";

import React from "react";
import { logoutAction } from "../actions/auth";
import { FiLogOut } from "react-icons/fi";

const LogOutBtn = () => (
    <form action={logoutAction} className="m-0 max-[640px]:ml-auto">
        <button type="submit" className="flex min-h-14 w-full items-center gap-4 rounded-xl bg-transparent px-5 text-left text-[17px] font-semibold text-white transition hover:translate-x-0.5 hover:bg-blue-400/40 max-[640px]:min-h-10 max-[640px]:w-auto max-[640px]:gap-2 max-[640px]:px-3 max-[640px]:text-[13px] cursor-pointer">
            <FiLogOut className="h-[22px] w-[22px] shrink-0 max-[640px]:h-[17px] max-[640px]:w-[17px]" /> <span>Logout</span>
        </button>
    </form>
);

export default LogOutBtn;
