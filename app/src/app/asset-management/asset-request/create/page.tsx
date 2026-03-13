"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ENTITY_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "showroom",          label: "Showroom" },
  { value: "collection_office", label: "Collection Office" },
  { value: "head_office",       label: "Head Office" },
  { value: "warehouse",         label: "Warehouse" },
];

const ENTITY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "cuddalore",   label: "CUDDALORE" },
  { value: "chennai",     label: "CHENNAI" },
  { value: "head_office", label: "HEAD OFFICE" },
  { value: "tirunelveli", label: "TIRUNELVELI" },
  { value: "vellore",     label: "DWH-VELLORE" },
];

const ASSET_CATEGORY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "plant_machinery", label: "Plant and Machinery" },
  { value: "furniture",       label: "Furniture and Fixtures" },
  { value: "vehicle",         label: "Vehicle" },
  { value: "electronics",     label: "Electronics" },
];

const ASSET_SUB_CATEGORY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "vehicle",   label: "Vehicle" },
  { value: "computer",  label: "Computer" },
  { value: "printer",   label: "Printer" },
  { value: "furniture", label: "Furniture" },
];

const ASSET_OPTIONS = [
  { value: "", label: "Select" },
  { value: "computer", label: "Computer" },
  { value: "laptop",   label: "Laptop" },
  { value: "printer",  label: "Printer" },
  { value: "scanner",  label: "Scanner" },
  { value: "vehicle",  label: "Vehicle" },
];

const FORWARD_FOR_OPTIONS = [
  { value: "", label: "Select" },
  { value: "approval",    label: "Approval" },
  { value: "review",      label: "Review" },
  { value: "processing",  label: "Processing" },
];

interface AssetLineItem {
  id: number;
  asset: string;
  assetCategory: string;
  assetSubCategory: string;
  quantity: number;
  reason: string;
}

const GridIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const DocIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" />
  </svg>
);

const ToolbarBtn = ({ label, title }: { label: string; title?: string }) => (
  <button
    type="button"
    title={title ?? label}
    className="flex h-7 min-w-[28px] items-center justify-center rounded px-1 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-2"
  >
    {label}
  </button>
);

