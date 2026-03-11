"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReportProduct {
  id: number;
  productVarietyCodeName: string;
  quantity: number;
  ppRate: number;
  ppValue: number;
  rpRate: number;
  rpValue: number;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function AcknowledgementReportPage() {
  const router = useRouter();
  const [societyCodeName, setSocietyCodeName] = useState("");
  const [invoiceNumberDate, setInvoiceNumberDate] = useState("");
  const [searched, setSearched] = useState(false);

  // Mock data shown after search
  const reportInfo = {
    societyCodeName: "2381 / PWH CHENNIMALAI",
    invoiceNumber: "INV-2026-001",
    invoiceDate: "04-Mar-2026",
    inwardReferenceNumber: "2381-MAR26-362482",
    inwardDate: "04-Mar-2026",
  };

  const reportProducts: ReportProduct[] = [];

  const handleSearch = () => {
    if (societyCodeName.trim() || invoiceNumberDate.trim()) {
      setSearched(true);
    }
  };

  const handleClear = () => {
    setSocietyCodeName("");
    setInvoiceNumberDate("");
    setSearched(false);
  };

  const totalPPValue = reportProducts.reduce((s, p) => s + p.ppValue, 0);
  const totalRPValue = reportProducts.reduce((s, p) => s + p.rpValue, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Society Outward Acknowledgement Report</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Product Warehouse</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Society Outward Acknowledgement Report</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Acknowledgement Report Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Acknowledgement Report</h3>
          <div className="flex items-center gap-2 text-xs text-white">
            <span>(<span className="text-red-300">*</span> Mandatory Fields)</span>
            <button className="text-white hover:opacity-80">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Search Form */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                Society Code / Name <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={societyCodeName} onChange={(e) => setSocietyCodeName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                Invoice Number / Date <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <select value={invoiceNumberDate} onChange={(e) => setInvoiceNumberDate(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="INV-2026-001 / 04-Mar-2026">INV-2026-001 / 04-Mar-2026</option>
                  <option value="INV-2024-4501 / 08-Mar-2024">INV-2024-4501 / 08-Mar-2024</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons - Right aligned */}
          <div className="mb-6 flex items-center justify-end gap-3">
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
            <button onClick={handleSearch} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Search
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Acknowledgement Report Details */}
          <div className="mt-5">
            <div className="mb-4 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Acknowledgement Report Details</h4>
            </div>

            {/* Info Labels */}
            <div className="mb-2 grid grid-cols-1 gap-y-2 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Society Code / Name</p>
                {searched && <p className="text-sm font-medium text-dark dark:text-white">{reportInfo.societyCodeName}</p>}
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Invoice Number</p>
                {searched && <p className="text-sm font-medium text-dark dark:text-white">{reportInfo.invoiceNumber}</p>}
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Invoice Date</p>
                {searched && <p className="text-sm font-medium text-dark dark:text-white">{reportInfo.invoiceDate}</p>}
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Inward Reference Number</p>
                {searched && <p className="text-sm font-medium text-dark dark:text-white">{reportInfo.inwardReferenceNumber}</p>}
              </div>
            </div>
            <div className="mb-4 grid grid-cols-1 gap-y-2 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Inward Date</p>
                {searched && <p className="text-sm font-medium text-dark dark:text-white">{reportInfo.inwardDate}</p>}
              </div>
            </div>

            {/* Report Product Table */}
            <div className="mb-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">PP Rate (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">PP Value (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">RP. Rate (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">RP. Value (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportProducts.length === 0 ? (
                    <tr><td colSpan={7} className="border border-stroke py-4 text-left px-3 text-gray-400 dark:border-dark-3">No records found.</td></tr>
                  ) : (
                    reportProducts.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 text-dark dark:border-dark-3 dark:text-white">{item.productVarietyCodeName}</td>
                        <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.quantity.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.ppRate.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.ppValue.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.rpRate.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.rpValue.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">Total</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalPPValue > 0 ? totalPPValue.toFixed(2) : ""}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalRPValue > 0 ? totalRPValue.toFixed(2) : ""}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Bottom Buttons */}
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                PDF
              </button>
              <button onClick={() => router.push("/operational/warehouse-management/product-warehouse/stock-outward/list")} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
