import { LoginForm } from "@/app/_components/LoginForm";
import Link from "next/link";
import { FiLock } from "react-icons/fi";

export default function Login() {
    return (
        <div className="flex min-h-[calc(100vh-96px)] w-full items-start justify-center px-[15px] py-[35px] max-[640px]:min-h-0 max-[640px]:px-0 max-[640px]:py-2.5">
            <section className="w-full max-w-[440px] rounded-[18px] border border-slate-200 bg-white p-8 shadow-[0_15px_45px_rgba(30,64,120,0.09)] max-[640px]:px-5 max-[640px]:py-[25px]">
                <div className="mb-[27px] text-center">
                    <span className="mx-auto mb-[17px] grid h-[55px] w-[55px] place-items-center rounded-2xl bg-blue-50 text-[25px] text-blue-600"><FiLock /></span>
                    <p className="mb-2 text-[10px] font-extrabold tracking-[1.7px] text-slate-400">WELCOME BACK</p>
                    <h1 className="text-[29px] font-extrabold tracking-[-0.7px] text-slate-900">Login</h1>
                    <p className="mt-2 text-[13px] text-slate-500">Sign in to access your saved contacts.</p>
                </div>
                <LoginForm />
                <p className="mt-[22px] text-center text-[13px] text-slate-500">Don&apos;t have an account? <Link href="/register" className="font-bold text-blue-600 hover:text-blue-800">Sign up</Link></p>
            </section>
        </div>
    );
}
