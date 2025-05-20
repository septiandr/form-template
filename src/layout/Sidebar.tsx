import { Link } from "react-router-dom";

const menuItems = [
  { path: "/simple-form", label: "Simple Form" },
  { path: "/medium-form", label: "Medium Form" },
  { path: "/advance-form", label: "Advance Form" },
];

function SideBar() {
  return (
    <aside className="w-56 bg-gray-800 min-h-screen p-6 shadow-lg">
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="block px-4 py-2 rounded transition font-medium text-gray-200 hover:bg-blue-600 hover:text-white hover:pl-6"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;