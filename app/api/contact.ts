import { Types } from "mongoose";
import { connectDB } from "../_lib/mongodb";
import Contact from "../_models/Contact";
import { ContactType } from "../_types/contact";

// GET ALL CONTACTS OF LOGGED-IN USER
export const getContact = async (userid: string) => {
    if (!userid || !Types.ObjectId.isValid(userid)) {
        return [];
    }

    await connectDB();

    const contacts = await Contact.find({
        userid: userid,
    }).sort({ createdAt: -1 }).lean();

    return contacts.map((contact) => ({
        id: contact._id.toString(),
        name: contact.name,
        email: contact.email,
        userid: contact.userid.toString(),
    }));
};


// GET SINGLE CONTACT
export const getContactById = async (id: string, userid: string) => {
    if (
        !id ||
        !userid ||
        !Types.ObjectId.isValid(id) ||
        !Types.ObjectId.isValid(userid)
    ) {
        return null;
    }

    await connectDB();

    const contact = await Contact.findOne({
        _id: id,
        userid: userid,
    }).lean();

    if (!contact) {
        return null;
    }

    return {
        id: contact._id.toString(),
        name: contact.name,
        email: contact.email,
        userid: contact.userid.toString(),
    };
};


// CREATE CONTACT
export const CreateContact = async (contact: ContactType) => {
    if (!contact.userid || !Types.ObjectId.isValid(contact.userid)) {
        throw new Error("Invalid user ID");
    }

    await connectDB();

    const newContact = await Contact.create({
        name: contact.name,
        email: contact.email,
        userid: contact.userid,
    });

    return {
        id: newContact._id.toString(),
        name: newContact.name,
        email: newContact.email,
        userid: newContact.userid.toString(),
    };
};


// UPDATE CONTACT
export const UpdateContact = async (id: string, contact: ContactType) => {
    if (
        !id ||
        !contact.userid ||
        !Types.ObjectId.isValid(id) ||
        !Types.ObjectId.isValid(contact.userid)
    ) {
        throw new Error("Invalid contact or user ID");
    }

    await connectDB();

    const updatedContact = await Contact.findOneAndUpdate(
        {
            _id: id,
            userid: contact.userid,
        },
        {
            name: contact.name,
            email: contact.email,
        },
        {
            new: true,
            runValidators: true,
        }
    ).lean();

    if (!updatedContact) {
        throw new Error("Contact not found");
    }

    return {
        id: updatedContact._id.toString(),
        name: updatedContact.name,
        email: updatedContact.email,
        userid: updatedContact.userid.toString(),
    };
};


// DELETE CONTACT
export const DeleteContact = async (id: string, userid: string) => {
    if (
        !id ||
        !userid ||
        !Types.ObjectId.isValid(id) ||
        !Types.ObjectId.isValid(userid)
    ) {
        throw new Error("Invalid contact or user ID");
    }

    await connectDB();

    const deletedContact = await Contact.findOneAndDelete({
        _id: id,
        userid: userid,
    });

    if (!deletedContact) {
        throw new Error("Contact not found");
    }

    return { success: true };
};