import * as z from "zod";

export const phoneSchema = z.object({
  type: z.string().min(1, "Tipe wajib diisi"),
  number: z
    .number({ invalid_type_error: "Nomor wajib angka" })
    .min(10000000, "Nomor minimal 8 digit"),
});
export const addressSchema = z.object({
  street: z.string().min(1, "Jalan wajib diisi"),
  city: z.string().min(1, "Kota wajib diisi"),
  postalCode: z.string().min(1, "Kode pos wajib diisi"),
});
export const formSchema = z.object({
  formType: z.enum(["personal", "company"], {
    errorMap: () => ({ message: "Pilih tipe form" }),
  }),
  name: z.string().min(3, "Nama minimal 3 karakter"),
  age: z
    .number({ invalid_type_error: "Umur wajib angka" })
    .min(1, "Umur minimal 1 tahun"),
  email: z.string().email("Email tidak valid"),
  gender: z.enum(["Laki-laki", "Perempuan"], {
    errorMap: () => ({ message: "Pilih salah satu" }),
  }),
  status: z.string().min(1, "Status wajib dipilih"),
  hobbies: z.array(z.string()).min(1, "Pilih minimal satu hobi"),
  favoriteColors: z.array(z.string()).min(1, "Pilih minimal satu warna"),
  birthDate: z.string().min(1, "Tanggal wajib diisi"),
  birthTime: z.string().min(1, "Waktu wajib diisi"),
  dateRange: z.object({
    from: z.string().min(1, "Tanggal mulai wajib diisi"),
    to: z.string().min(1, "Tanggal akhir wajib diisi"),
  }),
  timeRange: z.object({
    from: z.string().min(1, "Waktu mulai wajib diisi"),
    to: z.string().min(1, "Waktu akhir wajib diisi"),
  }),
  phones: z.array(phoneSchema).min(1, "Minimal 1 nomor telepon"),
  addresses: z.array(addressSchema).min(1, "Minimal 1 alamat"),
  agree: z.boolean().refine((val) => val, "Harus setuju"),
});
