import Header from "./Header";
import SideBar from "./Sidebar";
import { useState } from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-screen">
      <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex flex-1">
        {sidebarOpen && <SideBar />}
        <main className={`flex-1 p-8 bg-gray-900 text-white transition-all duration-300`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;