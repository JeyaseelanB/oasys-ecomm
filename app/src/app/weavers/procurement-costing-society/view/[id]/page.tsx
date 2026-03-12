"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/* ═══════════════════════════════════════════
   ICONS
═══════════════════════════════════════════ */
const SectionIcon = () => (
  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1" /><rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="10" width="4" height="4" rx="1" /><rect x="10" y="10" width="4" height="4" rx="1" />
  </svg>
);

/* ═══════════════════════════════════════════
   MOCK DATA  (matches screenshot exactly)
═══════════════════════════════════════════ */
const DATA = {
  /* header */
  category:    "D / Powerloom Variety",
  group:       "63 / POWERLOOM DHOTHIES",
  product:     "YDCH / PL SET DHOTHY 9 X 5",
  design:      "DOTHY-YDCH",
  periodFrom:  "01-Jan-2025",
  periodTo:    "31-Mar-2025",

  /* product specification */
  length:       "6.2",
  width:        "1.27",
  warpYarnType: "16",
  weftYarnWeightSpec: "",
  weftYarnType: "16",
  weftYarnWeightSpec2: "",
  endsPerInch:  "76.0",
  picksPerInch: "72.0",

  /* yarn details */
  warpWastage:    "4.0",
  weftWastage:    "1.0",
  warpYarnRate:   "270.0",
  weftYarnRate:   "120.0",
  numberOfUnits:  "100.0",
  weightPerUnit:  "545.15",
  warpYarnGms:    "233.16",
  weftYarnGms:    "227.02",

  /* cost details */
  warpYarn:           "62953.0",
  weftYarn:           "27242.0",
  warpWastageAmt:     "₹ 2,518.00",
  weftWastageAmt:     "₹ 272.00",
  weavingWages:       "123.0",
  profitPercentage:   "10.0",
  totalRate:          "₹ 102,167.00",
  ratePerUnit:        "₹ 1,022.00",
  preparatoryCharges: "10.0",
  label:              "5.0",
  finishing:          "4.0",
  totalPurchasePrice: "₹ 1,047.00",

  /* audit */
  createdDate:  "24-Jan-2025",
  createdBy:    "3669",
  modifiedDate: "24-Jan-2025",
  modifiedBy:   "3669",

  /* other charges */
  otherCharges: [
    { id: 1, name: "PACKING", amount: "2.00" },
  ],
};

/* ═══════════════════════════════════════════
   REUSABLE FIELD DISPLAY
═══════════════════════════════════════════ */

/** Label + teal value, stacked */
function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#17a2b8]">{value || <span className="text-gray-300">—</span>}</span>
    </div>
  );
}

