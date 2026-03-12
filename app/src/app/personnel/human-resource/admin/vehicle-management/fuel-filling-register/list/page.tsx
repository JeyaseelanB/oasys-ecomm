"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FuelRegister = {
  id: number;
  referenceNumber: string;
  hoRo: string;
  vehicleNumber: string;
  couponNumber: string;
  createdDate: string;
  status: "FINAL APPROVED" | "SUBMITTED" | "CANCELLED" | "DRAFT";
};

const SAMPLE_DATA: FuelRegister[] = [
  { id: 1,  referenceNumber: "FUEL094", hoRo: "CHENNAI", vehicleNumber: "TN01 AL 47 57", couponNumber: "187",   createdDate: "18-Nov-2020", status: "FINAL APPROVED" },
  { id: 2,  referenceNumber: "FUEL093", hoRo: "CHENNAI", vehicleNumber: "TN01 AF 6116",  couponNumber: "33026", createdDate: "18-Nov-2020", status: "SUBMITTED" },
  { id: 3,  referenceNumber: "FUEL092", hoRo: "CHENNAI", vehicleNumber: "TN01 AL 47 57", couponNumber: "186",   createdDate: "18-Nov-2020", status: "SUBMITTED" },
  { id: 4,  referenceNumber: "FUEL091", hoRo: "CHENNAI", vehicleNumber: "TN01 AL 47 57", couponNumber: "185",   createdDate: "18-Nov-2020", status: "SUBMITTED" },
  { id: 5,  referenceNumber: "FUEL090", hoRo: "CHENNAI", vehicleNumber: "TN01 AL 47 57", couponNumber: "184",   createdDate: "18-Nov-2020", status: "SUBMITTED" },
  { id: 6,  referenceNumber: "FUEL089", hoRo: "CHENNAI", vehicleNumber: "TN01 AL 47 57", couponNumber: "183",   createdDate: "18-Nov-2020", status: "SUBMITTED" },
  { id: 7,  referenceNumber: "FUEL088", hoRo: "CHENNAI", vehicleNumber: "TN01 AL 47 57", couponNumber: "182",   createdDate: "18-Nov-2020", status: "SUBMITTED" },
  { id: 8,  referenceNumber: "FUEL087", hoRo: "CHENNAI", vehicleNumber: "TN01 AL 47 57", couponNumber: "181",   createdDate: "18-Nov-2020", status: "SUBMITTED" },
  { id: 9,  referenceNumber: "FUEL086", hoRo: "CHENNAI", vehicleNumber: "TN01 AL 47 57", couponNumber: "180",   createdDate: "18-Nov-2020", status: "SUBMITTED" },
  { id: 10, referenceNumber: "FUEL085", hoRo: "CHENNAI", vehicleNumber: "TN01 AL 47 57", couponNumber: "179",   createdDate: "18-Nov-2020", status: "SUBMITTED" },
  { id: 11, referenceNumber: "FUEL084", hoRo: "CHENNAI", vehicleNumber: "TN01 AL 47 57", couponNumber: "178",   createdDate: "15-Nov-2020", status: "SUBMITTED" },
  { id: 12, referenceNumber: "FUEL083", hoRo: "CHENNAI", vehicleNumber: "TN01 AF 6116",  couponNumber: "33025", createdDate: "10-Oct-2020", status: "CANCELLED" },
];

type SortKey = keyof FuelRegister;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const STATUS_BADGE: Record<FuelRegister["status"], string> = {
  "FINAL APPROVED": "bg-[#28a745] text-white",
  "SUBMITTED":      "bg-[#fd7e14] text-white",
  "CANCELLED":      "bg-[#dc3545] text-white",
  "DRAFT":          "bg-[#6c757d] text-white",
};

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

