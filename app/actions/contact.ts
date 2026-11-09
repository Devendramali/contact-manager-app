
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
    CreateContact,
    DeleteContact,
    UpdateContact,
} from "../api/contact";

import { getSession } from "../_lib/session";
import { ContactType } from "../_types/contact";

// CREATE CONTACT ACTION
export const CreateContactAction = async (
    prevState: any,
    formData: FormData
) => {
    if (!formData) {
        return { error: "Form data is missing" };
    }

    const user = await getSession();

    if (!user) {
        redirect("/login");
    }

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();

    if (!name || !email) {
        return { error: "All fields are required" };
    }

    const newContact: ContactType = {
        name,
        email,
        userid: user.id,
    };

    try {
        await CreateContact(newContact);

        revalidatePath("/contact");

    } catch (error) {
        console.log("Error creating contact:", error);

        return { error: "Failed to create contact" };
    }

    // Redirect after successful contact creation
    redirect("/contact");
};


// UPDATE CONTACT ACTION
export const UpdateContactAction = async (
    prevState: any,
    formData: FormData
) => {
    const user = await getSession();

    if (!user) {
        redirect("/login");
    }

    const id = formData.get("id")?.toString();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();

    if (!id || !name || !email) {
        return { error: "All fields are required" };
    }

    const updatedContact: ContactType = {
        name,
        email,
        userid: user.id,
    };

    try {
        await UpdateContact(id, updatedContact);

        revalidatePath("/contact");
        revalidatePath(`/contact/edit/${id}`);

        return { success: true };

    } catch (error) {
        console.log("Error updating contact:", error);

        return { error: "Failed to update contact" };
    }
};


// DELETE CONTACT ACTION
export const DeleteContactAction = async (
    prevState: any,
    formData: FormData
) => {
    const user = await getSession();

    if (!user) {
        redirect("/login");
    }

    const id = formData.get("id")?.toString();

    if (!id) {
        return { error: "Contact ID is missing" };
    }

    try {
        await DeleteContact(id, user.id);

        revalidatePath("/contact");

        return { success: true };

    } catch (error) {
        console.log("Error deleting contact:", error);

        return { error: "Failed to delete contact" };
    }
};
