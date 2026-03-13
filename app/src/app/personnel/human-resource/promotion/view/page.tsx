"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TEAL = "#2aa781";

type PromotionViewRow = {
  id: number;
  empCodeName: string;
  currentHoRo: string;
  currentEntityType: string;
  currentEntity: string;
  currentDesignation: string;
  currentPayscale: string;
  currentBasicPay: string;
  promotedHoRo: string;
  promotedEntityType: string;
  promotedEntity: string;
  promotedDesignation: string;
  revisedPayscale: string;
  revisedBasicPay: string;
  balanceSecDeposit: string;
  balanceSecDepEmi: string;
  promotionOption: string;
  optionTaken: string;
  comments: string;
  status: "ACCEPTED" | "IN-PROGRESS" | "REJECTED";
};

const MOCK_ROWS: PromotionViewRow[] = [
  {
    id: 1,
    empCodeName: "191 / PREMKUMAR",
    currentHoRo: "D&P OFFICE ERODE",
    currentEntityType: "D & P Office",
    currentEntity: "D&P OFFICE ERODE",
    currentDesignation: "DEPUTY MANAGER(D&P)",
    currentPayscale: "7120-30000",
    currentBasicPay: "64380",
    promotedHoRo: "COIMBATORE",
    promotedEntityType: "D & P Office",
    promotedEntity: "D&P Office Erode",
    promotedDesignation: "MANAGER CONTRACT AND GARMENTS",
    revisedPayscale: "28480.0-90570.0",
    revisedBasicPay: "66320.0",
    balanceSecDeposit: "28480.00",
    balanceSecDepEmi: "-",
    promotionOption: "-",
    optionTaken: "-",
    comments: "-",
    status: "IN-PROGRESS",
  },
];

const STATUS_COLOR: Record<PromotionViewRow["status"], string> = {
  "ACCEPTED":   "#28a745",
  "IN-PROGRESS":"#FFA70B",
  "REJECTED":   "#dc3545",
};

