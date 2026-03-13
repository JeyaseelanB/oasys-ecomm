"use client";

import Link from "next/link";
import { useState } from "react";

type CouponStatus = "ACTIVE" | "InActive";

interface GiftCouponItem {
  id: number;
  couponType: string;
  couponName: string;
  giftTo: string;
  createdDate: string;
  status: CouponStatus;
}

const SAMPLE_DATA: GiftCouponItem[] = [
  { id: 1,  couponType: "Coupon Type1", couponName: "r neeloa all india radio", giftTo: "", createdDate: "02-Jan-2020", status: "ACTIVE" },
  { id: 2,  couponType: "Coupon Type1", couponName: "R. LEEELA",                giftTo: "", createdDate: "02-Jan-2020", status: "ACTIVE" },
  { id: 3,  couponType: "Coupon Type1", couponName: "K GNANAVADIVU",            giftTo: "", createdDate: "31-Dec-2019", status: "ACTIVE" },
  { id: 4,  couponType: "Coupon Type1", couponName: "K GNANAVADIVU",            giftTo: "", createdDate: "31-Dec-2019", status: "ACTIVE" },
  { id: 5,  couponType: "Coupon Type1", couponName: "K GNANAVADIVU",            giftTo: "", createdDate: "31-Dec-2019", status: "ACTIVE" },
  { id: 6,  couponType: "Coupon Type1", couponName: "K GNANAVADIVU",            giftTo: "", createdDate: "31-Dec-2019", status: "ACTIVE" },
  { id: 7,  couponType: "Coupon Type1", couponName: "J PARATHA SARATHY",        giftTo: "", createdDate: "31-Dec-2019", status: "ACTIVE" },
  { id: 8,  couponType: "Coupon Type1", couponName: "KALYANI",                  giftTo: "", createdDate: "31-Dec-2019", status: "ACTIVE" },
  { id: 9,  couponType: "Coupon Type1", couponName: "p santhi",                 giftTo: "", createdDate: "31-Dec-2019", status: "ACTIVE" },
  { id: 10, couponType: "Coupon Type1", couponName: "p santhi",                 giftTo: "", createdDate: "31-Dec-2019", status: "ACTIVE" },
];

type SortField = keyof Omit<GiftCouponItem, "id">;
type SortDir = "asc" | "desc";

export default function GiftCouponGenerationListPage() {
  const [filterCouponType, setFilterCouponType] = useState("");
  const [filterCouponName, setFilterCouponName] = useState("");
  const [filterGiftTo, setFilterGiftTo]         = useState("");
  const [filterDate, setFilterDate]             = useState("");
  const [filterStatus, setFilterStatus]         = useState("");
  const [selectedId, setSelectedId]             = useState<number | null>(null);
  const [currentPage, setCurrentPage]           = useState(1);
  const [sortField, setSortField]               = useState<SortField | null>(null);
  const [sortDir, setSortDir]                   = useState<SortDir>("asc");
  const [pageSize, setPageSize]                 = useState(10);

  const filtered = SAMPLE_DATA.filter((row) =>
    row.couponType.toLowerCase().includes(filterCouponType.toLowerCase()) &&
    row.couponName.toLowerCase().includes(filterCouponName.toLowerCase()) &&
    row.giftTo.toLowerCase().includes(filterGiftTo.toLowerCase()) &&
    (filterDate === "" || row.createdDate.toLowerCase().includes(filterDate.toLowerCase())) &&
    (filterStatus === "" || row.status === filterStatus)
  );

  const sorted = sortField
    ? [...filtered].sort((a, b) => {
        const av = a[sortField] as string;
        const bv = b[sortField] as string;
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      })
    : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-80">
      <span className={sortField === field && sortDir === "asc" ? "opacity-100" : "opacity-50"}>▲</span>
      <span className={sortField === field && sortDir === "desc" ? "opacity-100" : "opacity-50"}>▼</span>
    </span>
  );

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
    setFilterCouponType("");
    setFilterCouponName("");
    setFilterGiftTo("");
    setFilterDate("");
    setFilterStatus("");
    setSelectedId(null);
    setCurrentPage(1);
    setSortField(null);
    setSortDir("asc");
  };

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Gift Coupon Generation List
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
            <li className="font-medium text-primary">Gift Coupon Generation List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> - Gift Coupon Generation(s)
          </p>
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-12 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold"
                  onClick={() => handleSort("couponType")}
                >
                  Coupon Type <SortIcon field="couponType" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold"
                  onClick={() => handleSort("couponName")}
                >
                  Coupon Name <SortIcon field="couponName" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold"
                  onClick={() => handleSort("giftTo")}
                >
                  Gift To <SortIcon field="giftTo" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold"
                  onClick={() => handleSort("createdDate")}
                >
                  Created Date <SortIcon field="createdDate" />
                </th>
                <th
                  className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold"
                  onClick={() => handleSort("status")}
                >
                  Status <SortIcon field="status" />
                </th>
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filterCouponType}
                    onChange={(e) => { setFilterCouponType(e.target.value); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filterCouponName}
                    onChange={(e) => { setFilterCouponName(e.target.value); setCurrentPage(1); }}
                  />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input
                    type="text"
                    className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    value={filterGiftTo}
                    onChange={(e) => { setFilterGiftTo(e.target.value); setCurrentPage(1); }}
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
                    <option value="ACTIVE">Active</option>
                    <option value="InActive">InActive</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3"></td>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">No records found</td>
                </tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-stroke dark:border-dark-3 ${
                      selectedId === row.id
                        ? "bg-[#e0f7f4] dark:bg-[#1e3a35]"
                        : idx % 2 === 0
                        ? "bg-white dark:bg-gray-dark"
                        : "bg-[#f9fafb] dark:bg-[#1a2232]"
                    } hover:bg-[#e8f8f5] dark:hover:bg-[#1e3a35]`}
                  >
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {(currentPage - 1) * pageSize + idx + 1}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.couponType}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.couponName}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.giftTo}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">
                      {row.createdDate}
                    </td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <span
                        className={`inline-block rounded-sm px-3 py-1 text-xs font-semibold text-white ${
                          row.status === "ACTIVE" ? "bg-[#28a745]" : "bg-[#6c757d]"
                        }`}
                      >
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
                  className={`flex size-8 items-center justify-center rounded border text-sm ${
                    currentPage === page
                      ? "border-primary bg-primary text-white"
                      : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"
                  }`}
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
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
