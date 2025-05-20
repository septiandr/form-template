import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./Sidebar";
import { useState } from "react";
import Loading from "../routes/loadingPage";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigation = useNavigation();
  console.log("🚀 ~ MainLayout ~ navigation:", navigation)

  if (navigation.state === "loading") {
    // Render full screen Loading saja, tidak render header/sidebar/main dulu
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white w-screen">
      <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex flex-1">
        {sidebarOpen && <SideBar />}
        <main className={`flex-1 p-8 bg-gray-900 text-white transition-all duration-300`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;