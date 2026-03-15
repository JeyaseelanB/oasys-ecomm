"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const SAMPLE: {
  id: number;
  entityName: string;
  customerType: string;
  customerName: string;
  salesOrderNumber: string;
  validityDate: string;
  expectedDelivery: string;
  status: string;
}[] = [
  { id:  1, entityName: "ISSR - THANJAVUR", customerType: "Government", customerName: "MEDICAL COLLEGE THANJAVUR",       salesOrderNumber: "11433", validityDate: "27-Feb-2024", expectedDelivery: "31-Mar-2024", status: "FINAL_APPROVED" },
  { id:  2, entityName: "ISSR - THANJAVUR", customerType: "Government", customerName: "THE DEAN RMH TNJ",                salesOrderNumber: "11427", validityDate: "27-Feb-2024", expectedDelivery: "29-Feb-2024", status: "SUBMITTED" },
  { id:  3, entityName: "ISSR - THANJAVUR", customerType: "Government", customerName: "HM DEAF G SCHOOL THANAJVUR",      salesOrderNumber: "11413", validityDate: "26-Feb-2024", expectedDelivery: "31-Mar-2024", status: "FINAL_APPROVED" },
  { id:  4, entityName: "ISSR - THANJAVUR", customerType: "Government", customerName: "CHILD HOME THANJAVUR",            salesOrderNumber: "11412", validityDate: "26-Feb-2024", expectedDelivery: "31-Mar-2024", status: "FINAL_APPROVED" },
  { id:  5, entityName: "ISSR - THANJAVUR", customerType: "Government", customerName: "GOVT CHILD HOME PUDUKOTTAI",      salesOrderNumber: "11411", validityDate: "26-Feb-2024", expectedDelivery: "31-Mar-2024", status: "FINAL_APPROVED" },
  { id:  6, entityName: "ISSR - THANJAVUR", customerType: "Government", customerName: "DEAF MIDDLE SCHOOL PUDUKOTTAI",   salesOrderNumber: "11410", validityDate: "26-Feb-2024", expectedDelivery: "30-Mar-2024", status: "FINAL_APPROVED" },
  { id:  7, entityName: "ISSR - THANJAVUR", customerType: "Government", customerName: "A D ANIMAL HUSBANDARY THANJA",   salesOrderNumber: "11399", validityDate: "24-Feb-2024", expectedDelivery: "29-Feb-2024", status: "SUBMITTED" },
  { id:  8, entityName: "ISSR - THANJAVUR", customerType: "Government", customerName: "D R MARU URAGA NALA PANI TNJ",   salesOrderNumber: "11396", validityDate: "24-Feb-2024", expectedDelivery: "29-Feb-2024", status: "SUBMITTED" },
  { id:  9, entityName: "ISSR - THANJAVUR", customerType: "Government", customerName: "DISTRICT COURT THANJAVUR",        salesOrderNumber: "11393", validityDate: "24-Feb-2024", expectedDelivery: "29-Feb-2024", status: "SUBMITTED" },
  { id: 10, entityName: "ISSR - THANJAVUR", customerType: "Government", customerName: "MO GOVT HOSPITAL PATTUKKOTTAI",  salesOrderNumber: "11390", validityDate: "24-Feb-2024", expectedDelivery: "29-Feb-2024", status: "SUBMITTED" },
  { id: 11, entityName: "ISSR - THANJAVUR", customerType: "Retail",     customerName: "RAMESH TEXTILES",                salesOrderNumber: "11385", validityDate: "22-Feb-2024", expectedDelivery: "28-Feb-2024", status: "FINAL_APPROVED" },
  { id: 12, entityName: "ISSR - THANJAVUR", customerType: "Retail",     customerName: "SRI MURUGAN STORES",             salesOrderNumber: "11380", validityDate: "21-Feb-2024", expectedDelivery: "28-Feb-2024", status: "SUBMITTED" },
  { id: 13, entityName: "ISSR - COIMBATORE",customerType: "Wholesale",  customerName: "COIMBATORE WEAVERS CO-OP",       salesOrderNumber: "11375", validityDate: "20-Feb-2024", expectedDelivery: "27-Feb-2024", status: "FINAL_APPROVED" },
  { id: 14, entityName: "ISSR - COIMBATORE",customerType: "Government", customerName: "ZP HIGHER SECONDARY SCHOOL",    salesOrderNumber: "11370", validityDate: "19-Feb-2024", expectedDelivery: "26-Feb-2024", status: "SUBMITTED" },
  { id: 15, entityName: "ISSR - CHENNAI",   customerType: "Retail",     customerName: "MEENAKSHI SAREES",               salesOrderNumber: "11365", validityDate: "18-Feb-2024", expectedDelivery: "25-Feb-2024", status: "FINAL_APPROVED" },
];

