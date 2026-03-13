"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const SAMPLE: {
  id: number;
  invoiceNumber: string;
  supplierCode: string;
  supplierName: string;
  amount: number;
  createdDate: string;
  status: string;
}[] = [
  { id:  1, invoiceNumber: "PIFEB2026-9016",              supplierCode: "BANY001",   supplierName: "BANYAN INFORMATICS",                         amount: 2190.00,    createdDate: "02-Feb-2026", status: "FINAL-APPROVED" },
  { id:  2, invoiceNumber: "PIJAN2026-2025260331",        supplierCode: "BANY001",   supplierName: "BANYAN INFORMATICS",                         amount: 30000.32,   createdDate: "02-Jan-2026", status: "FINAL-APPROVED" },
  { id:  3, invoiceNumber: "PIDEC2025-2025260310",        supplierCode: "BANY001",   supplierName: "BANYAN INFORMATICS",                         amount: 14204.00,   createdDate: "30-Dec-2025", status: "FINAL-APPROVED" },
  { id:  4, invoiceNumber: "PIDEC2025-1698",              supplierCode: "SLMMBS01",  supplierName: "SRI MANTHRALAYAM BOOKS AND STATIONARIES",    amount: 1590.82,    createdDate: "23-Dec-2025", status: "SUBMITTED" },
  { id:  5, invoiceNumber: "PIDEC2025 191/2025-2026",     supplierCode: "VSOLU001",  supplierName: "V SOLUTIONS",                                amount: 15084.70,   createdDate: "22-Dec-2025", status: "FINAL-APPROVED" },
  { id:  6, invoiceNumber: "PIDEC2025-TIPL-25-26-00056",  supplierCode: "TATHAGATA", supplierName: "TATHAGATA INFOTECH PRIVATE LIMITED",          amount: 4163.04,    createdDate: "17-Dec-2025", status: "FINAL-APPROVED" },
  { id:  7, invoiceNumber: "PIDEC2025-PV/25-26/3004",     supplierCode: "CLOUD",     supplierName: "APPSQUADZ SOFTWARE PRIVATE LIMITED",          amount: 150941.00,  createdDate: "16-Dec-2025", status: "FINAL-APPROVED" },
  { id:  8, invoiceNumber: "PIDEC2025-TIPL-25-26-00048",  supplierCode: "TATHAGATA", supplierName: "TATHAGATA INFOTECH PRIVATE LIMITED",          amount: 1768.82,    createdDate: "05-Dec-2025", status: "FINAL-APPROVED" },
  { id:  9, invoiceNumber: "PIDEC2025-353/SR/2025-2026",  supplierCode: "VSOLU001",  supplierName: "V SOLUTIONS",                                amount: 12869.00,   createdDate: "02-Dec-2025", status: "FINAL-APPROVED" },
  { id: 10, invoiceNumber: "PINOV2025-PV/2772/25-26",     supplierCode: "CLOUD",     supplierName: "APPSQUADZ SOFTWARE PRIVATE LIMITED",          amount: 141053.13,  createdDate: "18-Nov-2025", status: "SUBMITTED" },
  { id: 11, invoiceNumber: "PINOOV2025-HR/225/25-26",     supplierCode: "HARISH001", supplierName: "HARISH ENTERPRISES",                         amount: 8500.00,    createdDate: "10-Nov-2025", status: "FINAL-APPROVED" },
  { id: 12, invoiceNumber: "PIOCT2025-REF/101/25-26",     supplierCode: "REFINE01",  supplierName: "REFINE TECH SOLUTIONS",                      amount: 22000.00,   createdDate: "25-Oct-2025", status: "SUBMITTED" },
  { id: 13, invoiceNumber: "PIOCT2025-SRS/75/2025",       supplierCode: "SRSS001",   supplierName: "SRS STATIONERY SUPPLIERS",                   amount: 3456.50,    createdDate: "15-Oct-2025", status: "FINAL-APPROVED" },
  { id: 14, invoiceNumber: "PISEP2025-KMR/456",            supplierCode: "KUMAR001",  supplierName: "KUMAR OFFICE SUPPLIES",                      amount: 9870.00,    createdDate: "28-Sep-2025", status: "FINAL-APPROVED" },
  { id: 15, invoiceNumber: "PISEP2025-TCS/2025/001",       supplierCode: "TCS001",    supplierName: "TCS OFFICE AUTOMATION",                      amount: 55000.00,   createdDate: "10-Sep-2025", status: "SUBMITTED" },
];

