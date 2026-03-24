import React, { useEffect, useState } from "react";
import { StatCard, DataTable, StatusDropdown, StatCardSkeleton, TableSkeleton, } from "../components/adminComponentIndex.js";
import { db } from "../../firebase/firebaseConfig.js";
import { doc, updateDoc, collection, getDocs, query, orderBy, limit, } from "firebase/firestore";

function Dashboard() {
  // ─── Loading States ─────────────────────────
  const [statsLoading, setStatsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [reservationsLoading, setReservationsLoading] = useState(true);

  // ─── Data States ───────────────────────────
  const [stats, setStats] = useState([
    { label: "Total Orders", value: 0 },
    { label: "Total Revenue", value: 0 },
    { label: "Reservations", value: 0 },
    { label: "Menu Items", value: 0 },
  ]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentReservations, setRecentReservations] = useState([]);

  // ─── Dropdown Options ─────────────────────
  const orderOptions = [
    { value: "preparing", label: "Preparing", color: "bg-yellow-500" },
    { value: "completed", label: "Completed", color: "bg-green-500" },
    { value: "canceled", label: "Canceled", color: "bg-red-500" },
  ];
  const reservationOptions = [
    { value: "scheduled", label: "Scheduled", color: "bg-yellow-500" },
    { value: "completed", label: "Completed", color: "bg-green-500" },
    { value: "canceled", label: "Canceled", color: "bg-red-500" },
  ];

  // ─── Fetch Functions ───────────────────────
  
  // fetch stats
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const orders = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const completedOrders = orders.filter((o) => o.status === "completed");
      const totalOrders = completedOrders.length;
      const totalRevenue = completedOrders.reduce((acc, o) => acc + (o.total || 0), 0);

      const reservationsSnapshot = await getDocs(collection(db, "reservations"));
      const reservations = reservationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const totalReservations = reservations.filter((r) => r.status === "completed").length;

      const menuSnapshot = await getDocs(collection(db, "menuItems"));
      const totalMenuItems = menuSnapshot.size;

      setStats([
        { label: "Total Orders", value: totalOrders },
        { label: "Total Revenue", value: `Rs. ${totalRevenue}` },
        { label: "Reservations", value: totalReservations },
        { label: "Menu Items", value: totalMenuItems },
      ]);
    } finally {
      setStatsLoading(false);
    }
  };

  // fetch orders
  const fetchRecentOrders = async () => {
    setOrdersLoading(true);
    try {
      const ordersQuery = query(collection(db, "orders"), orderBy("orderTime", "desc"), limit(5));
      const snapshot = await getDocs(ordersQuery);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecentOrders(data);
    } finally {
      setOrdersLoading(false);
    }
  };

  // fetch reservation
  const fetchRecentReservations = async () => {
    setReservationsLoading(true);
    try {
      const reservationsQuery = query(
        collection(db, "reservations"),
        orderBy("reservationTime", "desc"),
        limit(5)
      );
      const snapshot = await getDocs(reservationsQuery);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecentReservations(data);
    } finally {
      setReservationsLoading(false);
    }
  };

  // ─── Load Data on Mount ───────────────────
  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
    fetchRecentReservations();
  }, []);

  // ─── Update Order Status ──────────────────
  const updateOrderStatus = async (id, newStatus) => {
    try {
      const oldOrder = recentOrders.find((o) => o.id === id);
      await updateDoc(doc(db, "orders", id), { status: newStatus });

      // Update table row
      setRecentOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
      );

      // Update stats dynamically
      setStats((prevStats) =>
        prevStats.map((stat) => {
          if (stat.label === "Total Orders") {
            if (oldOrder.status !== "completed" && newStatus === "completed")
              return { ...stat, value: stat.value + 1 };
            if (oldOrder.status === "completed" && newStatus !== "completed")
              return { ...stat, value: stat.value - 1 };
          }
          if (stat.label === "Total Revenue") {
            const currentRevenue = parseInt(stat.value.toString().replace("Rs. ", ""));
            if (oldOrder.status !== "completed" && newStatus === "completed")
              return { ...stat, value: `Rs. ${currentRevenue + (oldOrder.total || 0)}` };
            if (oldOrder.status === "completed" && newStatus !== "completed")
              return { ...stat, value: `Rs. ${currentRevenue - (oldOrder.total || 0)}` };
          }
          return stat;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ─── Update Reservation Status ─────────────
  const updateReservationStatus = async (id, newStatus) => {
    try {
      const oldRes = recentReservations.find((r) => r.id === id);
      await updateDoc(doc(db, "reservations", id), { status: newStatus });

      // Update table row
      setRecentReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );

      // Update stats dynamically
      setStats((prevStats) =>
        prevStats.map((stat) => {
          if (stat.label === "Reservations") {
            if (oldRes.status !== "completed" && newStatus === "completed")
              return { ...stat, value: stat.value + 1 };
            if (oldRes.status === "completed" && newStatus !== "completed")
              return { ...stat, value: stat.value - 1 };
          }
          return stat;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ─── Columns ──────────────────────────────
  const orderColumns = [
    { label: "Customer", key: "user" },
    {
    label: "Items Summary",
    key: "items",
    render: (items) => {
      if (!items || !items.length) return "-";
      // Map each item to "name x quantity"
      const summary = items
        .map(item => `${item.name.split(' ')[0]} x${item.quantity || 1}`) // using name
        .join(", ");
      const display = summary.length > 50 ? summary.slice(0, 50) + "..." : summary;
      return <span title={summary}>{display}</span>;
    },
  },
    { label: "Total", key: "total" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Status", key: "status" },
    { label: "Time", key: "orderTime" },
  ];

  const reservationColumns = [
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Time", key: "reservationTime" },
    { label: "Date", key: "date" },
    { label: "Guests", key: "guests" },
    { label: "Status", key: "status" },
    { label: "Special Request", key: "specialRequest",
    render: (val) => (
      <span title={val}>{val?.length > 30 ? val.slice(0, 10) + "..." : val}</span>
    ),
    },
  ];

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-5">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      {/* Orders */}
      {ordersLoading ? (
        <TableSkeleton rows={5} cols={orderColumns.length} />
      ) : (
        <DataTable
          title="Recent Orders"
          columns={orderColumns}
          rows={recentOrders.map((order) => ({
            ...order,
            user: order.user?.name || "NA",
            orderTime: order.orderTime?.toDate?.()?.toLocaleString() || "",
            items: order.items || "",
            status: (
              <StatusDropdown
                key={order.id + order.status}
                value={order.status}
                onChange={(s) => updateOrderStatus(order.id, s)}
                options={orderOptions}
              />
            ),
          }))}
        />
      )}

      {/* Reservations */}
      {reservationsLoading ? (
        <TableSkeleton rows={5} cols={reservationColumns.length} />
      ) : (
        <DataTable
          title="Recent Reservations"
          columns={reservationColumns}
          rows={recentReservations.map((res) => ({
            ...res,
            // reservationTime: res.reservationTime?.toDate?.()?.toLocaleString() || "",
              specialRequest: res.specialRequest || " ",

            status: (
              <StatusDropdown
                key={res.id + res.status}
                value={res.status}
                onChange={(s) => updateReservationStatus(res.id, s)}
                options={reservationOptions}
              />
            ),
          }))}
        />
      )}
    </>
  );
}

export default Dashboard;