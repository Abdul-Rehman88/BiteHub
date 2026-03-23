import React, { useEffect, useState } from "react";
import { StatCard, DataTable } from "../components/adminComponentIndex.js";
import { db } from "../../firebase/firebaseConfig.js";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

function Dashboard() {
  const [stats, setStats] = useState([
    { label: "Total Orders", value: 0 },
    { label: "Total Revenue", value: 0 },
    { label: "Reservations", value: 0 },
    { label: "Menu Items", value: 0 },
  ]);

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentReservations, setRecentReservations] = useState([]);

  useEffect(() => {
    const fetchStatsAndRecent = async () => {
      try {
        // ─── Orders Stats ─────────────────────────────
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const completedOrders = orders.filter(order => order.status === "completed");
        const totalOrders = completedOrders.length;
        const totalRevenue = completedOrders.reduce((acc, order) => acc + (order.total || 0), 0);

        // ─── Recent 10 Orders ─────────────────────────
        const ordersQuery = query(
          collection(db, "orders"),
          orderBy("orderTime", "desc"),
          limit(5)
        );
        const recentOrdersSnapshot = await getDocs(ordersQuery);
        const recentOrdersData = recentOrdersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // ─── Reservations Stats ───────────────────────
        const reservationsSnapshot = await getDocs(collection(db, "reservations"));
        const reservations = reservationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const completedReservations = reservations.filter(res => res.status === "completed");
        const totalReservations = completedReservations.length;
        // ─── Recent 10 Reservations ───────────────────
        const reservationsQuery = query(
          collection(db, "reservations"),
          orderBy("reservationTime", "desc"),
          limit(5)
        );
        const recentReservationsSnapshot = await getDocs(reservationsQuery);
        const recentReservationsData = recentReservationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log(recentReservationsData)

        // ─── Menu Items ───────────────────────────────
        const menuSnapshot = await getDocs(collection(db, "menuItems"));
        const totalMenuItems = menuSnapshot.size;

        // ─── Update State ────────────────────────────
        setStats([
          { label: "Total Orders", value: totalOrders },
          { label: "Total Revenue", value: `Rs. ${totalRevenue}` },
          { label: "Reservations", value: totalReservations },
          { label: "Menu Items", value: totalMenuItems },
        ]);

        setRecentOrders(recentOrdersData);
        setRecentReservations(recentReservationsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchStatsAndRecent();
  }, []);

  // ─── Columns for DataTable ────────────────────
  const orderColumns = [
    { label: "Order ID", key: "id" },
    { label: "Customer", key: "user" },
    { label: "Total", key: "total" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Status", key: "status" },
    { label: "Time", key: "orderTime" },
  ];

  const reservationColumns = [
    { label: "Reservation ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Guests", key: "guests" },
    { label: "Status", key: "status" },
    { label: "Time", key: "reservationTime" },
  ];

  // ─── Render ───────────────────────────────────
  return (
    <>
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6 lg:gap-10 mb-5">
        {stats.map(stat => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>

      {/* Recent Orders */}
      <DataTable
        title="Recent Orders"
        columns={orderColumns}
        rows={recentOrders.map(order => ({
          ...order,
          user: order.user?.name ||"NA",
          orderTime: order.orderTime?.toDate?.()?.toLocaleString() || "",
          status: (
            <span
              className={`px-2 py-1 rounded-full text-white ${
                order.status === "preparing"
                  ? "bg-yellow-500"
                  : order.status === "completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {order.status}
            </span>
          )
        }))}
      />

      {/* Recent Reservations */}
      <DataTable
        title="Recent Reservations"
        columns={reservationColumns}
        rows={recentReservations.map(res => ({
          ...res,
          orderTime: res.orderTime?.toDate?.()?.toLocaleString() || "",
          status: (
            <span
              className={`px-2 py-1 rounded-full text-white ${
                res.status === "scheduled"
                  ? "bg-yellow-500"
                  : res.status === "completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {res.status}
            </span>
          )
        }))}
      />
    </>
  );
}

export default Dashboard;