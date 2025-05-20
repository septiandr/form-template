// Loading.jsx
export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
      <p className="text-lg font-semibold text-white">Loading...</p>
    </div>
  );
}

  