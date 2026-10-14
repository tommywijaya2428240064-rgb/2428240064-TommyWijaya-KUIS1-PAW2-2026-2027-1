import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        nama_kursus: {
            type: String,
            required: true,
            unique: true, 
        },
        instruktur: {
            type: String,
            required: true,
        },
        harga: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const KursusModel = mongoose.model("kursus", schema);
export default KursusModel;