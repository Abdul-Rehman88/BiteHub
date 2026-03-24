import React, { useEffect, useState } from "react";
import { StatCard, DataTable, StatusDropdown, StatCardSkeleton, TableSkeleton, } from "../components/adminComponentIndex.js";
import { db } from "../../firebase/firebaseConfig.js";
import { doc, updateDoc, collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

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
 useEffect(() => {
  setStatsLoading(true);

  let ordersData = [];
  let reservationsData = [];
  let menuCount = 0;

  const calculateStats = () => {
    const completedOrders = ordersData.filter(o => o.status === "completed");
    const totalRevenue = completedOrders.reduce(
      (acc, o) => acc + (o.total || 0),
      0
    );

    const completedReservations = reservationsData.filter(
      r => r.status === "completed"
    ).length;

    setStats([
      { label: "Total Orders", value: completedOrders.length },
      { label: "Total Revenue", value: `Rs. ${totalRevenue}` },
      { label: "Reservations", value: completedReservations },
      { label: "Menu Items", value: menuCount },
    ]);

    setStatsLoading(false);
  };

  const unsubscribeOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
    ordersData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    calculateStats();
  });

  const unsubscribeReservations = onSnapshot(
    collection(db, "reservations"),
    (snapshot) => {
      reservationsData = snapshot.docs.map(doc => doc.data());
      calculateStats();
    }
  );

  const unsubscribeMenu = onSnapshot(collection(db, "menuItems"), (snapshot) => {
    menuCount = snapshot.size;
    calculateStats();
  });

  return () => {
    unsubscribeOrders();
    unsubscribeReservations();
    unsubscribeMenu();
  };
}, []);

  // fetch orders

useEffect(() => {
  const q = query(
    collection(db, "orders"),
    orderBy("orderTime", "desc"),
    limit(5)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setRecentOrders(data);
    setOrdersLoading(false);
  });

  return () => unsubscribe();
}, []);

  // fetch reservation
   useEffect(() => {
  const q = query(
    collection(db, "reservations"),
    orderBy("requestTime", "desc"),
    limit(5)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setRecentReservations(data);
    setReservationsLoading(false);
  });

  return () => unsubscribe();
}, []);



  // ─── Update Order Status ──────────────────
  const updateOrderStatus = async (id, newStatus) => {
  try {
    await updateDoc(doc(db, "orders", id), { status: newStatus });
  } catch (err) {
    console.error(err);
  }
};

  // ─── Update Reservation Status ─────────────
  const updateReservationStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "reservations", id), { status: newStatus });

    } catch (err) {
      console.error(err);
    }
  };

  // ─── Columns ──────────────────────────────
  const orderColumns = [
    { label: "Customer", key: "user" },
    { label: "Items Summary", key: "items",
    render: (items) => {
      if (!items || !items.length) return "-";
      // Map each item to "name x quantity"
      const summary = items
        .map(item => `${item.name.split(' ')[0]} x${item.quantity || 1}`) // using name
        .join(", ");
      const display = summary.length > 50 ? summary.slice(0, 50) + "..." : summary;
      return <span title={summary}>{display}</span>; },
    },
  { label: "Phone", key: "phoneNumber" },
  { label: "Address", key: "address" ,
    render: (val) => (
      <span title={val}>{val?.length > 20 ? val.slice(0, 20) + "..." : val}</span>
    ),
  },
  { label: "Total(Rs)", key: "total" },
    { label: "Time", key: "orderTime" },
    { label: "Status", key: "status" },
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
      <span title={val}>{val?.length > 15 ? val.slice(0, 15) + "..." : val}</span>
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
                key={order.id}
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
              specialRequest: res.specialRequest || " ",

            status: (
              <StatusDropdown
                key={res.id}
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