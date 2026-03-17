import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/SideBar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-14 md:ml-0 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;