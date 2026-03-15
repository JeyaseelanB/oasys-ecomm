"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PromotionRecord = {
  id: number;
  referenceNumber: string;
  createdDate: string;
  status: "SUBMITTED" | "APPROVED" | "FINAL-APPROVED" | "REJECTED";
};

// Generate 211 records programmatically
function generateRecords(): PromotionRecord[] {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const statusCycle: PromotionRecord["status"][] = [
    "FINAL-APPROVED","FINAL-APPROVED","FINAL-APPROVED","FINAL-APPROVED",
    "FINAL-APPROVED","FINAL-APPROVED","APPROVED","REJECTED",
  ];
  const base = new Date(2026, 2, 11); // 11-Mar-2026
  const records: PromotionRecord[] = [];

  for (let n = 211; n >= 1; n--) {
    const daysBack = 211 - n;
    const d = new Date(base.getTime() - daysBack * 2 * 86400000);
    const day   = String(d.getDate()).padStart(2, "0");
    const month = months[d.getMonth()];
    const year  = d.getFullYear();
    const yr2   = String(year).slice(2);
    const refNum = `PRM-${yr2}-${String(n).padStart(3, "0")}`;
    const status: PromotionRecord["status"] =
      n === 211 ? "SUBMITTED" :
      n === 210 ? "SUBMITTED" :
      statusCycle[n % statusCycle.length];
    records.push({ id: 212 - n, referenceNumber: refNum, createdDate: `${day}-${month}-${year}`, status });
  }
  return records;
}

const MOCK_DATA: PromotionRecord[] = generateRecords();

const STATUS_COLOR: Record<PromotionRecord["status"], string> = {
  "SUBMITTED":      "#FFA70B",
  "APPROVED":       "#17a2b8",
  "FINAL-APPROVED": "#28a745",
  "REJECTED":       "#dc3545",
};

const TEAL = "#2aa781";
const PAGE_SIZE_OPTIONS = [10, 20, 25, 50, 100];

function allVisiblePages(total: number): number[] {
  return Array.from({ length: total }, (_, i) => i + 1);
}

