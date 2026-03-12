"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function StockUploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [error, setError] = useState("");

  const ALLOWED_EXTENSIONS = [".xlsx", ".xls", ".csv"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResult(null);
    setError("");
    if (!file) { setFileName(""); return; }

    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setError(`Invalid file format. Allowed formats: ${ALLOWED_EXTENSIONS.join(", ")}`);
      setFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFileName(file.name);
  };

  const handleUpload = () => {
    if (!fileName) { setError("Please select a file to upload."); return; }
    setUploading(true);
    setResult(null);
    setError("");
    setTimeout(() => {
      setUploading(false);
      setResult({ success: true, message: `"${fileName}" uploaded successfully. Stock data has been updated.` });
      setFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 1500);
  };

  return (
    <div className="mx-auto">
      {/* Page header & breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Stock Upload</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Stock Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Stock Upload</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Stock Upload</h3>
          <span className="text-xs text-white opacity-80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-end gap-4">
            {/* File input */}
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                Stock Upload <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={fileName}
                  placeholder="No file chosen"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-52 cursor-pointer rounded border border-stroke bg-transparent px-3 py-2 text-sm text-gray-500 outline-none hover:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-gray-400"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleUpload}
                  disabled={uploading || !fileName}
                  className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <polyline points="23,4 23,10 17,10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <polyline points="16,16 12,12 8,16" /><line x1="12" y1="12" x2="12" y2="21" />
                        <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                      </svg>
                      Upload
                    </>
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-400">Accepted formats: .xlsx, .xls, .csv</p>
            </div>
          </div>

          {/* Validation error */}
          {error && (
            <div className="mt-4 flex items-center gap-2 rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
              <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Success message */}
          {result?.success && (
            <div className="mt-4 flex items-center gap-2 rounded bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
              <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" />
              </svg>
              {result.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
