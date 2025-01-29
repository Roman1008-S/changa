import mongoose from "mongoose";

const facilitatorSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
        },
        f_name: {
            type: String,
        },
        l_name: {
            type: String,
        },
        f_url: {
            type: String,
        },
        t_url: {
            type: String,
        },
        l_url: {
            type: String,
        },
        i_url: {
            type: String,
        },
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
        photo: {
            type: String,
        },
        psilocybin: {
            type: String,
        },
        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Review",
            },
        ],
        averageRating: {
            type: Number,
            default: 0,
        },
        totalRating: {
            type: Number,
            default: 0,
        },
        gender: { type: String, enum: ["male", "female"] },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

export default mongoose.model("Facilitator", facilitatorSchema);