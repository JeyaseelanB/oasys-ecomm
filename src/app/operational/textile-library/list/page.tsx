"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type RowData = {
  id: number;
  visitorType: string;
  employeeCodeName: string;
  name: string;
  dateOfVisit: string;
  inTime: string;
  outTime: string;
};

const SAMPLE_DATA: RowData[] = [
  {
    id: 1,
    visitorType: "Co-opetex Employee",
    employeeCodeName: "P00950/Dinesh D",
    name: "",
    dateOfVisit: "11-Mar-2026",
    inTime: "09:00",
    outTime: "16:00",
  },
];

const HEADER_BG = "#2d8f7b";

export default function TextileLibraryListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    visitorType: "",
    employeeCodeName: "",
    name: "",
    dateOfVisit: "",
    inTime: "",
    outTime: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = SAMPLE_DATA.filter((r) =>
    r.visitorType.toLowerCase().includes(filters.visitorType.toLowerCase()) &&
    r.employeeCodeName.toLowerCase().includes(filters.employeeCodeName.toLowerCase()) &&
    r.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    r.dateOfVisit.toLowerCase().includes(filters.dateOfVisit.toLowerCase()) &&
    r.inTime.toLowerCase().includes(filters.inTime.toLowerCase()) &&
    r.outTime.toLowerCase().includes(filters.outTime.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleClear = () => {
    setSelectedId(null);
    setFilters({ visitorType: "", employeeCodeName: "", name: "", dateOfVisit: "", inTime: "", outTime: "" });
  };

  const CalIco = () => (
    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="text-gray-700">Textile Library Register List</li>
        </ol>
      </nav>

      {/* Page Title */}
      <h1 className="text-base font-semibold text-gray-800 mb-3">Textile Library Register List</h1>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{filtered.length} - Textile Library Register(s)</span>
        <div className="flex gap-2">
          {/* Add */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded"
            style={{ backgroundColor: selectedId !== null ? "#8fce9f" : "#28a745", cursor: selectedId !== null ? "not-allowed" : "pointer", opacity: selectedId !== null ? 0.7 : 1 }}
            disabled={selectedId !== null}
            onClick={() => router.push("/operational/textile-library/create")}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Add
          </button>

          {/* Edit */}
          <button
            disabled={!selectedId}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded ${!selectedId ? "opacity-60 cursor-not-allowed" : ""}`}
            style={{ backgroundColor: "#17a2b8" }}
            onClick={() => selectedId && router.push("/operational/textile-library/edit")}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>

          {/* View */}
          <button
            disabled={!selectedId}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded ${!selectedId ? "opacity-60 cursor-not-allowed" : ""}`}
            style={{ backgroundColor: "#17a2b8" }}
            onClick={() => selectedId && router.push("/operational/textile-library/view")}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>

          {/* Clear */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded"
            style={{ backgroundColor: "#6c757d" }}
            onClick={handleClear}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow-sm border border-gray-200">
        <table className="min-w-full text-sm">
          <thead>
            {/* Header row */}
            <tr style={{ backgroundColor: HEADER_BG }} className="text-white">
              <th className="px-3 py-2.5 text-center font-semibold w-10">#</th>
              <th className="px-3 py-2.5 text-center font-semibold whitespace-nowrap">Visitor Type <span className="opacity-80">⇅</span></th>
              <th className="px-3 py-2.5 text-center font-semibold whitespace-nowrap">Employee Code / Name <span className="opacity-80">⇅</span></th>
              <th className="px-3 py-2.5 text-center font-semibold whitespace-nowrap">Name <span className="opacity-80">⇅</span></th>
              <th className="px-3 py-2.5 text-center font-semibold whitespace-nowrap">Date of Visit <span className="opacity-80">⇅</span></th>
              <th className="px-3 py-2.5 text-center font-semibold whitespace-nowrap">In Time <span className="opacity-80">⇅</span></th>
              <th className="px-3 py-2.5 text-center font-semibold whitespace-nowrap">Out Time <span className="opacity-80">⇅</span></th>
              <th className="px-3 py-2.5 text-center font-semibold">Select</th>
            </tr>

            {/* Filter row */}
            <tr style={{ backgroundColor: HEADER_BG, borderBottom: "3px solid #e5e7eb" }}>
              <td className="px-2 py-1.5"></td>
              <td className="px-2 py-1.5">
                <input
                  type="text"
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.visitorType}
                  onChange={e => setFilters(f => ({ ...f, visitorType: e.target.value }))}
                />
              </td>
              <td className="px-2 py-1.5">
                <input
                  type="text"
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.employeeCodeName}
                  onChange={e => setFilters(f => ({ ...f, employeeCodeName: e.target.value }))}
                />
              </td>
              <td className="px-2 py-1.5">
                <input
                  type="text"
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.name}
                  onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
                />
              </td>
              <td className="px-2 py-1.5">
                <div className="flex items-center bg-white rounded overflow-hidden">
                  <input
                    type="text"
                    placeholder="dd-MMM-yyyy"
                    className="flex-1 px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                    value={filters.dateOfVisit}
                    onChange={e => setFilters(f => ({ ...f, dateOfVisit: e.target.value }))}
                  />
                  <span className="px-1.5 py-1 flex items-center" style={{ backgroundColor: "#17a2b8" }}>
                    <CalIco />
                  </span>
                </div>
              </td>
              <td className="px-2 py-1.5">
                <input
                  type="text"
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.inTime}
                  onChange={e => setFilters(f => ({ ...f, inTime: e.target.value }))}
                />
              </td>
              <td className="px-2 py-1.5">
                <input
                  type="text"
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.outTime}
                  onChange={e => setFilters(f => ({ ...f, outTime: e.target.value }))}
                />
              </td>
              <td className="px-2 py-1.5"></td>
            </tr>
          </thead>

          <tbody className="bg-white">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-4 text-sm text-gray-500 text-center">No records found</td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-teal-50 ${selectedId === row.id ? "bg-teal-50" : ""}`}
                  onClick={() => setSelectedId(selectedId === row.id ? null : row.id)}
                >
                  <td className="px-3 py-2 text-center">
                    <span className="text-teal-600 font-medium text-xs">{(page - 1) * pageSize + idx + 1}</span>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700">{row.visitorType}</td>
                  <td className="px-3 py-2 text-xs text-teal-600">{row.employeeCodeName}</td>
                  <td className="px-3 py-2 text-xs text-gray-700">{row.name}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">{row.dateOfVisit}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">{row.inTime}</td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">{row.outTime}</td>
                  <td className="px-3 py-2 text-center" onClick={e => e.stopPropagation()}>
                    <input
                      type="radio"
                      checked={selectedId === row.id}
                      onChange={() => setSelectedId(row.id)}
                      className="accent-teal-600"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-2 gap-1.5 text-xs text-gray-500">
        <span className="mr-1">({page} of {totalPages})</span>
        <button disabled={page === 1} onClick={() => setPage(1)} className="px-2 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-50">◀|</button>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-2 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-50">◀</button>
        <span className="px-2 py-1 border border-teal-500 rounded bg-teal-50 text-teal-700 font-semibold">{page}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-2 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-50">▶</button>
        <button disabled={page >= totalPages} onClick={() => setPage(totalPages)} className="px-2 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-50">|▶</button>
        <select
          className="border border-gray-300 rounded px-1.5 py-1 focus:outline-none ml-1"
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
        >
          {[10, 25, 50].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
}
