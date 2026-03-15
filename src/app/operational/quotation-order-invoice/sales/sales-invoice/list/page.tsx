"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const SAMPLE: {
  id: number;
  customerType: string;
  customerCode: string;
  customerName: string;
  salesOrderNumber: string;
  salesInvoiceNumber: string;
  createdDate: string;
}[] = [
  { id:  1, customerType: "Government",         customerCode: "CC1325", customerName: "THE DEAN RMH TNJ",               salesOrderNumber: "SO-1976-FEB-24-11427", salesInvoiceNumber: "SI1976FEB2415364", createdDate: "27-Feb-2024" },
  { id:  2, customerType: "Government",         customerCode: "CC1928", customerName: "A D ANIMAL HUSBANDARY THANJA",   salesOrderNumber: "SO-1976-FEB-24-11399", salesInvoiceNumber: "SI1976FEB2415326", createdDate: "24-Feb-2024" },
  { id:  3, customerType: "Government",         customerCode: "CC398",  customerName: "D R MARU URAGA NALA PANI TNJ",   salesOrderNumber: "SO-1976-FEB-24-11396", salesInvoiceNumber: "SI1976FEB2415321", createdDate: "24-Feb-2024" },
  { id:  4, customerType: "Government",         customerCode: "CC2579", customerName: "DISTRICT COURT THANJAVUR",        salesOrderNumber: "SO-1976-FEB-24-11393", salesInvoiceNumber: "SI1976FEB2415316", createdDate: "24-Feb-2024" },
  { id:  5, customerType: "Government",         customerCode: "CC1927", customerName: "MO GOVT HOSPITAL PATTUKKOTTAI",  salesOrderNumber: "SO-1976-FEB-24-11390", salesInvoiceNumber: "SI1976FEB2415315", createdDate: "24-Feb-2024" },
  { id:  6, customerType: "Government",         customerCode: "CC2733", customerName: "MEDICAL COLLEGE THANJAVUR",       salesOrderNumber: "SO-1976-FEB-24-11386", salesInvoiceNumber: "SI1976FEB2415313", createdDate: "24-Feb-2024" },
  { id:  7, customerType: "Government",         customerCode: "CC2733", customerName: "MEDICAL COLLEGE THANJAVUR",       salesOrderNumber: "SO-1976-FEB-24-11386", salesInvoiceNumber: "SI1976FEB2415312", createdDate: "24-Feb-2024" },
  { id:  8, customerType: "DISTRICT COLLECTER", customerCode: "CC1679", customerName: "DT COLLECTOR THIRUVARUR OAP",    salesOrderNumber: "SO-1976-FEB-24-11320", salesInvoiceNumber: "SI1976FEB2415263", createdDate: "15-Feb-2024" },
  { id:  9, customerType: "DISTRICT COLLECTER", customerCode: "CC1677", customerName: "DT COLLECTOR TRICHY OAP",        salesOrderNumber: "SO-1976-FEB-24-11319", salesInvoiceNumber: "SI1976FEB2415262", createdDate: "15-Feb-2024" },
  { id: 10, customerType: "DISTRICT COLLECTER", customerCode: "CC1678", customerName: "DT COLLECTOR THANJAVUR OAP",     salesOrderNumber: "SO-1976-FEB-24-11318", salesInvoiceNumber: "SI1976FEB2415261", createdDate: "15-Feb-2024" },
  { id: 11, customerType: "Government",         customerCode: "CC1320", customerName: "GOVERNMENT HOSPITAL KUMBAKONAM", salesOrderNumber: "SO-1976-FEB-24-11315", salesInvoiceNumber: "SI1976FEB2415258", createdDate: "14-Feb-2024" },
  { id: 12, customerType: "Retail",             customerCode: "CC5001", customerName: "RAMESH TEXTILES THANJAVUR",      salesOrderNumber: "SO-1976-JAN-24-10980", salesInvoiceNumber: "SI1976JAN2414850", createdDate: "10-Jan-2024" },
  { id: 13, customerType: "Retail",             customerCode: "CC5002", customerName: "SRI MURUGAN STORES",             salesOrderNumber: "SO-1976-JAN-24-10960", salesInvoiceNumber: "SI1976JAN2414830", createdDate: "08-Jan-2024" },
  { id: 14, customerType: "Wholesale",          customerCode: "CC5010", customerName: "COIMBATORE WEAVERS CO-OP",       salesOrderNumber: "SO-1976-DEC-23-10750", salesInvoiceNumber: "SI1976DEC2314610", createdDate: "20-Dec-2023" },
  { id: 15, customerType: "Government",         customerCode: "CC2580", customerName: "ZP HIGHER SECONDARY SCHOOL",    salesOrderNumber: "SO-1976-DEC-23-10740", salesInvoiceNumber: "SI1976DEC2314600", createdDate: "18-Dec-2023" },
];

