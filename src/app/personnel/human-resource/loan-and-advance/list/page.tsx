"use client";

import Link from "next/link";
import { useState } from "react";

type LoanRecord = {
  id: number;
  employeeId: string;
  employeeName: string;
  loanType: string;
  amount: string;
  createdDate: string;
  status: "SUBMITTED" | "APPROVED" | "FINAL-APPROVED" | "REJECTED";
};

const MOCK_DATA: LoanRecord[] = [
  { id: 1,  employeeId: "140",  employeeName: "ARULRAJAN",       loanType: "Recovery",    amount: "50000.00",  createdDate: "10-Jan-2025", status: "FINAL-APPROVED" },
  { id: 2,  employeeId: "242",  employeeName: "ANURADHA",        loanType: "Advance",     amount: "25000.00",  createdDate: "12-Jan-2025", status: "APPROVED"       },
  { id: 3,  employeeId: "165",  employeeName: "MANGALAM",        loanType: "Recovery",    amount: "75000.00",  createdDate: "15-Jan-2025", status: "SUBMITTED"      },
  { id: 4,  employeeId: "174",  employeeName: "LAVANYA",         loanType: "Advance",     amount: "30000.00",  createdDate: "20-Jan-2025", status: "REJECTED"       },
  { id: 5,  employeeId: "149",  employeeName: "CAUVERI",         loanType: "Recovery",    amount: "60000.00",  createdDate: "22-Jan-2025", status: "FINAL-APPROVED" },
  { id: 6,  employeeId: "187",  employeeName: "KUMAR",           loanType: "Advance",     amount: "20000.00",  createdDate: "25-Jan-2025", status: "APPROVED"       },
  { id: 7,  employeeId: "1889", employeeName: "MAHALINGAM",      loanType: "Recovery",    amount: "100000.00", createdDate: "02-Feb-2025", status: "SUBMITTED"      },
  { id: 8,  employeeId: "194",  employeeName: "LAKSHMI PRABHA",  loanType: "Advance",     amount: "15000.00",  createdDate: "05-Feb-2025", status: "FINAL-APPROVED" },
  { id: 9,  employeeId: "139",  employeeName: "ANITHA",          loanType: "Recovery",    amount: "80000.00",  createdDate: "10-Feb-2025", status: "APPROVED"       },
  { id: 10, employeeId: "250",  employeeName: "SAMINATHAN",      loanType: "Advance",     amount: "40000.00",  createdDate: "14-Feb-2025", status: "SUBMITTED"      },
  { id: 11, employeeId: "312",  employeeName: "SELVI",           loanType: "Recovery",    amount: "55000.00",  createdDate: "18-Feb-2025", status: "REJECTED"       },
  { id: 12, employeeId: "220",  employeeName: "RAJENDRAN",       loanType: "Advance",     amount: "35000.00",  createdDate: "22-Feb-2025", status: "FINAL-APPROVED" },
  { id: 13, employeeId: "185",  employeeName: "PRIYA",           loanType: "Recovery",    amount: "90000.00",  createdDate: "01-Mar-2025", status: "SUBMITTED"      },
  { id: 14, employeeId: "310",  employeeName: "VENKATESH",       loanType: "Advance",     amount: "22000.00",  createdDate: "05-Mar-2025", status: "APPROVED"       },
  { id: 15, employeeId: "175",  employeeName: "MUTHULAKSHMI",    loanType: "Recovery",    amount: "65000.00",  createdDate: "10-Mar-2025", status: "FINAL-APPROVED" },
  { id: 16, employeeId: "198",  employeeName: "CHANDRASEKARAN",  loanType: "Advance",     amount: "28000.00",  createdDate: "12-Mar-2025", status: "SUBMITTED"      },
  { id: 17, employeeId: "267",  employeeName: "VIJAYALAKSHMI",   loanType: "Recovery",    amount: "45000.00",  createdDate: "18-Mar-2025", status: "REJECTED"       },
  { id: 18, employeeId: "301",  employeeName: "BALASUBRAMANIAM", loanType: "Advance",     amount: "18000.00",  createdDate: "25-Mar-2025", status: "FINAL-APPROVED" },
  { id: 19, employeeId: "143",  employeeName: "GEETHA",          loanType: "Recovery",    amount: "70000.00",  createdDate: "02-Apr-2025", status: "APPROVED"       },
  { id: 20, employeeId: "289",  employeeName: "SUBRAMANIAM",     loanType: "Advance",     amount: "32000.00",  createdDate: "08-Apr-2025", status: "SUBMITTED"      },
];

const STATUS_COLOR: Record<LoanRecord["status"], string> = {
  "SUBMITTED":     "#FFA70B",
  "APPROVED":      "#17a2b8",
  "FINAL-APPROVED":"#28a745",
  "REJECTED":      "#dc3545",
};

const TEAL = "#2aa781";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 10) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 4) pages.push("…");
  for (let i = Math.max(2, current - 2); i <= Math.min(total - 1, current + 2); i++) pages.push(i);
  if (current < total - 3) pages.push("…");
  pages.push(total);
  return pages;
}

