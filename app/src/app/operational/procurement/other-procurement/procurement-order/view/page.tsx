"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VIEW_DATA = {
  planType:     "Government Scheme",
  planCode:     "Cooptex123",
  planFrom:     "21-Feb-2025",
  planTo:       "22-Feb-2025",
  createdDate:  "21-Feb-2025",
  createdBy:    "3643",
  approvedDate: "21-Feb-2025",
  approvedBy:   "3558",
  dpOffice:     "1806 / D&P Office Salem",
};

const TABLE_ROWS = [
  {
    id: 1,
    variety:         "LCD1 / PEDALLO COTTON SAREE",
    uom:             "NOS",
    indentingRegion: "18/SALEM",
    issrCode:        "1821 / NAMAKKAL",
    qty:             10.0,
    value:           100.0,
    validityDate:    "21-Feb-2025",
    notLaterDate:    "22-Feb-2025",
  },
];

const ReadField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="block text-xs text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-sm font-medium text-[#17a2b8]">{value}</span>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

const totalQty   = TABLE_ROWS.reduce((s, r) => s + r.qty, 0);
const totalValue = TABLE_ROWS.reduce((s, r) => s + r.value, 0);

export default function ViewProcurementOrderPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/procurement-order";

  const [showViewNote, setShowViewNote] = useState(false);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Procurement Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Procurement Order</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Procurement Order</h3>
          <button className="text-white hover:opacity-80">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        <div className="p-5">
          {/* Procurement Order Details - row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-y-4 md:grid-cols-4">
            <ReadField label="Plan Type"        value={VIEW_DATA.planType} />
            <ReadField label="Plan Code / Name" value={VIEW_DATA.planCode} />
            <ReadField label="Plan From"        value={VIEW_DATA.planFrom} />
            <ReadField label="Plan To"          value={VIEW_DATA.planTo} />
          </div>
          <div className="mb-6 grid grid-cols-1 gap-y-4 md:grid-cols-4">
            <ReadField label="Created Date"  value={VIEW_DATA.createdDate} />
            <ReadField label="Created By"    value={VIEW_DATA.createdBy} />
            <ReadField label="Approved Date" value={VIEW_DATA.approvedDate} />
            <ReadField label="Approved By"   value={VIEW_DATA.approvedBy} />
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* D&P Office Details */}
          <div className="mt-5">
            <SectionHeader title="D&P Office Details" />
            <div className="mb-6">
              <ReadField label="D&P Office Code / Name" value={VIEW_DATA.dpOffice} />
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Indenting Region Wise - Procurement Details */}
          <div className="mt-5">
            <SectionHeader title="Indenting Region Wise - Procurement Details" />
            <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">UOM</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Indenting Region Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">ISSR Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Value (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Validity Date</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Not Later Than Date</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((r, idx) => (
                    <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.variety}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.uom}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.indentingRegion}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.issrCode}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{r.qty.toFixed(1)}</td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{r.value.toFixed(1)}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.validityDate}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.notLaterDate}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalQty.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalValue.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Bottom buttons */}
            <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
              <button onClick={() => setShowViewNote(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                View Note
              </button>
              <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== VIEW NOTE MODAL ===== */}
      {showViewNote && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Note content area */}
              <div className="mb-4 min-h-[160px] rounded border border-stroke p-3 text-sm text-dark dark:border-dark-3 dark:text-white">
                h
              </div>

              {/* Dot + arrow nav row */}
              <div className="mb-4 flex items-center justify-end gap-2">
                <span className="size-2.5 rounded-full bg-[#17a2b8]"></span>
                <button className="flex size-7 items-center justify-center rounded border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                </button>
                <button className="flex size-7 items-center justify-center rounded border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                </button>
              </div>

              {/* Final Approved By card */}
              <div className="mb-6">
                <div className="inline-block rounded border border-[#dc3545] p-4">
                  <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Final Approved By</h5>
                  <div className="space-y-1 text-sm text-dark dark:text-white">
                    <p>Name : USHA M</p>
                    <p>Designation : JUNIOR ASSISTANT</p>
                    <p>Date : 21-02-2025</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end">
                <button onClick={() => setShowViewNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