export default function ViewPromotionPage() {
  const router = useRouter();

  const [showViewNote,    setShowViewNote]    = useState(false);
  const [viewNoteCardIdx, setViewNoteCardIdx] = useState(0);
  const [showComments,    setShowComments]    = useState(false);
  const [commentTab,      setCommentTab]      = useState<"approve" | "reject">("approve");

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-2">
        Home / Personnel / Human Resource / <span className="text-gray-700 font-medium">View Promotion</span>
      </div>

      <h1 className="text-base font-semibold text-gray-700 mb-3">View Promotion</h1>

      {/* Promotion card */}
      <div className="bg-white rounded shadow-sm mb-4 overflow-hidden">
        <div className="px-3 py-2" style={{ backgroundColor: TEAL }}>
          <h2 className="text-xs font-semibold text-white">Promotion</h2>
        </div>

        {/* List of Promotions */}
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <span className="text-xs font-semibold text-gray-700">List of Promotions</span>
          </div>
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="text-xs w-full border-collapse" style={{ minWidth: 1400 }}>
              <thead>
                <tr style={{ backgroundColor: TEAL }}>
                  <th className="px-2 py-2 text-white text-center font-semibold border border-white/30 w-8">#</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Employee Code / Name</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current HO/RO</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current Entity Type</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current Entity</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current Designation</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current Payscale</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current Basic Pay</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Promoted HO/RO</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Promoted Entity Type</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Promoted Entity</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Promoted Designation</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Revised Payscale</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Revised Basic Pay</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Balance Security Deposit</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Balance Security Deposit EMI</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Promotion Option</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Option Taken</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Comments</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Accept Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ROWS.map((row, idx) => (
                  <tr key={row.id} style={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#f9fafb" }}>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-center text-gray-700">{idx + 1}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700 whitespace-nowrap">{row.empCodeName}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.currentHoRo}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.currentEntityType}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.currentEntity}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.currentDesignation}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.currentPayscale}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.currentBasicPay}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.promotedHoRo}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.promotedEntityType}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.promotedEntity}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.promotedDesignation}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.revisedPayscale}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.revisedBasicPay}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.balanceSecDeposit}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.balanceSecDepEmi}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.promotionOption}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.optionTaken}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{row.comments}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100">
                      <span className="px-2 py-0.5 rounded text-white text-[10px] font-semibold"
                        style={{ backgroundColor: STATUS_COLOR[row.status] }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer buttons inside card */}
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex gap-2">
            {/* View Note */}
            <button onClick={() => setShowViewNote(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white rounded"
              style={{ backgroundColor: TEAL }}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              View Note
            </button>
            {/* Comments */}
            <button onClick={() => setShowComments(true)}
              className="flex items-center justify-center w-8 h-8 rounded text-white"
              style={{ backgroundColor: TEAL }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
          <button onClick={() => router.back()}
            className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: TEAL }}>
            ← Back
          </button>
        </div>
      </div>

      {/* ── View Note Modal ── */}
      {showViewNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[700px] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-2 rounded-t-lg" style={{ backgroundColor: TEAL }}>
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-white/80 hover:text-white text-lg font-bold">×</button>
            </div>
            {/* Note text area */}
            <div className="p-4">
              <div className="w-full border border-gray-200 rounded bg-gray-50 px-3 py-2 min-h-[120px] text-xs text-gray-700">
                testdddd
              </div>
            </div>
            {/* Navigation dots + arrows */}
            <div className="flex items-center justify-end gap-1 px-4 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TEAL }} />
              <button onClick={() => setViewNoteCardIdx((i) => Math.max(0, i - 1))}
                className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold">‹</button>
              <button onClick={() => setViewNoteCardIdx((i) => i + 1)}
                className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold">›</button>
            </div>
            {/* Two cards */}
            <div className="px-4 pb-4 flex gap-4">
              {/* Created By – orange border */}
              <div className="border rounded p-3 flex-1" style={{ borderColor: "#f97316" }}>
                <p className="text-xs font-semibold text-gray-600 mb-1.5">Created By</p>
                <p className="text-xs text-gray-700">Name : 252 / SANKARANARAYANAN C</p>
                <p className="text-xs text-gray-700">Designation : SUPERINTENDENT</p>
                <p className="text-xs text-gray-700">Date : 06-03-2025</p>
              </div>
              {/* Forwarded By – gray border */}
              <div className="border border-gray-300 rounded p-3 flex-1">
                <p className="text-xs text-gray-700">Name : 261 / USHA M</p>
                <p className="text-xs text-gray-700">Designation : AUDITOR</p>
                <p className="text-xs text-gray-700">Date : 06-03-2025</p>
              </div>
            </div>
            <div className="flex justify-end px-4 pb-4">
              <button onClick={() => setShowViewNote(false)}
                className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white rounded"
                style={{ backgroundColor: "#6c757d" }}>
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Comments Modal ── */}
      {showComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[700px]">
            <div className="flex items-center justify-between px-4 py-2 rounded-t-lg" style={{ backgroundColor: TEAL }}>
              <h3 className="text-sm font-semibold text-white">Comments</h3>
              <button onClick={() => setShowComments(false)} className="text-white/80 hover:text-white text-lg font-bold">×</button>
            </div>
            {/* Tabs */}
            <div className="flex gap-0 border-b border-gray-200 px-4 pt-2">
              <button
                onClick={() => setCommentTab("approve")}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
                  commentTab === "approve"
                    ? "border-[#2aa781] text-[#2aa781]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {/* Thumbs Up */}
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zm-7 11H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2v11z"/>
                </svg>
                Approve
              </button>
              <button
                onClick={() => setCommentTab("reject")}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
                  commentTab === "reject"
                    ? "border-[#dc3545] text-[#dc3545]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {/* Thumbs Down */}
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10zm7-13h1.67A2.31 2.31 0 0 1 21 4v7a2.31 2.31 0 0 1-2.33 2H17V2z"/>
                </svg>
                Reject
              </button>
            </div>

            {/* Tab content */}
            <div className="p-4">
              {commentTab === "approve" && (
                <table className="w-full text-xs border border-gray-200 rounded">
                  <tbody>
                    <tr>
                      <td className="px-3 py-3 font-semibold text-gray-700 border-r border-gray-200 bg-gray-50 w-36 align-top">
                        Approve Comments
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 w-20">Given By</span>
                            <span className="px-2 py-0.5 rounded text-white text-[11px] font-semibold"
                              style={{ backgroundColor: "#28a745" }}>
                              USHA M
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 w-20">Given Date</span>
                            <span className="px-2 py-0.5 rounded border border-red-400 text-red-500 text-[11px] font-semibold">
                              06-MAR-2025
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-l border-gray-200">
                        <textarea rows={3} defaultValue="v"
                          className="w-full border border-gray-200 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none resize-none" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              {commentTab === "reject" && (
                <table className="w-full text-xs border border-gray-200 rounded">
                  <tbody>
                    <tr>
                      <td className="px-3 py-3 font-semibold text-gray-700 border-r border-gray-200 bg-gray-50 w-36 align-top">
                        Reject Comments
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-gray-400 italic text-xs">No reject comments available.</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