const TOTAL = 957;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const STATUS_OPTIONS = ["SUBMITTED", "FINAL_APPROVED"];

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc" | "desc" }) => (
  <span className="ml-1 inline-block text-[10px] opacity-70">{active ? (dir === "asc" ? "▲" : "▼") : "▲"}</span>
);
const CalIcon = () => (
  <svg className="size-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function SalesOrderListPage() {
  const router = useRouter();
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortCol, setSortCol]   = useState("id");
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("asc");

  const [fEntity,    setFEntity]    = useState("");
  const [fCustType,  setFCustType]  = useState("");
  const [fCustName,  setFCustName]  = useState("");
  const [fOrderNum,  setFOrderNum]  = useState("");
  const [fValidity,  setFValidity]  = useState("");
  const [fDelivery,  setFDelivery]  = useState("");
  const [fStatus,    setFStatus]    = useState("");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!fEntity   || r.entityName.toLowerCase().includes(fEntity.toLowerCase())) &&
    (!fCustType || r.customerType.toLowerCase().includes(fCustType.toLowerCase())) &&
    (!fCustName || r.customerName.toLowerCase().includes(fCustName.toLowerCase())) &&
    (!fOrderNum || r.salesOrderNumber.includes(fOrderNum)) &&
    (!fValidity || r.validityDate.includes(fValidity)) &&
    (!fDelivery || r.expectedDelivery.includes(fDelivery)) &&
    (!fStatus   || r.status === fStatus)
  ), [fEntity, fCustType, fCustName, fOrderNum, fValidity, fDelivery, fStatus]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const v = (r: typeof a): string | number => sortCol === "id" ? r.id : (r as Record<string, unknown>)[sortCol] as string;
    const av = v(a), bv = v(b);
    return sortDir === "asc" ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
  }), [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize);
  const clearSelect = () => setSelected([]);
  const toggleSelect = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const clearAll = () => {
    clearSelect();
    setFEntity(""); setFCustType(""); setFCustName(""); setFOrderNum(""); setFValidity(""); setFDelivery(""); setFStatus("");
    setPage(1);
  };

  const visiblePages = (): (number | "…")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", page - 1, page, page + 1, "…", totalPages];
  };

  const thBase = "border-r border-[#3aa88f] px-3 pt-2 pb-1 text-center text-xs font-semibold text-white";
  const fi     = "mt-1 w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white/70";

  const statusBadge = (s: string) => {
    if (s === "SUBMITTED")    return "bg-[#fd7e14]";
    if (s === "FINAL_APPROVED") return "bg-[#28a745]";
    return "bg-gray-400";
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Sales Order List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Sales</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Sales Order List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL} - Sales Order(s)</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-order/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button
              disabled={selected.length === 0}
              onClick={() => selected.length > 0 && router.push("/operational/quotation-order-invoice/sales/sales-order/create")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              disabled={selected.length === 0}
              onClick={() => selected.length > 0 && router.push("/operational/quotation-order-invoice/sales/sales-order/view")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b]">
                <th className="border-r border-[#3aa88f] px-2 pt-2 pb-1 text-center text-xs font-semibold text-white w-10">
                  #<div className="mt-1 h-[26px]" />
                </th>
                <th className={thBase} onClick={() => handleSort("entityName")} style={{ cursor: "pointer" }}>
                  Entity Name <SortIcon active={sortCol === "entityName"} dir={sortDir} />
                  <input value={fEntity} onChange={e => { setFEntity(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("customerType")} style={{ cursor: "pointer" }}>
                  Customer Type <SortIcon active={sortCol === "customerType"} dir={sortDir} />
                  <input value={fCustType} onChange={e => { setFCustType(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("customerName")} style={{ cursor: "pointer" }}>
                  Customer Name <SortIcon active={sortCol === "customerName"} dir={sortDir} />
                  <input value={fCustName} onChange={e => { setFCustName(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("salesOrderNumber")} style={{ cursor: "pointer" }}>
                  Sales Order Number <SortIcon active={sortCol === "salesOrderNumber"} dir={sortDir} />
                  <input value={fOrderNum} onChange={e => { setFOrderNum(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("validityDate")} style={{ cursor: "pointer" }}>
                  Validity Date <SortIcon active={sortCol === "validityDate"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fValidity} onChange={e => { setFValidity(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" onClick={e => e.stopPropagation()} className="w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 pr-6 text-xs text-white placeholder-white/50 focus:outline-none" />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"><CalIcon /></span>
                  </div>
                </th>
                <th className={thBase} onClick={() => handleSort("expectedDelivery")} style={{ cursor: "pointer" }}>
                  Expected Date of Delivery <SortIcon active={sortCol === "expectedDelivery"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fDelivery} onChange={e => { setFDelivery(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" onClick={e => e.stopPropagation()} className="w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 pr-6 text-xs text-white placeholder-white/50 focus:outline-none" />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"><CalIcon /></span>
                  </div>
                </th>
                <th className={thBase} onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
                  Status <SortIcon active={sortCol === "status"} dir={sortDir} />
                  <select value={fStatus} onChange={e => { setFStatus(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi}>
                    <option value="">Select</option>
                    {STATUS_OPTIONS.map(o => <option key={o} value={o} className="text-dark">{o}</option>)}
                  </select>
                </th>
                <th className="px-2 pt-2 pb-1 text-center text-xs font-semibold text-white w-16">
                  Select<div className="mt-1 h-[26px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="py-8 text-center text-sm text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"} hover:bg-[#f0faf7] dark:hover:bg-gray-700`}>
                  <td className="px-2 py-2 text-center text-xs text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.entityName}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.customerType}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.customerName}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.salesOrderNumber}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.validityDate}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.expectedDelivery}</td>
                  <td className="px-3 py-2 text-center">
                    <span className={`inline-block rounded px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ${statusBadge(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <input type="radio" name="selectRow" checked={selected.includes(row.id)}
                      onChange={() => { clearSelect(); toggleSelect(row.id); }} className="accent-[#2d8f7b]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-stroke px-4 py-3 dark:border-dark-3">
          <span className="text-xs text-gray-500">({page} of {totalPages})</span>
          <button onClick={() => setPage(1)} disabled={page === 1} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">«</button>
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">‹</button>
          {visiblePages().map((p, i) =>
            p === "…" ? <span key={`e${i}`} className="px-1 text-xs text-gray-400">…</span>
            : <button key={p} onClick={() => setPage(p as number)}
                className={`rounded border px-2.5 py-1 text-xs ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>{p}</button>
          )}
          <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">›</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="rounded border border-stroke px-1.5 py-1 text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3">»</button>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="rounded border border-stroke px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
            {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