export default function FuelFillingRegisterListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterRef, setFilterRef] = useState("");
  const [filterHoRo, setFilterHoRo] = useState("");
  const [filterVehicle, setFilterVehicle] = useState("");
  const [filterCoupon, setFilterCoupon] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
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
    setFilterRef(""); setFilterHoRo(""); setFilterVehicle("");
    setFilterCoupon(""); setFilterDate(""); setFilterStatus("");
    setSortKey("id"); setSortDir("asc"); setPage(1);
  };

  const filtered = SAMPLE_DATA.filter((r) =>
    r.referenceNumber.toLowerCase().includes(filterRef.toLowerCase()) &&
    r.hoRo.toLowerCase().includes(filterHoRo.toLowerCase()) &&
    r.vehicleNumber.toLowerCase().includes(filterVehicle.toLowerCase()) &&
    r.couponNumber.toLowerCase().includes(filterCoupon.toLowerCase()) &&
    r.createdDate.toLowerCase().includes(filterDate.toLowerCase()) &&
    (filterStatus === "" || r.status === filterStatus)
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = a[sortKey]; const bv = b[sortKey];
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const thClass = "border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white whitespace-nowrap cursor-pointer select-none hover:bg-[#267a68]";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Fuel Filling Register List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Vehicle Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Fuel Filling Register List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm text-dark dark:text-white">
            <span className="font-bold text-primary">{filtered.length}</span> - Fuel Filling Register(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => router.push("/personnel/human-resource/admin/vehicle-management/fuel-filling-register/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/admin/vehicle-management/fuel-filling-register/create-receipt?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add Receipt
            </button>
            <button disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#e8636a] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancellation
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/admin/vehicle-management/fuel-filling-register/edit?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#1976d2] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/admin/vehicle-management/fuel-filling-register/view?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              Delete
            </button>
            <button onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b]">
                <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white w-10">#</th>
                <th className={thClass}>
                  <div onClick={() => handleSort("referenceNumber")} className="flex items-center justify-center gap-1">
                    Reference Number <SortIcon col="referenceNumber" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterRef} onChange={(e) => { setFilterRef(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("hoRo")} className="flex items-center justify-center gap-1">
                    HO/RO <SortIcon col="hoRo" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterHoRo} onChange={(e) => { setFilterHoRo(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("vehicleNumber")} className="flex items-center justify-center gap-1">
                    Vehicle Number <SortIcon col="vehicleNumber" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterVehicle} onChange={(e) => { setFilterVehicle(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("couponNumber")} className="flex items-center justify-center gap-1">
                    Coupon Number <SortIcon col="couponNumber" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterCoupon} onChange={(e) => { setFilterCoupon(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("createdDate")} className="flex items-center justify-center gap-1">
                    Created Date <SortIcon col="createdDate" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <input value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" placeholder="dd-MMM-yyyy" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("status")} className="flex items-center justify-center gap-1">
                    Status <SortIcon col="status" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                  <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-1 py-1 text-xs text-dark outline-none">
                    <option value="">Select</option>
                    <option value="FINAL APPROVED">FINAL APPROVED</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="DRAFT">DRAFT</option>
                  </select>
                </th>
                <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white">Select</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="border border-stroke px-4 py-6 text-center text-gray-400 dark:border-dark-3">No records found.</td></tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSelected = selectedId === row.id;
                  return (
                    <tr key={row.id} onClick={() => setSelectedId(isSelected ? null : row.id)}
                      className={`cursor-pointer transition-colors ${isSelected ? "bg-[#e8f4f8] dark:bg-[#1a2e3a]" : idx % 2 === 0 ? "bg-white hover:bg-blue-50 dark:bg-gray-dark" : "bg-[#f9fafb] hover:bg-blue-50 dark:bg-[#1a2232]"}`}>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.referenceNumber}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.hoRo}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.vehicleNumber}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.couponNumber}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.createdDate}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <span className={`inline-block rounded px-2.5 py-0.5 text-xs font-semibold tracking-wide ${STATUS_BADGE[row.status]}`}>{row.status}</span>
                      </td>
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
            <button onClick={() => setPage(1)} disabled={page === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">«</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">‹</button>
            {visiblePages(page, totalPages).map((p, i) =>
              p === "…" ? (
                <span key={`e${i}`} className="flex size-8 items-center justify-center text-sm text-gray-400">…</span>
              ) : (
                <button key={p} onClick={() => setPage(p as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] font-semibold text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>{p}</button>
              )
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