/** Full-width horizontal rule between rows of fields */
function Divider() {
  return <hr className="col-span-full border-stroke dark:border-dark-3" />;
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function ViewProcurementCostingSocietyPage() {
  const router = useRouter();

  return (
    <div className="mx-auto space-y-5">

      {/* ── Breadcrumb ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Procurement Costing
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Procurement Costing</li>
          </ol>
        </nav>
      </div>

      {/* ══════════════════════════════════════════
          MAIN CARD
      ══════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Teal section header */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">View Procurement Costing</span>
        </div>

        <div className="p-5 space-y-0">

          {/* ── Header fields — 4 columns ── */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-stroke pb-4 dark:border-dark-3 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Product Category Code / Name" value={DATA.category} />
            <Field label="Product_group_code / Name"    value={DATA.group} />
            <Field label="Product Code / Name"          value={DATA.product} />
            <Field label="Design Code / Name"           value={DATA.design} />
          </div>

          {/* Period row */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-stroke py-4 dark:border-dark-3 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Period From" value={DATA.periodFrom} />
            <Field label="Period To"   value={DATA.periodTo} />
          </div>

          {/* ══════════════════════════
              PRODUCT SPECIFICATION
          ══════════════════════════ */}
          <div className="border-b border-stroke py-4 dark:border-dark-3">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <SectionIcon /> Product Specification
            </h3>

            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Product Length(Meters)"    value={DATA.length} />
              <Field label="Product Width(Meters)"     value={DATA.width} />
              <Field label="Warp Yarn Type"            value={DATA.warpYarnType} />
              <Field label="Weft Yarn Weight (in gms)" value={DATA.weftYarnWeightSpec} />
            </div>

            {/* Row 2 */}
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Weft Yarn Type"            value={DATA.weftYarnType} />
              <Field label="Weft Yarn Weight (in gms)" value={DATA.weftYarnWeightSpec2} />
              <Field label="Ends Per Inch"             value={DATA.endsPerInch} />
              <Field label="Picks Per Inch"            value={DATA.picksPerInch} />
            </div>
          </div>

          {/* ══════════════════════════
              YARN DETAILS
          ══════════════════════════ */}
          <div className="border-b border-stroke py-4 dark:border-dark-3">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <SectionIcon /> Yarn Details
            </h3>

            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Warp Wastage (%)"   value={DATA.warpWastage} />
              <Field label="Weft Wastage (%)"   value={DATA.weftWastage} />
              <Field label="Warp Yarn Rate"     value={DATA.warpYarnRate} />
              <Field label="Weft Yarn Rate"     value={DATA.weftYarnRate} />
            </div>

            {/* Row 2 */}
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Number of Units"    value={DATA.numberOfUnits} />
              <Field label="Weight Per Unit"    value={DATA.weightPerUnit} />
              <Field label="Warp Yarn (in gms)" value={DATA.warpYarnGms} />
              <Field label="Weft Yarn (in gms)" value={DATA.weftYarnGms} />
            </div>
          </div>

          {/* ══════════════════════════
              COST DETAILS
          ══════════════════════════ */}
          <div className="border-b border-stroke py-4 dark:border-dark-3">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <SectionIcon /> Cost Details
            </h3>

            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Warp Yarn"             value={DATA.warpYarn} />
              <Field label="Weft Yarn"             value={DATA.weftYarn} />
              <Field label="Warp Wastage Amount"   value={DATA.warpWastageAmt} />
              <Field label="Weft Wastage Amount"   value={DATA.weftWastageAmt} />
            </div>

            {/* Row 2 */}
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Weaving Wages"         value={DATA.weavingWages} />
              <Field label="Profit Percentage"     value={DATA.profitPercentage} />
              <Field label="Total Rate"            value={DATA.totalRate} />
              <Field label="Rate Per Unit"         value={DATA.ratePerUnit} />
            </div>

            {/* Row 3 */}
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Preparatory Charges"   value={DATA.preparatoryCharges} />
              <Field label="Label"                 value={DATA.label} />
              <Field label="Finishing"             value={DATA.finishing} />
              <Field label="Total Purchase Price"  value={DATA.totalPurchasePrice} />
            </div>
          </div>

          {/* ══════════════════════════
              AUDIT — Created / Modified
          ══════════════════════════ */}
          <div className="border-b border-stroke py-4 dark:border-dark-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Created Date"  value={DATA.createdDate} />
              <Field label="Created By"    value={DATA.createdBy} />
              <Field label="Modified Date" value={DATA.modifiedDate} />
              <Field label="Modified By"   value={DATA.modifiedBy} />
            </div>
          </div>

          {/* ══════════════════════════
              OTHER CHARGES TABLE
          ══════════════════════════ */}
          <div className="pt-2">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="border border-[#3aa88f] px-4 py-3 text-center font-semibold w-16">#</th>
                    <th className="border border-[#3aa88f] px-4 py-3 text-center font-semibold">Other Charges Name</th>
                    <th className="border border-[#3aa88f] px-4 py-3 text-center font-semibold">Other Charges Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {DATA.otherCharges.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-gray-400">No records found</td>
                    </tr>
                  ) : (
                    DATA.otherCharges.map((row, idx) => (
                      <tr
                        key={row.id}
                        className={`border-b border-stroke dark:border-dark-3 ${
                          idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"
                        }`}
                      >
                        <td className="border-r border-stroke px-4 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">
                          {idx + 1}
                        </td>
                        <td className="border-r border-stroke px-4 py-2.5 text-dark dark:border-dark-3 dark:text-white">
                          {row.name}
                        </td>
                        <td className="px-4 py-2.5 text-right text-dark dark:text-white">
                          {row.amount}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer — Back button only ── */}
      <div className="flex justify-end pb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="15,18 9,12 15,6" />
          </svg>
          Back
        </button>
      </div>

    </div>
  );
}