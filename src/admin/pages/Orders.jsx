import React, { useEffect, useState, useMemo } from "react";
import {
  DataTable,
  StatusDropdown,
  TableSkeleton,
} from "../components/adminComponentIndex.js";
import { db } from "../../firebase/firebaseConfig.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orderOptions = [
    { value: "preparing", label: "Preparing", color: "bg-yellow-500" },
    { value: "completed", label: "Completed", color: "bg-green-500" },
    { value: "canceled", label: "Canceled", color: "bg-red-500" },
  ];

  const statusFilterOptions = [
    { value: "all", label: "All" },
    { value: "preparing", label: "Preparing" },
    { value: "completed", label: "Completed" },
    { value: "canceled", label: "Canceled" },
  ];

  // ─── Fetch all orders in real-time
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("orderTime", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ─── Update order status
  const updateOrderStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", id), { status: newStatus });
    } catch (err) {
      console.error(err);
    }
  };

  // ─── Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      const matchesSearch =
        !searchText ||
        order.user?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        order.phoneNumber?.includes(searchText) ||
        order.items?.some((i) =>
          i.name.toLowerCase().includes(searchText.toLowerCase())
        );

      return matchesStatus && matchesSearch;
    });
  }, [orders, searchText, statusFilter]);

  // ─── Columns for DataTable
  const columns = [
    { label: "Customer", key: "user" },
    {
      label: "Items Summary",
      key: "items",
      render: (items) => {
        if (!items || !items.length) return "-";
        const summary = items
          .map((item) => `${item.name.split(" ")[0]} x${item.quantity || 1}`)
          .join(", ");
        const display = summary.length > 50 ? summary.slice(0, 50) + "..." : summary;
        return <span title={summary}>{display}</span>;
      },
    },
    { label: "Phone", key: "phoneNumber" },
    {
      label: "Address",
      key: "address",
      render: (val) => (
        <span title={val}>{val?.length > 20 ? val.slice(0, 20) + "..." : val}</span>
      ),
    },
    { label: "Total (Rs)", key: "total" },
    { label: "Time", key: "orderTime" },
    { label: "Status", key: "status" },
  ];

  return (
    <>
      {/* Filters */}
      <div className="flex flex-row gap-4 mb-5 items-start md:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search "
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-(--button-hover-bg-color) focus:border-(--button-hover-bg-color)"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-(--button-hover-bg-color) focus:border-(--button-hover-bg-color)"
          >
            {statusFilterOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={columns.length} />
      ) : (
        <DataTable
          title="All Orders"
          columns={columns}
          rows={filteredOrders.map((order) => ({
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
    </>
  );
}