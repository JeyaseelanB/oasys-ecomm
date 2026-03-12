"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>
);

// Pre-filled info from linked Fuel Register record
const LINKED_RECORD = {
  vehicleRegNo: "TN01 AL 47 57",
  lastFilledQty: "30.0",
  lastFilledKm: "118000.0",
  lastFilledDate: "14-Jul-2020",
  lastClosingTripKm: "118000.0",
  fillingDate: "14-Jul-2020",
  currentMeterReading: "118000.0",
  destination: "petrol bank",
  fuelType: "Diesel",
  couponBookNumber: "330",
  couponStartEnd: "151 - 200",
  couponNumber: "187",
  fuelToFill: "30.0",
};

export default function CreateReceiptPage() {
  const router = useRouter();

  const [receiptDate, setReceiptDate] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [amount, setAmount] = useState("");
  const [ratePerLitre, setRatePerLitre] = useState("");
  const [fuelFilled, setFuelFilled] = useState("");
  const [uploadDocument, setUploadDocument] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Receipt</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Vehicle Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Fuel Filling Register</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Receipt</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Receipt</h3>
        </div>

        <div className="p-5">
          {/* Read-only info from linked record */}
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div><p className="text-xs text-gray-500">Vehicle Reg.No</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.vehicleRegNo}</p></div>
            <div><p className="text-xs text-gray-500">Last Filled QTY (in litres)</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.lastFilledQty}</p></div>
            <div><p className="text-xs text-gray-500">Last Filled Kilometer</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.lastFilledKm}</p></div>
            <div><p className="text-xs text-gray-500">Last Filled Date</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.lastFilledDate}</p></div>
            <div><p className="text-xs text-gray-500">Last Closing Trip Kilometer</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.lastClosingTripKm}</p></div>
            <div><p className="text-xs text-gray-500">Filling Date</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.fillingDate}</p></div>
            <div><p className="text-xs text-gray-500">Current Meter Reading</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.currentMeterReading}</p></div>
            <div><p className="text-xs text-gray-500">Destination</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.destination}</p></div>
            <div><p className="text-xs text-gray-500">Fuel Type</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.fuelType}</p></div>
            <div><p className="text-xs text-gray-500">Coupon Book Number</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.couponBookNumber}</p></div>
            <div><p className="text-xs text-gray-500">Coupon Start to End Number</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.couponStartEnd}</p></div>
            <div><p className="text-xs text-gray-500">Coupon Number</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.couponNumber}</p></div>
            <div><p className="text-xs text-gray-500">Fuel to be Filled (in litres)</p><p className="text-sm font-medium text-[#17a2b8]">{LINKED_RECORD.fuelToFill}</p></div>
          </div>

          {/* Receipt Details section */}
          <div className="mb-4 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Receipt Details</h4>
          </div>

          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Receipt Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Receipt Number <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={receiptNumber} onChange={(e) => setReceiptNumber(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Fuel Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
                </IconBox>
                <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Fuel Type</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="PETROL">Petrol</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Amount <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><span className="text-sm font-semibold">₹</span></IconBox>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Rate Per Litre <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><span className="text-sm font-semibold">₹</span></IconBox>
                <input type="number" value={ratePerLitre} onChange={(e) => setRatePerLitre(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Fuel Filled (in litres) <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
                </IconBox>
                <input type="number" value={fuelFilled} onChange={(e) => setFuelFilled(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          {/* Upload Documents */}
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Upload Documents</label>
            <div className="flex items-center gap-2">
              <input type="text" value={uploadDocument} readOnly placeholder="" className="w-64 rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
                Upload
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-400">File format: png, jpeg, pdf, doc and file size should be less than 2MB</p>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg></IconBox>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="APPROVAL">Approval</option>
                  <option value="REVIEW">Review</option>
                  <option value="INFO">Information</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              + Create Note
            </button>
            <div className="flex gap-3">
              <button onClick={() => router.push("/personnel/human-resource/admin/vehicle-management/fuel-filling-register/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-3xl rounded-[10px] bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-gray-50 px-3 py-2 dark:border-dark-3 dark:bg-dark-2">
              {["Sans Serif", "Normal"].map((t) => (
                <select key={t} className="mr-1 rounded border border-stroke bg-white px-2 py-1 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>{t}</option></select>
              ))}
              {[{ label: "B", cls: "font-bold" }, { label: "I", cls: "italic" }, { label: "U", cls: "underline" }, { label: "S", cls: "line-through" }].map((b) => (
                <button key={b.label} className={`flex size-7 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-dark-3 ${b.cls}`}>{b.label}</button>
              ))}
              <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></span>
              {["A", "A̲", "x₂", "x²", "H₁", "H₂", "❝", "</>", "≡", "•≡", "⇤", "⇥", "¶", "🔗", "🖼", "⊞", "Tx"].map((b, i) => (
                <button key={i} className="flex size-7 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-dark-3">{b}</button>
              ))}
            </div>
            <div className="px-5 pt-3">
              <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={8} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" placeholder="Type your note here..." />
            </div>
            <div className="flex items-center gap-3 px-5 pb-3">
              <button className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 dark:bg-dark-2">‹</button>
              <div className="rounded border border-stroke p-3 text-sm dark:border-dark-3">
                <p className="mb-1 text-center font-medium text-dark dark:text-white">Created By</p>
                <p className="text-gray-600 dark:text-gray-400">Name : PREMKUMAR</p>
                <p className="text-gray-600 dark:text-gray-400">Designation : SENIOR ASSISTANT</p>
                <p className="text-gray-600 dark:text-gray-400">Date : 12-Mar-2026</p>
              </div>
              <button className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 dark:bg-dark-2">›</button>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
