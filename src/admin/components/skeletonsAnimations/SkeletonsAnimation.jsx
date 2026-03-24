import React from "react";

// Stat Card Skeleton
export const StatCardSkeleton = () => {
  return (
    <div className="p-5 rounded-lg bg-gray-200">
      <div className="h-4 w-24 rounded mb-3 animate-shimmer"></div>
      <div className="h-6 w-16 rounded animate-shimmer"></div>
    </div>
  );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5, cols = 6 }) => {
  return (
    <div className="bg-[#FFF8F1] rounded-lg p-5 my-10 shadow-[0_8px_20px_rgba(255,200,150,0.4)]">
      {/* Table Title */}
      <div className="h-6 w-40 rounded mb-4 animate-shimmer"></div>

      {/* Table body */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`grid grid-cols-${cols} gap-4 mb-3`}>
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 rounded animate-shimmer"></div>
          ))}
        </div>
      ))}
    </div>
  );
};