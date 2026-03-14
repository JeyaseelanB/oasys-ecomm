"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ViewAssetRegisterPage() {
  const router = useRouter();

  const fields1 = [
    { label: "Entity Type", value: "HEAD OFFICE" },
    { label: "Entity", value: "Head Office" },
    { label: "Asset Category", value: "Textile Library" },
    { label: "Asset Sub Category", value: "NewTEST" },
  ];
  const fields2 = [
    { label: "Type of Asset", value: "Moveable Asset" },
    { label: "Depreciation Type", value: "Written down value" },
    { label: "Depreciation Rate", value: "5.00" },
    { label: "", value: "" },
  ];
  const movableFields = [
    [
      { label: "Asset Name", value: "PANK" },
      { label: "Asset Code", value: "-" },
      { label: "Asset Age(In Months)", value: "0" },
      { label: "Survey Number", value: "-" },
    ],
    [
      { label: "Asset Description", value: "-" },
      { label: "Quantity", value: "12.0" },
      { label: "Brand Name", value: "-" },
      { label: "Product Serial Number", value: "-" },
    ],
    [
      { label: "Purchased Order Number", value: "-" },
      { label: "Purchase Date", value: "29-Nov-2024" },
      { label: "Supplier", value: "-" },
      { label: "Date of Supply", value: "-" },
    ],
    [
      { label: "Manufacturer", value: "-" },
      { label: "Cost of Asset", value: "1234.00" },
      { label: "GST Amount", value: "0" },
      { label: "Total Cost of Asset", value: "1234.00" },
    ],
    [
      { label: "Insurance Name", value: "-" },
      { label: "Insurance Start Date", value: "-" },
      { label: "Insurance End Date", value: "-" },
      { label: "Warranty Start Date", value: "-" },
    ],
    [
      { label: "Warranty End Date", value: "-" },
      { label: "Guarantee Date", value: "-" },
      { label: "AMC Start Date", value: "-" },
      { label: "AMC End Date", value: "-" },
    ],
    [
      { label: "Current Status", value: "Active" },
      { label: "Type of Acquired", value: "-" },
      { label: "Remark", value: "-" },
      { label: "", value: "" },
    ],
  ];

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Asset Register</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm"><li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li><li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Masters</li><li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Asset Masters</li><li className="text-gray-400">/</li><li className="font-medium text-primary">View Asset Register</li></ol></nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke bg-[#2d8f7b] px-6 py-3 dark:border-dark-3 rounded-t-[10px]">
          <h3 className="text-base font-semibold text-white">Asset Register</h3>
        </div>

        <div className="p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2 xl:grid-cols-4">
            {fields1.map((f) => (
              <div key={f.label}>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.label}</p>
                <p className="mt-1 text-sm font-medium text-primary">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2 xl:grid-cols-4">
            {fields2.filter(f => f.label).map((f) => (
              <div key={f.label}>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.label}</p>
                <p className="mt-1 text-sm font-medium text-primary">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Movable Asset Section */}
          <div className="mt-6 flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            Movable Asset
          </div>

          {movableFields.map((row, rowIdx) => (
            <div key={rowIdx} className="mt-4 grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2 xl:grid-cols-4">
              {row.filter(f => f.label).map((f) => (
                <div key={f.label}>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{f.label}</p>
                  <p className="mt-1 text-sm font-medium text-primary">{f.value}</p>
                </div>
              ))}
            </div>
          ))}

          <div className="mt-8 flex items-center justify-end">
            <button onClick={() => router.push("/masters/asset-masters/asset-register/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
