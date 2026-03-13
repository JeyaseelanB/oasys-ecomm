"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TEAL = "#2aa781";

type JoiningRow = {
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
  joiningDate: string;
  acceptStatus: "ACCEPTED" | "IN-PROGRESS" | "PENDING";
};

const STATUS_COLOR: Record<JoiningRow["acceptStatus"], string> = {
  "ACCEPTED":   "#28a745",
  "IN-PROGRESS":"#FFA70B",
  "PENDING":    "#6c757d",
};

const MOCK_ROWS: JoiningRow[] = [
  {
    id: 1,
    empCodeName: "253 / SARAVANAN P",
    currentHoRo: "VIJAYAWADA",
    currentEntityType: "Regional Office",
    currentEntity: "VIJAYAWADA",
    currentDesignation: "DEPUTY REGIONAL MANAGER (ADMIN)",
    currentPayscale: "7120-30000",
    currentBasicPay: "52120",
    promotedHoRo: "-",
    promotedEntityType: "-",
    promotedEntity: "-",
    promotedDesignation: "-",
    revisedPayscale: "-",
    revisedBasicPay: "-",
    balanceSecDeposit: "-",
    balanceSecDepEmi: "-",
    promotionOption: "Yes",
    optionTaken: "Option B",
    comments: "PROMOTION ACCEPTED",
    joiningDate: "",
    acceptStatus: "ACCEPTED",
  },
];

export default function JoiningDatePage() {
  const router = useRouter();
  const [rows, setRows] = useState<JoiningRow[]>(MOCK_ROWS);
  const [showViewNote, setShowViewNote] = useState(false);
  const [viewNoteCardIdx, setViewNoteCardIdx] = useState(0);

  const setJoiningDate = (id: number, val: string) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, joiningDate: val } : r));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-2">
        Home / Personnel / Human Resource / <span className="text-gray-700 font-medium">Joining Date</span>
      </div>

      <h1 className="text-base font-semibold text-gray-700 mb-3">View Promotion</h1>

      <div className="bg-white rounded shadow-sm mb-4 overflow-hidden">
        <div className="px-3 py-2" style={{ backgroundColor: TEAL }}>
          <h2 className="text-xs font-semibold text-white">Promotion</h2>
        </div>

        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <span className="text-xs font-semibold text-gray-700">List of Promotions</span>
          </div>
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="text-xs w-full border-collapse" style={{ minWidth: 1500 }}>
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
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Joining Date</th>
                  <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Accept Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
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
                      <div className="flex h-7 border border-gray-300 rounded overflow-hidden" style={{ minWidth: 130 }}>
                        <input
                          type="text"
                          value={row.joiningDate}
                          onChange={(e) => setJoiningDate(row.id, e.target.value)}
                          placeholder="dd-MMM-yyyy"
                          className="flex-1 px-1.5 text-xs text-gray-800 bg-white focus:outline-none"
                        />
                        <button className="flex items-center justify-center px-1.5 shrink-0"
                          style={{ backgroundColor: "#17a2b8" }}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-1.5 border-b border-gray-100">
                      <span className="px-2 py-0.5 rounded text-white text-[10px] font-semibold"
                        style={{ backgroundColor: STATUS_COLOR[row.acceptStatus] }}>
                        {row.acceptStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-3 pb-3">
          <button onClick={() => setShowViewNote(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: TEAL }}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            View Note
          </button>
          <div className="flex gap-2">
            <button onClick={() => router.push("/personnel/human-resource/promotion/list")}
              className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white rounded"
              style={{ backgroundColor: "#28a745" }}>
              ✓ Submit
            </button>
            <button onClick={() => router.back()}
              className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white rounded"
              style={{ backgroundColor: TEAL }}>
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showViewNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[700px]">
            <div className="flex items-center justify-between px-4 py-2 rounded-t-lg" style={{ backgroundColor: TEAL }}>
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNote(false)} className="text-white/80 hover:text-white text-lg font-bold">×</button>
            </div>
            <div className="p-4">
              <div className="w-full border border-gray-200 rounded bg-gray-50 px-3 py-2 min-h-[100px] text-xs text-gray-700">
                testdddd
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 px-4 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TEAL }} />
              <button onClick={() => setViewNoteCardIdx((i) => Math.max(0, i - 1))}
                className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold">‹</button>
              <button onClick={() => setViewNoteCardIdx((i) => i + 1)}
                className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold">›</button>
            </div>
            <div className="px-4 pb-4 flex gap-4">
              <div className="border rounded p-3 flex-1" style={{ borderColor: "#f97316" }}>
                <p className="text-xs font-semibold text-gray-600 mb-1.5">Created By</p>
                <p className="text-xs text-gray-700">Name : 252 / SANKARANARAYANAN C</p>
                <p className="text-xs text-gray-700">Designation : SUPERINTENDENT</p>
                <p className="text-xs text-gray-700">Date : 06-03-2025</p>
              </div>
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
    </div>
  );
}
