"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center justify-center border-r border-stroke bg-[#f8f8f8] px-3 py-2.5 dark:border-dark-3 dark:bg-dark-2">
    {children}
  </span>
);

export default function CreateAssetCategoryPage() {
  const router = useRouter();
  const [form, setForm] = useState({ parentAssetCategory: "", assetCategoryName: "", assetCategoryNameTamil: "", assetCategoryCode: "", status: "Active" });
  const handleChange = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Asset Category</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm"><li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li><li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Masters</li><li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Asset Masters</li><li className="text-gray-400">/</li><li className="font-medium text-primary">Create Asset Category</li></ol></nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between border-b border-stroke bg-[#2d8f7b] px-6 py-3 dark:border-dark-3 rounded-t-[10px]">
          <h3 className="text-base font-semibold text-white">Asset Category</h3>
          <span className="text-xs text-white italic">( Mandatory Fields)</span>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {/* Parent Asset Category */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Parent Asset Category</label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg></IconBox>
                <select className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" value={form.parentAssetCategory} onChange={(e) => handleChange("parentAssetCategory", e.target.value)}>
                  <option value="">Select</option>
                  <option value="Wood">Wood</option>
                  <option value="Textile Library">Textile Library</option>
                  <option value="Plant and Machinery">Plant and Machinery</option>
                  <option value="Land and Building">Land and Building</option>
                  <option value="Furniture Fittings">Furniture Fittings</option>
                  <option value="Building">Building</option>
                </select>
              </div>
            </div>

            {/* Asset Category Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Asset Category Name <span className="text-red-500">*</span></label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12l2-6 2 6M9 10h2"/></svg></IconBox>
                <input type="text" className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" placeholder="" value={form.assetCategoryName} onChange={(e) => handleChange("assetCategoryName", e.target.value)} />
              </div>
            </div>

            {/* Asset Category Name (In Tamil) */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Asset Category Name (In Tamil) <span className="text-red-500">*</span></label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12l2-6 2 6M9 10h2"/></svg></IconBox>
                <input type="text" className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" placeholder="" value={form.assetCategoryNameTamil} onChange={(e) => handleChange("assetCategoryNameTamil", e.target.value)} />
              </div>
            </div>

            {/* Asset Category Code */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Asset Category Code <span className="text-red-500">*</span></label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg></IconBox>
                <input type="text" className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" placeholder="" value={form.assetCategoryCode} onChange={(e) => handleChange("assetCategoryCode", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-5 max-w-xs">
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Status</label>
            <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
              <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></IconBox>
              <select className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" value={form.status} onChange={(e) => handleChange("status", e.target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <button onClick={() => router.push("/masters/asset-masters/asset-category/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
