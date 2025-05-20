import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const menuItems = [
  { path: "/", label: "Dashboard" },
  { path: "/forms/simple-form", label: "Simple Form" },
  { path: "/forms/medium-form", label: "Medium Form" },
  { path: "forms/advance-form", label: "Advance Form" },
];

function SideBar() {
  return (
    <aside className="w-56 bg-gray-900 min-h-screen p-6 shadow-xl">
      <nav>
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive, isPending, isTransitioning }) => {
                  const baseClasses =
                    "group flex items-center justify-between px-4 py-2 rounded-lg font-medium transition-all duration-300";

                  if (isPending || isTransitioning) {
                    return `${baseClasses} text-yellow-400 animate-pulse`;
                  }

                  if (isActive) {
                    return `${baseClasses} bg-blue-700 text-white`;
                  }

                  return `${baseClasses} text-gray-300 hover:bg-blue-600 hover:text-white`;
                }}
              >
                <span className="transition-all duration-500 group-hover:pl-2">
                  {item.label}
                </span>
                <ChevronRight
                  className="w-4 h-4 opacity-0 transform scale-90 group-hover:opacity-100 group-hover:translate-x-1 group-hover:scale-100 transition-all duration-300"
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
