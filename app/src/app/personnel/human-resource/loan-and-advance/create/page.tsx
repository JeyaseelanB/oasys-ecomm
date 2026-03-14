"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TEAL = "#2aa781";
const HEADER_BG = "#2d8f7b";

type FormState = {
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  cadre: string;
  finYear: string;
  loanType: string;
  recoveryType: string;
  loanEligibilityAmount: string;
  minLoanAmount: string;
  maxLoanAmount: string;
  recoveryAmount: string;
  interestRate: string;
  noOfInstallments: string;
  reason: string;
  forwardTo: string;
  forwardFor: string;
  comments: string;
};

const INIT: FormState = {
  employeeId: "",
  employeeName: "",
  designation: "",
  department: "",
  cadre: "",
  finYear: "2025-2026",
  loanType: "",
  recoveryType: "",
  loanEligibilityAmount: "",
  minLoanAmount: "",
  maxLoanAmount: "",
  recoveryAmount: "",
  interestRate: "",
  noOfInstallments: "",
  reason: "",
  forwardTo: "",
  forwardFor: "",
  comments: "",
};

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <label className="text-xs text-gray-600 font-medium w-48 shrink-0 text-right">{label} :</label>
      <div className="flex-1 max-w-xs">{children}</div>
    </div>
  );
}

function TextInput({
  value, onChange, placeholder = "", readOnly = false,
}: { value: string; onChange?: (v: string) => void; placeholder?: string; readOnly?: boolean }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      placeholder={placeholder}
      readOnly={readOnly}
      className="w-full border border-gray-300 rounded px-2 h-8 text-xs text-gray-800 bg-white focus:outline-none focus:border-teal-400"
    />
  );
}

function SelectInput({
  value, onChange, options, placeholder = "-- Select --",
}: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded px-2 h-8 text-xs text-gray-800 bg-white focus:outline-none focus:border-teal-400"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function IconInput({
  icon, value, onChange, placeholder = "",
}: { icon: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="flex h-8 border border-gray-300 rounded overflow-hidden">
      <div className="flex items-center justify-center px-2 text-white text-xs font-bold shrink-0" style={{ backgroundColor: TEAL, minWidth: 28 }}>
        {icon}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-2 text-xs text-gray-800 bg-white focus:outline-none"
      />
    </div>
  );
}

function DateInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex h-8 border border-gray-300 rounded overflow-hidden">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="DD-MMM-YYYY"
        className="flex-1 px-2 text-xs text-gray-800 bg-white focus:outline-none"
      />
      <button className="flex items-center justify-center px-2 shrink-0" style={{ backgroundColor: "#17a2b8" }}>
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
          <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
          <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}

const TOOLBAR_BUTTONS = [
  "Sans Serif", "Normal", "B", "I", "U", "S", "A", "Ā", "x₂", "x²", "H₁", "H₂", "❝", "</>",
  "≡", "•", "⇤", "⇥", "¶", "—", "🔗", "🖼", "⊞", "Tx",
];

