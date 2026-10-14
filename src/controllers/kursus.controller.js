import KursusModel from "../model/kursus.model.js";
import { storeKursusSchema, updateKursusSchema } from "../schemas/kursus.schema.js";


export const index = async (req, res) => {
    try {
        const kursus = await KursusModel.find();
        res.status(200).json({ message: "Berhasil mengambil data", data: kursus });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
};


export const show = async (req, res) => {
    try {
        const kursus = await KursusModel.findById(req.params.id);
        if (!kursus) {
            return res.status(404).json({ message: "Data kursus tidak ditemukan" });
        }
        res.status(200).json({ message: "Berhasil mengambil detail data", data: kursus });
    } catch (error) {
        res.status(400).json({ message: "ID tidak valid", error: error.message });
    }
};


export const store = async (req, res) => {
    try {
        
        const validatedData = storeKursusSchema.parse(req.body);
        
        const kursusBaru = new KursusModel(validatedData);
        const savedKursus = await kursusBaru.save();
        
        res.status(201).json({ message: "Data kursus berhasil ditambahkan", data: savedKursus });
    } catch (error) {
        
        if (error.name === "ZodError") {
            return res.status(400).json({ message: "Validasi gagal", errors: error.errors });
        }
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
};


export const update = async (req, res) => {
    try {
        // Validasi input menggunakan Zod
        const validatedData = updateKursusSchema.parse(req.body);
        
        const updatedKursus = await KursusModel.findByIdAndUpdate(
            req.params.id,
            validatedData,
            { new: true, runValidators: true }
        );

        if (!updatedKursus) {
            return res.status(404).json({ message: "Data kursus tidak ditemukan" });
        }

        res.status(200).json({ message: "Data kursus berhasil diperbarui", data: updatedKursus });
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({ message: "Validasi gagal", errors: error.errors });
        }
        res.status(400).json({ message: "Gagal memperbarui data", error: error.message });
    }
};


export const destroy = async (req, res) => {
    try {
        const deletedKursus = await KursusModel.findByIdAndDelete(req.params.id);

        if (!deletedKursus) {
            return res.status(404).json({ message: "Data kursus tidak ditemukan" });
        }

        res.status(200).json({ message: "Data kursus berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ message: "Gagal menghapus data", error: error.message });
    }
};