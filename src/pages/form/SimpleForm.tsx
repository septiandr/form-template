import React from 'react'

import { useForm } from 'react-hook-form'

const options = [
  { value: '', label: 'Pilih salah satu' },
  { value: 'option1', label: 'Opsi 1' },
  { value: 'option2', label: 'Opsi 2' },
];

interface SimpleFormValues {
  nama: string;
  nominal: string;
  tanggal: string;
  waktu: string;
  pilihan: string;
  gender: string;
  hobi?: string[];
}

function formatNumber(value: string) {
  // Menghilangkan karakter selain angka
  const cleaned = value.replace(/\D/g, '');
  // Format dengan separator ribuan
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


function SimpleForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SimpleFormValues>();

  const onSubmit = (data: SimpleFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded shadow space-y-6"
    >
      {/* Input Text */}
      <div>
        <label className="block mb-1 text-white">Nama <span className="text-red-400">*</span></label>
        <input
          {...register("nama", { required: "Nama wajib diisi" })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Masukkan nama"
        />
        {errors.nama && <p className="text-red-400 text-sm">{errors.nama.message as string}</p>}
      </div>

      {/* Input Number dengan separator */}
      <div>
        <label className="block mb-1 text-white">Nominal <span className="text-red-400">*</span></label>
        <input
          {...register("nominal", {
            required: "Nominal wajib diisi",
            pattern: { value: /^[\d.]+$/, message: "Hanya angka yang diperbolehkan" }
          })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Masukkan nominal"
          inputMode="numeric"
          onChange={e => {
            const formatted = formatNumber(e.target.value);
            setValue("nominal", formatted, { shouldValidate: true });
          }}
        />
        {errors.nominal && <p className="text-red-400 text-sm">{errors.nominal.message as string}</p>}
      </div>

      {/* Input Date */}
      <div>
        <label className="block mb-1 text-white">Tanggal <span className="text-red-400">*</span></label>
        <input
          type="date"
          {...register("tanggal", { required: "Tanggal wajib diisi" })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        {errors.tanggal && <p className="text-red-400 text-sm">{errors.tanggal.message as string}</p>}
      </div>

      {/* Input Time */}
      <div>
        <label className="block mb-1 text-white">Waktu <span className="text-red-400">*</span></label>
        <input
          type="time"
          {...register("waktu", { required: "Waktu wajib diisi" })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        {errors.waktu && <p className="text-red-400 text-sm">{errors.waktu.message as string}</p>}
      </div>

      {/* Select */}
      <div>
        <label className="block mb-1 text-white">Pilihan <span className="text-red-400">*</span></label>
        <select
          {...register("pilihan", { required: "Pilihan wajib dipilih" })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.pilihan && <p className="text-red-400 text-sm">{errors.pilihan.message as string}</p>}
      </div>

      {/* Radio */}
      <div>
        <label className="block mb-1 text-white">Jenis Kelamin <span className="text-red-400">*</span></label>
        <div className="flex space-x-4">
          <label className="text-white">
            <input
              type="radio"
              value="Laki-laki"
              {...register("gender", { required: "Pilih salah satu" })}
              className="mr-2"
            />
            Laki-laki
          </label>
          <label className="text-white">
            <input
              type="radio"
              value="Perempuan"
              {...register("gender", { required: "Pilih salah satu" })}
              className="mr-2"
            />
            Perempuan
          </label>
        </div>
        {errors.gender && <p className="text-red-400 text-sm">{errors.gender.message as string}</p>}
      </div>

      {/* Checkbox */}
      <div>
        <label className="block mb-1 text-white">Hobi</label>
        <div className="flex space-x-4">
          <label className="text-white">
            <input type="checkbox" value="Membaca" {...register("hobi")} className="mr-2" />
            Membaca
          </label>
          <label className="text-white">
            <input type="checkbox" value="Olahraga" {...register("hobi")} className="mr-2" />
            Olahraga
          </label>
          <label className="text-white">
            <input type="checkbox" value="Musik" {...register("hobi")} className="mr-2" />
            Musik
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
      >
        Submit
      </button>
    </form>
  )
}

export default SimpleForm