const TOTAL = 1682;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc" | "desc" }) => (
  <span className="ml-1 inline-block text-[10px] opacity-70">{active ? (dir === "asc" ? "▲" : "▼") : "▲"}</span>
);
const CalIcon = () => (
  <svg className="size-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function SalesInvoiceListPage() {
  const router = useRouter();
  const [page, setPage]         = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [sortCol, setSortCol]   = useState("id");
  const [sortDir, setSortDir]   = useState<"asc" | "desc">("asc");

  const [fCustType,  setFCustType]  = useState("");
  const [fCustCode,  setFCustCode]  = useState("");
  const [fOrderNum,  setFOrderNum]  = useState("");
  const [fInvNum,    setFInvNum]    = useState("");
  const [fDate,      setFDate]      = useState("");

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => SAMPLE.filter(r =>
    (!fCustType || r.customerType.toLowerCase().includes(fCustType.toLowerCase())) &&
    (!fCustCode || `${r.customerCode} / ${r.customerName}`.toLowerCase().includes(fCustCode.toLowerCase())) &&
    (!fOrderNum || r.salesOrderNumber.toLowerCase().includes(fOrderNum.toLowerCase())) &&
    (!fInvNum   || r.salesInvoiceNumber.toLowerCase().includes(fInvNum.toLowerCase())) &&
    (!fDate     || r.createdDate.includes(fDate))
  ), [fCustType, fCustCode, fOrderNum, fInvNum, fDate]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const v = (r: typeof a): string | number => sortCol === "id" ? r.id : (r as Record<string, unknown>)[sortCol] as string;
    const av = v(a), bv = v(b);
    return sortDir === "asc" ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
  }), [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize);
  const clearSelect = () => setSelected([]);
  const toggleSelect = (id: number) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const clearAll = () => {
    clearSelect(); setFCustType(""); setFCustCode(""); setFOrderNum(""); setFInvNum(""); setFDate(""); setPage(1);
  };

  const visiblePages = (): (number | "…")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "…", totalPages];
    if (page >= totalPages - 3) return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "…", page - 1, page, page + 1, "…", totalPages];
  };

  const thBase = "border-r border-[#3aa88f] px-3 pt-2 pb-1 text-center text-xs font-semibold text-white";
  const fi     = "mt-1 w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-white/70";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Sales Invoice List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Quotation/Order/Invoice</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Sales</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Sales Invoice List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-4 py-3 dark:border-dark-3">
          <p className="text-sm font-semibold text-[#2d8f7b]">{TOTAL} - Sales Invoice(s)</p>
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/operational/quotation-order-invoice/sales/sales-invoice/create")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button disabled={selected.length === 0}
              onClick={() => selected.length > 0 && router.push("/operational/quotation-order-invoice/sales/sales-invoice/edit")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button disabled={selected.length === 0}
              onClick={() => selected.length > 0 && router.push("/operational/quotation-order-invoice/sales/sales-invoice/view")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-40">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button onClick={clearAll}
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
                <th className={thBase} onClick={() => handleSort("customerType")} style={{ cursor: "pointer" }}>
                  Customer Type <SortIcon active={sortCol === "customerType"} dir={sortDir} />
                  <input value={fCustType} onChange={e => { setFCustType(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("customerName")} style={{ cursor: "pointer" }}>
                  Customer Code / Name <SortIcon active={sortCol === "customerName"} dir={sortDir} />
                  <input value={fCustCode} onChange={e => { setFCustCode(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("salesOrderNumber")} style={{ cursor: "pointer" }}>
                  Sales Order Number <SortIcon active={sortCol === "salesOrderNumber"} dir={sortDir} />
                  <input value={fOrderNum} onChange={e => { setFOrderNum(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("salesInvoiceNumber")} style={{ cursor: "pointer" }}>
                  Sales Invoice Number <SortIcon active={sortCol === "salesInvoiceNumber"} dir={sortDir} />
                  <input value={fInvNum} onChange={e => { setFInvNum(e.target.value); setPage(1); }} onClick={e => e.stopPropagation()} className={fi} placeholder="Search..." />
                </th>
                <th className={thBase} onClick={() => handleSort("createdDate")} style={{ cursor: "pointer" }}>
                  Created Date <SortIcon active={sortCol === "createdDate"} dir={sortDir} />
                  <div className="relative mt-1">
                    <input value={fDate} onChange={e => { setFDate(e.target.value); setPage(1); }} placeholder="dd-MMM-yyyy" onClick={e => e.stopPropagation()} className="w-full rounded border border-white/30 bg-white/10 px-2 py-0.5 pr-6 text-xs text-white placeholder-white/50 focus:outline-none" />
                    <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"><CalIcon /></span>
                  </div>
                </th>
                <th className="px-2 pt-2 pb-1 text-center text-xs font-semibold text-white w-16">
                  Select<div className="mt-1 h-[26px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-sm text-gray-400">No records found</td></tr>
              ) : paginated.map((row, idx) => (
                <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-gray-50 dark:bg-gray-800"} hover:bg-[#f0faf7] dark:hover:bg-gray-700`}>
                  <td className="px-2 py-2 text-center text-xs text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.customerType}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.customerCode} / {row.customerName}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.salesOrderNumber}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.salesInvoiceNumber}</td>
                  <td className="px-3 py-2 text-xs text-center text-dark dark:text-white">{row.createdDate}</td>
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
