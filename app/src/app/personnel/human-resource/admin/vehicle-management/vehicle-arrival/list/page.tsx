"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type VehicleArrival = {
  id: number;
  referenceNumber: string;
  vehicleNumber: string;
  vehicleName: string;
  destination: string;
  employeeName: string;
  arrivalDate: string;
};

const SAMPLE_DATA: VehicleArrival[] = [
  { id: 1,  referenceNumber: "VHARVL014", vehicleNumber: "TN01 AL 47 57", vehicleName: "Toyota Kirloskar Motor Ltd", destination: "Secretariat",   employeeName: "ALOK BABELAY,VAASU R",                          arrivalDate: "09-Sep-2024" },
  { id: 2,  referenceNumber: "VHARVL013", vehicleNumber: "TN01 AM7457",   vehicleName: "Hindustan Motors Ltd",       destination: "DH Office",     employeeName: "ALOK BABELAY,BALASUBRAMANIAN R,BHASKAR V",       arrivalDate: "26-Jul-2021" },
  { id: 3,  referenceNumber: "VHARVL012", vehicleNumber: "TN01 AM7457",   vehicleName: "Hindustan Motors Ltd",       destination: "thambaram",     employeeName: "",                                               arrivalDate: "18-Nov-2020" },
  { id: 4,  referenceNumber: "VHARVL011", vehicleNumber: "TN01 AM7457",   vehicleName: "Hindustan Motors Ltd",       destination: "thambaram",     employeeName: "",                                               arrivalDate: "05-Nov-2020" },
  { id: 5,  referenceNumber: "VHARVL0010", vehicleNumber: "TN 01 BH 8877", vehicleName: "Hindustan Motors Ltd",     destination: "secrertariate", employeeName: "",                                               arrivalDate: "12-Oct-2020" },
  { id: 6,  referenceNumber: "VHARVL008", vehicleNumber: "1514",           vehicleName: "Toyota Kirloskar Motor Ltd", destination: "Secretariat",  employeeName: "",                                               arrivalDate: "04-Mar-2019" },
  { id: 7,  referenceNumber: "VHARVL007", vehicleNumber: "TN13R1547",      vehicleName: "Toyota Kirloskar Motor Ltd", destination: "Secretary",    employeeName: "",                                               arrivalDate: "20-Nov-2018" },
];

type SortKey = keyof VehicleArrival;
type SortDir = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <span className="ml-1 text-[10px] opacity-50">⇅</span>;
  return <span className="ml-1 text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>;
}

function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export default function VehicleArrivalListPage() {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterVehicleNumber, setFilterVehicleNumber] = useState("");
  const [filterVehicleName, setFilterVehicleName] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  const [filterEmployeeName, setFilterEmployeeName] = useState("");
  const [filterArrivalDate, setFilterArrivalDate] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSort = (col: SortKey) => {
    if (sortKey === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(col); setSortDir("asc"); }
    setPage(1);
  };

  const handleClear = () => {
    setSelectedId(null);
    setFilterVehicleNumber(""); setFilterVehicleName(""); setFilterDestination("");
    setFilterEmployeeName(""); setFilterArrivalDate("");
    setSortKey("id"); setSortDir("asc"); setPage(1);
  };

  const filtered = SAMPLE_DATA.filter((r) =>
    r.vehicleNumber.toLowerCase().includes(filterVehicleNumber.toLowerCase()) &&
    r.vehicleName.toLowerCase().includes(filterVehicleName.toLowerCase()) &&
    r.destination.toLowerCase().includes(filterDestination.toLowerCase()) &&
    r.employeeName.toLowerCase().includes(filterEmployeeName.toLowerCase()) &&
    r.arrivalDate.toLowerCase().includes(filterArrivalDate.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey]; const bv = b[sortKey];
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const thClass = "border border-[#3aa88f] px-3 py-2.5 text-center font-semibold text-white whitespace-nowrap cursor-pointer select-none hover:bg-[#267a68]";
  const filterInput = "w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Vehicle Arrival List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Vehicle Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Vehicle Arrival List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm text-dark dark:text-white">
            <span className="font-bold text-primary">{filtered.length}</span>
            {" "}- Vehicle Arrival(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/admin/vehicle-management/vehicle-arrival/edit?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#1976d2] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/admin/vehicle-management/vehicle-arrival/view?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              View
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b]">
                <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold text-white w-10">#</th>
                <th className={thClass} onClick={() => handleSort("referenceNumber")}>
                  Reference Number <SortIcon col="referenceNumber" sortKey={sortKey} sortDir={sortDir} />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("vehicleNumber")} className="flex items-center justify-center gap-1">
                    Vehicle Number <SortIcon col="vehicleNumber" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterVehicleNumber} onChange={(e) => { setFilterVehicleNumber(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none focus:border-white" placeholder="" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("vehicleName")} className="flex items-center justify-center gap-1">
                    Vehicle Name <SortIcon col="vehicleName" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterVehicleName} onChange={(e) => { setFilterVehicleName(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none focus:border-white" placeholder="" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("destination")} className="flex items-center justify-center gap-1">
                    Destination <SortIcon col="destination" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterDestination} onChange={(e) => { setFilterDestination(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none focus:border-white" placeholder="" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("employeeName")} className="flex items-center justify-center gap-1">
                    Employee Name <SortIcon col="employeeName" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterEmployeeName} onChange={(e) => { setFilterEmployeeName(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none focus:border-white" placeholder="" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("arrivalDate")} className="flex items-center justify-center gap-1">
                    Arrival Date <SortIcon col="arrivalDate" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterArrivalDate} onChange={(e) => { setFilterArrivalDate(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none focus:border-white" placeholder="dd-MMM-yyyy" />
                </th>
                <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold text-white">Select</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="border border-stroke px-4 py-6 text-center text-gray-400 dark:border-dark-3">No records found.</td></tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSelected = selectedId === row.id;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(isSelected ? null : row.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-[#e8f4f8] dark:bg-[#1a2e3a]" :
                        idx % 2 === 0 ? "bg-white hover:bg-blue-50 dark:bg-gray-dark dark:hover:bg-[#1a2232]" :
                        "bg-[#f9fafb] hover:bg-blue-50 dark:bg-[#1a2232] dark:hover:bg-[#1e2a3a]"
                      }`}
                    >
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.referenceNumber}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.vehicleNumber}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.vehicleName}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.destination}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.employeeName || "-"}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.arrivalDate}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <input type="radio" checked={isSelected} onChange={() => setSelectedId(row.id)} className="size-4 accent-[#2d8f7b]" onClick={(e) => e.stopPropagation()} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stroke px-5 py-3 dark:border-dark-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>({Math.min((page - 1) * pageSize + 1, sorted.length)}–{Math.min(page * pageSize, sorted.length)} of {sorted.length})</span>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded border border-stroke bg-white px-2 py-1 text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">«</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">‹</button>
            {visiblePages(page, totalPages).map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="flex size-8 items-center justify-center text-sm text-gray-400">…</span>
              ) : (
                <button key={p} onClick={() => setPage(p as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] font-semibold text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{p}</button>
              )
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
