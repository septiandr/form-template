// ErrorPage.jsx
import { useRouteError } from "react-router-dom";

type RouteError = {
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-red-600">
      <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p>{error.statusText || error.message || "Unknown Error"}</p>
    </div>
  );
}
