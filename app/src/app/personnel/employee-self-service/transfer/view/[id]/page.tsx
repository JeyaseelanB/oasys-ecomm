"use client";
import { useRouter } from "next/navigation";

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const DATA = {
  from: {
    headRegionalOffice: "HEAD OFFICE",
    entityType: "Head Office",
    entity: "HEAD OFFICE",
    section: "EDP",
  },
  to: {
    transferType: "IntraRegion",
    headRegionalOffice: "HEAD OFFICE",
    entityType: "Head Office",
    entity: "HEAD OFFICE",
    section: "Banking",
    reason: "",
  },
};

export function generateStaticParams() {
  return [];
}

export default function ViewTransferPage() {
  const router = useRouter();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-700 mb-1">View Transfer / Deputation Request</h1>
      <p className="text-sm text-gray-500 mb-4">
        <span className="text-gray-400">Home / Personnel / Employee Self Service / </span>View Transfer / Deputation Request
      </p>

      <div className="bg-white rounded shadow">
        {/* Card Header */}
        <div className="px-4 py-2 rounded-t" style={{ backgroundColor: "#17a2b8" }}>
          <span className="text-white font-semibold text-sm">Transfer / Deputation Request</span>
        </div>

        <div className="px-4 py-4">
          {/* Transfer From Section */}
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "#2d8f7b" }}><GridIcon /></span>
            <span className="font-semibold text-gray-700">Transfer From</span>
          </div>

          <div className="grid grid-cols-4 gap-x-4 mb-2">
            <div>
              <div className="text-xs text-gray-500 mb-1">Head / Regional Office</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Entity Type</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Entity</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Section</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-4 mb-6 pb-4 border-b border-gray-100">
            <div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.from.headRegionalOffice}</div>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.from.entityType}</div>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.from.entity}</div>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.from.section}</div>
            </div>
          </div>

          {/* Transfer To Section */}
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "#2d8f7b" }}><GridIcon /></span>
            <span className="font-semibold text-gray-700">Transfer To</span>
          </div>

          <div className="grid grid-cols-4 gap-x-4 mb-2">
            <div>
              <div className="text-xs text-gray-500 mb-1">Transfer Type</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Head / Regional Office</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Entity Type</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Entity</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-4 mb-4">
            <div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.to.transferType}</div>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.to.headRegionalOffice}</div>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.to.entityType}</div>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.to.entity}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-x-4 mb-2">
            <div>
              <div className="text-xs text-gray-500 mb-1">Section</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Reason</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-4">
            <div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.to.section}</div>
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.to.reason || "\u00a0"}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-4 py-3 border-t border-gray-200">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 px-4 py-2 text-sm text-white rounded"
            style={{ backgroundColor: "#17a2b8" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
