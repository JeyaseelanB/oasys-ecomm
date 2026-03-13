"use client";

import Link from "next/link";
import { useState } from "react";

const HO_RO_OPTIONS = [
  { value: "", label: "Select" },
  { value: "HEAD_OFFICE",  label: "HEAD OFFICE" },
  { value: "CHENNAI",      label: "CHENNAI" },
  { value: "MADURAI",      label: "MADURAI" },
  { value: "COIMBATORE",   label: "COIMBATORE" },
  { value: "TRICHY",       label: "TRICHY" },
];

const ENTITY_TYPE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "showroom",          label: "Showroom" },
  { value: "collection_office", label: "Collection Office" },
  { value: "head_office",       label: "Head Office" },
  { value: "warehouse",         label: "Warehouse" },
];

const ENTITY_OPTIONS = [
  { value: "", label: "Select" },
  { value: "HEAD_OFFICE",  label: "HEAD OFFICE" },
  { value: "CHENNAI",      label: "CHENNAI" },
  { value: "TIRUNELVELI",  label: "TIRUNELVELI" },
  { value: "CUDDALORE",    label: "CUDDALORE" },
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
  { value: "cooptex_hardware", label: "COOPTEX HARDWARE" },
  { value: "vehicle",          label: "Vehicle" },
  { value: "computer",         label: "Computer" },
  { value: "furniture",        label: "Furniture" },
];

const DEPRECIATION_YEAR_OPTIONS = [
  { value: "", label: "Select" },
  { value: "2024-2025", label: "2024-2025" },
  { value: "2023-2024", label: "2023-2024" },
  { value: "2022-2023", label: "2022-2023" },
  { value: "2021-2022", label: "2021-2022" },
  { value: "2020-2021", label: "2020-2021" },
];

interface DepreciationRow {
  id: number;
  entity: string;
  assetCategory: string;
  assetSubCategory: string;
  assetName: string;
  purchaseYear: string;
  currentValue: number;
  depreciationValue: number;
}

// ── Icon components ────────────────────────────────────────────────────
const BuildingIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
  </svg>
);

const ListIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const GridIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const CalIcon = () => (
  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const FieldWrap = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <div className="flex size-9 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
      {icon}
    </div>
    <div className="flex-1">{children}</div>
  </div>
);