export default function AssetRequestCreatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    entityType: "",
    entity: "",
    assetCategory: "",
    assetSubCategory: "",
    asset: "",
    quantity: "",
    reason: "",
    forwardTo: "",
    forwardFor: "",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [lineItems, setLineItems] = useState<AssetLineItem[]>([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteHtml, setNoteHtml] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const handleAddItem = () => {
    const newErrors: Partial<Record<string, string>> = {};
    if (!form.assetCategory)  newErrors.assetCategory    = "Required";
    if (!form.assetSubCategory) newErrors.assetSubCategory = "Required";
    if (!form.asset)          newErrors.asset             = "Required";
    if (!form.quantity || isNaN(Number(form.quantity)) || Number(form.quantity) <= 0)
      newErrors.quantity = "Required";
    setErrors((e) => ({ ...e, ...newErrors }));
    if (Object.keys(newErrors).length > 0) return;

    const assetLabel       = ASSET_OPTIONS.find((o) => o.value === form.asset)?.label ?? form.asset;
    const categoryLabel    = ASSET_CATEGORY_OPTIONS.find((o) => o.value === form.assetCategory)?.label ?? form.assetCategory;
    const subCategoryLabel = ASSET_SUB_CATEGORY_OPTIONS.find((o) => o.value === form.assetSubCategory)?.label ?? form.assetSubCategory;

    setLineItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        asset: assetLabel,
        assetCategory: categoryLabel,
        assetSubCategory: subCategoryLabel,
        quantity: Number(form.quantity),
        reason: form.reason,
      },
    ]);
    setForm((f) => ({ ...f, assetCategory: "", assetSubCategory: "", asset: "", quantity: "", reason: "" }));
    setErrors((e) => ({ ...e, assetCategory: "", assetSubCategory: "", asset: "", quantity: "" }));
  };

  const handleRemoveItem = (id: number) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const validate = () => {
    const newErrors: Partial<Record<string, string>> = {};
    if (!form.forwardTo)  newErrors.forwardTo  = "Forward To is required";
    if (!form.forwardFor) newErrors.forwardFor = "Forward For is required";
    if (lineItems.length === 0) newErrors.lineItems = "At least one asset is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      router.push("/asset-management/asset-request/list");
    }
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Asset Request
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Asset Request</li>
          </ol>
        </nav>
      </div>

      {/* Form Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Asset Request</h3>
          <span className="text-xs text-white opacity-90">* Mandatory Fields</span>
        </div>

        <div className="p-6">
          {/* ── Request From ── */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon />
              Request From
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Entity Type Code / Name */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Entity Type Code / Name
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <span className="text-sm font-bold text-gray-500">#</span>
                  </div>
                  <select
                    value={form.entityType}
                    onChange={(e) => handleChange("entityType", e.target.value)}
                    className="flex-1 rounded border border-stroke px-2 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  >
                    {ENTITY_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Request From Entity */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Request From Entity
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                    </svg>
                  </div>
                  <select
                    value={form.entity}
                    onChange={(e) => handleChange("entity", e.target.value)}
                    className="flex-1 rounded border border-stroke px-2 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  >
                    {ENTITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ── Add Asset Details ── */}
          <div className="mb-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon />
              Add Asset details
            </h4>

            {/* Asset field row */}
            <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Asset Category */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Asset Category <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <GridIcon />
                  </div>
                  <div className="flex-1">
                    <select
                      value={form.assetCategory}
                      onChange={(e) => handleChange("assetCategory", e.target.value)}
                      className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.assetCategory ? "border-red-400" : "border-stroke dark:border-dark-3"}`}
                    >
                      {ASSET_CATEGORY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors.assetCategory && <p className="mt-0.5 text-xs text-red-500">{errors.assetCategory}</p>}
                  </div>
                </div>
              </div>

              {/* Asset Sub Category */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Asset Sub Category <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <GridIcon />
                  </div>
                  <div className="flex-1">
                    <select
                      value={form.assetSubCategory}
                      onChange={(e) => handleChange("assetSubCategory", e.target.value)}
                      className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.assetSubCategory ? "border-red-400" : "border-stroke dark:border-dark-3"}`}
                    >
                      {ASSET_SUB_CATEGORY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors.assetSubCategory && <p className="mt-0.5 text-xs text-red-500">{errors.assetSubCategory}</p>}
                  </div>
                </div>
              </div>

              {/* Asset */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Asset <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <GridIcon />
                  </div>
                  <div className="flex-1">
                    <select
                      value={form.asset}
                      onChange={(e) => handleChange("asset", e.target.value)}
                      className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.asset ? "border-red-400" : "border-stroke dark:border-dark-3"}`}
                    >
                      {ASSET_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors.asset && <p className="mt-0.5 text-xs text-red-500">{errors.asset}</p>}
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <DocIcon />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      min="1"
                      value={form.quantity}
                      onChange={(e) => handleChange("quantity", e.target.value)}
                      className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.quantity ? "border-red-400" : "border-stroke dark:border-dark-3"}`}
                    />
                    {errors.quantity && <p className="mt-0.5 text-xs text-red-500">{errors.quantity}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Reason + Add button */}
            <div className="mb-3 flex items-end gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Reason</label>
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                    <DocIcon />
                  </div>
                  <input
                    type="text"
                    value={form.reason}
                    onChange={(e) => handleChange("reason", e.target.value)}
                    className="flex-1 rounded border border-stroke px-2 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add
              </button>
            </div>

            {/* Asset Items Table */}
            <div className="mb-2 overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Asset</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Asset Category</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Asset Sub Category</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Reason</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-400">No records found</td>
                    </tr>
                  ) : (
                    lineItems.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}
                      >
                        <td className="border-r border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                        <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{item.asset}</td>
                        <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{item.assetCategory}</td>
                        <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{item.assetSubCategory}</td>
                        <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{item.quantity}</td>
                        <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{item.reason}</td>
                        <td className="px-2 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Remove"
                          >
                            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <polyline points="3,6 5,6 21,6" />
                              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {errors.lineItems && <p className="mb-2 text-xs text-red-500">{errors.lineItems}</p>}
          </div>

          {/* ── Forward To & Forward For ── */}
          <div className="mb-6 flex flex-wrap gap-6">
            <div className="min-w-[220px] flex-1">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Forward To <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <polyline points="9,10 4,15 9,20" />
                    <path d="M20 4v7a4 4 0 01-4 4H4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={form.forwardTo}
                    onChange={(e) => handleChange("forwardTo", e.target.value)}
                    className={`w-full rounded border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.forwardTo ? "border-red-400" : "border-stroke dark:border-dark-3"}`}
                  />
                  {errors.forwardTo && <p className="mt-1 text-xs text-red-500">{errors.forwardTo}</p>}
                </div>
              </div>
            </div>

            <div className="min-w-[220px] flex-1">
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
                Forward For <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <polyline points="9,10 4,15 9,20" />
                    <path d="M20 4v7a4 4 0 01-4 4H4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <select
                    value={form.forwardFor}
                    onChange={(e) => handleChange("forwardFor", e.target.value)}
                    className={`w-full rounded border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.forwardFor ? "border-red-400" : "border-stroke dark:border-dark-3"}`}
                  >
                    {FORWARD_FOR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.forwardFor && <p className="mt-1 text-xs text-red-500">{errors.forwardFor}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer Actions ── */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Note
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/asset-management/asset-request/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Create Note Modal ── */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-dark">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#17b8c8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button
                type="button"
                onClick={() => { setShowNoteModal(false); setNoteHtml(""); }}
                className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              {/* Toolbar */}
              <div className="mb-1 flex flex-wrap items-center gap-0.5 rounded-t border border-b-0 border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-dark-2">
                <select className="mr-1 h-7 rounded border border-stroke bg-white px-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Sans Serif</option><option>Serif</option><option>Monospace</option>
                </select>
                <select className="mr-1 h-7 rounded border border-stroke bg-white px-1 text-xs outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Normal</option><option>H1</option><option>H2</option><option>H3</option>
                </select>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="B" title="Bold" />
                <ToolbarBtn label="I" title="Italic" />
                <ToolbarBtn label="U" title="Underline" />
                <ToolbarBtn label="S" title="Strikethrough" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="A" title="Font Color" />
                <ToolbarBtn label="🖊" title="Highlight" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="x₂" title="Subscript" />
                <ToolbarBtn label="x²" title="Superscript" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="H₁" title="Heading 1" />
                <ToolbarBtn label="H₂" title="Heading 2" />
                <ToolbarBtn label="❝" title="Blockquote" />
                <ToolbarBtn label="&lt;&gt;" title="Code Block" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="≡" title="Ordered List" />
                <ToolbarBtn label="☰" title="Unordered List" />
                <ToolbarBtn label="⇤" title="Outdent" />
                <ToolbarBtn label="⇥" title="Indent" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="⇐" title="RTL" />
                <ToolbarBtn label="⇒" title="LTR" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="🔗" title="Link" />
                <ToolbarBtn label="🖼" title="Image" />
                <ToolbarBtn label="⊞" title="Table" />
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3" />
                <ToolbarBtn label="Tx" title="Clear Formatting" />
              </div>

              {/* Editor Area */}
              <div
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => setNoteHtml((e.target as HTMLDivElement).innerHTML)}
                className="min-h-[160px] rounded-b border border-stroke bg-white p-3 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />

              {/* Created By card */}
              <div className="mt-4">
                <div className="inline-block rounded border border-gray-200 p-3 text-center dark:border-dark-3" style={{ minWidth: "200px" }}>
                  <p className="mb-2 text-sm font-semibold text-[#e87c39]">Created By</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Name : SANKARANARAYANAN</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Designation : SUPERINTENDENT</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Date : 13-Mar-2026</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowNoteModal(false); setNoteHtml(""); }}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => { setShowNoteModal(false); setNoteHtml(""); }}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                >
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
    </div>
  );
}
