import mongoose, { Schema, models, model } from "mongoose";

const ContactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        userid: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Contact =
    models.Contact || model("Contact", ContactSchema);

export default Contact;