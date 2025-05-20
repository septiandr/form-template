import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

interface Address {
  street: string
  city: string
  postalCode: string
}

interface MediumFormValues {
  fullName: string
  email: string
  age: number
  phone: string
  password: string
  confirmPassword: string
  gender: string
  birthDate: string
  birthTime: string
  country: string
  hobbies: string[]
  agree: boolean
  addresses: Address[]
  bio: string
}

const countryOptions = [
  { value: '', label: 'Pilih negara' },
  { value: 'id', label: 'Indonesia' },
  { value: 'my', label: 'Malaysia' },
  { value: 'sg', label: 'Singapore' },
  { value: 'th', label: 'Thailand' },
]

const hobbyOptions = [
  'Membaca', 'Olahraga', 'Musik', 'Traveling', 'Ngoding', 'Memasak'
]

function MediumForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm<MediumFormValues>({
    defaultValues: {
      addresses: [{ street: '', city: '', postalCode: '' }],
      hobbies: [],
      agree: false
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses'
  })

  const onSubmit = (data: MediumFormValues) => {
    alert(JSON.stringify(data, null, 2))
  }

  // Untuk validasi password konfirmasi
  const password = watch('password')

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto mt-10 bg-gray-800 p-6 rounded shadow space-y-8 overflow-y-auto"
      style={{ maxHeight: '90vh' }}
    >
      {/* Nama lengkap */}
      <div>
        <label className="block mb-1 text-white">Nama Lengkap *</label>
        <input
          {...register('fullName', { required: 'Nama wajib diisi', minLength: { value: 4, message: 'Minimal 4 karakter' } })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Nama lengkap"
        />
        {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 text-white">Email *</label>
        <input
          {...register('email', {
            required: 'Email wajib diisi',
            pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Format email tidak valid' }
          })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
      </div>

      {/* Umur */}
      <div>
        <label className="block mb-1 text-white">Umur *</label>
        <input
          type="number"
          {...register('age', { required: 'Umur wajib diisi', min: { value: 10, message: 'Minimal umur 10 tahun' } })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Umur"
        />
        {errors.age && <p className="text-red-400 text-sm">{errors.age.message}</p>}
      </div>

      {/* Nomor Telepon */}
      <div>
        <label className="block mb-1 text-white">Nomor Telepon *</label>
        <input
          {...register('phone', {
            required: 'Nomor telepon wajib diisi',
            pattern: { value: /^[0-9]{10,15}$/, message: 'Nomor telepon tidak valid' }
          })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="08xxxxxxxxxx"
        />
        {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block mb-1 text-white">Password *</label>
        <input
          type="password"
          {...register('password', { required: 'Password wajib diisi', minLength: { value: 6, message: 'Minimal 6 karakter' } })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Password"
        />
        {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
      </div>

      {/* Konfirmasi Password */}
      <div>
        <label className="block mb-1 text-white">Konfirmasi Password *</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Konfirmasi password wajib diisi',
            validate: value => value === password || 'Password tidak sama'
          })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Konfirmasi Password"
        />
        {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="block mb-1 text-white">Jenis Kelamin *</label>
        <div className="flex space-x-4">
          <label className="text-white">
            <input type="radio" value="Laki-laki" {...register('gender', { required: 'Pilih salah satu' })} className="mr-2" />
            Laki-laki
          </label>
          <label className="text-white">
            <input type="radio" value="Perempuan" {...register('gender', { required: 'Pilih salah satu' })} className="mr-2" />
            Perempuan
          </label>
        </div>
        {errors.gender && <p className="text-red-400 text-sm">{errors.gender.message}</p>}
      </div>

      {/* Tanggal Lahir */}
      <div>
        <label className="block mb-1 text-white">Tanggal Lahir *</label>
        <input
          type="date"
          {...register('birthDate', { required: 'Tanggal lahir wajib diisi' })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        {errors.birthDate && <p className="text-red-400 text-sm">{errors.birthDate.message}</p>}
      </div>

      {/* Waktu Lahir */}
      <div>
        <label className="block mb-1 text-white">Waktu Lahir *</label>
        <input
          type="time"
          {...register('birthTime', { required: 'Waktu lahir wajib diisi' })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        {errors.birthTime && <p className="text-red-400 text-sm">{errors.birthTime.message}</p>}
      </div>

      {/* Negara */}
      <div>
        <label className="block mb-1 text-white">Negara *</label>
        <select
          {...register('country', { required: 'Negara wajib dipilih' })}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        >
          {countryOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.country && <p className="text-red-400 text-sm">{errors.country.message}</p>}
      </div>

      {/* Hobi */}
      <div>
        <label className="block mb-1 text-white">Hobi</label>
        <div className="flex flex-wrap gap-4">
          {hobbyOptions.map(hobby => (
            <label key={hobby} className="text-white">
              <input type="checkbox" value={hobby} {...register('hobbies')} className="mr-2" />
              {hobby}
            </label>
          ))}
        </div>
      </div>

      {/* Alamat (Array Field) */}
      <div>
        <label className="block mb-1 text-white">Alamat</label>
        {fields.map((field, idx) => (
          <div key={field.id} className="mb-4 p-4 bg-gray-700 rounded space-y-2">
            <input
              {...register(`addresses.${idx}.street` as const, { required: 'Jalan wajib diisi' })}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 mb-1"
              placeholder="Jalan"
            />
            <input
              {...register(`addresses.${idx}.city` as const, { required: 'Kota wajib diisi' })}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 mb-1"
              placeholder="Kota"
            />
            <input
              {...register(`addresses.${idx}.postalCode` as const, { required: 'Kode pos wajib diisi' })}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              placeholder="Kode Pos"
            />
            <button
              type="button"
              onClick={() => remove(idx)}
              className="mt-2 text-xs text-red-400 hover:underline"
              disabled={fields.length === 1}
            >
              Hapus Alamat
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ street: '', city: '', postalCode: '' })}
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded text-sm"
        >
          Tambah Alamat
        </button>
      </div>

      {/* Bio */}
      <div>
        <label className="block mb-1 text-white">Bio</label>
        <textarea
          {...register('bio')}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Ceritakan tentang dirimu"
          rows={4}
        />
      </div>

      {/* Setuju */}
      <div>
        <label className="inline-flex items-center text-white">
          <input
            type="checkbox"
            {...register('agree', { required: 'Harus menyetujui syarat' })}
            className="mr-2"
          />
          Saya setuju dengan syarat & ketentuan *
        </label>
        {errors.agree && <p className="text-red-400 text-sm">{errors.agree.message as string}</p>}
      </div>

      {/* Tombol Submit & Reset */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded font-semibold"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export default MediumForm