import { Outlet, useLocation } from "react-router-dom";
import { SideBar } from "../adminComponentIndex";

const AdminLayout = () => {
    const location = useLocation();
    const date = new Date();

const formatted = date.toLocaleDateString("en-US", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
});

const getPageTitle = (pathname) => {
  const routeMap = {
    '/admin': 'Dashboard',
    '/admin/orders': 'Orders',
    '/admin/reservations': 'Reservations',
    '/admin/menu': 'Menu',
  };
  return routeMap[pathname] || 'Dashboard';
};

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <SideBar/>

      {/* Main Content */}
      <main className="flex-1 ml-14 md:ml-0 overflow-y-auto px-5 md:px-[30px] lg:px-[50px]">
        <div className="flex gap-5 md:gap-8 lg:gap-10  justify-between py-[30px] ">
            <h2 className='text-(--heading-color) text-[24px] md:text-3xl lg:text-4xl'>{getPageTitle(location.pathname)}</h2>
            <p>{formatted}</p>
        </div>
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;