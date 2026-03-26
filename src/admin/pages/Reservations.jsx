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

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const reservationOptions = [
    { value: "scheduled", label: "Scheduled", color: "bg-yellow-500" },
    { value: "completed", label: "Completed", color: "bg-green-500" },
    { value: "canceled", label: "Canceled", color: "bg-red-500" },
  ];

  const statusFilterOptions = [
    { value: "all", label: "All" },
    { value: "scheduled", label: "Scheduled" },
    { value: "completed", label: "Completed" },
    { value: "canceled", label: "Canceled" },
  ];

  // ─── Fetch all reservations in real-time
  useEffect(() => {
    const q = query(collection(db, "reservations"), orderBy("requestTime", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ─── Update reservation status
  const updateReservationStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "reservations", id), { status: newStatus });
    } catch (err) {
      console.error(err);
    }
  };

  // ─── Filtered reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((res) => {
      const matchesStatus =
        statusFilter === "all" || res.status === statusFilter;

      const matchesSearch =
        !searchText ||
        res.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        res.phone?.includes(searchText) ||
        res.specialRequest?.toLowerCase().includes(searchText.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [reservations, searchText, statusFilter]);

  // ─── Columns for DataTable
  const columns = [
    { label: "Name", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "Time", key: "reservationTime" },
    { label: "Date", key: "date" },
    { label: "Guests", key: "guests" },
    { label: "Status", key: "status" },
    {
      label: "Special Request",
      key: "specialRequest",
      render: (val) => (
        <span title={val}>
          {val?.length > 20 ? val.slice(0, 20) + "..." : val}
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-row gap-4 mb-5 items-start md:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search"
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

      {/* Reservations Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={columns.length} />
      ) : (
        <DataTable
          title="All Reservations"
          columns={columns}
          rows={filteredReservations.map((res) => ({
            ...res,
            reservationTime: res.reservationTime?.toDate?.()?.toLocaleString() || "",
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
    </div>
  );
}