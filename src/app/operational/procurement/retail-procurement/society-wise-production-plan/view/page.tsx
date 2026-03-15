"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK = {
  planCode: "RPPY1818-3 / Test_Plan_03",
  planFrom: "Jul-2018",
  planPeriodTo: "Sep-2018",
  regionCode: "",
  productVarietyCode: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS",
  createdDate: "15-Jul-2018",
  createdBy: "3596",
  approvedDate: "20-Jul-2018",
  approvedBy: "ANITHA G",
  dnpOfficeCode: "2107 / D&P OFFICE KANCHIPURAM",
  categoryCode: "C / Cotton Variety",
  groupCode: "11 / COTTON SAREES",
  varietyCode: "SHE6 / SAREES KANCHEE COTTON 5.50 MTRS",
  societyPlanFrom: "Jul-2018",
  societyPlanTo: "Sep-2018",
};

const MOCK_SOCIETIES = [
  { id: 1, societyCode: "1001 / KANCHIPURAM SOCIETY",  totalQuantity: 120 },
  { id: 2, societyCode: "1002 / SALEM SOCIETY",         totalQuantity: 85  },
  { id: 3, societyCode: "1003 / COIMBATORE SOCIETY",    totalQuantity: 200 },
  { id: 4, societyCode: "1004 / TRICHY SOCIETY",        totalQuantity: 150 },
  { id: 5, societyCode: "1005 / MADURAI SOCIETY",       totalQuantity: 95  },
];

const totalQty = MOCK_SOCIETIES.reduce((s, r) => s + r.totalQuantity, 0);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-[#17a2b8]">{value || "–"}</p>
  </div>
);

const ReadBox = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div>
    <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">{label}</label>
    <div className="flex">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
        {icon}
      </div>
      <div className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
        {value || <span className="text-gray-400">–</span>}
      </div>
    </div>
  </div>
);

const SectionHeader = ({ label }: { label: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{label}</h4>
  </div>
);

const CalIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function ViewSocietyWiseProductionPlanPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Retail Sales – Society Wise Production Plan
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Society Wise Production Plan</li>
          </ol>
        </nav>
      </div>

      {/* Step indicator */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white px-6 py-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="relative flex items-center">
          <div className="absolute left-0 right-0 top-5 h-px bg-gray-200 dark:bg-dark-3"></div>
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#28a745] bg-white text-sm font-bold text-[#28a745] dark:bg-gray-dark">
              1
            </div>
            <p className="mt-2 text-center text-xs font-medium text-dark dark:text-white">Society Wise Production Plan creation</p>
          </div>
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#28a745] bg-white text-sm font-bold text-[#28a745] dark:bg-gray-dark">
              2
            </div>
            <p className="mt-2 text-center text-xs font-medium text-dark dark:text-white">Society Wise Production Plan Approval</p>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Retail Sales – Society Wise Production Plan</h3>
        </div>

        <div className="p-5">
          {/* Production Plan Details */}
          <SectionHeader label="Production Plan Details" />
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ReadBox label="Plan Code / Name" value={MOCK.planCode} icon={
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
            } />
            <ReadBox label="Plan From" value={MOCK.planFrom} icon={<CalIcon />} />
            <ReadBox label="Plan Period To" value={MOCK.planPeriodTo} icon={<CalIcon />} />
            <div className="hidden lg:block"></div>

            {/* Region Code — spans 2 cols */}
            <div className="md:col-span-1 lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Region Code / Name</label>
              <div className="min-h-[64px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                {MOCK.regionCode || <span className="text-gray-400">–</span>}
              </div>
            </div>

            {/* Product Variety Code — spans 2 cols */}
            <div className="md:col-span-1 lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">Product Variety Code / Name</label>
              <div className="min-h-[64px] rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-[#17a2b8] dark:border-dark-3 dark:bg-dark-2">
                {MOCK.productVarietyCode}
              </div>
            </div>

            <ReadBox label="Created Date" value={MOCK.createdDate} icon={<CalIcon />} />
            <ReadBox label="Created By" value={MOCK.createdBy} icon={<UserIcon />} />
            <ReadBox label="Approved Date" value={MOCK.approvedDate} icon={<CalIcon />} />
            <ReadBox label="Approved By" value={MOCK.approvedBy} icon={<UserIcon />} />
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* D&P Office Details */}
          <SectionHeader label="D&P Office Details" />
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ReadBox label="D&P Office Code / Name" value={MOCK.dnpOfficeCode} icon={
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            } />
            <ReadBox label="Product Category Code / Name" value={MOCK.categoryCode} icon={
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>
            } />
            <ReadBox label="Product Group Code / Name" value={MOCK.groupCode} icon={
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            } />
            <ReadBox label="Product Variety Code / Name" value={MOCK.varietyCode} icon={
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>
            } />
            <ReadBox label="Society Plan From" value={MOCK.societyPlanFrom} icon={<CalIcon />} />
            <ReadBox label="Society Plan To" value={MOCK.societyPlanTo} icon={<CalIcon />} />
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Society Wise Production Plan Details table */}
          <SectionHeader label="Society Wise Production Plan Details" />
          <div className="mb-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Society Code / Name</th>
                  <th className="w-40 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Total Quantity</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SOCIETIES.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.societyCode}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.totalQuantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-[#1a2232]">
                  <td colSpan={2} className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">Total</td>
                  <td className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">{totalQty}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Back button */}
          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/operational/procurement/retail-procurement/society-wise-production-plan/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
