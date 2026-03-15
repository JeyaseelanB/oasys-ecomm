"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RECORD = {
  insuranceType: "LIC 1(TNY)",
  startMonth: "7",
  startYear: "2021",
  maturityMonth: "-",
  maturityYear: "-",
  policyNumber: "-",
  insurancePremium: "-",
  paymentCycle: "Monthly",
  sanctionedAmount: "-",
  insurancePremiumAmountPerYear: "288.00",
  totalPremiumAmount: "10.00",
  totalMembers: "1",
  totalPremiumAmountInclEmployee: "10.00",
  paymentCycleDetail: "Monthly",
};

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="4" height="4" rx="0.5"/><rect x="10" y="3" width="4" height="4" rx="0.5"/>
    <rect x="17" y="3" width="4" height="4" rx="0.5"/><rect x="3" y="10" width="4" height="4" rx="0.5"/>
    <rect x="10" y="10" width="4" height="4" rx="0.5"/><rect x="17" y="10" width="4" height="4" rx="0.5"/>
    <rect x="3" y="17" width="4" height="4" rx="0.5"/><rect x="10" y="17" width="4" height="4" rx="0.5"/>
    <rect x="17" y="17" width="4" height="4" rx="0.5"/>
  </svg>
);

export default function ViewInsurancePage() {
  const router = useRouter();
  const val = "text-sm font-semibold text-[#17a2b8]";
  const lbl = "mb-0.5 text-xs text-gray-500 dark:text-gray-400";

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Insurance</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Insurance</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Section Header */}
        <div className="bg-[#17a2b8] px-5 py-3">
          <span className="text-sm font-semibold text-white">Insurance</span>
        </div>

        <div className="p-5">
          {/* Main fields */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4 border-b border-stroke pb-5 dark:border-dark-3 lg:grid-cols-4">
            <div>
              <p className={lbl}>Insurance Type</p>
              <p className={val}>{RECORD.insuranceType}</p>
            </div>
            <div>
              <p className={lbl}>Start Month - Year</p>
              <p className={val}>{RECORD.startMonth} - {RECORD.startYear}</p>
            </div>
            <div>
              <p className={lbl}>Maturity Month - Year</p>
              <p className={val}>{RECORD.maturityMonth} - {RECORD.maturityYear}</p>
            </div>
          </div>

          {/* Other Insurance Details subsection */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              <GridIcon /> Other Insurance Details
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
              <div>
                <p className={lbl}>Policy Number</p>
                <p className={val}>{RECORD.policyNumber}</p>
              </div>
              <div>
                <p className={lbl}>Insurance Premium</p>
                <p className={val}>{RECORD.insurancePremium}</p>
              </div>
              <div>
                <p className={lbl}>Payment Cycle</p>
                <p className={val}>{RECORD.paymentCycle}</p>
              </div>
              <div>
                <p className={lbl}>Sanctioned Amount</p>
                <p className={val}>{RECORD.sanctionedAmount}</p>
              </div>
              <div>
                <p className={lbl}>Insurance Premium Amount Per Year</p>
                <p className={val}>₹ {RECORD.insurancePremiumAmountPerYear}</p>
              </div>
              <div>
                <p className={lbl}>Total Premium Amount</p>
                <p className={val}>₹ {RECORD.totalPremiumAmount}</p>
              </div>
              <div>
                <p className={lbl}>Total Members</p>
                <p className={val}>{RECORD.totalMembers}</p>
              </div>
              <div>
                <p className={lbl}>Total Premium Amount (incl. employee)</p>
                <p className={val}>₹ {RECORD.totalPremiumAmountInclEmployee}</p>
              </div>
              <div>
                <p className={lbl}>Payment Cycle</p>
                <p className={val}>{RECORD.paymentCycleDetail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-stroke px-5 py-4 dark:border-dark-3">
          <button onClick={() => router.push("/personnel/employee-self-service/insurance/list")}
            className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
