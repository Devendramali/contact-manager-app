import "server-only";
import mongoose from "mongoose";

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | undefined;
}

const cached = global.mongooseCache ?? {
    conn: null,
    promise: null,
};

global.mongooseCache = cached;

export const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is missing in environment variables");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 15000,
            connectTimeoutMS: 15000,
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        cached.promise = null;
        console.error("MongoDB Connection Error:", error);
        throw error;
    }

    return cached.conn;
};