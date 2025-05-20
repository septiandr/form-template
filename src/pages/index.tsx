import React from "react";
import { useFormStore } from "../store/formStore";

export default function HomePage() {
  const { data, setData, reset } = useFormStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Form (Global State)</h1>
      <pre className="bg-gray-800 text-white p-4 rounded mb-4">
        {JSON.stringify(data, null, 2)}
      </pre>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        onClick={() => setData({ name: "Contoh Nama" })}
      >
        Set Nama
      </button>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={reset}
      >
        Reset Data
      </button>
    </div>
  );
}