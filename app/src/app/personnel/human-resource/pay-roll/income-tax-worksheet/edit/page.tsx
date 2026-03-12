"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

type DeductionRow = { id: number; item: string; amount: string; desc: string };

const NOTE_HISTORY = [
  { by: "ADMIN", date: "10-Jan-2024", text: "Initial review completed. All salary components verified." },
  { by: "HR MANAGER", date: "15-Jan-2024", text: "80C deductions updated. PF and VPF amounts confirmed." },
];

export default function EditIncomeTaxWorksheetPage() {
  const router = useRouter();

  // Header fields
  const [hoRo] = useState("HEAD OFFICE");
  const [entityType] = useState("Head Office");
  const [entity] = useState("HEAD OFFICE");
  const [employee] = useState("ALOK BABELAY / 137");
  const [year] = useState("2023 / 2024");

  // Employee details
  const [designation] = useState("CHIEF GENERAL MANAGER");
  const [gender] = useState("Male");
  const [pfNumber] = useState("3191");

  // Income fields
  const [incomeFromSalaries, setIncomeFromSalaries] = useState("2198640");
  const [tentativeIncome, setTentativeIncome] = useState("185746");
  const [eplSalary, setEplSalary] = useState("0");
  const [salesCommission, setSalesCommission] = useState("0");
  const [incentive, setIncentive] = useState("0");
  const [bonusSpecial, setBonusSpecial] = useState("0");
  const [eplSalaryArrears, setEplSalaryArrears] = useState("0");
  const [others, setOthers] = useState("0");

  const totalGrossIncome = (
    parseFloat(incomeFromSalaries || "0") +
    parseFloat(tentativeIncome || "0") +
    parseFloat(eplSalary || "0") +
    parseFloat(salesCommission || "0") +
    parseFloat(incentive || "0") +
    parseFloat(bonusSpecial || "0") +
    parseFloat(eplSalaryArrears || "0") +
    parseFloat(others || "0")
  ).toFixed(0);

  // 80D rows
  const [savings80D, setSavings80D] = useState<DeductionRow[]>([
    { id: 1, item: "STD_DEDUCT/STANDARD DEDUCTION",    amount: "50000", desc: "" },
    { id: 2, item: "287/GROUP MEDICAL INSURANCE SCHEME", amount: "0",   desc: "" },
  ]);

  const total80D = savings80D.reduce((s, r) => s + parseFloat(r.amount || "0"), 0).toFixed(0);

  // 80C rows
  const [savings80C, setSavings80C] = useState<DeductionRow[]>([
    { id: 1, item: "270/PROVIDENT FUND",            amount: "257269", desc: "" },
    { id: 2, item: "PFVC/VOLUNTARY PROVIDENT FUND", amount: "240000", desc: "" },
  ]);

  const raw80C = savings80C.reduce((s, r) => s + parseFloat(r.amount || "0"), 0);
  const capped80C = Math.min(raw80C, 150000).toFixed(0);

  const totalTaxableIncome = Math.max(
    0,
    parseFloat(totalGrossIncome) - parseFloat(total80D) - parseFloat(capped80C)
  ).toFixed(0);

  // Rebate rows
  const [rebate, setRebate] = useState<DeductionRow[]>([
    { id: 1, item: "TAX ON TOTAL INCOME",   amount: "412092", desc: "" },
    { id: 2, item: "SURCHARGE",              amount: "0",      desc: "" },
    { id: 3, item: "HEALTH & EDUCATION CESS", amount: "16484", desc: "" },
  ]);

  const totalTaxPayable = rebate.reduce((s, r) => s + parseFloat(r.amount || "0"), 0).toFixed(0);

  const [taxPaidSoFar, setTaxPaidSoFar] = useState("307000");
  const balanceTax = Math.max(0, parseFloat(totalTaxPayable) - parseFloat(taxPaidSoFar || "0")).toFixed(0);
  const actualIncomeTax = rebate.find((r) => r.item === "TAX ON TOTAL INCOME")?.amount ?? "0";

  const update80D = (id: number, field: keyof DeductionRow, val: string) =>
    setSavings80D((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));

  const update80C = (id: number, field: keyof DeductionRow, val: string) =>
    setSavings80C((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));

  const updateRebate = (id: number, field: keyof DeductionRow, val: string) =>
    setRebate((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));

  // Note modal
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteIndex, setNoteIndex] = useState(0);
  const [noteFontFamily, setNoteFontFamily] = useState("Arial");
  const [noteFontSize, setNoteFontSize] = useState("14");

  const EditableTable = ({
    rows,
    onUpdate,
  }: {
    rows: DeductionRow[];
    onUpdate: (id: number, field: keyof DeductionRow, val: string) => void;
  }) => (
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
            <td className="border border-stroke px-3 py-2 dark:border-dark-3">
              <input
                type="number"
                value={r.amount}
                onChange={(e) => onUpdate(r.id, "amount", e.target.value)}
                className="w-full rounded border border-stroke px-2 py-1 text-right text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </td>
            <td className="border border-stroke px-3 py-2 dark:border-dark-3">
              <input
                type="text"
                value={r.desc}
                onChange={(e) => onUpdate(r.id, "desc", e.target.value)}
                placeholder="—"
                className="w-full rounded border border-stroke px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const inputCls =
    "w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white";

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Income Tax Worksheet</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Income Tax Worksheet</li>
          </ol>
        </nav>
      </div>

      <div className="space-y-5">
        {/* Card 1 – Header Info */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Income Tax Worksheet</h3>
            <span className="text-xs text-white/80">( * Mandatory Fields)</span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#2d8f7b]">{hoRo}</p></div>
              <div><p className="text-xs text-gray-500">Entity Type</p><p className="text-sm font-medium text-[#2d8f7b]">{entityType}</p></div>
              <div><p className="text-xs text-gray-500">Entity</p><p className="text-sm font-medium text-[#2d8f7b]">{entity}</p></div>
              <div><p className="text-xs text-gray-500">Employee</p><p className="text-sm font-medium text-[#2d8f7b]">{employee}</p></div>
              <div><p className="text-xs text-gray-500">Year</p><p className="text-sm font-medium text-[#2d8f7b]">{year}</p></div>
            </div>
          </div>
        </div>

        {/* Card 2 – Editable Details */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="p-5 space-y-6">
            {/* Employee Details */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 border-b border-stroke pb-5 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
                <div><p className="text-xs text-gray-500">Designation</p><p className="text-sm font-medium text-[#2d8f7b]">{designation}</p></div>
                <div><p className="text-xs text-gray-500">Gender</p><p className="text-sm font-medium text-[#2d8f7b]">{gender}</p></div>
                <div><p className="text-xs text-gray-500">Provident Fund Number</p><p className="text-sm font-medium text-[#2d8f7b]">{pfNumber}</p></div>
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
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Income From Salaries <span className="text-red-500">*</span></label>
                  <input type="number" value={incomeFromSalaries} onChange={(e) => setIncomeFromSalaries(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Tentative Income</label>
                  <input type="number" value={tentativeIncome} onChange={(e) => setTentativeIncome(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">EPL Salary</label>
                  <input type="number" value={eplSalary} onChange={(e) => setEplSalary(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Sales Commission</label>
                  <input type="number" value={salesCommission} onChange={(e) => setSalesCommission(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Incentive</label>
                  <input type="number" value={incentive} onChange={(e) => setIncentive(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Bonus / Special Sales Commission</label>
                  <input type="number" value={bonusSpecial} onChange={(e) => setBonusSpecial(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">EPL Salary Arrears</label>
                  <input type="number" value={eplSalaryArrears} onChange={(e) => setEplSalaryArrears(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Others</label>
                  <input type="number" value={others} onChange={(e) => setOthers(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Total Gross Income (A)</p>
                  <p className="text-sm font-semibold text-[#2d8f7b]">₹ {parseFloat(totalGrossIncome).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Savings 80D */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Savings 80D</h4>
              </div>
              <div className="mb-3 overflow-x-auto">
                <EditableTable rows={savings80D} onUpdate={update80D} />
              </div>
              <div className="flex flex-wrap items-center gap-4 border-b border-stroke pb-5 dark:border-dark-3">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Total 80D Deductions</p>
                  <RupeeBox value={parseFloat(total80D).toLocaleString()} />
                </div>
              </div>
            </div>

            {/* Savings 80C */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Savings 80C</h4>
              </div>
              <div className="mb-3 overflow-x-auto">
                <EditableTable rows={savings80C} onUpdate={update80C} />
              </div>
              <p className="mb-3 text-xs">
                Note : <span className="font-medium text-[#2d8f7b]">Restricted to Maximum 1,50,000</span>
              </p>
              <div className="flex flex-wrap items-center gap-6 border-b border-stroke pb-5 dark:border-dark-3">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Total 80C Deductions</p>
                  <RupeeBox value={parseFloat(capped80C).toLocaleString()} />
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Total Taxable Income</p>
                  <RupeeBox value={parseFloat(totalTaxableIncome).toLocaleString()} />
                </div>
              </div>
            </div>

            {/* Rebate */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Rebate</h4>
              </div>
              <div className="mb-3 overflow-x-auto">
                <EditableTable rows={rebate} onUpdate={updateRebate} />
              </div>
              <div className="flex flex-wrap items-center gap-6 border-b border-stroke pb-5 dark:border-dark-3">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Total Tax Payable</p>
                  <RupeeBox value={parseFloat(totalTaxPayable).toLocaleString()} />
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Tax Paid So Far</p>
                  <div className="flex max-w-[200px] items-center rounded border border-stroke dark:border-dark-3">
                    <span className="flex size-8 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 text-sm font-medium text-gray-600 dark:border-dark-3 dark:bg-gray-700 dark:text-gray-400">₹</span>
                    <input
                      type="number"
                      value={taxPaidSoFar}
                      onChange={(e) => setTaxPaidSoFar(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-right text-sm focus:outline-none dark:bg-gray-dark dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Balance Tax to be Paid</p>
                  <RupeeBox value={parseFloat(balanceTax).toLocaleString()} />
                </div>
                <div>
                  <p className="mb-1 text-xs text-gray-500">Actual Income Tax</p>
                  <RupeeBox value={parseFloat(actualIncomeTax).toLocaleString()} />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowNote(true)}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create Note
              </button>
              <button
                onClick={() => router.push("/personnel/human-resource/pay-roll/income-tax-worksheet/list")}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button
                className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-[10px] border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNote(false)} className="text-white/80 hover:text-white">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Toolbar */}
              <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-stroke bg-gray-50 px-3 py-2 dark:border-dark-3 dark:bg-gray-700">
                <select
                  value={noteFontFamily}
                  onChange={(e) => setNoteFontFamily(e.target.value)}
                  className="rounded border border-stroke px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  {["Arial","Times New Roman","Courier New","Georgia","Verdana"].map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
                <select
                  value={noteFontSize}
                  onChange={(e) => setNoteFontSize(e.target.value)}
                  className="w-16 rounded border border-stroke px-2 py-1 text-xs focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  {["10","12","14","16","18","20","24"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {["B","I","U","S"].map((fmt) => (
                  <button key={fmt} className="flex size-7 items-center justify-center rounded border border-stroke bg-white text-xs font-bold hover:bg-gray-100 dark:border-dark-3 dark:bg-gray-dark dark:hover:bg-gray-700">
                    {fmt}
                  </button>
                ))}
              </div>
              <textarea
                rows={5}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Type your note here..."
                style={{ fontFamily: noteFontFamily, fontSize: `${noteFontSize}px` }}
                className="w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />

              {/* Created By navigator */}
              {NOTE_HISTORY.length > 0 && (
                <div className="mt-3 rounded border border-stroke bg-gray-50 p-3 dark:border-dark-3 dark:bg-gray-700">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Created By: <span className="text-[#2d8f7b]">{NOTE_HISTORY[noteIndex].by}</span>
                      <span className="ml-2 text-gray-400">{NOTE_HISTORY[noteIndex].date}</span>
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setNoteIndex((i) => Math.max(0, i - 1))}
                        disabled={noteIndex === 0}
                        className="flex size-6 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-gray-dark"
                      >‹</button>
                      <button
                        onClick={() => setNoteIndex((i) => Math.min(NOTE_HISTORY.length - 1, i + 1))}
                        disabled={noteIndex === NOTE_HISTORY.length - 1}
                        className="flex size-6 items-center justify-center rounded border border-stroke bg-white text-xs hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:bg-gray-dark"
                      >›</button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{NOTE_HISTORY[noteIndex].text}</p>
                </div>
              )}

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowNote(false)}
                  className="rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Close
                </button>
                <button
                  onClick={() => { setNoteText(""); setShowNote(false); }}
                  className="rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
