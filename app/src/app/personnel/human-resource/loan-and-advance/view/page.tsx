"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TEAL = "#2aa781";
const HEADER_BG = "#2d8f7b";

// Mock record for view
const MOCK_RECORD = {
  employeeId: "140",
  employeeName: "ARULRAJAN",
  designation: "ASSISTANT MANAGER",
  department: "FINANCE",
  cadre: "CLASS II",
  finYear: "2024-2025",
  loanType: "Recovery",
  recoveryType: "Festival Advance",
  loanEligibilityAmount: "75000.00",
  minLoanAmount: "10000.00",
  maxLoanAmount: "75000.00",
  recoveryAmount: "50000.00",
  interestRate: "6.00",
  noOfInstallments: "12",
  reason: "Festival advance required for Pongal festival expenses.",
  forwardTo: "ASSISTANT DIRECTOR",
  forwardFor: "APPROVAL",
  comments: "Request for festival advance as per entitlement.",
  createdDate: "10-Jan-2025",
  status: "FINAL-APPROVED",
  createdByName: "SANKARANARAYANAN",
  createdByDesignation: "ASSISTANT SALES MAN",
  createdByDate: "10-Jan-2025",
  approvedByName: "SUBRAMANIAM",
  approvedByDesignation: "ASSISTANT DIRECTOR",
  approvedByDate: "15-Jan-2025",
};

function ReadOnlyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 mb-2">
      <span className="text-xs text-gray-500 font-medium w-52 shrink-0 text-right">{label} :</span>
      <span className="text-xs text-gray-800 flex-1">{value}</span>
    </div>
  );
}

