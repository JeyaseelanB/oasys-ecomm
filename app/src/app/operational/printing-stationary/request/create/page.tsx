"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InitiateRequirementRequestCreatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    requestName: "",
    fromDate: "",
    toDate: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState({
    requestName: "",
    fromDate: "",
    toDate: "",
    dueDate: "",
  });

  const validate = () => {
    const newErrors = { requestName: "", fromDate: "", toDate: "", dueDate: "" };
    let valid = true;
    if (!form.requestName.trim()) { newErrors.requestName = "Request Name is required."; valid = false; }
    if (!form.fromDate.trim()) { newErrors.fromDate = "From Date is required."; valid = false; }
    if (!form.toDate.trim()) { newErrors.toDate = "To Date is required."; valid = false; }
    if (!form.dueDate.trim()) { newErrors.dueDate = "Due Date is required."; valid = false; }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Submit logic here
      router.push("/operational/printing-stationary/request/list");
    }
  };

  const handleCancel = () => {
    router.push("/operational/printing-stationary/request/list");
  };

  const CalendarIcon = () => (
    <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const LayersIcon = () => (
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="12,2 2,7 12,12 22,7" />
      <polyline points="2,17 12,22 22,17" />
      <polyline points="2,12 12,17 22,12" />
    </svg>
  );

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Initiate Requirement Request
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Printing &amp; Stationary</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Initiate Requirement Request</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2dc4b2] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Initiate Requirement Request</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white opacity-90">( * Mandatory Fields)</span>
            <button className="text-white hover:opacity-80">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Request Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-dark dark:text-white">
                Request Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
                <span className="flex h-9 items-center justify-center border-r border-stroke bg-gray-50 px-2 dark:border-dark-3 dark:bg-dark-2">
                  <LayersIcon />
                </span>
                <input
                  type="text"
                  className="h-9 flex-1 bg-transparent px-3 text-sm text-dark outline-none dark:text-white"
                  value={form.requestName}
                  onChange={(e) => setForm((f) => ({ ...f, requestName: e.target.value }))}
                />
              </div>
              {errors.requestName && (
                <p className="text-xs text-red-500">{errors.requestName}</p>
              )}
            </div>

            {/* Requirement From Date */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-dark dark:text-white">
                Requirement From Date <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
                <input
                  type="text"
                  placeholder="dd-MMM-yyyy"
                  className="h-9 flex-1 bg-transparent px-3 text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white"
                  value={form.fromDate}
                  onChange={(e) => setForm((f) => ({ ...f, fromDate: e.target.value }))}
                />
                <button className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#2dc4b2] hover:opacity-90">
                  <CalendarIcon />
                </button>
              </div>
              {errors.fromDate && (
                <p className="text-xs text-red-500">{errors.fromDate}</p>
              )}
            </div>

            {/* Requirement To Date */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-dark dark:text-white">
                Requirement To Date <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
                <input
                  type="text"
                  placeholder="dd-MMM-yyyy"
                  className="h-9 flex-1 bg-transparent px-3 text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white"
                  value={form.toDate}
                  onChange={(e) => setForm((f) => ({ ...f, toDate: e.target.value }))}
                />
                <button className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#2dc4b2] hover:opacity-90">
                  <CalendarIcon />
                </button>
              </div>
              {errors.toDate && (
                <p className="text-xs text-red-500">{errors.toDate}</p>
              )}
            </div>

            {/* Due Date */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-dark dark:text-white">
                Due Date <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
                <input
                  type="text"
                  placeholder="dd-MMM-yyyy"
                  className="h-9 flex-1 bg-transparent px-3 text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white"
                  value={form.dueDate}
                  onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
                />
                <button className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#2dc4b2] hover:opacity-90">
                  <CalendarIcon />
                </button>
              </div>
              {errors.dueDate && (
                <p className="text-xs text-red-500">{errors.dueDate}</p>
              )}
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
            <button
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
  );
}
