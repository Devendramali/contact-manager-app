
"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import { connectDB } from "../_lib/mongodb";
import User from "../_models/User";
import { deleteSession, setSession } from "../_lib/session";

// REGISTER ACTION
export const registerAction = async (formData: FormData) => {
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password?.trim()) {
        return { success: false, message: "All fields are required" };
    }

    if (password.length < 6) {
        return {
            success: false,
            message: "Password must be at least 6 characters",
        };
    }

    let stage = "Connecting to MongoDB";

    try {
        await connectDB();

        stage = "Checking existing user";

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return {
                success: false,
                message: "Email already registered",
            };
        }

        stage = "Hashing password";

        const hashedPassword = await bcrypt.hash(password, 10);

        stage = "Creating user";

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        stage = "Creating session";

        await setSession({
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
        });

    } catch (error: unknown) {
        const err = error as {
            name?: string;
            message?: string;
            code?: number | string;
        };

        console.error("Registration Error:", {
            stage,
            name: err.name,
            message: err.message,
            code: err.code,
        });

        if (err.code === 11000) {
            return {
                success: false,
                message: "Email already registered",
            };
        }

        return {
            success: false,
            message: "Failed to register",
        };
    }

    redirect("/contact");
};

// LOGIN ACTION
export const loginAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return {
            success: false,
            message: "Email and password are required",
        };
    }

    try {
        await connectDB();

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return {
                success: false,
                message: "Invalid email or password",
            };
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid email or password",
            };
        }

        await setSession({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        });

    } catch (error) {
        console.error("Login Error:", error);

        return {
            success: false,
            message: "Failed to login",
        };
    }

    redirect("/contact");
};

// LOGOUT ACTION
export const logoutAction = async () => {
    await deleteSession();
    redirect("/login");
};
