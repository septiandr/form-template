import { create } from "zustand";
import { persist } from "zustand/middleware";

type FormData = {
  formType?: string;
  name: string;
  age?: number;
  email: string;
  gender?: string;
  status: string;
  hobbies: string[];
  favoriteColors: string[];
  birthDate: string;
  birthTime: string;
  dateRange: { from: string; to: string };
  timeRange: { from: string; to: string };
  phones: { type: string; number?: number }[];
  addresses: { street: string; city: string; postalCode: string }[];
  agree: boolean;
};

interface FormStore {
  data: FormData;
  setData: (data: Partial<FormData>) => void;
  reset: () => void;
}

const initialData: FormData = {
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
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      data: initialData,
      setData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),
      reset: () => set({ data: initialData }),
    }),
    {
      name: "form-storage", // nama key di localStorage
    }
  )
);