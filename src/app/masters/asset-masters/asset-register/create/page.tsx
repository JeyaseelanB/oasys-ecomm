"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center justify-center border-r border-stroke bg-[#f8f8f8] px-3 py-2.5 dark:border-dark-3 dark:bg-dark-2">
    {children}
  </span>
);

export default function CreateAssetRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    hoRo: "", entityType: "", entity: "", assetCategory: "",
    assetSubCategory: "", typeOfAsset: "", depreciationType: "", depreciationRate: "",
  });
  const [uploadFile, setUploadFile] = useState<string>("");
  const handleChange = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Asset Register</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm"><li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li><li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Masters</li><li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Asset Masters</li><li className="text-gray-400">/</li><li className="font-medium text-primary">Create Asset Register</li></ol></nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between border-b border-stroke bg-[#2d8f7b] px-6 py-3 dark:border-dark-3 rounded-t-[10px]">
          <h3 className="text-base font-semibold text-white">Asset Register</h3>
          <span className="text-xs text-white italic">( Mandatory Fields)</span>
        </div>

        <div className="p-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">HO/RO</label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></IconBox>
                <select className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" value={form.hoRo} onChange={(e) => handleChange("hoRo", e.target.value)}>
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="SALEM">SALEM</option>
                  <option value="VELLORE">VELLORE</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Entity Type <span className="text-red-500">*</span></label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                <select className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" value={form.entityType} onChange={(e) => handleChange("entityType", e.target.value)}>
                  <option value="">Select</option>
                  <option value="Head Office">Head Office</option>
                  <option value="Regional Office">Regional Office</option>
                  <option value="Showroom">Showroom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Entity</label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></IconBox>
                <select className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" value={form.entity} onChange={(e) => handleChange("entity", e.target.value)}>
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="CUDDALORE">CUDDALORE</option>
                  <option value="KARUR">KARUR</option>
                  <option value="DEEPAM- VELLORE">DEEPAM- VELLORE</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Asset Category</label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12l2-6 2 6M9 10h2"/></svg></IconBox>
                <select className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" value={form.assetCategory} onChange={(e) => handleChange("assetCategory", e.target.value)}>
                  <option value="">Select</option>
                  <option value="Textile Library">Textile Library</option>
                  <option value="Furniture Fittings">Furniture Fittings</option>
                  <option value="Plant and Machinery">Plant and Machinery</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Asset Sub Category</label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></IconBox>
                <select className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" value={form.assetSubCategory} onChange={(e) => handleChange("assetSubCategory", e.target.value)}>
                  <option value="">Select</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Type of Asset</label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></IconBox>
                <select className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" value={form.typeOfAsset} onChange={(e) => handleChange("typeOfAsset", e.target.value)}>
                  <option value="">Select</option>
                  <option value="Moveable Asset">Moveable Asset</option>
                  <option value="Immovable Asset">Immovable Asset</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Depreciation Type</label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg></IconBox>
                <select className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" value={form.depreciationType} onChange={(e) => handleChange("depreciationType", e.target.value)}>
                  <option value="">Select</option>
                  <option value="Written down value">Written down value</option>
                  <option value="Straight line">Straight line</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Depreciation Rate</label>
              <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
                <IconBox><svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></IconBox>
                <input type="text" className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white" placeholder="" value={form.depreciationRate} onChange={(e) => handleChange("depreciationRate", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Upload Document */}
          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Upload Encumbrances Document</label>
            <div className="flex items-center gap-3">
              <input type="text" readOnly className="w-full max-w-md rounded border border-stroke bg-transparent px-3 py-2.5 text-sm outline-none dark:border-dark-3 dark:text-white" value={uploadFile} placeholder="" />
              <label className="flex cursor-pointer items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Upload
                <input type="file" className="hidden" onChange={(e) => setUploadFile(e.target.files?.[0]?.name || "")} />
              </label>
            </div>
            <p className="mt-1 text-xs text-red-500">File format:png,jpg,JPG,jpeg,gif,pdf,doc,docx,xls,xlsx. File size should be less than 5 MB</p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <button onClick={() => router.push("/masters/asset-masters/asset-register/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
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
