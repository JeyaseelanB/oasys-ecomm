"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK_ITEM_ROWS = [
  { id: 1, itemCodeName: "DPT1 / PA...", description: "11", hsnCode: "63049260", uom: "NOS", quantity: 100.00, unitRate: 100.00, totalRate: 10000.00, taxPct: 5.00, taxValue: 500.00, netPrice: 10500.00 },
];

const MOCK_INVOICE_ROWS = [
  { id: 1, invoiceNumber: "11", invoiceDate: "27-May-2020", dcNumber: "", paymentDueDate: "", interestApplicable: "No", rateOfInterest: "", attachedDocuments: true },
];

export default function ViewStockItemInwardPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Stock Item Inward</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Stock Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Stock Item Inward</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Stock Item Inward</h3>
        </div>

        <div className="p-5">
          {/* Supplier Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Supplier Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div><p className="text-xs text-gray-500">Supplier Type Code</p><p className="text-sm font-medium text-[#17a2b8]">SOCIETY</p></div>
            <div><p className="text-xs text-gray-500">Supplier Code / Name</p><p className="text-sm font-medium text-[#17a2b8]">292257 / SREE KAMARAJ WEAVERS COOP. SOCIETY EH.57</p></div>
            <div><p className="text-xs text-gray-500">GSTIN Number</p><p className="text-sm font-medium text-[#17a2b8]">33AAAAS8866K1Z0</p></div>
            <div><p className="text-xs text-gray-500">Inward Type</p><p className="text-sm font-medium text-[#17a2b8]">WAREHOUSE_INWARD</p></div>
            <div><p className="text-xs text-gray-500">Order Type</p><p className="text-sm font-medium text-[#17a2b8]">GEN</p></div>
            <div><p className="text-xs text-gray-500">Outward To ISSR</p><p className="text-sm font-medium text-[#17a2b8]">NO</p></div>
          </div>

          {/* Item Receive Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Item Receive Details</h4>
          </div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Item Code / Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Description</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">HSN Code</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">UOM</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Quantity</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Unit Rate (₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Rate (₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Tax (%)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Tax Value (₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Net Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ITEM_ROWS.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.itemCodeName}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.description}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.hsnCode}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.uom}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.quantity.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.unitRate.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.totalRate.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.taxPct.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.taxValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.netPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-[#1a2232]">
                  <td colSpan={5} className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">Total</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">100.00</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">10,000.00</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">500.00</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">10,500.00</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Invoice Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Invoice Details</h4>
          </div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Invoice Number</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Invoice Date</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">DC Number</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Payment Due Date</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Interest Applicable</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Rate of Interest on Total Loan Amount (%)</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Attached Documents</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_INVOICE_ROWS.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.invoiceNumber}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.invoiceDate}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.dcNumber || "-"}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.paymentDueDate || "-"}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.interestApplicable}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.rateOfInterest || "-"}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                      {row.attachedDocuments ? (
                        <button className="flex items-center gap-1 rounded bg-[#17a2b8] px-3 py-1 text-xs font-medium text-white hover:opacity-90 mx-auto">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="8,17 12,21 16,17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/></svg>
                          Download
                        </button>
                      ) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Transport Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Transport Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div><p className="text-xs text-gray-500">Transport Service Type</p><p className="text-sm font-medium text-[#17a2b8]">Personal Delivery</p></div>
            <div><p className="text-xs text-gray-500">Transport Service Name</p><p className="text-sm font-medium text-[#17a2b8]">Personal Delivery</p></div>
            <div><p className="text-xs text-gray-500">Waybill Available</p><p className="text-sm font-medium text-[#17a2b8]">No</p></div>
            <div><p className="text-xs text-gray-500">Transport Charge Available</p><p className="text-sm font-medium text-[#17a2b8]">No</p></div>
          </div>

          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/stock-management/stock-item-inward/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
