"use client";

import Link from "next/link";
import { useState } from "react";

interface VerificationRow {
  id: number;
  categoryGroup: string;
  itemCode: string;
  rate: number;
  bookQty: number;
  bookValue: number;
  excessQty: number;
  excessValue: number;
  deficitQty: number;
  deficitValue: number;
  actualQty: number;
  actualValue: number;
}

const SAMPLE_DATA: VerificationRow[] = [
  {
    id: 1,
    categoryGroup: "SUITING / PL SUITING UNIFORM",
    itemCode: "YSD6",
    rate: 150.0,
    bookQty: 348.0,
    bookValue: 52200.0,
    excessQty: 2.0,
    excessValue: 300.0,
    deficitQty: 0.0,
    deficitValue: 0.0,
    actualQty: 350.0,
    actualValue: 52500.0,
  },
  {
    id: 2,
    categoryGroup: "CHUDITHAR / PL CHUDITHAR TOP",
    itemCode: "YPS6",
    rate: 104.0,
    bookQty: 1031.0,
    bookValue: 107224.0,
    excessQty: 0.0,
    excessValue: 0.0,
    deficitQty: 5.0,
    deficitValue: 520.0,
    actualQty: 1026.0,
    actualValue: 106704.0,
  },
];

export default function StockVerificationPage() {
  // Search panel state
  const [referenceNumber, setReferenceNumber] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Verify panel state
  const [qrInput, setQrInput] = useState("");

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setShowResults(true);
    }, 800);
  };

  const handleClear = () => {
    setReferenceNumber("");
    setFromDate("");
    setToDate("");
    setCategoryCode("");
    setGroupCode("");
    setShowResults(false);
  };

  const handleAddQr = () => {
    if (!qrInput) return;
    setShowResults(true);
    setQrInput("");
  };

  const rows = showResults ? SAMPLE_DATA : [];

  const totBookQty = rows.reduce((s, r) => s + r.bookQty, 0);
  const totBookVal = rows.reduce((s, r) => s + r.bookValue, 0);
  const totExQty = rows.reduce((s, r) => s + r.excessQty, 0);
  const totExVal = rows.reduce((s, r) => s + r.excessValue, 0);
  const totDefQty = rows.reduce((s, r) => s + r.deficitQty, 0);
  const totDefVal = rows.reduce((s, r) => s + r.deficitValue, 0);
  const totActQty = rows.reduce((s, r) => s + r.actualQty, 0);
  const totActVal = rows.reduce((s, r) => s + r.actualValue, 0);

  // Summary for verify panel
  const summary = [
    { label: "Book", qty: totBookQty, value: totBookVal },
    { label: "Excess", qty: totExQty, value: totExVal },
    { label: "Deficit", qty: totDefQty, value: totDefVal },
    { label: "Actual", qty: totActQty, value: totActVal },
  ];

  return (
    <div className="mx-auto">
      {/* Page header & breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Stock Verification</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Stock Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Stock Verification</li>
          </ol>
        </nav>
      </div>

      {/* Two top panels */}
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* ── Search Panel ── */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Stock Verification – Search</h3>
          </div>
          <div className="p-5">
            <div className="flex flex-col gap-3">

              {/* Reference Number */}
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Reference Number</label>
                <select
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">-- Select --</option>
                  <option value="REF-001">REF-001</option>
                  <option value="REF-002">REF-002</option>
                  <option value="REF-003">REF-003</option>
                </select>
              </div>

              {/* From Date / To Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">From Date</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="dd-MMM-yyyy"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                    />
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">To Date</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="dd-MMM-yyyy"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                    />
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Category Code */}
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Category Code</label>
                <select
                  value={categoryCode}
                  onChange={(e) => setCategoryCode(e.target.value)}
                  className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">-- Select --</option>
                  <option value="SUIT">SUIT – Suiting</option>
                  <option value="CHUD">CHUD – Chudithar</option>
                  <option value="SAREE">SAREE – Saree</option>
                </select>
              </div>

              {/* Product Group Code */}
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Group Code</label>
                <select
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                  className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">-- Select --</option>
                  <option value="GRP-A">GRP-A</option>
                  <option value="GRP-B">GRP-B</option>
                  <option value="GRP-C">GRP-C</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Clear
                </button>
                <button
                  onClick={handleSearch}
                  disabled={searching}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {searching ? (
                    <>
                      <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <polyline points="23,4 23,10 17,10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                      </svg>
                      Searching...
                    </>
                  ) : (
                    <>
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Verify Panel ── */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Stock Verification – Verify</h3>
          </div>
          <div className="p-5">
            {/* QR Code input row */}
            <div className="mb-4">
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">QR Code</label>
              <div className="flex items-center gap-2">
                <div className="flex flex-1">
                  {/* scan icon */}
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="3" width="5" height="5" rx="0.5" />
                      <rect x="16" y="3" width="5" height="5" rx="0.5" />
                      <rect x="3" y="16" width="5" height="5" rx="0.5" />
                      <path d="M21 16h-2v2h2v2h-2v1h-1v-2h-2v2h-1v-1h-2v3h1v-2h1v2h4v-2h1v-2h1v-2z" />
                      <path d="M16 12v1h1v-1zM19 12v1h1v-1z" />
                      <line x1="3" y1="12" x2="8" y2="12" />
                      <line x1="12" y1="3" x2="12" y2="8" />
                      <line x1="12" y1="16" x2="12" y2="21" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Scan or enter QR code"
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddQr()}
                    className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                </div>
                {/* Add button */}
                <button
                  onClick={handleAddQr}
                  disabled={!qrInput}
                  className="flex size-10 shrink-0 items-center justify-center rounded bg-[#17a2b8] text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Add"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Summary mini-table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-3 py-2 text-left font-semibold">Stock</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-right font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-right font-semibold">Value (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map((row, idx) => (
                    <tr key={row.label} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-3 py-2 font-medium text-dark dark:border-dark-3 dark:text-white">{row.label}</td>
                      <td className="border border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">
                        {showResults ? row.qty.toFixed(1) : "–"}
                      </td>
                      <td className="border border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">
                        {showResults ? row.value.toFixed(2) : "–"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stock Verification Details Table ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Stock Verification Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              {/* Group header row */}
              <tr className="bg-[#267a68] text-white">
                <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Category / Group</th>
                <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Item Code</th>
                <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Rate (₹)</th>
                <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Book Stock</th>
                <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Excess</th>
                <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Deficit</th>
                <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Actual</th>
              </tr>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Quantity</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Value (₹)</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Quantity</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Value (₹)</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Quantity</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Value (₹)</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Quantity</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Value (₹)</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-10 text-center text-gray-400">
                    No records found. Use the Search panel or scan a QR Code to load data.
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}
                  >
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.categoryGroup}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.itemCode}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.rate.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.bookQty.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.bookValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.excessQty.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.excessValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.deficitQty.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.deficitValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.actualQty.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.actualValue.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
            {rows.length > 0 && (
              <tfoot>
                <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                  <td colSpan={4} className="border border-stroke px-2 py-2 text-right dark:border-dark-3">Total</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totBookQty.toFixed(1)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totBookVal.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totExQty.toFixed(1)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totExVal.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totDefQty.toFixed(1)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totDefVal.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totActQty.toFixed(1)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totActVal.toFixed(2)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