export default function AssetDepreciationCreatePage() {
  const [sectionOpen, setSectionOpen] = useState(true);

  const [form, setForm] = useState({
    hoRo:              "",
    entityType:        "",
    entity:            "",
    assetCategory:     "",
    assetSubCategory:  "",
    depreciationYear:  "",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [rows, setRows]     = useState<DepreciationRow[]>([]);

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const handleClear = () => {
    setForm({ hoRo: "", entityType: "", entity: "", assetCategory: "", assetSubCategory: "", depreciationYear: "" });
    setErrors({});
    setRows([]);
  };

  const validate = () => {
    const newErrors: Partial<Record<string, string>> = {};
    if (!form.hoRo)             newErrors.hoRo             = "Required";
    if (!form.entityType)       newErrors.entityType       = "Required";
    if (!form.entity)           newErrors.entity           = "Required";
    if (!form.assetCategory)    newErrors.assetCategory    = "Required";
    if (!form.assetSubCategory) newErrors.assetSubCategory = "Required";
    if (!form.depreciationYear) newErrors.depreciationYear = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = () => {
    if (!validate()) return;
    // Simulate generated data
    const entityLabel    = ENTITY_OPTIONS.find((o) => o.value === form.entity)?.label ?? form.entity;
    const categoryLabel  = ASSET_CATEGORY_OPTIONS.find((o) => o.value === form.assetCategory)?.label ?? form.assetCategory;
    const subCatLabel    = ASSET_SUB_CATEGORY_OPTIONS.find((o) => o.value === form.assetSubCategory)?.label ?? form.assetSubCategory;
    setRows([
      { id: 1, entity: entityLabel, assetCategory: categoryLabel, assetSubCategory: subCatLabel, assetName: "Sample Asset 1", purchaseYear: "2020", currentValue: 50000, depreciationValue: 5000 },
      { id: 2, entity: entityLabel, assetCategory: categoryLabel, assetSubCategory: subCatLabel, assetName: "Sample Asset 2", purchaseYear: "2019", currentValue: 30000, depreciationValue: 3000 },
    ]);
  };

  const totalCurrentValue     = rows.reduce((sum, r) => sum + r.currentValue, 0);
  const totalDepreciationValue = rows.reduce((sum, r) => sum + r.depreciationValue, 0);

  const fmt = (n: number) => n.toFixed(2);

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Asset Depreciation
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Asset Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Asset Depreciation</li>
          </ol>
        </nav>
      </div>

      {/* ── Filter Card ── */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Create Asset Depreciation</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white opacity-90">(* Mandatory Fields)</span>
            <button
              type="button"
              onClick={() => setSectionOpen((v) => !v)}
              className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20"
              title={sectionOpen ? "Collapse" : "Expand"}
            >
              <span className="text-base font-bold leading-none">{sectionOpen ? "—" : "+"}</span>
            </button>
          </div>
        </div>

        {sectionOpen && (
          <div className="p-6">
            {/* ── Row 1: HO/RO, Entity Type, Entity, Asset Category ── */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* HO/RO */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  HO/RO <span className="text-red-500">*</span>
                </label>
                <FieldWrap icon={<BuildingIcon />}>
                  <select value={form.hoRo} onChange={(e) => handleChange("hoRo", e.target.value)}
                    className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.hoRo ? "border-red-400" : "border-stroke dark:border-dark-3"}`}>
                    {HO_RO_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.hoRo && <p className="mt-0.5 text-xs text-red-500">{errors.hoRo}</p>}
                </FieldWrap>
              </div>

              {/* Entity Type */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Entity Type <span className="text-red-500">*</span>
                </label>
                <FieldWrap icon={<ListIcon />}>
                  <select value={form.entityType} onChange={(e) => handleChange("entityType", e.target.value)}
                    className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.entityType ? "border-red-400" : "border-stroke dark:border-dark-3"}`}>
                    {ENTITY_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.entityType && <p className="mt-0.5 text-xs text-red-500">{errors.entityType}</p>}
                </FieldWrap>
              </div>

              {/* Entity */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Entity <span className="text-red-500">*</span>
                </label>
                <FieldWrap icon={<BuildingIcon />}>
                  <select value={form.entity} onChange={(e) => handleChange("entity", e.target.value)}
                    className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.entity ? "border-red-400" : "border-stroke dark:border-dark-3"}`}>
                    {ENTITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.entity && <p className="mt-0.5 text-xs text-red-500">{errors.entity}</p>}
                </FieldWrap>
              </div>

              {/* Asset Category */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Asset Category <span className="text-red-500">*</span>
                </label>
                <FieldWrap icon={<GridIcon />}>
                  <select value={form.assetCategory} onChange={(e) => handleChange("assetCategory", e.target.value)}
                    className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.assetCategory ? "border-red-400" : "border-stroke dark:border-dark-3"}`}>
                    {ASSET_CATEGORY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.assetCategory && <p className="mt-0.5 text-xs text-red-500">{errors.assetCategory}</p>}
                </FieldWrap>
              </div>
            </div>

            {/* ── Row 2: Asset Sub Category, Depreciation Year ── */}
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Asset Sub Category */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Asset Sub Category <span className="text-red-500">*</span>
                </label>
                <FieldWrap icon={<GridIcon />}>
                  <select value={form.assetSubCategory} onChange={(e) => handleChange("assetSubCategory", e.target.value)}
                    className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.assetSubCategory ? "border-red-400" : "border-stroke dark:border-dark-3"}`}>
                    {ASSET_SUB_CATEGORY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.assetSubCategory && <p className="mt-0.5 text-xs text-red-500">{errors.assetSubCategory}</p>}
                </FieldWrap>
              </div>

              {/* Depreciation Year */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Depreciation Year <span className="text-red-500">*</span>
                </label>
                <FieldWrap icon={<CalIcon />}>
                  <select value={form.depreciationYear} onChange={(e) => handleChange("depreciationYear", e.target.value)}
                    className={`w-full rounded border px-2 py-2 text-sm outline-none focus:border-primary dark:bg-gray-dark dark:text-white ${errors.depreciationYear ? "border-red-400" : "border-stroke dark:border-dark-3"}`}>
                    {DEPRECIATION_YEAR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.depreciationYear && <p className="mt-0.5 text-xs text-red-500">{errors.depreciationYear}</p>}
                </FieldWrap>
              </div>
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleClear}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Clear
              </button>
              <button type="button" onClick={handleGenerate}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
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

      {/* ── Results Card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="px-5 py-4">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Create Asset Depreciation
          </h4>

          {/* Table */}
          <div className="overflow-x-auto rounded border border-stroke dark:border-dark-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Entity</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Asset Category</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Asset Sub Category</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Asset Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Purchase Year</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Current Value</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Depreciation Value</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                      <td className="border-r border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{row.entity}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{row.assetCategory}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{row.assetSubCategory}</td>
                      <td className="border-r border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{row.assetName}</td>
                      <td className="border-r border-stroke px-3 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{row.purchaseYear}</td>
                      <td className="border-r border-stroke px-3 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{fmt(row.currentValue)}</td>
                      <td className="px-3 py-2 text-right text-dark dark:text-white">{fmt(row.depreciationValue)}</td>
                    </tr>
                  ))
                )}
              </tbody>
              {/* Total row */}
              <tfoot>
                <tr className="bg-[#f9fafb] dark:bg-[#1a2232]">
                  <td colSpan={6} className="border-r border-stroke px-3 py-2 text-right text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">
                    Total
                  </td>
                  <td className="border-r border-stroke px-3 py-2 text-right text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">
                    {fmt(totalCurrentValue)}
                  </td>
                  <td className="px-3 py-2 text-right text-sm font-semibold text-dark dark:text-white">
                    {fmt(totalDepreciationValue)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Download PDF button */}
          <div className="mt-4">
            <button
              type="button"
              disabled={rows.length === 0}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9,15 12,18 15,15" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
