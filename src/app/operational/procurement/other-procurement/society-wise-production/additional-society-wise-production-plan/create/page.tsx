"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SocietyRow { id: number; code: string; currentQty: string; }

const INITIAL_SOCIETIES: SocietyRow[] = [
  { id: 1,  code: "111147/ARIGNAR ANNA SILK WEAVERS COOP. SOCIETY, K.H.1,",                    currentQty: "0.00" },
  { id: 2,  code: "111184/KANCHEEPURAMDR. KALAIGNARKARUNANIDHISILWCS.KH.4,",                   currentQty: "0.00" },
  { id: 3,  code: "111202/KANCHEEPURAM SILK WEAVERS COOP.SOCIETY G.1099",                      currentQty: "0.00" },
  { id: 4,  code: "111226/KANCHEEPURAM KAMAKSHIAMMAN SILK WCS. G.1612, NO 5,",                 currentQty: "0.00" },
  { id: 5,  code: "111263/KANCHEEPURAM MURUGAN SILK WCS. G.1653,",                             currentQty: "0.00" },
  { id: 6,  code: "111317/KANCHEEPURAM PALLAVAR SILK WCS. K.P.(SPL) 83,",                      currentQty: "0.00" },
  { id: 7,  code: "111408/KANCHEEPURAM THIRUVALLUVAR SILK WCS., G.2054,",                      currentQty: "0.00" },
  { id: 8,  code: "111410/SRI VARADARAJASWAMI SILK WCS. G.2105,",                              currentQty: "0.00" },
  { id: 9,  code: "112760/KH.277.KPM.PURATCHI THALAIVI DR.J.JAYALALITHA ALL WOMEN WCS",        currentQty: "0.00" },
  { id: 10, code: "113181/K.H.306,KANCHEEPURAM PURATCHI PUYAL VAIKO SILK",                     currentQty: "0.00" },
  { id: 11, code: "272362/ATHIMALAIPATTU ARIGNAR ANNA W.C.S.LTD., VH.9,",                      currentQty: "0.00" },
];

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">{children}</div>
);
const CalBox = () => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#17a2b8] text-white">
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  </div>
);

export default function CreateAdditionalSocietyWisePlanPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/society-wise-production/additional-society-wise-production-plan";

  const [planType, setPlanType] = useState("Additional Production Plan");
  const [planCode, setPlanCode] = useState("");
  const [planFrom, setPlanFrom] = useState("");
  const [planTo, setPlanTo] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [approvedDate, setApprovedDate] = useState("");
  const [approvedBy, setApprovedBy] = useState("");

  const [productCategory, setProductCategory] = useState("");
  const [productGroup, setProductGroup] = useState("");
  const [productVariety, setProductVariety] = useState("");
  const [uom, setUom] = useState("");

  const [societies, setSocieties] = useState<SocietyRow[]>([]);
  const [generated, setGenerated] = useState(false);
  const [currentReqQty, setCurrentReqQty] = useState(0);

  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");

  const [showCreateNote, setShowCreateNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const handleGenerate = () => {
    const rows = INITIAL_SOCIETIES.map((s) => ({ ...s, currentQty: "0.00" }));
    setSocieties(rows);
    setGenerated(true);
    setCurrentReqQty(0);
  };

  const handleClearForm = () => {
    setProductCategory(""); setProductGroup(""); setProductVariety(""); setUom("");
    setSocieties([]); setGenerated(false); setCurrentReqQty(0);
  };

  const handleQtyChange = (id: number, val: string) => {
    const updated = societies.map((s) => s.id === id ? { ...s, currentQty: val } : s);
    setSocieties(updated);
    const total = updated.reduce((sum, s) => sum + (parseFloat(s.currentQty) || 0), 0);
    setCurrentReqQty(total);
  };

  const totalQty = societies.reduce((s, r) => s + (parseFloat(r.currentQty) || 0), 0);

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-4 flex items-center gap-2">
      <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
      <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Additional Society Wise Production Plan</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Society Wise Production</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Additional Society Wise Production Plan</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Society Wise Production Plan</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/80">(<span className="text-red-300">*</span> Mandatory Fields)</span>
            <button className="text-white hover:opacity-80"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
          </div>
        </div>

        <div className="p-5">
          {/* ── Society Wise Production Plan Details ── */}
          <SectionHeader title="Society Wise Production Plan Details" />

          {/* Plan Type */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                <select value={planType} onChange={(e) => setPlanType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="Additional Production Plan">Additional Production Plan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Plan Code/Name | Plan From | Plan To | Created Date */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Plan Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg></IconBox>
                <select value={planCode} onChange={(e) => setPlanCode(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Prodcution plan">APP-SEP-25-73 / Prodcution plan</option>
                  <option value="dilli">APP-AUG-25-69 / dilli</option>
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
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
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
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <input type="text" value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ── D&P Office Details ── */}
          <div className="mt-5">
            <SectionHeader title="D&P Office Details" />
            <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">D&amp;P Office Code / Name</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg></IconBox>
                  <input type="text" readOnly value="2107 / D&P OFFICE KANCHIPURAM" className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-500 outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Category Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7l8-4 8 4M4 7v10l8 4M4 7l8 4M20 7v10l-8 4M20 7l-8 4M12 11v10"/></svg></IconBox>
                  <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="A / Pure Silk Variety">A / Pure Silk Variety</option>
                    <option value="B / Cotton Variety">B / Cotton Variety</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Group Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></IconBox>
                  <select value={productGroup} onChange={(e) => setProductGroup(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="30 / SILK ITEM">30 / SILK ITEM</option>
                    <option value="31 / COTTON ITEM">31 / COTTON ITEM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Variety Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                  <select value={productVariety} onChange={(e) => setProductVariety(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="SKBS / SAREES KPM SILK WITH BLOUSE">SKBS / SAREES KPM SILK WITH BLOUSE</option>
                    <option value="SKBS2 / SAREES KPM SILK PLAIN">SKBS2 / SAREES KPM SILK PLAIN</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">UOM</label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 6v6l4 2"/></svg></IconBox>
                  <input type="text" readOnly value={uom} placeholder="Auto-filled" className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-500 outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400" />
                </div>
              </div>
            </div>
            <div className="mb-4 flex justify-end gap-3">
              <button onClick={handleClearForm} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Clear
              </button>
              <button onClick={handleGenerate} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                Generate
              </button>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ── Primary Contact Details ── */}
          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <h4 className="text-sm font-semibold text-dark dark:text-white">Primary Contact Details</h4>
              </div>
              {generated && (
                <span className="text-sm font-semibold text-[#FFA70B]">Current Requirement Quantity : {currentReqQty.toFixed(2)}</span>
              )}
            </div>
            <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Society Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Current Requirement Qty</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {societies.length === 0 ? (
                    <tr><td colSpan={4} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                  ) : (
                    societies.map((s, idx) => (
                      <tr key={s.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{s.code}</td>
                        <td className="border border-stroke px-2 py-2 align-middle dark:border-dark-3">
                          <input type="text" value={s.currentQty} onChange={(e) => handleQtyChange(s.id, e.target.value)} className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-right text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                        </td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{parseFloat(s.currentQty || "0").toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                {societies.length > 0 && (
                  <tfoot>
                    <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total:</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalQty.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalQty.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>

            {/* Forward to / for */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward to <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg></IconBox>
                  <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward for <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6"/></svg></IconBox>
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
              <button onClick={() => setShowCreateNote(false)} className="text-white hover:opacity-80"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="p-5">
              {/* Toolbar */}
              <div className="rounded-t border border-stroke dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-0.5 border-b border-stroke bg-[#f9fafb] px-2 py-1.5 dark:border-dark-3 dark:bg-[#1a2232]">
                  <select className="mr-1 rounded border border-stroke bg-transparent px-1.5 py-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Sans Serif</option><option>Serif</option></select>
                  <select className="mr-1 rounded border border-stroke bg-transparent px-1.5 py-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"><option>Normal</option><option>Small</option><option>Large</option></select>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  {["B","I","U","S"].map((t,i) => (<button key={i} className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className={`text-sm ${t==="B"?"font-bold":t==="I"?"italic":t==="U"?"underline":"line-through"}`}>{t}</span></button>))}
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-sm font-bold">A</span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sub>2</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-[10px]">x<sup>2</sup></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>1</sub></span></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><span className="text-xs font-bold">H<sub>2</sub></span></button>
                  <span className="mx-0.5 h-5 w-px bg-stroke dark:bg-dark-3"></span>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg></button>
                  <button className="flex size-7 items-center justify-center rounded text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-2"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg></button>
                </div>
              </div>
              <div className="mb-4 min-h-[180px] rounded-b border border-t-0 border-stroke p-3 dark:border-dark-3">
                <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} rows={7} placeholder="Enter text ..." className="w-full resize-none bg-transparent text-sm outline-none dark:text-white" />
              </div>
              {/* Pagination nav */}
              <div className="relative mb-6 flex items-center justify-between">
                <button className="flex size-8 items-center justify-center rounded-full border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg></button>
                <div className="inline-block rounded border border-[#e8a87c] p-4">
                  <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</h5>
                  <div className="space-y-1 text-sm text-dark dark:text-white">
                    <p>Name : ARULMARY</p>
                    <p>Designation : ASSISTANT SALES WOMEN</p>
                    <p>Date : 12-Mar-2026</p>
                  </div>
                </div>
                <button className="flex size-8 items-center justify-center rounded-full border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg></button>
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
