import { cookies } from "next/headers";
import { SessionUserType } from "../_types/user";

// Set Session
export const setSession = async (user: SessionUserType) => {
    const cookieStore = await cookies();

    cookieStore.set("session", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });
};

// Get Session
export const getSession = async (): Promise<SessionUserType | null> => {
    const cookieStore = await cookies();

    const session = cookieStore.get("session")?.value;

    if (!session) {
        return null;
    }

    try {
        return JSON.parse(session) as SessionUserType;
    } catch {
        return null;
    }
};

// Delete Session
export const deleteSession = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("session");
};