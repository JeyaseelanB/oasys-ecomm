"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

const RupeeBox = ({ value }: { value: string }) => (
  <div className="flex max-w-[200px] items-center rounded border border-stroke dark:border-dark-3">
    <span className="flex size-8 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 text-sm font-medium text-gray-600 dark:border-dark-3 dark:bg-gray-700 dark:text-gray-400">₹</span>
    <span className="flex-1 px-3 py-1.5 text-right text-sm text-gray-700 dark:text-gray-300">{value}</span>
  </div>
);

export default function ViewIncomeTaxWorksheetPage() {
  const router = useRouter();

  const record = {
    hoRo: "HEAD OFFICE", entityType: "Head Office", entity: "HEAD OFFICE",
    employee: "ALOK BABELAY / 137", year: "2023 / 2024",
    designation: "CHIEF GENERAL MANAGER", gender: "Male", pfNumber: "3191",
    // Income
    incomeFromSalaries: "2198640", tentativeIncome: "185746", eplSalary: "0",
    salesCommission: "0", incentive: "0", bonusSpecial: "0", eplSalaryArrears: "0",
    others: "0", totalGrossIncome: "2198640",
    // 80D
    savings80D: [
      { id: 1, item: "STD_DEDUCT/STANDARD DEDUCTION",    amount: "50000", desc: "" },
      { id: 2, item: "287/GROUP MEDICAL INSURANCE SCHEME", amount: "0",   desc: "" },
    ],
    total80D: "50000",
    // 80C
    savings80C: [
      { id: 1, item: "270/PROVIDENT FUND",              amount: "257269", desc: "" },
      { id: 2, item: "PFVC/VOLUNTARY PROVIDENT FUND",   amount: "240000", desc: "" },
    ],
    total80C: "497269", totalTaxableIncome: "1998640",
    // Rebate
    rebate: [
      { id: 1, item: "TAX ON TOTAL INCOME",             amount: "412092", desc: "" },
      { id: 2, item: "SURCHARGE",                        amount: "0",      desc: "" },
      { id: 3, item: "HEALTH & EDUCATION CESS",          amount: "16484",  desc: "" },
    ],
    totalTaxPayable: "428576",
    taxPaidSoFar: "307000", balanceTax: "105576",
    actualIncomeTax: "412092",
  };

  const SectionTable = ({ rows }: { rows: { id: number; item: string; amount: string; desc: string }[] }) => (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-[#2d8f7b] text-white">
          <th className="w-10 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
          <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Tax Filing Items</th>
          <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Amount (₹)</th>
          <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, idx) => (
          <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
            <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
            <td className="border border-stroke px-3 py-2 dark:border-dark-3">{r.item}</td>
            <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{r.amount}</td>
            <td className="border border-stroke px-3 py-2 dark:border-dark-3">{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Income Tax Worksheet</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Income Tax Worksheet</li>
          </ol>
        </nav>
      </div>

      <div className="space-y-5">
        {/* Card 1 – Header Info */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Income Tax Worksheet</h3>
            <span className="text-lg leading-none text-white">—</span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#2d8f7b]">{record.hoRo}</p></div>
              <div><p className="text-xs text-gray-500">Entity Type</p><p className="text-sm font-medium text-[#2d8f7b]">{record.entityType}</p></div>
              <div><p className="text-xs text-gray-500">Entity</p><p className="text-sm font-medium text-[#2d8f7b]">{record.entity}</p></div>
              <div><p className="text-xs text-gray-500">Employee</p><p className="text-sm font-medium text-[#2d8f7b]">{record.employee}</p></div>
              <div><p className="text-xs text-gray-500">Year</p><p className="text-sm font-medium text-[#2d8f7b]">{record.year}</p></div>
            </div>
          </div>
        </div>

        {/* Card 2 – Employee Details + Income + Deductions */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="p-5 space-y-6">
            {/* Employee Details */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 border-b border-stroke pb-5 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
                <div><p className="text-xs text-gray-500">Designation</p><p className="text-sm font-medium text-[#2d8f7b]">{record.designation}</p></div>
                <div><p className="text-xs text-gray-500">Gender</p><p className="text-sm font-medium text-[#2d8f7b]">{record.gender}</p></div>
                <div><p className="text-xs text-gray-500">Provident Fund Number</p><p className="text-sm font-medium text-[#2d8f7b]">{record.pfNumber}</p></div>
              </div>
            </div>

            {/* Income */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Income</h4>
                </div>
                <button className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                  Tentative Income
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 border-b border-stroke pb-5 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
                <div><p className="text-xs text-gray-500">Income From Salaries</p><p className="text-sm font-medium text-[#2d8f7b]">₹ {record.incomeFromSalaries}</p></div>
                <div><p className="text-xs text-gray-500">Tentative Income</p><p className="text-sm font-medium text-[#2d8f7b]">₹ {record.tentativeIncome}</p></div>
                <div><p className="text-xs text-gray-500">EPL Salary</p><p className="text-sm font-medium text-[#2d8f7b]">₹ {record.eplSalary}</p></div>
                <div><p className="text-xs text-gray-500">Sales Commission</p><p className="text-sm font-medium text-[#2d8f7b]">{record.salesCommission}</p></div>
                <div><p className="text-xs text-gray-500">Incentive</p><p className="text-sm font-medium text-[#2d8f7b]">{record.incentive}</p></div>
                <div><p className="text-xs text-gray-500">Bonus / Special Sales Commission</p><p className="text-sm font-medium text-[#2d8f7b]">{record.bonusSpecial}</p></div>
                <div><p className="text-xs text-gray-500">EPL Salary Arrears</p><p className="text-sm font-medium text-[#2d8f7b]">{record.eplSalaryArrears}</p></div>
                <div><p className="text-xs text-gray-500">Others</p><p className="text-sm font-medium text-[#2d8f7b]">{record.others}</p></div>
                <div><p className="text-xs text-gray-500">Total Gross Income (A)</p><p className="text-sm font-medium text-[#2d8f7b]">{record.totalGrossIncome}</p></div>
              </div>
            </div>

            {/* Savings 80D */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Savings 80D</h4>
              </div>
              <div className="mb-3 overflow-x-auto"><SectionTable rows={record.savings80D} /></div>
              <div className="flex flex-wrap items-center gap-4 border-b border-stroke pb-5 dark:border-dark-3">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Total 80D Deductions</p>
                  <RupeeBox value={record.total80D} />
                </div>
              </div>
            </div>

            {/* Savings 80C */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Savings 80C</h4>
              </div>
              <div className="mb-3 overflow-x-auto"><SectionTable rows={record.savings80C} /></div>
              <p className="mb-3 text-xs">
                Note : <span className="font-medium text-[#2d8f7b]">Restricted to Maximum 1,50,000</span>
              </p>
              <div className="flex flex-wrap items-center gap-6 border-b border-stroke pb-5 dark:border-dark-3">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Total 80C Deductions</p>
                  <RupeeBox value={record.total80C} />
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Total Taxable Income</p>
                  <RupeeBox value={record.totalTaxableIncome} />
                </div>
              </div>
            </div>

            {/* Rebate */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Rebate</h4>
              </div>
              <div className="mb-3 overflow-x-auto"><SectionTable rows={record.rebate} /></div>
              <div className="flex flex-wrap items-center gap-6 border-b border-stroke pb-5 dark:border-dark-3">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Total Tax Payable</p>
                  <RupeeBox value={record.totalTaxPayable} />
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Tax Paid So Far</p>
                  <RupeeBox value={record.taxPaidSoFar} />
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Balance Tax to be Paid</p>
                  <RupeeBox value={record.balanceTax} />
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Actual Income Tax</p>
                  <RupeeBox value={record.actualIncomeTax} />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => router.push("/personnel/human-resource/pay-roll/income-tax-worksheet/list")}
                className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
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
    </div>
  );
}
