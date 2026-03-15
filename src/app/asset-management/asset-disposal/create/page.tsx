"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

/* ── tiny icon helpers ── */
const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
  </svg>
);

const ListIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const ForwardIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <polyline points="15,10 20,15 15,20" />
    <path d="M4 4v7a4 4 0 004 4h12" />
  </svg>
);

interface FieldWrapProps { label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode; }
function FieldWrap({ label, required, icon, children }: FieldWrapProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="flex items-center gap-2 rounded border border-stroke bg-white px-3 py-2 dark:border-dark-3 dark:bg-gray-dark">
        {icon}
        {children}
      </div>
    </div>
  );
}

interface DisposalItem {
  id: number;
  assetName: string;
  quantity: string;
  purchaseDate: string;
  purchasedAmount: string;
  age: string;
  dispatchedQty: string;
  disposalValue: string;
  assessorValue: string;
  disposalType: string;
  h1Name: string; h1Value: string;
  h2Name: string; h2Value: string;
  h3Name: string; h3Value: string;
  negotiableValue: string;
  reason: string;
}

const TODAY = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");

const TOOLBAR_BUTTONS = ["B","I","U","S"];
const TOOLBAR_EXTRA   = ["A","Ā","x₂","x²","H.","H.","❝❞","<>"];

