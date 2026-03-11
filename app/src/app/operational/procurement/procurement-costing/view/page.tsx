"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SectionHeader = ({ label }: { label: string }) => (
  <div className="mb-4 flex items-center gap-2 border-t border-stroke pt-4 dark:border-dark-3">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{label}</h4>
  </div>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-medium text-[#17a2b8]">{value || "–"}</p>
  </div>
);

const MOCK = {
  categoryCode: "C / Cotton Variety",
  groupCode: "11 / COTTON SAREES",
  productCode: "SSEB / SAREES SALEM 80S WITH BLOUSE",
  designCode: "SALEM 80s SAREES - BLOUSE ATTACHED",
  periodFrom: "01-Apr-2025",
  periodTo: "30-Jun-2025",
  // Product Spec
  prodLength: "6.2",
  prodWidth: "117.0",
  warpYarnCount: "",
  weftYarnCount: "",
  warpYarnQuality: "",
  weftYarnQuality: "",
  warpYarnWeight: "0",
  weftYarnWeight: "0",
  endsPerInch: "76.0",
  picksPerInch: "68.0",
  hankYarnWeight: "0",
  // Yarn Details
  warpWastage: "10.0",
  weftWastage: "40.0",
  warpYarnRate: "50.0",
  weftYarnRate: "50.0",
  numberOfUnits: "100.0",
  weightPerUnit: "400.0",
  warpYarnGms: "200.0",
  weftYarnGms: "200.0",
  // Cost Details
  warpYarn: "10000.0",
  weftYarn: "10000.0",
  warpWastageAmt: "1000.0",
  weftWastageAmt: "4000.0",
  weavingWages: "200.0",
  preparatoryCharges: "20.0",
  profitPercentage: "10.0",
  totalRate: "27620.0",
  ratePerUnit: "276.0",
  labelCharge: "2.0",
  finishingCharge: "10.0",
  boxCharge: "10.0",
  polythinCoverCharge: "2.0",
  printingCharge: "5.0",
  coverCharge: "5.0",
  totalPurchasePrice: "320.0",
  createdDate: "21-Jul-2018",
  createdBy: "3596",
  modifiedDate: "Fri Feb 14 13:39:32 IST 2025",
  modifiedBy: "",
};

const OTHER_CHARGES = [
  { id: 1, name: "sticker", amount: 2.0 },
];

export default function ViewProcurementCostingPage() {
  const router = useRouter();
  const [showViewNoteModal, setShowViewNoteModal] = useState(false);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Procurement Costing</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Procurement Costing</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">View Procurement Costing</h3>
        </div>

        <div className="p-5">
          {/* Header fields */}
          <div className="mb-5 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
            <Field label="Product Category Code / Name" value={MOCK.categoryCode} />
            <Field label="Product Group Code / Name" value={MOCK.groupCode} />
            <Field label="Product Code / Name" value={MOCK.productCode} />
            <Field label="Design Code / Name" value={MOCK.designCode} />
            <Field label="Period From" value={MOCK.periodFrom} />
            <Field label="Period To" value={MOCK.periodTo} />
          </div>

          {/* Product Specification */}
          <SectionHeader label="Product Specification" />
          <div className="mb-5 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
            <Field label="Product Length (Meters)" value={MOCK.prodLength} />
            <Field label="Product Width (Meters)" value={MOCK.prodWidth} />
            <Field label="Warp Yarn Count" value={MOCK.warpYarnCount} />
            <Field label="Weft Yarn Weight (in gms)" value={MOCK.weftYarnWeight} />
            <Field label="Weft Yarn Count" value={MOCK.weftYarnCount} />
            <Field label="Weft Yarn Weight (in gms)" value={MOCK.weftYarnWeight} />
            <Field label="Ends Per Inch" value={MOCK.endsPerInch} />
            <Field label="Picks Per Inch" value={MOCK.picksPerInch} />
          </div>

          {/* Yarn Details */}
          <SectionHeader label="Yarn Details" />
          <div className="mb-5 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
            <Field label="Warp Wastage (%)" value={MOCK.warpWastage} />
            <Field label="Weft Wastage (%)" value={MOCK.weftWastage} />
            <Field label="Warp Yarn Rate" value={MOCK.warpYarnRate} />
            <Field label="Weft Yarn Rate" value={MOCK.weftYarnRate} />
            <Field label="Number of Units" value={MOCK.numberOfUnits} />
            <Field label="Weight Per Unit" value={MOCK.weightPerUnit} />
            <Field label="Warp Yarn (in gms)" value={MOCK.warpYarnGms} />
            <Field label="Weft Yarn (in gms)" value={MOCK.weftYarnGms} />
          </div>

          {/* Cost Details */}
          <SectionHeader label="Cost Details" />
          <div className="mb-5 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
            <Field label="Warp Yarn" value={MOCK.warpYarn} />
            <Field label="Weft Yarn" value={MOCK.weftYarn} />
            <Field label="Warp Wastage Amount" value={MOCK.warpWastageAmt} />
            <Field label="Weft Wastage Amount" value={MOCK.weftWastageAmt} />
            <Field label="Weaving Wages" value={MOCK.weavingWages} />
            <Field label="Profit Percentage" value={MOCK.profitPercentage} />
            <Field label="Total Rate" value={MOCK.totalRate} />
            <Field label="Rate Per Unit" value={MOCK.ratePerUnit} />
            <Field label="Preparatory Charges" value={MOCK.preparatoryCharges} />
            <Field label="Label Charge" value={MOCK.labelCharge} />
            <Field label="Finishing Charge" value={MOCK.finishingCharge} />
            <Field label="Box Charge" value={MOCK.boxCharge} />
            <Field label="Polythin Cover Charge" value={MOCK.polythinCoverCharge} />
            <Field label="Printing Charge" value={MOCK.printingCharge} />
            <Field label="Cover Charge" value={MOCK.coverCharge} />
            <Field label="Total Purchase Price" value={MOCK.totalPurchasePrice} />
            <Field label="Created Date" value={MOCK.createdDate} />
            <Field label="Created By" value={MOCK.createdBy} />
            <Field label="Modified Date" value={MOCK.modifiedDate} />
            <Field label="Modified By" value={MOCK.modifiedBy} />
          </div>

          {/* Other Charges table */}
          <div className="mb-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Other Charges Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Other Charges Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {OTHER_CHARGES.map((oc, idx) => (
                  <tr key={oc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3">{oc.name}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{oc.amount.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowViewNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Note
            </button>
            <button onClick={() => router.push("/operational/procurement/procurement-costing/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
      {showViewNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-[10px] bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">View Note</h3>
              <button onClick={() => setShowViewNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Note content */}
              <div className="mb-4 min-h-[140px] rounded border border-stroke bg-gray-50 px-4 py-3 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                Please Approve
              </div>
              {/* Pagination dot + arrows */}
              <div className="mb-4 flex items-center justify-end gap-2">
                <span className="size-2 rounded-full bg-[#17a2b8]"></span>
                <button className="flex size-6 items-center justify-center rounded border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                </button>
                <button className="flex size-6 items-center justify-center rounded border border-stroke text-gray-400 hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                </button>
              </div>
              {/* Final Approved By card */}
              <div className="inline-block rounded border-2 border-red-400 px-4 py-3">
                <p className="mb-1 text-xs font-semibold text-dark dark:text-white">Final Approved By</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Name : ANITHA G</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Designation : JUNIOR ASSISTANT</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Date : 2025-01-24 13:26:44.208</p>
              </div>
            </div>
            <div className="flex items-center justify-end border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowViewNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