export default function CreateLoanAndAdvancePage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INIT);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteCardIdx, setNoteCardIdx] = useState(0);

  const set = (key: keyof FormState) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const isRecovery = form.loanType === "Recovery";

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Page title */}
      <div className="mb-3">
        <h1 className="text-base font-semibold text-gray-700">Create Loans &amp; Advance</h1>
      </div>

      {/* Section 1: Employee Details */}
      <div className="bg-white rounded shadow-sm mb-4 overflow-hidden">
        <div className="px-3 py-2" style={{ backgroundColor: HEADER_BG }}>
          <h2 className="text-xs font-semibold text-white">Employee Details</h2>
        </div>
        <div className="p-4 grid grid-cols-2 gap-x-8">
          <FieldRow label="Employee ID">
            <IconInput icon="#" value={form.employeeId} onChange={set("employeeId")} placeholder="Employee ID" />
          </FieldRow>
          <FieldRow label="Employee Name">
            <TextInput value={form.employeeName} onChange={set("employeeName")} placeholder="Employee Name" />
          </FieldRow>
          <FieldRow label="Designation">
            <TextInput value={form.designation} onChange={set("designation")} placeholder="Designation" />
          </FieldRow>
          <FieldRow label="Department">
            <TextInput value={form.department} onChange={set("department")} placeholder="Department" />
          </FieldRow>
          <FieldRow label="Cadre">
            <TextInput value={form.cadre} onChange={set("cadre")} placeholder="Cadre" />
          </FieldRow>
          <FieldRow label="Financial Year">
            <SelectInput value={form.finYear} onChange={set("finYear")}
              options={["2023-2024", "2024-2025", "2025-2026", "2026-2027"]} />
          </FieldRow>
        </div>
      </div>

      {/* Section 2: Financial Requirement */}
      <div className="bg-white rounded shadow-sm mb-4 overflow-hidden">
        <div className="px-3 py-2" style={{ backgroundColor: HEADER_BG }}>
          <h2 className="text-xs font-semibold text-white">Financial Requirement</h2>
        </div>
        <div className="p-4 grid grid-cols-2 gap-x-8">
          <FieldRow label="Type">
            <SelectInput value={form.loanType} onChange={set("loanType")}
              options={["Advance", "Recovery"]} />
          </FieldRow>

          {isRecovery && (
            <>
              <FieldRow label="Recovery Type">
                <SelectInput value={form.recoveryType} onChange={set("recoveryType")}
                  options={["Festival Advance", "Vehicle Advance", "House Building Advance", "Computer Advance", "Education Loan", "Medical Advance"]} />
              </FieldRow>
              <FieldRow label="Loan Eligibility Amount">
                <div className="flex h-8 border border-gray-300 rounded overflow-hidden">
                  <div className="flex items-center justify-center px-2 text-white text-xs font-bold shrink-0" style={{ backgroundColor: TEAL, minWidth: 28 }}>
                    ₹
                  </div>
                  <input type="text" value={form.loanEligibilityAmount}
                    onChange={(e) => set("loanEligibilityAmount")(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-2 text-xs text-gray-800 bg-white focus:outline-none" />
                </div>
              </FieldRow>
              <FieldRow label="Min Loan Amount">
                <div className="flex h-8 border border-gray-300 rounded overflow-hidden">
                  <div className="flex items-center justify-center px-2 text-white text-xs font-bold shrink-0" style={{ backgroundColor: TEAL, minWidth: 28 }}>
                    ₹
                  </div>
                  <input type="text" value={form.minLoanAmount}
                    onChange={(e) => set("minLoanAmount")(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-2 text-xs text-gray-800 bg-white focus:outline-none" />
                </div>
              </FieldRow>
              <FieldRow label="Max Loan Amount">
                <div className="flex h-8 border border-gray-300 rounded overflow-hidden">
                  <div className="flex items-center justify-center px-2 text-white text-xs font-bold shrink-0" style={{ backgroundColor: TEAL, minWidth: 28 }}>
                    ₹
                  </div>
                  <input type="text" value={form.maxLoanAmount}
                    onChange={(e) => set("maxLoanAmount")(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-2 text-xs text-gray-800 bg-white focus:outline-none" />
                </div>
              </FieldRow>
              <FieldRow label="Recovery Amount">
                <div className="flex h-8 border border-gray-300 rounded overflow-hidden">
                  <div className="flex items-center justify-center px-2 text-white text-xs font-bold shrink-0" style={{ backgroundColor: TEAL, minWidth: 28 }}>
                    ₹
                  </div>
                  <input type="text" value={form.recoveryAmount}
                    onChange={(e) => set("recoveryAmount")(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-2 text-xs text-gray-800 bg-white focus:outline-none" />
                </div>
              </FieldRow>
              <FieldRow label="Interest Rate (%)">
                <TextInput value={form.interestRate} onChange={set("interestRate")} placeholder="0.00" />
              </FieldRow>
              <FieldRow label="No. of Installments">
                <TextInput value={form.noOfInstallments} onChange={set("noOfInstallments")} placeholder="0" />
              </FieldRow>
              <div className="col-span-2">
                <FieldRow label="Reason">
                  <textarea
                    value={form.reason}
                    onChange={(e) => set("reason")(e.target.value)}
                    rows={3}
                    placeholder="Enter reason..."
                    className="w-full border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 bg-white focus:outline-none focus:border-teal-400 resize-none"
                  />
                </FieldRow>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Section 3: Forward & Documents */}
      <div className="bg-white rounded shadow-sm mb-4 overflow-hidden">
        <div className="px-3 py-2" style={{ backgroundColor: HEADER_BG }}>
          <h2 className="text-xs font-semibold text-white">Forward &amp; Documents</h2>
        </div>
        <div className="p-4 grid grid-cols-2 gap-x-8">
          <FieldRow label="Forward To">
            <SelectInput value={form.forwardTo} onChange={set("forwardTo")}
              options={["SECTION OFFICER", "ASSISTANT DIRECTOR", "DEPUTY DIRECTOR", "DIRECTOR"]} />
          </FieldRow>
          <FieldRow label="Forward For">
            <SelectInput value={form.forwardFor} onChange={set("forwardFor")}
              options={["APPROVAL", "INFORMATION", "REVIEW", "ACTION"]} />
          </FieldRow>
          <div className="col-span-2">
            <FieldRow label="Upload Documents">
              <div className="flex items-center gap-2">
                <input type="file" className="text-xs text-gray-700 border border-gray-300 rounded px-2 py-1 bg-white" />
              </div>
            </FieldRow>
          </div>
          <div className="col-span-2">
            <FieldRow label="Comments">
              <textarea
                value={form.comments}
                onChange={(e) => set("comments")(e.target.value)}
                rows={3}
                placeholder="Enter comments..."
                className="w-full border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 bg-white focus:outline-none focus:border-teal-400 resize-none"
              />
            </FieldRow>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => router.back()}
          className="px-4 py-1.5 text-xs font-semibold text-white rounded"
          style={{ backgroundColor: "#6c757d" }}
        >
          Back
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNoteModal(true)}
            className="px-4 py-1.5 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: TEAL }}
          >
            Create Note
          </button>
          <button
            className="px-4 py-1.5 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: TEAL }}
            onClick={() => router.push("/personnel/human-resource/loan-and-advance/list")}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-gray-700">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-gray-400 hover:text-gray-600 text-lg font-bold">×</button>
            </div>
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 px-3 py-2 border-b bg-gray-50">
              {TOOLBAR_BUTTONS.map((btn) => (
                <button key={btn} className="px-1.5 py-0.5 text-[10px] border border-gray-300 rounded bg-white hover:bg-gray-100 text-gray-700 font-medium">
                  {btn}
                </button>
              ))}
            </div>
            {/* Textarea */}
            <div className="px-4 py-3">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter text ..."
                rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-teal-400 resize-none"
              />
            </div>
            {/* Created By Card with navigation */}
            <div className="px-4 pb-3 flex items-center justify-center gap-3">
              <button
                onClick={() => setNoteCardIdx((i) => Math.max(0, i - 1))}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold"
              >
                ‹
              </button>
              <div className="border rounded p-3 flex-1 max-w-xs" style={{ borderColor: "#f97316" }}>
                <p className="text-xs font-semibold text-gray-600 mb-1.5 text-center">Created By</p>
                <p className="text-xs text-gray-700">Name : SANKARANARAYANAN</p>
                <p className="text-xs text-gray-700">Designation : ASSISTANT SALES MAN</p>
                <p className="text-xs text-gray-700">Date : 13-Mar-2026</p>
              </div>
              <button
                onClick={() => setNoteCardIdx((i) => i + 1)}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold"
              >
                ›
              </button>
            </div>
            {/* Modal Footer */}
            <div className="flex justify-end gap-2 px-4 pb-4">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-1.5 text-xs font-semibold rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-white rounded"
                style={{ backgroundColor: TEAL }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