export default function LoanAndAdvanceListPage() {
  const [selectedId,     setSelectedId]     = useState<number | null>(null);
  const [filterId,       setFilterId]       = useState("");
  const [filterName,     setFilterName]     = useState("");
  const [filterType,     setFilterType]     = useState("");
  const [filterDate,     setFilterDate]     = useState("");
  const [filterStatus,   setFilterStatus]   = useState("");
  const [page,           setPage]           = useState(1);
  const [pageSize,       setPageSize]       = useState(10);

  const handleClear = () => {
    setFilterId(""); setFilterName(""); setFilterType("");
    setFilterDate(""); setFilterStatus("");
    setSelectedId(null); setPage(1);
  };

  const filtered = MOCK_DATA.filter((r) =>
    (!filterId     || r.employeeId.toLowerCase().includes(filterId.toLowerCase())) &&
    (!filterName   || r.employeeName.toLowerCase().includes(filterName.toLowerCase())) &&
    (!filterType   || r.loanType === filterType) &&
    (!filterDate   || r.createdDate.includes(filterDate)) &&
    (!filterStatus || r.status === filterStatus)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pages = visiblePages(page, totalPages);

  const selectedRow = MOCK_DATA.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-base font-semibold text-gray-700">Loans and Advance List</h1>
        <div className="flex gap-2">
          <Link
            href="/personnel/human-resource/loan-and-advance/create"
            className="px-3 py-1 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: TEAL }}
          >
            Add
          </Link>
          <Link
            href={selectedId ? `/personnel/human-resource/loan-and-advance/view?id=${selectedId}` : "#"}
            className={`px-3 py-1 text-xs font-semibold text-white rounded ${!selectedId ? "opacity-50 pointer-events-none" : ""}`}
            style={{ backgroundColor: TEAL }}
          >
            View
          </Link>
          <button
            onClick={handleClear}
            className="px-3 py-1 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: TEAL }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Page size */}
      <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
        <span>Show</span>
        <select
          value={pageSize}
          onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
          className="border border-gray-300 rounded px-1 py-0.5 text-xs"
        >
          {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span>entries</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="w-full text-xs border-collapse">
          <thead>
            {/* Header row */}
            <tr style={{ backgroundColor: TEAL }}>
              <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">S.No</th>
              <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Employee ID</th>
              <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Employee Name</th>
              <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Loan / Advance Type</th>
              <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Amount</th>
              <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Created Date</th>
              <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Status</th>
              <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Select</th>
            </tr>
            {/* Filter row */}
            <tr style={{ backgroundColor: TEAL }}>
              <td className="px-1 py-1" />
              <td className="px-1 py-1">
                <input value={filterId} onChange={(e) => { setFilterId(e.target.value); setPage(1); }}
                  className="w-full border border-white/50 rounded px-1 py-0.5 text-xs bg-white/90 text-gray-800 placeholder-gray-400"
                  placeholder="Employee ID" />
              </td>
              <td className="px-1 py-1">
                <input value={filterName} onChange={(e) => { setFilterName(e.target.value); setPage(1); }}
                  className="w-full border border-white/50 rounded px-1 py-0.5 text-xs bg-white/90 text-gray-800 placeholder-gray-400"
                  placeholder="Employee Name" />
              </td>
              <td className="px-1 py-1">
                <select value={filterType} onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
                  className="w-full border border-white/50 rounded px-1 py-0.5 text-xs bg-white/90 text-gray-800">
                  <option value="">All</option>
                  <option value="Recovery">Recovery</option>
                  <option value="Advance">Advance</option>
                </select>
              </td>
              <td className="px-1 py-1" />
              <td className="px-1 py-1">
                <input value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(1); }}
                  className="w-full border border-white/50 rounded px-1 py-0.5 text-xs bg-white/90 text-gray-800 placeholder-gray-400"
                  placeholder="Created Date" />
              </td>
              <td className="px-1 py-1">
                <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                  className="w-full border border-white/50 rounded px-1 py-0.5 text-xs bg-white/90 text-gray-800">
                  <option value="">All</option>
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
                <td colSpan={8} className="text-center py-6 text-gray-400">No records found</td>
              </tr>
            ) : (
              paginated.map((row, idx) => {
                const isSel = row.id === selectedId;
                return (
                  <tr key={row.id} style={{ backgroundColor: isSel ? "#f0fdfa" : idx % 2 === 0 ? "#fff" : "#f9fafb" }}>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{(page - 1) * pageSize + idx + 1}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.employeeId}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.employeeName}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.loanType}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700 text-right">{row.amount}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.createdDate}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100">
                      <span className="px-2 py-0.5 rounded text-white text-[10px] font-semibold"
                        style={{ backgroundColor: STATUS_COLOR[row.status] }}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-center">
                      <input
                        type="radio"
                        name="rowSelect"
                        checked={isSel}
                        onChange={() => setSelectedId(row.id)}
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
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(1)} disabled={page === 1}
            className="px-2 py-1 border rounded disabled:opacity-40 hover:bg-gray-100">«</button>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="px-2 py-1 border rounded disabled:opacity-40 hover:bg-gray-100">‹</button>
          {pages.map((p, i) =>
            p === "…" ? (
              <span key={`e${i}`} className="px-2 py-1">…</span>
            ) : (
              <button key={p} onClick={() => setPage(p as number)}
                className="px-2 py-1 border rounded"
                style={p === page ? { backgroundColor: TEAL, color: "#fff", borderColor: TEAL } : {}}>
                {p}
              </button>
            )
          )}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-40 hover:bg-gray-100">›</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-40 hover:bg-gray-100">»</button>
        </div>
      </div>

      {/* Selected row info */}
      {selectedRow && (
        <div className="mt-3 p-2 bg-white border border-gray-200 rounded text-xs text-gray-600">
          Selected: <strong>{selectedRow.employeeId}</strong> — {selectedRow.employeeName} — {selectedRow.loanType} — {selectedRow.status}
        </div>
      )}
    </div>
  );
}
