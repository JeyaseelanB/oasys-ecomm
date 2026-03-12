"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RRPStatus = "FINAL-APPROVED";

interface RRPItem {
  id: number;
  referenceNumber: string;
  entityCode: string;
  createdDate: string;
  status: RRPStatus;
}

const SAMPLE_DATA: RRPItem[] = [
  { id: 1, referenceNumber: "RRP-2281-2023-26", entityCode: "2281", createdDate: "20-Jul-2023", status: "FINAL-APPROVED" },
  { id: 2, referenceNumber: "RRP-2281-2023-25", entityCode: "2281", createdDate: "20-Jul-2023", status: "FINAL-APPROVED" },
  { id: 3, referenceNumber: "RRP-2281-2023-24", entityCode: "2281", createdDate: "18-Jul-2023", status: "FINAL-APPROVED" },
  { id: 4, referenceNumber: "RRP-2281-2023-23", entityCode: "2281", createdDate: "18-Jul-2023", status: "FINAL-APPROVED" },
  { id: 5, referenceNumber: "RRP-2281-2023-22", entityCode: "2281", createdDate: "18-Jul-2023", status: "FINAL-APPROVED" },
  { id: 6, referenceNumber: "RRP-2281-2023-21", entityCode: "2281", createdDate: "18-Jul-2023", status: "FINAL-APPROVED" },
  { id: 7, referenceNumber: "RRP-2281-2023-20", entityCode: "2281", createdDate: "18-Jul-2023", status: "FINAL-APPROVED" },
  { id: 8, referenceNumber: "RRP-2281-2023-19", entityCode: "2281", createdDate: "18-Jul-2023", status: "FINAL-APPROVED" },
  { id: 9, referenceNumber: "RRP-2281-2023-18", entityCode: "2281", createdDate: "18-Jul-2023", status: "FINAL-APPROVED" },
  { id: 10, referenceNumber: "RRP-2281-2023-17", entityCode: "2281", createdDate: "18-Jul-2023", status: "FINAL-APPROVED" },
];

export default function RevisedRetailPriceListPage() {
  const router = useRouter();
  const [filterRef, setFilterRef] = useState("");
  const [filterEntity, setFilterEntity] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = SAMPLE_DATA.filter((row) =>
    row.referenceNumber.toLowerCase().includes(filterRef.toLowerCase()) &&
    row.entityCode.toLowerCase().includes(filterEntity.toLowerCase()) &&
    (filterDate === "" || row.createdDate.toLowerCase().includes(filterDate.toLowerCase())) &&
    (filterStatus === "" || row.status === filterStatus)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return [...new Set(pages)];
  };

  const handleClear = () => {
    setFilterRef("");
    setFilterEntity("");
    setFilterDate("");
    setFilterStatus("");
    setSelectedId(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Revised Retail Price List
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Revised Retail Price List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Revised Retail Price(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/operational/revised-retail-price/create"
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
              Add
            </Link>
            <button
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => { if (selectedId !== null) router.push("/operational/revised-retail-price/view"); }}
              disabled={selectedId === null}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
              </svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-14 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Reference Number</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Entity Code</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Created Date</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Status</th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filterRef}
                    onChange={(e) => { setFilterRef(e.target.value); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filterEntity}
                    onChange={(e) => { setFilterEntity(e.target.value); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="dd-MMM-yyyy"
                      className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                      value={filterDate}
                      onChange={(e) => { setFilterDate(e.target.value); setCurrentPage(1); }}
                    />
                    <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                    value={filterStatus}
                    onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="">Select</option>
                    <option value="FINAL-APPROVED">FINAL-APPROVED</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">No records found</td>
                </tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-[#e0f7f4] dark:bg-[#1e3a35]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-[#e8f8f5] dark:hover:bg-[#1e3a35]`}
                  >
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.referenceNumber}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.entityCode}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.createdDate}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <span className="inline-block rounded-sm bg-[#28a745] px-3 py-1 text-xs font-semibold text-white">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <input
                        type="radio"
                        name="selectRow"
                        checked={selectedId === row.id}
                        onChange={() => setSelectedId(row.id)}
                        className="size-4 cursor-pointer accent-primary"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({currentPage} of {totalPages})
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
            >
              &#171;
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
            >
              &#8249;
            </button>
            {visiblePages().map((page, i) =>
              page === "..." ? (
                <span key={`ellipsis-${i}`} className="px-1 text-gray-400">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page as number)}
                  className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
            >
              &#8250;
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2"
            >
              &#187;
            </button>
            <select
              className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white"
              value={pageSize}
              onChange={() => {}}
            >
              <option value={10}>10</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
