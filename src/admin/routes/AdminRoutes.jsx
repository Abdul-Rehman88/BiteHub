import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import { Orders, Menu, Reservations, Dashboard } from "../pages";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="menu" element={<Menu />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;