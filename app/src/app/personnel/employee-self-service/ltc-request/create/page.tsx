"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

interface FieldWrapProps {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

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

function CalendarIcon() {
  return (
    <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function TextIcon() {
  return <span className="shrink-0 text-sm font-bold text-gray-400">A</span>;
}

function HashIcon() {
  return <span className="shrink-0 text-sm font-bold text-gray-400">#</span>;
}

function WalletIcon() {
  return (
    <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17,8 12,3 7,8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

// Sample record store — in a real app this would come from an API
const RECORD_STORE: Record<string, {
  blockYears: string;
  eligibleDistance: string;
  travelledDistance: string;
  appliedFor: "Self" | "Family";
  modeOfTravel: string;
  leaveFromDate: string;
  leaveToDate: string;
  noOfDays: string;
  typeOfLeave: string;
  leaveBalance: string;
  costOfTicket: string;
  holidayPermission: "Yes" | "No";
}> = {
  "1": {
    blockYears: "2020-2024",
    eligibleDistance: "2500.0",
    travelledDistance: "200.0",
    appliedFor: "Self",
    modeOfTravel: "By Bus",
    leaveFromDate: "22-Mar-2024",
    leaveToDate: "22-Mar-2024",
    noOfDays: "1",
    typeOfLeave: "Earned Leave",
    leaveBalance: "57.0",
    costOfTicket: "5.0",
    holidayPermission: "No",
  },
};

function LTCRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEdit = !!editId;
  const existing = editId ? RECORD_STORE[editId] : null;

  const [blockYears, setBlockYears] = useState(existing?.blockYears ?? "");
  const [eligibleDistance, setEligibleDistance] = useState(existing?.eligibleDistance ?? "2500.0");
  const [travelledDistance, setTravelledDistance] = useState(existing?.travelledDistance ?? "");
  const [appliedFor, setAppliedFor] = useState<"Self" | "Family">(existing?.appliedFor ?? "Self");
  const [modeOfTravel, setModeOfTravel] = useState(existing?.modeOfTravel ?? "");
  const [leaveFromDate, setLeaveFromDate] = useState(existing?.leaveFromDate ?? "");
  const [leaveToDate, setLeaveToDate] = useState(existing?.leaveToDate ?? "");
  const [noOfDays, setNoOfDays] = useState(existing?.noOfDays ?? "");
  const [typeOfLeave, setTypeOfLeave] = useState(existing?.typeOfLeave ?? "");
  const [leaveBalance, setLeaveBalance] = useState(existing?.leaveBalance ?? "");
  const [costOfTicket, setCostOfTicket] = useState(existing?.costOfTicket ?? "");
  const [uploadedDoc, setUploadedDoc] = useState("");
  const [holidayPermission, setHolidayPermission] = useState<"Yes" | "No">(existing?.holidayPermission ?? "No");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [chooseFile, setChooseFile] = useState("");

  const pageTitle = isEdit ? "Edit Leave Travel Concession" : "Create Leave Travel Concession";
  const inputCls = "flex-1 bg-transparent text-sm text-dark outline-none dark:text-white";

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          {pageTitle}
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">{pageTitle}</li>
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Leave Travel Concession</h3>
          <span className="text-xs text-white/80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Row 1: Block Years, Eligible Distance, Travelled Distance, Applied For */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FieldWrap label="Block Years" icon={<CalendarIcon />}>
              <select value={blockYears} onChange={(e) => setBlockYears(e.target.value)}
                className="flex-1 bg-transparent text-sm text-dark outline-none dark:text-white">
                <option value="">Select</option>
                <option value="2020-2024">2020-2024</option>
                <option value="2024-2028">2024-2028</option>
              </select>
            </FieldWrap>

            <FieldWrap label="Eligible Distance" required icon={<TextIcon />}>
              <input type="text" value={eligibleDistance} onChange={(e) => setEligibleDistance(e.target.value)}
                className={inputCls} />
            </FieldWrap>

            <FieldWrap label="Travelled Distance" required icon={<TextIcon />}>
              <input type="text" value={travelledDistance} onChange={(e) => setTravelledDistance(e.target.value)}
                className={inputCls} />
            </FieldWrap>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Applied For<span className="ml-0.5 text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4 rounded border border-stroke bg-white px-3 py-2 dark:border-dark-3 dark:bg-gray-dark">
                <label className="flex items-center gap-1.5 text-sm text-dark dark:text-white">
                  <input type="radio" name="appliedFor" value="Self"
                    checked={appliedFor === "Self"} onChange={() => setAppliedFor("Self")}
                    className="accent-[#17b8c8]" />
                  Self
                </label>
                <label className="flex items-center gap-1.5 text-sm text-dark dark:text-white">
                  <input type="radio" name="appliedFor" value="Family"
                    checked={appliedFor === "Family"} onChange={() => setAppliedFor("Family")}
                    className="accent-[#17b8c8]" />
                  Family
                </label>
              </div>
            </div>
          </div>

          {/* Row 2: Mode of Travel, Leave From Date, Leave To Date, No. of Days */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FieldWrap label="Mode of Travel" required icon={<TextIcon />}>
              <select value={modeOfTravel} onChange={(e) => setModeOfTravel(e.target.value)}
                className="flex-1 bg-transparent text-sm text-dark outline-none dark:text-white">
                <option value="">Select</option>
                <option value="By Bus">By Bus</option>
                <option value="By Train">By Train</option>
                <option value="By Air">By Air</option>
                <option value="By Own Vehicle">By Own Vehicle</option>
              </select>
            </FieldWrap>

            <FieldWrap label="Leave From Date" required icon={<CalendarIcon />}>
              <input type="text" value={leaveFromDate} onChange={(e) => setLeaveFromDate(e.target.value)}
                placeholder="dd-MMM-yyyy" className={inputCls} />
            </FieldWrap>

            <FieldWrap label="Leave To Date" required icon={<CalendarIcon />}>
              <input type="text" value={leaveToDate} onChange={(e) => setLeaveToDate(e.target.value)}
                placeholder="dd-MMM-yyyy" className={inputCls} />
            </FieldWrap>

            <FieldWrap label="No. of Days" icon={<HashIcon />}>
              <input type="text" value={noOfDays} onChange={(e) => setNoOfDays(e.target.value)}
                className={inputCls} readOnly />
            </FieldWrap>
          </div>

          {/* Row 3: Type of Leave, Leave Balance, Cost of Ticket */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FieldWrap label="Type of Leave" icon={<TextIcon />}>
              <select value={typeOfLeave} onChange={(e) => setTypeOfLeave(e.target.value)}
                className="flex-1 bg-transparent text-sm text-dark outline-none dark:text-white">
                <option value="">Select</option>
                <option value="Earned Leave">Earned Leave</option>
                <option value="Casual Leave">Casual Leave</option>
              </select>
            </FieldWrap>

            <FieldWrap label="Leave Balance" icon={<HashIcon />}>
              <input type="text" value={leaveBalance} onChange={(e) => setLeaveBalance(e.target.value)}
                className={inputCls} readOnly />
            </FieldWrap>

            <FieldWrap label="Cost of Ticket (₹)" required icon={<WalletIcon />}>
              <input type="text" value={costOfTicket} onChange={(e) => setCostOfTicket(e.target.value)}
                className={inputCls} />
            </FieldWrap>
          </div>

          {/* Row 4: Upload Documents */}
          <div className="mb-4">
            <p className="mb-1.5 text-xs font-medium text-gray-600 dark:text-gray-300">
              Upload Documents<span className="ml-0.5 text-red-500">*</span>
            </p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <UploadIcon />
                Upload
              </button>
              <span className="text-sm text-gray-500">
                Uploaded Documents:{" "}
                {uploadedDoc && <span className="font-medium text-dark dark:text-white">{uploadedDoc}</span>}
              </span>
            </div>
          </div>

          {/* Row 5: Holiday permissions */}
          <div className="mb-6">
            <p className="mb-1.5 text-xs font-medium text-gray-600 dark:text-gray-300">
              Whether availed holiday permissions?
            </p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 text-sm text-dark dark:text-white">
                <input type="radio" name="holidayPerm" value="Yes"
                  checked={holidayPermission === "Yes"} onChange={() => setHolidayPermission("Yes")}
                  className="accent-[#17b8c8]" />
                Yes
              </label>
              <label className="flex items-center gap-1.5 text-sm text-dark dark:text-white">
                <input type="radio" name="holidayPerm" value="No"
                  checked={holidayPermission === "No"} onChange={() => setHolidayPermission("No")}
                  className="accent-[#17b8c8]" />
                No
              </label>
            </div>
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

      {/* Document Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-[10px] bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17b8c8] px-5 py-3">
              <h4 className="text-sm font-semibold text-white">Document Upload</h4>
              <button type="button" onClick={() => setShowUploadModal(false)}
                className="flex size-6 items-center justify-center rounded text-white hover:bg-white/20">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-dark dark:text-white">Upload Document</span>
                <button type="button"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = ".png,.jpeg,.jpg,.pdf,.doc";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) setChooseFile(file.name);
                    };
                    input.click();
                  }}
                  className="rounded bg-[#17a2b8] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90">
                  Choose
                </button>
                <input type="text" value={chooseFile} readOnly
                  className="flex-1 rounded border border-stroke px-2 py-1.5 text-sm text-dark focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
              <p className="mt-2 text-xs text-red-500">
                File format: png, jpeg, pdf, doc and filesize should be less than 2MB
              </p>
              <div className="mt-4 flex justify-end">
                <button type="button"
                  onClick={() => { if (chooseFile) setUploadedDoc(chooseFile); setShowUploadModal(false); }}
                  className="rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LTCRequestCreatePage() {
  return (
    <Suspense>
      <LTCRequestForm />
    </Suspense>
  );
}
