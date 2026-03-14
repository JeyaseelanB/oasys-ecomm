"use client";
import { useRouter } from "next/navigation";

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const RupeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12M6 8h12M6 13l8 8M6 13h3a6 6 0 000-12"/>
  </svg>
);

interface ReadonlyFieldProps {
  icon?: React.ReactNode;
  value: string;
}

const ReadonlyField = ({ icon, value }: ReadonlyFieldProps) => (
  <div className="flex items-center gap-1 rounded border border-gray-200 bg-gray-50 px-2 py-2">
    {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
    <span className="text-sm text-gray-700">{value}</span>
  </div>
);

const DATA = {
  current: {
    hoRo: "HEAD OFFICE",
    entityType: "Head Office",
    entity: "HEAD OFFICE",
    currentDesignation: "SUPERINTENDENT",
    reportingTo: "",
    currentPayscale: "6550.0 - 29000.0",
    currentBasicPay: "34740",
  },
  promotion: {
    hoRo: "HEAD OFFICE",
    entityType: "Head Office",
    entity: "HEAD OFFICE",
    promotedDesignation: "MANAGER D AND P INCHARGE",
    reportingTo: "ABDUL RAHUMAN ABDUL RAHUMAN",
    revisedPayscale: "250.0 - 500.0",
    revisedBasicPay: "35790",
    whetherOptionExercised: "Yes",
    optionsTaken: "Option B",
    comments: "tresrt",
  },
};

export function generateStaticParams() {
  return [];
}

export default function ViewPromotionPage() {
  const router = useRouter();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-700 mb-1">View Promotion</h1>
      <p className="text-sm text-gray-500 mb-4">
        <span className="text-gray-400">Home / Personnel / Employee Self Service / </span>View Promotion
      </p>

      <div className="bg-white rounded shadow">
        {/* Card Header */}
        <div className="px-4 py-2 rounded-t" style={{ backgroundColor: "#17a2b8" }}>
          <span className="text-white font-semibold text-sm">Promotion</span>
        </div>

        <div className="px-4 py-4">
          {/* Current Details */}
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "#2d8f7b" }}><GridIcon /></span>
            <span className="font-semibold text-gray-700">Current Details</span>
          </div>

          {/* Row 1: HO/RO | Entity Type | Entity | Current Designation */}
          <div className="grid grid-cols-4 gap-x-4 gap-y-1 mb-2">
            <div className="text-xs text-gray-500">HO/RO</div>
            <div className="text-xs text-gray-500">Entity Type</div>
            <div className="text-xs text-gray-500">Entity</div>
            <div className="text-xs text-gray-500">Current Designation</div>
          </div>
          <div className="grid grid-cols-4 gap-x-4 mb-4">
            <ReadonlyField icon={<BuildingIcon />} value={DATA.current.hoRo} />
            <ReadonlyField icon={<ListIcon />} value={DATA.current.entityType} />
            <ReadonlyField icon={<BuildingIcon />} value={DATA.current.entity} />
            <ReadonlyField icon={<PersonIcon />} value={DATA.current.currentDesignation} />
          </div>

          {/* Row 2: Reporting To | Current Payscale | Current Basic Pay */}
          <div className="grid grid-cols-4 gap-x-4 gap-y-1 mb-2">
            <div className="text-xs text-gray-500">Reporting To</div>
            <div className="text-xs text-gray-500">Current Payscale</div>
            <div className="text-xs text-gray-500">Current Basic Pay</div>
          </div>
          <div className="grid grid-cols-4 gap-x-4 mb-6 pb-4 border-b border-gray-100">
            <ReadonlyField icon={<PersonIcon />} value={DATA.current.reportingTo} />
            <ReadonlyField icon={<RupeeIcon />} value={DATA.current.currentPayscale} />
            <ReadonlyField icon={<RupeeIcon />} value={DATA.current.currentBasicPay} />
            <div />
          </div>

          {/* Promotion Details */}
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "#2d8f7b" }}><GridIcon /></span>
            <span className="font-semibold text-gray-700">Promotion Details</span>
          </div>

          {/* Row 1: HO/RO | Entity Type | Entity | Promoted Designation */}
          <div className="grid grid-cols-4 gap-x-4 gap-y-1 mb-2">
            <div className="text-xs text-gray-500">HO/RO</div>
            <div className="text-xs text-gray-500">Entity Type</div>
            <div className="text-xs text-gray-500">Entity</div>
            <div className="text-xs text-gray-500">Promoted Designation</div>
          </div>
          <div className="grid grid-cols-4 gap-x-4 mb-4">
            <ReadonlyField icon={<BuildingIcon />} value={DATA.promotion.hoRo} />
            <ReadonlyField icon={<ListIcon />} value={DATA.promotion.entityType} />
            <ReadonlyField icon={<BuildingIcon />} value={DATA.promotion.entity} />
            <ReadonlyField icon={<PersonIcon />} value={DATA.promotion.promotedDesignation} />
          </div>

          {/* Row 2: Reporting To | Revised Payscale | Revised Basic Pay */}
          <div className="grid grid-cols-4 gap-x-4 gap-y-1 mb-2">
            <div className="text-xs text-gray-500">Reporting To</div>
            <div className="text-xs text-gray-500">Revised Payscale</div>
            <div className="text-xs text-gray-500">Revised Basic Pay</div>
          </div>
          <div className="grid grid-cols-4 gap-x-4 mb-4">
            <ReadonlyField icon={<PersonIcon />} value={DATA.promotion.reportingTo} />
            <ReadonlyField icon={<RupeeIcon />} value={DATA.promotion.revisedPayscale} />
            <ReadonlyField icon={<RupeeIcon />} value={DATA.promotion.revisedBasicPay} />
            <div />
          </div>

          {/* Whether Option Exercised */}
          <div className="mb-1 text-xs text-gray-500">
            Whether Option Exercised <span className="text-red-500">*</span>
          </div>
          <div className="mb-4 w-80">
            <div className="flex items-center rounded border border-gray-200 bg-gray-50 px-2 py-2">
              <span className="text-sm text-gray-700">{DATA.promotion.whetherOptionExercised}</span>
            </div>
          </div>

          {/* Options Taken */}
          <div className="mb-1 text-xs text-gray-500">
            Options Taken <span className="text-red-500">*</span>
          </div>
          <div className="mb-4 w-80">
            <div className="flex items-center rounded border border-gray-200 bg-gray-50 px-2 py-2">
              <span className="text-sm text-gray-700">{DATA.promotion.optionsTaken}</span>
            </div>
          </div>

          {/* Comments */}
          <div className="mb-1 text-xs text-gray-500">
            Comments <span className="text-red-500">*</span>
          </div>
          <div className="mb-4">
            <div className="rounded border border-gray-200 bg-gray-50 px-3 py-3 min-h-[80px] text-sm text-gray-700 w-full">
              {DATA.promotion.comments}
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
