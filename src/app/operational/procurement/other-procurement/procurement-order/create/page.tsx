"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProcRow {
  id: number;
  variety: string;
  uom: string;
  indentingRegion: string;
  issrCode: string;
  qty: string;
  value: string;
  validityDate: string;
  notLaterDate: string;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">{children}</div>
);
const CalBox = () => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#17a2b8] text-white">
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  </div>
);
const StackIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
);
const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

let nextRowId = 1;

export default function CreateProcurementOrderPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/procurement-order";

  // Plan details
  const [planType, setPlanType]         = useState("");
  const [planCode, setPlanCode]         = useState("");
  const [planFrom, setPlanFrom]         = useState("");
  const [planTo, setPlanTo]             = useState("");
  const [createdDate, setCreatedDate]   = useState("");
  const [createdBy, setCreatedBy]       = useState("");
  const [approvedDate, setApprovedDate] = useState("");
  const [approvedBy, setApprovedBy]     = useState("");

  // D&P Office details
  const [dpOffice, setDpOffice]             = useState("");
  const [productVariety, setProductVariety] = useState("");
  const [indentingRegion, setIndentingRegion] = useState("");
  const [issrCode, setIssrCode]             = useState("");
  const [currentIssuingQty, setCurrentIssuingQty] = useState("0.00");
  const [validityDate, setValidityDate]     = useState("");
  const [notLaterDate, setNotLaterDate]     = useState("");

  // Table
  const [rows, setRows] = useState<ProcRow[]>([]);

  // Forward
  const [forwardTo, setForwardTo]   = useState("");
  const [forwardFor, setForwardFor] = useState("");

  // Note modal
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteContent, setNoteContent]       = useState("");

  const handleAddRow = () => {
    if (!productVariety) return;
    const newRow: ProcRow = {
      id: nextRowId++,
      variety:         productVariety,
      uom:             "NOS",
      indentingRegion: indentingRegion,
      issrCode:        issrCode,
      qty:             currentIssuingQty,
      value:           (parseFloat(currentIssuingQty) * 100).toFixed(1),
      validityDate:    validityDate,
      notLaterDate:    notLaterDate,
    };
    setRows((prev) => [...prev, newRow]);
  };

  const handleClearForm = () => {
    setDpOffice(""); setProductVariety(""); setIndentingRegion(""); setIssrCode("");
    setCurrentIssuingQty("0.00"); setValidityDate(""); setNotLaterDate("");
  };

  const handleDeleteRow = (id: number) => setRows((prev) => prev.filter((r) => r.id !== id));

  const totalQty   = rows.reduce((s, r) => s + parseFloat(r.qty || "0"), 0);
  const totalValue = rows.reduce((s, r) => s + parseFloat(r.value || "0"), 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Procurement Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Procurement Order</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Procurement Order</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/80">(<span className="text-red-300">*</span> Mandatory Fields)</span>
            <button className="text-white hover:opacity-80"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
          </div>
        </div>

        <div className="p-5">
          {/* Plan Type */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </IconBox>
                <select value={planType} onChange={(e) => setPlanType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Government Scheme">Government Scheme</option>
                  <option value="Contract / Export">Contract / Export</option>
                  <option value="Additional Production Plan">Additional Production Plan</option>
                  <option value="Retail Production Plan">Retail Production Plan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Plan Code/Name | Plan From | Plan To | Created Date */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
                </IconBox>
                <select value={planCode} onChange={(e) => setPlanCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Cooptex123">Cooptex123</option>
                  <option value="CEP-SEP-2023-31 WO-VLR-AMBUR-2">CEP-SEP-2023-31 WO-VLR-AMBUR-2</option>
                  <option value="OAP Deepavali 23">OAP Deepavali 23</option>
                  <option value="CEP-JUL-2024-370 rajiniplan">CEP-JUL-2024-370 rajiniplan</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan From</label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={planFrom} onChange={(e) => setPlanFrom(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <CalBox />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan To</label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={planTo} onChange={(e) => setPlanTo(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <CalBox />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Created Date</label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <CalBox />
              </div>
            </div>
          </div>

          {/* Created By | Approved Date | Approved By */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Created By</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </IconBox>
                <input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Approved Date</label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={approvedDate} onChange={(e) => setApprovedDate(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <CalBox />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Approved By</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </IconBox>
                <input type="text" value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ── D&P Office Details ── */}
          <div className="mt-5">
            <SectionHeader title="D&P Office Details" />

            {/* Row 1: D&P Office | Product Variety | Total Procurement Plan Qty | Already Issued Qty */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">D&amp;P Office Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                  </IconBox>
                  <select value={dpOffice} onChange={(e) => setDpOffice(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="1806 / D&P Office Salem">1806 / D&P Office Salem</option>
                    <option value="1301 / D&P OFFICE ERODE">1301 / D&P OFFICE ERODE</option>
                    <option value="1705 / NMP INSPECTION CENTER">1705 / NMP INSPECTION CENTER</option>
                    <option value="2107 / D&P OFFICE KANCHIPURAM">2107 / D&P OFFICE KANCHIPURAM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Variety Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                  </IconBox>
                  <select value={productVariety} onChange={(e) => setProductVariety(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="LCD1 / PEDALLO COTTON SAREE">LCD1 / PEDALLO COTTON SAREE</option>
                    <option value="SKBS / SAREES KPM SILK WITH BLOUSE">SKBS / SAREES KPM SILK WITH BLOUSE</option>
                    <option value="SKBS2 / SAREES KPM SILK PLAIN">SKBS2 / SAREES KPM SILK PLAIN</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Total Procurement Plan Quantity</label>
                <div className="flex">
                  <IconBox><StackIcon /></IconBox>
                  <input type="text" readOnly value="0.0" className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-500 outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Already Issued Quantity</label>
                <div className="flex">
                  <IconBox><StackIcon /></IconBox>
                  <input type="text" readOnly value="0.0" className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-500 outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400" />
                </div>
              </div>
            </div>

            {/* Row 2: Indenting Region | ISSR Code | Current Issuing Qty | Validity Date */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Indenting Region Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
                  </IconBox>
                  <select value={indentingRegion} onChange={(e) => setIndentingRegion(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="18/SALEM">18/SALEM</option>
                    <option value="13/ERODE">13/ERODE</option>
                    <option value="17/NAMAKKAL">17/NAMAKKAL</option>
                    <option value="21/KANCHIPURAM">21/KANCHIPURAM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">ISSR Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
                  </IconBox>
                  <select value={issrCode} onChange={(e) => setIssrCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="1821 / NAMAKKAL">1821 / NAMAKKAL</option>
                    <option value="1822 / SALEM MAIN">1822 / SALEM MAIN</option>
                    <option value="1305 / ERODE MAIN">1305 / ERODE MAIN</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Current Issuing Quantity <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><StackIcon /></IconBox>
                  <input type="text" value={currentIssuingQty} onChange={(e) => setCurrentIssuingQty(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Validity Date <span className="text-red-500">*</span></label>
                <div className="flex">
                  <input type="text" placeholder="dd-MMM-yyyy" value={validityDate} onChange={(e) => setValidityDate(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  <CalBox />
                </div>
              </div>
            </div>

            {/* Row 3: Not Later Than Date + Clear + Add */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Not Later Than Date <span className="text-red-500">*</span></label>
                <div className="flex">
                  <input type="text" placeholder="dd-MMM-yyyy" value={notLaterDate} onChange={(e) => setNotLaterDate(e.target.value)} className="w-full rounded-l border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  <CalBox />
                </div>
              </div>
              <div className="flex items-end gap-3 md:col-span-3">
                <button onClick={handleClearForm} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Clear
                </button>
                <button onClick={handleAddRow} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ── Indenting Region Wise - Procurement Details ── */}
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
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr><td colSpan={10} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found</td></tr>
                  ) : (
                    rows.map((r, idx) => (
                      <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.variety}</td>
                        <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.uom}</td>
                        <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.indentingRegion}</td>
                        <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.issrCode}</td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{r.qty}</td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{r.value}</td>
                        <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.validityDate}</td>
                        <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.notLaterDate}</td>
                        <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3">
                          <button onClick={() => handleDeleteRow(r.id)} className="flex size-7 items-center justify-center rounded bg-[#dc3545] text-white hover:opacity-90">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Forward To / For */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="13,17 18,12 13,7"/><path d="M6 12h12"/></svg>
                  </IconBox>
                  <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="13,17 18,12 13,7"/><path d="M6 12h12"/></svg>
                  </IconBox>
                  <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="Approval">Approval</option>
                    <option value="Review">Review</option>
                    <option value="Final Approve">Final Approve</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
              <button onClick={() => setShowCreateNote(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create Note
              </button>
              <div className="flex items-center gap-3">
                <button onClick={() => router.push(`${basePath}/list`)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
                  Save
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CREATE NOTE MODAL ===== */}
      {showCreateNote && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10">
          <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowCreateNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Toolbar */}
              <div className="rounded-t border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-[#f9fafb] px-2 py-1.5 dark:border-dark-3 dark:bg-[#1a2232]">
                  <select className="mr-1 rounded border border-stroke bg-transparent px-1.5 py-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Sans Serif</option><option>Serif</option></select>
                  <select className="mr-1 rounded border border-stroke bg-transparent px-1.5 py-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Normal</option><option>Small</option><option>Large</option></select>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  {(["B","I","U","S"] as const).map((t, i) => (
                    <button key={i} className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2">
                      <span className={`text-sm ${t==="B"?"font-bold":t==="I"?"italic":t==="U"?"underline":"line-through"}`}>{t}</span>
                    </button>
                  ))}
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm font-bold underline text-[#17a2b8]">A</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm line-through">A</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sub>2</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sup>2</sup></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>1</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>2</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs">&ldquo;</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><line x1="4" y1="6" x2="5" y2="6"/><line x1="4" y1="12" x2="5" y2="12"/><line x1="4" y1="18" x2="5" y2="18"/></svg></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold italic">Tx</span></button>
                </div>
              </div>
              <div className="mb-4 min-h-[180px] rounded-b border border-t-0 border-stroke p-3 dark:border-dark-3">
                <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={7} placeholder="Enter text ..." className="w-full resize-none bg-transparent text-sm outline-none dark:text-white" />
              </div>
              {/* Created By card */}
              <div className="relative mb-6 flex items-center justify-between">
                <button className="flex size-8 items-center justify-center rounded-full border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                </button>
                <div className="inline-block rounded border border-[#e8a87c] p-4">
                  <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</h5>
                  <div className="space-y-1 text-sm text-dark dark:text-white">
                    <p>Name : ARULMARY</p>
                    <p>Designation : ASSISTANT SALES WOMEN</p>
                    <p>Date : 12-Mar-2026</p>
                  </div>
                </div>
                <button className="flex size-8 items-center justify-center rounded-full border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                </button>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setShowCreateNote(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button onClick={() => setShowCreateNote(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
