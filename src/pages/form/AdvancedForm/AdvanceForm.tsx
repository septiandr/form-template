import React, { useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { formSchema } from "./schema";
import CustomInput from "../../../components/CustomInput";
import { colorOptions, hobbyOptions, statusOptions, steps } from "./config";

// Skema validasi Zod
type FormType = z.infer<typeof formSchema>;

// Step fields mapping
const stepFields: (keyof FormType | (keyof FormType)[])[] = [
  "formType",
  ["name", "age", "email", "gender", "status"],
  [
    "hobbies",
    "favoriteColors",
    "birthDate",
    "birthTime",
    "dateRange",
    "timeRange",
  ],
  ["phones", "addresses", "agree"],
];

function AdvanceForm() {
  const [step, setStep] = useState(0);
  const methods = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formType: undefined,
      name: "",
      age: undefined,
      email: "",
      gender: undefined,
      status: "",
      hobbies: [],
      favoriteColors: [],
      birthDate: "",
      birthTime: "",
      dateRange: { from: "", to: "" },
      timeRange: { from: "", to: "" },
      phones: [{ type: "", number: undefined }],
      addresses: [{ street: "", city: "", postalCode: "" }],
      agree: false,
    },
    mode: "onTouched",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = methods;
  const phonesArray = useFieldArray({ control, name: "phones" });
  const addressesArray = useFieldArray({ control, name: "addresses" });

  const onSubmit = (data: FormType) => {
    alert(JSON.stringify(data, null, 2));
  };

  // Untuk multi select
  const handleMultiSelect = (field: string, value: string) => {
    const arr = watch(field as "hobbies" | "favoriteColors") || [];
    if (arr.includes(value)) {
      setValue(
        field as "hobbies" | "favoriteColors",
        (arr as string[]).filter((v) => v !== value)
      );
    } else {
      setValue(field as "hobbies" | "favoriteColors", [...arr, value]);
    }
  };

  // Fungsi untuk validasi step sebelum next
  const handleNext = async () => {
    const fields = stepFields[step];
    const fieldNames = Array.isArray(fields) ? fields : [fields];
    const valid = await trigger(fieldNames as (keyof FormType)[]);
    if (valid) setStep(step + 1);
  };

  // Fungsi untuk validasi step sebelum submit
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields = stepFields[step];
    const fieldNames = Array.isArray(fields) ? fields : [fields];
    const valid = await trigger(fieldNames as Array<keyof FormType>);
    if (valid) handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleFinalSubmit}
        className="max-w-2xl mx-auto mt-10 bg-gray-800 p-6 rounded shadow space-y-8 overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        {/* Stepper */}
        <div className="flex items-center justify-center mb-6 gap-4">
          {steps.map((s, idx) => (
            <div key={s} className="flex items-center">
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center font-bold
                  ${
                    step === idx
                      ? "bg-blue-600 text-white"
                      : "bg-gray-600 text-gray-200"
                  }
                `}
              >
                {idx + 1}
              </div>
              <span
                className={`ml-2 ${
                  step === idx ? "text-blue-400" : "text-gray-300"
                }`}
              >
                {s}
              </span>
              {idx < steps.length - 1 && (
                <span className="mx-2 text-gray-400">→</span>
              )}
            </div>
          ))}
        </div>

        {step === 0 && (
          <>
            <div>
              <label className="block mb-1 text-white">Tipe Form *</label>
              <Controller
                name="formType"
                control={control}
                render={({ field }) => (
                  <div className="flex space-x-4">
                    <label className="text-white">
                      <input
                        type="radio"
                        value="personal"
                        checked={field.value === "personal"}
                        onChange={() => field.onChange("personal")}
                        className="mr-2"
                      />
                      Personal
                    </label>
                    <label className="text-white">
                      <input
                        type="radio"
                        value="company"
                        checked={field.value === "company"}
                        onChange={() => field.onChange("company")}
                        className="mr-2"
                      />
                      Company
                    </label>
                  </div>
                )}
              />
              {errors.formType && (
                <p className="text-red-400 text-sm">
                  {errors.formType.message}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Selanjutnya
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Nama Lengkap *"
                  error={errors.name?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Umur *"
                  type="number"
                  error={errors.age?.message}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Email *"
                  type="email"
                  error={errors.email?.message}
                  {...field}
                />
              )}
            />
            <div>
              <label className="block mb-1 text-white">Jenis Kelamin *</label>
              <div className="flex space-x-4">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label className="text-white">
                        <input
                          type="radio"
                          value="Laki-laki"
                          checked={field.value === "Laki-laki"}
                          onChange={() => field.onChange("Laki-laki")}
                          className="mr-2"
                        />
                        Laki-laki
                      </label>
                      <label className="text-white">
                        <input
                          type="radio"
                          value="Perempuan"
                          checked={field.value === "Perempuan"}
                          onChange={() => field.onChange("Perempuan")}
                          className="mr-2"
                        />
                        Perempuan
                      </label>
                    </>
                  )}
                />
              </div>
              {errors.gender && (
                <p className="text-red-400 text-sm">{errors.gender.message}</p>
              )}
            </div>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block mb-1 text-white">Status *</label>
                  <select
                    {...field}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.status && (
                    <p className="text-red-400 text-sm">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              )}
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Sebelumnya
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Selanjutnya
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="block mb-1 text-white">Hobi *</label>
              <div className="flex flex-wrap gap-4">
                {hobbyOptions.map((hobby) => (
                  <label key={hobby} className="text-white">
                    <input
                      type="checkbox"
                      checked={watch("hobbies")?.includes(hobby)}
                      onChange={() => handleMultiSelect("hobbies", hobby)}
                      className="mr-2"
                    />
                    {hobby}
                  </label>
                ))}
              </div>
              {errors.hobbies && (
                <p className="text-red-400 text-sm">
                  {errors.hobbies.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-white">
                Warna Favorit (Multi Select) *
              </label>
              <div className="flex flex-wrap gap-4">
                {colorOptions.map((color) => (
                  <label key={color} className="text-white">
                    <input
                      type="checkbox"
                      checked={watch("favoriteColors")?.includes(color)}
                      onChange={() =>
                        handleMultiSelect("favoriteColors", color)
                      }
                      className="mr-2"
                    />
                    {color}
                  </label>
                ))}
              </div>
              {errors.favoriteColors && (
                <p className="text-red-400 text-sm">
                  {errors.favoriteColors.message as string}
                </p>
              )}
            </div>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Tanggal Lahir *"
                  type="date"
                  error={errors.birthDate?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="birthTime"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Waktu Lahir *"
                  type="time"
                  error={errors.birthTime?.message}
                  {...field}
                />
              )}
            />
            {/* Date Range */}
            <div className="flex gap-4">
              <Controller
                name="dateRange.from"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Tanggal Mulai *"
                    type="date"
                    error={errors.dateRange?.from?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="dateRange.to"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Tanggal Akhir *"
                    type="date"
                    error={errors.dateRange?.to?.message}
                    {...field}
                  />
                )}
              />
            </div>
            {/* Time Range */}
            <div className="flex gap-4">
              <Controller
                name="timeRange.from"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Waktu Mulai *"
                    type="time"
                    error={errors.timeRange?.from?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name="timeRange.to"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Waktu Akhir *"
                    type="time"
                    error={errors.timeRange?.to?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Sebelumnya
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Selanjutnya
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {/* Dynamic Phones */}
            <div>
              <label className="block mb-1 text-white">Nomor Telepon *</label>
              {phonesArray.fields.map((item, idx) => (
                <div key={item.id} className="flex gap-2 mb-2">
                  <Controller
                    name={`phones.${idx}.type`}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        label="Tipe"
                        error={
                          typeof errors.phones?.[idx]?.type === "object"
                            ? (errors.phones[idx]?.type as { message?: string })
                                ?.message
                            : undefined
                        }
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name={`phones.${idx}.number`}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        label="Nomor"
                        type="number"
                        error={errors.phones?.[idx]?.number?.message}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => phonesArray.remove(idx)}
                    className="text-red-400"
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => phonesArray.append({ type: "", number: 0 })}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Tambah Nomor
              </button>
              {typeof errors.phones?.message === "string" && (
                <p className="text-red-400 text-sm">{errors.phones?.message}</p>
              )}
            </div>
            {/* Dynamic Addresses */}
            <div>
              <label className="block mb-1 text-white">Alamat *</label>
              {addressesArray.fields.map((item, idx) => (
                <div key={item.id} className="mb-2 p-2 bg-gray-700 rounded">
                  <Controller
                    name={`addresses.${idx}.street`}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        label="Jalan"
                        error={errors.addresses?.[idx]?.street?.message}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name={`addresses.${idx}.city`}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        label="Kota"
                        error={errors.addresses?.[idx]?.city?.message}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name={`addresses.${idx}.postalCode`}
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        label="Kode Pos"
                        error={errors.addresses?.[idx]?.postalCode?.message}
                        {...field}
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => addressesArray.remove(idx)}
                    className="text-red-400"
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addressesArray.append({
                    street: "",
                    city: "",
                    postalCode: "",
                  })
                }
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Tambah Alamat
              </button>
              {typeof errors.addresses?.message === "string" && (
                <p className="text-red-400 text-sm">
                  {errors.addresses?.message}
                </p>
              )}
            </div>
            {/* Agreement */}
            <Controller
              name="agree"
              control={control}
              render={({ field }) => {
                return (
                  <label className="inline-flex items-center text-white">
                    <input
                      type="checkbox"
                      onChange={field.onChange}
                      checked={field.value}
                      className="mr-2"
                    />
                    Saya setuju dengan syarat & ketentuan *
                  </label>
                );
              }}
            />
            {errors.agree && (
              <p className="text-red-400 text-sm">{errors.agree.message}</p>
            )}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Sebelumnya
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  );
}

export default AdvanceForm;