const TOTAL = 626;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const STATUS_OPTIONS = ["SUBMITTED", "FINAL-APPROVED"];

/** Double-arrow sort indicator matching the image (▲▼ stacked) */
const SortArrows = ({ active, dir }: { active: boolean; dir: "asc" | "desc" }) => (
  <span className="ml-1 inline-flex flex-col leading-[0] select-none">
    <span style={{ fontSize: 8, opacity: active && dir === "asc" ? 1 : 0.45, lineHeight: "10px" }}>▲</span>
    <span style={{ fontSize: 8, opacity: active && dir === "desc" ? 1 : 0.45, lineHeight: "10px" }}>▼</span>
  </span>
);

const CalIcon = () => (
  <svg className="size-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

// Toolbar icon helpers
const IconAdd = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconEdit = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconView = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconClear = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

export default function BillListPage() {
  const router = useRouter();
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortCol, setSortCol]   = useState("id");
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("asc");

  const [fInvNum,  setFInvNum]  = useState("");
  const [fSupp,    setFSupp]    = useState("");
  const [fDate,    setFDate]    = useState("");
  const [fStatus,  setFStatus]  = useState("");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!fInvNum  || r.invoiceNumber.toLowerCase().includes(fInvNum.toLowerCase())) &&
    (!fSupp    || `${r.supplierCode} / ${r.supplierName}`.toLowerCase().includes(fSupp.toLowerCase())) &&
    (!fDate    || r.createdDate.includes(fDate)) &&
    (!fStatus  || r.status === fStatus)
  ), [fInvNum, fSupp, fDate, fStatus]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const v = (r: typeof a): string | number =>
      sortCol === "id" ? r.id : sortCol === "amount" ? r.amount : (r as Record<string, unknown>)[sortCol] as string;
    const av = v(a), bv = v(b);
    return sortDir === "asc" ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
  }), [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize);
  const clearSelect = () => setSelected([]);
  const toggleSelect = (id: number) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const clearAll = () => {
    clearSelect(); setFInvNum(""); setFSupp(""); setFDate(""); setFStatus(""); setPage(1);
  };

  const visiblePages = (): (number | "…")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", page - 1, page, page + 1, "…", totalPages];
  };

  // Header cell: green bg, white text, sortable
  const thCls = "border-r border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold text-white cursor-pointer select-none whitespace-nowrap";
  // Filter row cell
  const filterInput = "w-full rounded border border-gray-300 bg-white px-2 py-1 text-xs text-dark placeholder-gray-400 focus:outline-none focus:border-[#2d8f7b]";

  const statusBadge = (s: string) =>
    s === "SUBMITTED"
      ? "bg-[#fd7e14] text-white"
      : "bg-[#2d8f7b] text-white";

  return (
    <div className="mx-auto">
      {/* Page title + breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Add Bill List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Purchase</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Add Bill List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-stroke dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL} - Bill(s)</p>

          <div className="flex items-center gap-2">
            {/* Add */}
            <button
              onClick={() => router.push("/operational/quotation-order-invoice/purchase/bill/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
            >
              <IconAdd /> Add
            </button>

            {/* Edit */}
            <button
              disabled={selected.length === 0}
              onClick={() => selected.length > 0 && router.push("/operational/quotation-order-invoice/purchase/bill/edit")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <IconEdit /> Edit
            </button>

            {/* View */}
            <button
              disabled={selected.length === 0}
              onClick={() => selected.length > 0 && router.push("/operational/quotation-order-invoice/purchase/bill/view")}
              className="flex items-center gap-1.5 rounded bg-[#54b9a3] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <IconView /> View
            </button>

            {/* Clear */}
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
            >
              <IconClear /> Clear
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              {/* ── Column headers ── */}
              <tr className="bg-[#2d8f7b]">
                <th className="border-r border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold text-white w-10">#</th>
                <th className={thCls} onClick={() => handleSort("invoiceNumber")}>
                  Invoice Number <SortArrows active={sortCol === "invoiceNumber"} dir={sortDir} />
                </th>
                <th className={thCls} onClick={() => handleSort("supplierName")}>
                  Supplier Code / Name <SortArrows active={sortCol === "supplierName"} dir={sortDir} />
                </th>
                <th className={thCls} onClick={() => handleSort("amount")}>
                  Amount (₹) <SortArrows active={sortCol === "amount"} dir={sortDir} />
                </th>
                <th className={thCls} onClick={() => handleSort("createdDate")}>
                  Created Date <SortArrows active={sortCol === "createdDate"} dir={sortDir} />
                </th>
                <th className={thCls} onClick={() => handleSort("status")}>
                  Stage / Status <SortArrows active={sortCol === "status"} dir={sortDir} />
                </th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-white w-16">Select</th>
              </tr>

              {/* ── Filter row ── */}
              <tr className="bg-white dark:bg-gray-dark border-b border-stroke dark:border-dark-3">
                <td className="px-2 py-1.5" />
                <td className="px-2 py-1.5">
                  <input
                    value={fInvNum}
                    onChange={e => { setFInvNum(e.target.value); setPage(1); }}
                    className={filterInput}
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    value={fSupp}
                    onChange={e => { setFSupp(e.target.value); setPage(1); }}
                    className={filterInput}
                    placeholder=""
                  />
                </td>
                <td className="px-2 py-1.5" />
                <td className="px-2 py-1.5">
                  <div className="relative">
                    <input
                      value={fDate}
                      onChange={e => { setFDate(e.target.value); setPage(1); }}
                      placeholder="dd-MMM-yyyy"
                      className={`${filterInput} pr-6`}
                    />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2">
                      <CalIcon />
                    </span>
                  </div>
                </td>
                <td className="px-2 py-1.5">
                  <select
                    value={fStatus}
                    onChange={e => { setFStatus(e.target.value); setPage(1); }}
                    className={filterInput}
                  >
                    <option value="">Select</option>
                    {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </td>
                <td className="px-2 py-1.5" />
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-gray-400">No records found</td>
                </tr>
              ) : paginated.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-stroke dark:border-dark-3 transition-colors
                    ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"}
                    hover:bg-[#f0faf7] dark:hover:bg-gray-700`}
                >
                  {/* Row # — teal link */}
                  <td className="px-2 py-2.5 text-center text-xs">
                    <button
                      onClick={() => { clearSelect(); toggleSelect(row.id); router.push("/operational/quotation-order-invoice/purchase/bill/view"); }}
                      className="font-medium text-[#2d8f7b] hover:underline"
                    >
                      {(page - 1) * pageSize + idx + 1}
                    </button>
                  </td>

                  {/* Invoice Number — teal link */}
                  <td className="px-3 py-2.5 text-xs text-center">
                    <button
                      onClick={() => { clearSelect(); toggleSelect(row.id); router.push("/operational/quotation-order-invoice/purchase/bill/view"); }}
                      className="font-medium text-[#2d8f7b] hover:underline"
                    >
                      {row.invoiceNumber}
                    </button>
                  </td>

                  <td className="px-3 py-2.5 text-xs text-center text-dark dark:text-white">
                    {row.supplierCode} / {row.supplierName}
                  </td>

                  <td className="px-3 py-2.5 text-xs text-right text-dark dark:text-white">
                    {row.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>

                  <td className="px-3 py-2.5 text-xs text-center text-dark dark:text-white">
                    {row.createdDate}
                  </td>

                  {/* Status badge — green pill, uppercase, bold */}
                  <td className="px-3 py-2.5 text-center">
                    <span className={`inline-flex items-center justify-center rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider leading-none ${statusBadge(row.status)}`}>
                      {row.status === "FINAL-APPROVED" ? (
                        <span className="text-center leading-tight">
                          FINAL-<br />APPROVED
                        </span>
                      ) : row.status}
                    </span>
                  </td>

                  {/* Radio select */}
                  <td className="px-2 py-2.5 text-center">
                    <input
                      type="radio"
                      name="selectRow"
                      checked={selected.includes(row.id)}
                      onChange={() => { clearSelect(); toggleSelect(row.id); }}
                      className="accent-[#2d8f7b] size-4 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Footer ── */}
        <div className="flex flex-wrap items-center justify-end gap-1.5 border-t border-stroke px-4 py-3 dark:border-dark-3">
          <span className="mr-2 text-xs text-gray-500">({page} of {totalPages})</span>

          <button onClick={() => setPage(1)} disabled={page === 1}
            className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">«</button>
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1}
            className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">‹</button>

          {visiblePages().map((p, i) =>
            p === "…"
              ? <span key={`e${i}`} className="px-1 text-xs text-gray-400">…</span>
              : <button key={p} onClick={() => setPage(p as number)}
                  className={`rounded border px-2.5 py-1 text-xs transition-colors
                    ${page === p
                      ? "border-[#2d8f7b] bg-[#2d8f7b] text-white"
                      : "border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>
                  {p}
                </button>
          )}

          <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}
            className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">›</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
            className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">»</button>

          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="ml-1 rounded border border-stroke px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
            {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}