export default function AssetDisposalCreatePage() {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);

  const [collapsed,   setCollapsed]   = useState(false);
  const [hoRo,        setHoRo]        = useState("");
  const [entityType,  setEntityType]  = useState("");
  const [entity,      setEntity]      = useState("");
  const [assetCat,    setAssetCat]    = useState("");
  const [assetSubCat, setAssetSubCat] = useState("");
  const [rows,        setRows]        = useState<DisposalItem[]>([]);
  const [forwardTo,   setForwardTo]   = useState("");
  const [forwardFor,  setForwardFor]  = useState("");
  const [showNote,    setShowNote]    = useState(false);
  const [noteHtml,    setNoteHtml]    = useState("");

  const handleGenerate = () => {
    if (!hoRo || !entityType || !entity || !assetCat || !assetSubCat) return;
    setRows([
      { id: 1, assetName: "Office Laptop", quantity: "5", purchaseDate: "10-Jan-2022", purchasedAmount: "75000.00", age: "3", dispatchedQty: "", disposalValue: "", assessorValue: "", disposalType: "", h1Name: "", h1Value: "", h2Name: "", h2Value: "", h3Name: "", h3Value: "", negotiableValue: "", reason: "" },
      { id: 2, assetName: "Office Chair",  quantity: "10", purchaseDate: "15-Mar-2020", purchasedAmount: "12000.00", age: "5", dispatchedQty: "", disposalValue: "", assessorValue: "", disposalType: "", h1Name: "", h1Value: "", h2Name: "", h2Value: "", h3Name: "", h3Value: "", negotiableValue: "", reason: "" },
    ]);
  };

  const handleClear = () => {
    setHoRo(""); setEntityType(""); setEntity(""); setAssetCat(""); setAssetSubCat(""); setRows([]);
  };

  const updateRow = (id: number, field: keyof DisposalItem, value: string) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, [field]: value } : r));
  };

  const execCmd = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
  };

  const selectClass = "w-full bg-transparent text-sm text-dark outline-none dark:text-white";
  const inputClass  = "w-full bg-transparent text-sm text-dark outline-none dark:text-white";
  const tdInput = "w-full bg-transparent text-xs text-dark outline-none dark:text-white min-w-[80px]";

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Asset Disposal
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Asset Disposal</li>
          </ol>
        </nav>
      </div>

      {/* Filter Card */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white">Asset Disposal</h3>
            <span className="text-xs text-white/80">( * Mandatory Fields)</span>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20 text-lg font-bold"
          >
            {collapsed ? "+" : "—"}
          </button>
        </div>

        {!collapsed && (
          <div className="p-5">
            {/* Row 1: 4 fields */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FieldWrap label="HO/RO" required icon={<BuildingIcon />}>
                <select value={hoRo} onChange={(e) => setHoRo(e.target.value)} className={selectClass}>
                  <option value="">Select</option>
                  <option>HEAD OFFICE</option>
                  <option>REGIONAL OFFICE</option>
                </select>
              </FieldWrap>
              <FieldWrap label="Entity Type" required icon={<ListIcon />}>
                <select value={entityType} onChange={(e) => setEntityType(e.target.value)} className={selectClass}>
                  <option value="">Select</option>
                  <option>Society</option>
                  <option>Branch</option>
                </select>
              </FieldWrap>
              <FieldWrap label="Entity" required icon={<BuildingIcon />}>
                <select value={entity} onChange={(e) => setEntity(e.target.value)} className={selectClass}>
                  <option value="">Select</option>
                  <option>ENTITY A</option>
                  <option>ENTITY B</option>
                </select>
              </FieldWrap>
              <FieldWrap label="Asset Category" required icon={<GridIcon />}>
                <select value={assetCat} onChange={(e) => setAssetCat(e.target.value)} className={selectClass}>
                  <option value="">Select</option>
                  <option>Plant and Machinery</option>
                  <option>Furniture</option>
                  <option>Electronics</option>
                </select>
              </FieldWrap>
            </div>

            {/* Row 2: Asset Sub Category */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FieldWrap label="Asset Sub Category" required icon={<GridIcon />}>
                <select value={assetSubCat} onChange={(e) => setAssetSubCat(e.target.value)} className={selectClass}>
                  <option value="">Select</option>
                  <option>Vehicle</option>
                  <option>Office Chair</option>
                  <option>Laptop</option>
                  <option>Generator</option>
                </select>
              </FieldWrap>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleClear}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Clear
              </button>
              <button type="button" onClick={handleGenerate}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="23,4 23,10 17,10" />
                  <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                </svg>
                Generate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <GridIcon />
            Asset Disposal List
          </h4>
        </div>

        <div className="p-5">
          {/* Table */}
          <div className="mb-5 overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  {["#","Asset Name","Quantity","Purchase Date","Purchased Amount (₹)","Age","Dispatched Quantity *","Disposal Value *","Assessor Value *","Disposal type *","H1 Name *","H1 value *","H2 Name *","H2 Value *","H3 Name *","H3 Value *","Negotiable Value *","Reason"].map((h) => (
                    <th key={h} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={18} className="py-4 text-left pl-3 text-gray-400">No records found.</td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                      <td className="border-r border-stroke px-2 py-1.5 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{row.assetName}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.quantity}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-dark dark:border-dark-3 dark:text-white whitespace-nowrap">{row.purchaseDate}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.purchasedAmount}</td>
                      <td className="border-r border-stroke px-2 py-1.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.age}</td>
                      {(["dispatchedQty","disposalValue","assessorValue","disposalType","h1Name","h1Value","h2Name","h2Value","h3Name","h3Value","negotiableValue","reason"] as (keyof DisposalItem)[]).map((field) => (
                        <td key={field} className="border-r border-stroke px-2 py-1.5 dark:border-dark-3">
                          <input
                            value={row[field] as string}
                            onChange={(e) => updateRow(row.id, field, e.target.value)}
                            className={tdInput}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Forward To / Forward For */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FieldWrap label="Forward To" required icon={<ForwardIcon />}>
              <input value={forwardTo} onChange={(e) => setForwardTo(e.target.value)}
                className={inputClass} placeholder="" />
            </FieldWrap>
            <FieldWrap label="Forward For" required icon={<ForwardIcon />}>
              <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className={selectClass}>
                <option value="">Select</option>
                <option>Approval</option>
                <option>Review</option>
              </select>
            </FieldWrap>
          </div>

          {/* Create Note button */}
          <div className="mb-5">
            <button type="button" onClick={() => setShowNote(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Note
            </button>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
            <button type="button"
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="20,6 9,17 4,12" />
              </svg>
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* ── Create Note Modal ── */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
              <h4 className="text-sm font-semibold text-white">Create Note</h4>
              <button type="button" onClick={() => setShowNote(false)}
                className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-5">
              {/* Toolbar */}
              <div className="mb-1 flex flex-wrap items-center gap-0.5 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                <select className="mr-1 h-7 rounded border border-stroke bg-white px-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Sans Serif</option>
                </select>
                <select className="mr-1 h-7 rounded border border-stroke bg-white px-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Normal</option>
                </select>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("bold"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs font-bold hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">B</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("italic"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs italic hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">I</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("underline"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs underline hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">U</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("strikeThrough"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs line-through hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">S</button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("foreColor", "#000"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">A</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("hiliteColor", "#ffff00"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">Ā</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("subscript"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">x₂</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("superscript"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">x²</button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("insertOrderedList"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M5 6h-.5M5 12H4M5 18H3"/></svg>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("insertUnorderedList"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
                </button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("justifyLeft"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("justifyCenter"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("justifyRight"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); execCmd("removeFormat"); }}
                  className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs hover:bg-gray-200 dark:text-white dark:hover:bg-dark-3">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="3" x2="21" y2="21"/><path d="M9 9L4 20h7l2-4"/><path d="M14.5 4H20L13 14"/></svg>
                </button>
              </div>

              {/* Editable area */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setNoteHtml((e.target as HTMLDivElement).innerHTML)}
                className="min-h-[160px] rounded-b border border-stroke bg-white p-3 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                data-placeholder="Enter text ..."
              />

              {/* Nav arrows */}
              <div className="mt-3 flex items-center justify-end gap-2">
                <button type="button" disabled
                  className="flex size-7 items-center justify-center rounded-full border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white">&#8249;</button>
                <button type="button" disabled
                  className="flex size-7 items-center justify-center rounded-full border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:text-white">&#8250;</button>
              </div>

              {/* Created By card */}
              <div className="mt-4">
                <div className="inline-block rounded border border-gray-200 p-3 text-center dark:border-dark-3" style={{ minWidth: "200px" }}>
                  <p className="mb-2 text-sm font-semibold text-[#e87c39]">Created By</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Name :</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Designation :</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Date : {TODAY}</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setShowNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#343a40] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
                <button type="button" onClick={() => setShowNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