export default function ViewLoanAndAdvancePage() {
  const router = useRouter();
  const [showViewNote, setShowViewNote] = useState(false);
  const [viewNoteCardIdx, setViewNoteCardIdx] = useState(0);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [approveRemark, setApproveRemark] = useState("");
  const [rejectRemark, setRejectRemark] = useState("");

  const r = MOCK_RECORD;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Page title */}
      <div className="mb-3">
        <h1 className="text-base font-semibold text-gray-700">View Loan &amp; Advance Approval</h1>
      </div>

      {/* Section 1: Employee Details */}
      <div className="bg-white rounded shadow-sm mb-4 overflow-hidden">
        <div className="px-3 py-2" style={{ backgroundColor: HEADER_BG }}>
          <h2 className="text-xs font-semibold text-white">Employee Details</h2>
        </div>
        <div className="p-4 grid grid-cols-2 gap-x-8">
          <ReadOnlyRow label="Employee ID" value={r.employeeId} />
          <ReadOnlyRow label="Employee Name" value={r.employeeName} />
          <ReadOnlyRow label="Designation" value={r.designation} />
          <ReadOnlyRow label="Department" value={r.department} />
          <ReadOnlyRow label="Cadre" value={r.cadre} />
          <ReadOnlyRow label="Financial Year" value={r.finYear} />
        </div>
      </div>

      {/* Section 2: Financial Requirement */}
      <div className="bg-white rounded shadow-sm mb-4 overflow-hidden">
        <div className="px-3 py-2" style={{ backgroundColor: HEADER_BG }}>
          <h2 className="text-xs font-semibold text-white">Financial Requirement</h2>
        </div>
        <div className="p-4 grid grid-cols-2 gap-x-8">
          <ReadOnlyRow label="Type" value={r.loanType} />
          {r.loanType === "Recovery" && (
            <>
              <ReadOnlyRow label="Recovery Type" value={r.recoveryType} />
              <ReadOnlyRow label="Loan Eligibility Amount" value={r.loanEligibilityAmount} />
              <ReadOnlyRow label="Min Loan Amount" value={r.minLoanAmount} />
              <ReadOnlyRow label="Max Loan Amount" value={r.maxLoanAmount} />
              <ReadOnlyRow label="Recovery Amount" value={r.recoveryAmount} />
              <ReadOnlyRow label="Interest Rate (%)" value={r.interestRate} />
              <ReadOnlyRow label="No. of Installments" value={r.noOfInstallments} />
              <div className="col-span-2">
                <ReadOnlyRow label="Reason" value={r.reason} />
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
          <ReadOnlyRow label="Forward To" value={r.forwardTo} />
          <ReadOnlyRow label="Forward For" value={r.forwardFor} />
          <div className="col-span-2">
            <ReadOnlyRow label="Comments" value={r.comments} />
          </div>
          <ReadOnlyRow label="Created Date" value={r.createdDate} />
          <ReadOnlyRow label="Status" value={r.status} />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center mt-4">
        {/* Left: View Note */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowViewNote(true)}
            className="px-4 py-1.5 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: TEAL }}
          >
            View Note
          </button>
        </div>
        {/* Right: Approve / Reject / Back */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowApproveModal(true)}
            className="px-4 py-1.5 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: "#28a745" }}
          >
            Approve
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            className="px-4 py-1.5 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: "#dc3545" }}
          >
            Reject
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-1.5 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: "#6c757d" }}
          >
            Back
          </button>
        </div>
      </div>

      {/* View Note Modal */}
      {showViewNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[480px]">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-gray-700">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-gray-400 hover:text-gray-600 text-lg font-bold">×</button>
            </div>
            <div className="p-4 flex items-center justify-center gap-4">
              <button
                onClick={() => setViewNoteCardIdx((i) => Math.max(0, i - 1))}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold shrink-0"
              >
                ‹
              </button>
              <div className="flex gap-3 flex-1 justify-center">
                {/* Created By card */}
                <div className="border rounded p-3 flex-1 max-w-[180px]" style={{ borderColor: "#f97316" }}>
                  <p className="text-xs font-semibold text-gray-600 mb-1.5 text-center">Created By</p>
                  <p className="text-xs text-gray-700">Name : {r.createdByName}</p>
                  <p className="text-xs text-gray-700">Designation : {r.createdByDesignation}</p>
                  <p className="text-xs text-gray-700">Date : {r.createdByDate}</p>
                </div>
                {/* Final Approved By card */}
                <div className="border rounded p-3 flex-1 max-w-[180px]" style={{ borderColor: "#28a745" }}>
                  <p className="text-xs font-semibold text-gray-600 mb-1.5 text-center">Final Approved By</p>
                  <p className="text-xs text-gray-700">Name : {r.approvedByName}</p>
                  <p className="text-xs text-gray-700">Designation : {r.approvedByDesignation}</p>
                  <p className="text-xs text-gray-700">Date : {r.approvedByDate}</p>
                </div>
              </div>
              <button
                onClick={() => setViewNoteCardIdx((i) => i + 1)}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold shrink-0"
              >
                ›
              </button>
            </div>
            {/* Dot navigation */}
            <div className="flex justify-center gap-1.5 pb-3">
              {[0, 1].map((i) => (
                <span key={i} onClick={() => setViewNoteCardIdx(i)}
                  className="w-2 h-2 rounded-full cursor-pointer"
                  style={{ backgroundColor: viewNoteCardIdx === i ? TEAL : "#d1d5db" }} />
              ))}
            </div>
            <div className="flex justify-end px-4 pb-4">
              <button
                onClick={() => setShowViewNote(false)}
                className="px-4 py-1.5 text-xs font-semibold rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Remarks Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[420px]">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-gray-700">Approve Remarks</h3>
              <button onClick={() => setShowApproveModal(false)} className="text-gray-400 hover:text-gray-600 text-lg font-bold">×</button>
            </div>
            <div className="p-4">
              <label className="block text-xs text-gray-600 font-medium mb-1">Remarks</label>
              <textarea
                value={approveRemark}
                onChange={(e) => setApproveRemark(e.target.value)}
                rows={4}
                placeholder="Enter approval remarks..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-teal-400 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 px-4 pb-4">
              <button
                onClick={() => setShowApproveModal(false)}
                className="px-4 py-1.5 text-xs font-semibold rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowApproveModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-white rounded"
                style={{ backgroundColor: "#28a745" }}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Remarks Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[420px]">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-gray-700">Reject Remarks</h3>
              <button onClick={() => setShowRejectModal(false)} className="text-gray-400 hover:text-gray-600 text-lg font-bold">×</button>
            </div>
            <div className="p-4">
              <label className="block text-xs text-gray-600 font-medium mb-1">Remarks</label>
              <textarea
                value={rejectRemark}
                onChange={(e) => setRejectRemark(e.target.value)}
                rows={4}
                placeholder="Enter rejection reason..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-teal-400 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 px-4 pb-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-1.5 text-xs font-semibold rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-white rounded"
                style={{ backgroundColor: "#dc3545" }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
