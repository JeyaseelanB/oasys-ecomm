"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TaxRecord = {
  id: number;
  pfNumber: string;
  hoRo: string;
  taxOption: string;
  employee: string;
  year: string;
  month: number;
  totalTaxableIncome: number;
  actualIncomeTax: number;
  balanceTax: number;
};

const SAMPLE_DATA: TaxRecord[] = [
  { id: 1,  pfNumber: "3191", hoRo: "HEAD OFFICE", taxOption: "B", employee: "ALOK BABELAY",  year: "2023 - 2024", month: 2, totalTaxableIncome: 2198640, actualIncomeTax: 397092, balanceTax: 89976  },
  { id: 2,  pfNumber: "3191", hoRo: "HEAD OFFICE", taxOption: "A", employee: "ALOK BABELAY",  year: "2023 - 2024", month: 2, totalTaxableIncome: 1998640, actualIncomeTax: 412092, balanceTax: 105576 },
  { id: 3,  pfNumber: "3191", hoRo: "HEAD OFFICE", taxOption: "B", employee: "ALOK BABELAY",  year: "2022 - 2023", month: 3, totalTaxableIncome: 2078381, actualIncomeTax: 361014, balanceTax: 20585  },
  { id: 4,  pfNumber: "3191", hoRo: "HEAD OFFICE", taxOption: "A", employee: "ALOK BABELAY",  year: "2022 - 2023", month: 4, totalTaxableIncome: 1878381, actualIncomeTax: 376014, balanceTax: 36185  },
  { id: 5,  pfNumber: "3596", hoRo: "HEAD OFFICE", taxOption: "B", employee: "ANITHA G",      year: "2022 - 2023", month: 3, totalTaxableIncome: 295431,  actualIncomeTax: 2272,   balanceTax: 2362   },
  { id: 6,  pfNumber: "3596", hoRo: "HEAD OFFICE", taxOption: "A", employee: "ANITHA G",      year: "2022 - 2023", month: 4, totalTaxableIncome: 199930,  actualIncomeTax: 0,      balanceTax: 0      },
  { id: 7,  pfNumber: "3587", hoRo: "HEAD OFFICE", taxOption: "B", employee: "ANURADHA S",    year: "2022 - 2023", month: 3, totalTaxableIncome: 302031,  actualIncomeTax: 2602,   balanceTax: 2706   },
  { id: 8,  pfNumber: "3587", hoRo: "HEAD OFFICE", taxOption: "A", employee: "ANURADHA S",    year: "2022 - 2023", month: 4, totalTaxableIncome: 222031,  actualIncomeTax: 0,      balanceTax: 0      },
  { id: 9,  pfNumber: "4012", hoRo: "HEAD OFFICE", taxOption: "B", employee: "KUMAR S",       year: "2023 - 2024", month: 1, totalTaxableIncome: 480000,  actualIncomeTax: 11700,  balanceTax: 975    },
  { id: 10, pfNumber: "4012", hoRo: "HEAD OFFICE", taxOption: "A", employee: "KUMAR S",       year: "2023 - 2024", month: 2, totalTaxableIncome: 520000,  actualIncomeTax: 14560,  balanceTax: 1213   },
  { id: 11, pfNumber: "2875", hoRo: "HEAD OFFICE", taxOption: "B", employee: "LAKSHMI R",     year: "2022 - 2023", month: 5, totalTaxableIncome: 650000,  actualIncomeTax: 32500,  balanceTax: 2708   },
  { id: 12, pfNumber: "2875", hoRo: "HEAD OFFICE", taxOption: "A", employee: "LAKSHMI R",     year: "2021 - 2022", month: 6, totalTaxableIncome: 590000,  actualIncomeTax: 25900,  balanceTax: 2158   },
];

type SortKey = keyof TaxRecord;
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

export default function IncomeTaxWorksheetListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterPf, setFilterPf] = useState("");
  const [filterHo, setFilterHo] = useState("");
  const [filterTax, setFilterTax] = useState("");
  const [filterEmp, setFilterEmp] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterTotal, setFilterTotal] = useState("");
  const [filterActual, setFilterActual] = useState("");
  const [filterBalance, setFilterBalance] = useState("");
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
    setFilterPf(""); setFilterHo(""); setFilterTax(""); setFilterEmp("");
    setFilterYear(""); setFilterMonth(""); setFilterTotal(""); setFilterActual(""); setFilterBalance("");
    setSortKey("id"); setSortDir("asc"); setPage(1);
  };

  const filtered = SAMPLE_DATA.filter((r) =>
    r.pfNumber.includes(filterPf) &&
    r.hoRo.toLowerCase().includes(filterHo.toLowerCase()) &&
    r.taxOption.toLowerCase().includes(filterTax.toLowerCase()) &&
    r.employee.toLowerCase().includes(filterEmp.toLowerCase()) &&
    r.year.includes(filterYear) &&
    String(r.month).includes(filterMonth) &&
    String(r.totalTaxableIncome).includes(filterTotal) &&
    String(r.actualIncomeTax).includes(filterActual) &&
    String(r.balanceTax).includes(filterBalance)
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
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Income Tax Worksheet List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Income Tax Worksheet List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-3 dark:border-dark-3">
          <p className="text-sm text-dark dark:text-white">
            <span className="font-bold text-primary">{filtered.length}</span> - Income Tax Worksheet(s)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/income-tax-worksheet/add")}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/pay-roll/income-tax-worksheet/edit?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
            <button
              onClick={() => selectedId && router.push(`/personnel/human-resource/pay-roll/income-tax-worksheet/view?id=${selectedId}`)}
              disabled={!selectedId}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
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
                  <div onClick={() => handleSort("pfNumber")} className="flex items-center justify-center gap-1">PF Number <SortIcon col="pfNumber" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterPf} onChange={(e) => { setFilterPf(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("hoRo")} className="flex items-center justify-center gap-1">HO/RO <SortIcon col="hoRo" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterHo} onChange={(e) => { setFilterHo(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("taxOption")} className="flex items-center justify-center gap-1">Tax Option <SortIcon col="taxOption" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterTax} onChange={(e) => { setFilterTax(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("employee")} className="flex items-center justify-center gap-1">Employee <SortIcon col="employee" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterEmp} onChange={(e) => { setFilterEmp(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("year")} className="flex items-center justify-center gap-1">Year <SortIcon col="year" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterYear} onChange={(e) => { setFilterYear(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("month")} className="flex items-center justify-center gap-1">Month <SortIcon col="month" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterMonth} onChange={(e) => { setFilterMonth(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("totalTaxableIncome")} className="flex items-center justify-center gap-1">Total Taxable Income <SortIcon col="totalTaxableIncome" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterTotal} onChange={(e) => { setFilterTotal(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("actualIncomeTax")} className="flex items-center justify-center gap-1">Actual Income Tax <SortIcon col="actualIncomeTax" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterActual} onChange={(e) => { setFilterActual(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className={thClass}>
                  <div onClick={() => handleSort("balanceTax")} className="flex items-center justify-center gap-1">Balance Tax to be Paid <SortIcon col="balanceTax" sortKey={sortKey} sortDir={sortDir} /></div>
                  <input value={filterBalance} onChange={(e) => { setFilterBalance(e.target.value); setPage(1); }} className="mt-1 w-full rounded border border-[#3aa88f] bg-white px-2 py-1 text-xs text-dark outline-none" />
                </th>
                <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold text-white">Select</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={11} className="border border-stroke px-4 py-6 text-center text-gray-400 dark:border-dark-3">No records found.</td></tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSelected = selectedId === row.id;
                  return (
                    <tr key={row.id} onClick={() => setSelectedId(isSelected ? null : row.id)}
                      className={`cursor-pointer transition-colors ${isSelected ? "bg-[#e8f4f8] dark:bg-[#1a2e3a]" : idx % 2 === 0 ? "bg-white hover:bg-blue-50 dark:bg-gray-dark" : "bg-[#f9fafb] hover:bg-blue-50 dark:bg-[#1a2232]"}`}>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.pfNumber}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.hoRo}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.taxOption}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.employee}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.year}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.month}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.totalTaxableIncome.toLocaleString()}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.actualIncomeTax.toLocaleString()}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.balanceTax.toLocaleString()}</td>
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
              p === "…" ? <span key={`e${i}`} className="flex size-8 items-center justify-center text-sm text-gray-400">…</span>
              : <button key={p} onClick={() => setPage(p as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${page === p ? "border-[#2d8f7b] bg-[#2d8f7b] font-semibold text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3"}`}>{p}</button>
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm disabled:opacity-40 hover:bg-gray-100 dark:border-dark-3">»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
