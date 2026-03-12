"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const VEHICLE_DATA: Record<string, { lastFilledQty: string; lastFilledKm: string; lastFilledDate: string; lastClosingTripKm: string }> = {
  "TN01 AL 47 57": { lastFilledQty: "30.0", lastFilledKm: "118000.0", lastFilledDate: "14-Jul-2020", lastClosingTripKm: "" },
  "TN01 AF 6116":  { lastFilledQty: "35.0", lastFilledKm: "225950.0", lastFilledDate: "26-May-2020", lastClosingTripKm: "" },
  "TN 01 BH 8877": { lastFilledQty: "20.0", lastFilledKm: "85000.0",  lastFilledDate: "01-Oct-2020", lastClosingTripKm: "" },
};

const COUPON_BOOK_DATA: Record<string, { startEnd: string }> = {
  "330": { startEnd: "151 - 200" },
  "331": { startEnd: "201 - 250" },
  "332": { startEnd: "251 - 300" },
};

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

const DropIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
  </svg>
);

export default function CreateFuelFillingRegisterPage() {
  const router = useRouter();

  const [vehicle, setVehicle] = useState("");
  const [lastFilledQty, setLastFilledQty] = useState("");
  const [lastFilledKm, setLastFilledKm] = useState("");
  const [lastFilledDate, setLastFilledDate] = useState("");
  const [lastClosingTripKm, setLastClosingTripKm] = useState("");
  const [fillingDate, setFillingDate] = useState("");
  const [currentMeterReading, setCurrentMeterReading] = useState("");
  const [destination, setDestination] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [couponBookNumber, setCouponBookNumber] = useState("");
  const [couponStartEnd, setCouponStartEnd] = useState("-");
  const [couponNumber, setCouponNumber] = useState("");
  const [fuelToFill, setFuelToFill] = useState("");
  const [pricePerLitre, setPricePerLitre] = useState("");
  const [fuelValueAmount, setFuelValueAmount] = useState("0");
  const [reason, setReason] = useState("");
  const [uploadDocument, setUploadDocument] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const handleVehicleChange = (v: string) => {
    setVehicle(v);
    const info = VEHICLE_DATA[v];
    if (info) {
      setLastFilledQty(info.lastFilledQty);
      setLastFilledKm(info.lastFilledKm);
      setLastFilledDate(info.lastFilledDate);
      setLastClosingTripKm(info.lastClosingTripKm);
    } else {
      setLastFilledQty(""); setLastFilledKm(""); setLastFilledDate(""); setLastClosingTripKm("");
    }
  };

  const handleCouponBookChange = (book: string) => {
    setCouponBookNumber(book);
    const info = COUPON_BOOK_DATA[book];
    setCouponStartEnd(info ? info.startEnd : "-");
  };

  const handleFuelValueCalc = (qty: string, price: string) => {
    const q = parseFloat(qty) || 0;
    const p = parseFloat(price) || 0;
    setFuelValueAmount((q * p).toFixed(2));
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Fuel Filling Register</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Vehicle Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Fuel Filling Register</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Fuel Filling Register</h3>
          <span className="text-xs text-white opacity-80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Vehicle <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><DropIco /></IconBox>
                <select value={vehicle} onChange={(e) => handleVehicleChange(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Registration Numb...</option>
                  {Object.keys(VEHICLE_DATA).map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Last Filled QTY (in litres)</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></IconBox>
                <input type="text" value={lastFilledQty} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Last Filled Kilometer</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></IconBox>
                <input type="text" value={lastFilledKm} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" placeholder="0.0" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Last Filled Date</label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <input type="text" value={lastFilledDate} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Last Closing Trip Kilometer</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={lastClosingTripKm} onChange={(e) => setLastClosingTripKm(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Filling Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={fillingDate} onChange={(e) => setFillingDate(e.target.value)} className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Current Meter Reading <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></IconBox>
                <input type="text" value={currentMeterReading} onChange={(e) => setCurrentMeterReading(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Destination</label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></IconBox>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Fuel Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><DropIco /></IconBox>
                <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Fuel Type</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="PETROL">Petrol</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Coupon Book Number <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><DropIco /></IconBox>
                <select value={couponBookNumber} onChange={(e) => handleCouponBookChange(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Coupon Book</option>
                  {Object.keys(COUPON_BOOK_DATA).map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Coupon Start to End Number</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={couponStartEnd} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Coupon Number <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={couponNumber} onChange={(e) => setCouponNumber(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Fuel to be Filled (in litres)</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="number" value={fuelToFill} onChange={(e) => { setFuelToFill(e.target.value); handleFuelValueCalc(e.target.value, pricePerLitre); }} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Price Per Litre <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="number" value={pricePerLitre} onChange={(e) => { setPricePerLitre(e.target.value); handleFuelValueCalc(fuelToFill, e.target.value); }} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Fuel Value/Amount <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={fuelValueAmount} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Reason</label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={4} maxLength={250} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
            <p className="mt-1 text-xs text-gray-400">Should be maximum 250 characters</p>
          </div>

          {/* Upload Documents */}
          <div className="mb-4">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Upload Documents <span className="text-red-500">*</span></label>
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
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                </IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                </IconBox>
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
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-gray-50 px-3 py-2 dark:border-dark-3 dark:bg-dark-2">
              {["Sans Serif", "Normal"].map((t) => (
                <select key={t} className="mr-1 rounded border border-stroke bg-white px-2 py-1 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>{t}</option></select>
              ))}
              {[
                { label: "B", title: "Bold", cls: "font-bold" },
                { label: "I", title: "Italic", cls: "italic" },
                { label: "U", title: "Underline", cls: "underline" },
                { label: "S", title: "Strikethrough", cls: "line-through" },
              ].map((b) => (
                <button key={b.label} title={b.title} className={`flex size-7 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-dark-3 ${b.cls}`}>{b.label}</button>
              ))}
              <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></span>
              {["A", "A̲"].map((b) => <button key={b} className="flex size-7 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-dark-3">{b}</button>)}
              <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></span>
              {["x₂", "x²"].map((b) => <button key={b} className="flex size-7 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-dark-3">{b}</button>)}
              <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></span>
              {["H₁", "H₂", "❝", "</>"].map((b) => <button key={b} className="flex size-7 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-dark-3">{b}</button>)}
              <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></span>
              {["≡", "•≡", "⇤", "⇥"].map((b) => <button key={b} className="flex size-7 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-dark-3">{b}</button>)}
              <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></span>
              {["¶", "≡"].map((b) => <button key={b} className="flex size-7 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-dark-3">{b}</button>)}
              <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></span>
              {["🔗", "🖼", "⊞", "Tx"].map((b) => <button key={b} className="flex size-7 items-center justify-center rounded text-xs hover:bg-gray-200 dark:hover:bg-dark-3">{b}</button>)}
            </div>
            {/* Editor area */}
            <div className="px-5 pt-3">
              <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={8} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" placeholder="Type your note here..." />
            </div>
            {/* Created By card */}
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
            {/* Modal Footer */}
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