export default function PromotionListPage() {
  const router = useRouter();

  // Row 7 pre-selected by default
  const [selectedId,   setSelectedId]   = useState<number | null>(7);
  const [filterRef,    setFilterRef]    = useState("");
  const [filterDate,   setFilterDate]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page,         setPage]         = useState(1);
  const [pageSize,     setPageSize]     = useState(20);

  const handleClear = () => {
    setFilterRef(""); setFilterDate(""); setFilterStatus("");
    setSelectedId(null); setPage(1);
  };

  const filtered = MOCK_DATA.filter((r) =>
    (!filterRef    || r.referenceNumber.toLowerCase().includes(filterRef.toLowerCase())) &&
    (!filterDate   || r.createdDate.toLowerCase().includes(filterDate.toLowerCase())) &&
    (!filterStatus || r.status === filterStatus)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pages      = allVisiblePages(totalPages);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 mb-1">
        Home / Personnel / Human Resource /{" "}
        <span className="text-gray-600">Promotion List</span>
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-sm font-semibold text-gray-700">
          Promotion List
        </h1>
        <div className="flex gap-1.5">
          {/* Add */}
          <button
            onClick={() => router.push("/personnel/human-resource/promotion/add")}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: "#28a745" }}
          >
            + Add
          </button>
          {/* Edit */}
          <button
            disabled={!selectedId}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded disabled:opacity-50"
            style={{ backgroundColor: TEAL }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
          {/* Joining Date */}
          <button
            onClick={() => selectedId && router.push(`/personnel/human-resource/promotion/joining-date?id=${selectedId}`)}
            disabled={!selectedId}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded disabled:opacity-50"
            style={{ backgroundColor: TEAL }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Joining Date
          </button>
          {/* View */}
          <button
            onClick={() => selectedId && router.push(`/personnel/human-resource/promotion/view?id=${selectedId}`)}
            disabled={!selectedId}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded disabled:opacity-50"
            style={{ backgroundColor: TEAL }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            View
          </button>
          {/* Clear */}
          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: TEAL }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="w-full text-xs border-collapse">
          <thead>
            {/* Column headers */}
            <tr style={{ backgroundColor: TEAL }}>
              <th className="px-3 py-2 text-white font-semibold text-center border-r border-white/20 w-10">#</th>
              <th className="px-3 py-2 text-white font-semibold text-left border-r border-white/20">Reference Number</th>
              <th className="px-3 py-2 text-white font-semibold text-left border-r border-white/20">
                <span className="flex items-center gap-1">
                  Created Date
                  <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                  </svg>
                </span>
              </th>
              <th className="px-3 py-2 text-white font-semibold text-left border-r border-white/20">Status</th>
              <th className="px-3 py-2 text-white font-semibold text-center w-16">Select</th>
            </tr>
            {/* Filter row */}
            <tr style={{ backgroundColor: TEAL }}>
              <td className="px-1 py-1" />
              <td className="px-1 py-1">
                <input
                  value={filterRef}
                  onChange={(e) => { setFilterRef(e.target.value); setPage(1); }}
                  placeholder="Reference Number"
                  className="w-full rounded px-2 text-xs bg-white text-gray-800 placeholder-gray-400 focus:outline-none border-0"
                  style={{ height: 26 }}
                />
              </td>
              <td className="px-1 py-1">
                <div className="flex rounded overflow-hidden bg-white" style={{ height: 26 }}>
                  <input
                    value={filterDate}
                    onChange={(e) => { setFilterDate(e.target.value); setPage(1); }}
                    placeholder="dd-MMM-yyyy"
                    className="flex-1 px-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none bg-white"
                  />
                  <button
                    className="flex items-center justify-center px-1.5 shrink-0"
                    style={{ backgroundColor: "#17a2b8" }}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-1 py-1">
                <select
                  value={filterStatus}
                  onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                  className="w-full rounded px-1 text-xs bg-white text-gray-800 border-0 focus:outline-none"
                  style={{ height: 26 }}
                >
                  <option value="">Select</option>
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="FINAL-APPROVED">FINAL-APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </td>
              <td className="px-1 py-1" />
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400 text-xs">
                  No records found
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => {
                const isSel = row.id === selectedId;
                return (
                  <tr
                    key={row.id}
                    style={{
                      backgroundColor: isSel ? "#f0fdfa" : idx % 2 === 0 ? "#fff" : "#f9fafb",
                    }}
                    className="cursor-pointer hover:bg-[#f0fdfa]"
                    onClick={() => setSelectedId(isSel ? null : row.id)}
                  >
                    <td
                      className="px-3 py-1.5 border-b border-gray-100 text-center"
                      style={{ color: "#374151" }}
                    >
                      {(page - 1) * pageSize + idx + 1}
                    </td>
                    <td
                      className="px-3 py-1.5 border-b border-gray-100"
                      style={{ color: TEAL }}
                    >
                      {row.referenceNumber}
                    </td>
                    <td
                      className="px-3 py-1.5 border-b border-gray-100"
                      style={{ color: "#374151" }}
                    >
                      {row.createdDate}
                    </td>
                    <td className="px-3 py-1.5 border-b border-gray-100">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-semibold text-white"
                        style={{ backgroundColor: STATUS_COLOR[row.status] }}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 border-b border-gray-100 text-center">
                      <input
                        type="radio"
                        name="rowSelect"
                        checked={isSel}
                        onChange={() => setSelectedId(row.id)}
                        onClick={(e) => e.stopPropagation()}
                        style={{ accentColor: TEAL }}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-600">
        <span>
          Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
          {Math.min(page * pageSize, filtered.length)} of {filtered.length} entries
        </span>
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-2 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
          >
            «
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
          >
            ‹
          </button>
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="px-2 py-1 border rounded min-w-[28px]"
              style={
                p === page
                  ? { backgroundColor: TEAL, color: "#fff", borderColor: TEAL }
                  : {}
              }
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
          >
            ›
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
          >
            »
          </button>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="ml-1 border border-gray-300 rounded px-1 py-1 text-xs"
          >
            {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
