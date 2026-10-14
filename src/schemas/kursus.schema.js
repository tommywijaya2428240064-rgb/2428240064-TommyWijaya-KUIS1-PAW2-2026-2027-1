// kursus.schema.js
import { z } from "zod";

export const storeKursusSchema = z.object({
    nama_kursus: z.string().trim().min(3, "Nama Kursus Minimal 3 Karakter"),
    instruktur: z.string().trim().min(3, "Nama Instruktur Minimal 3 Karakter"),
    harga: z.number().positive("Harga harus berupa angka positif") 
});

export const updateKursusSchema = z.object({
    nama_kursus: z.string().trim().min(3, "Nama Kursus Minimal 3 Karakter"),
    instruktur: z.string().trim().min(3, "Nama Instruktur Minimal 3 Karakter"),
    harga: z.number().positive("Harga harus berupa angka positif"),
});