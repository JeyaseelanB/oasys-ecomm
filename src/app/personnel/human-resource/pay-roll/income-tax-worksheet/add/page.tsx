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

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </div>
);

const RupeeBox = ({ value }: { value: string }) => (
  <div className="flex max-w-[200px] items-center rounded border border-stroke dark:border-dark-3">
    <span className="flex size-8 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 text-sm font-medium text-gray-600 dark:border-dark-3 dark:bg-gray-700 dark:text-gray-400">₹</span>
    <span className="flex-1 px-3 py-1.5 text-right text-sm text-gray-700 dark:text-gray-300">{value}</span>
  </div>
);

type DeductionRow = { id: number; item: string; amount: string; desc: string };

const HO_OPTIONS = ["HEAD OFFICE", "REGIONAL OFFICE - CHENNAI", "REGIONAL OFFICE - COIMBATORE", "REGIONAL OFFICE - MADURAI"];
const ENTITY_TYPE_OPTIONS = ["Head Office", "Regional Office", "Branch Office"];
const YEAR_OPTIONS = ["2024 / 2025", "2023 / 2024", "2022 / 2023", "2021 / 2022"];
const TAX_OPTION_OPTIONS = ["A - New Tax Regime", "B - Old Tax Regime"];

const EMPLOYEES: Record<string, { name: string; designation: string; pfNumber: string; gender: string }[]> = {
  "HEAD OFFICE": [
    { name: "ALOK BABELAY / 137",  designation: "CHIEF GENERAL MANAGER", pfNumber: "3191", gender: "Male"   },
    { name: "ANITHA G / 142",      designation: "SENIOR MANAGER",        pfNumber: "3596", gender: "Female" },
    { name: "ANURADHA S / 145",    designation: "MANAGER",               pfNumber: "3587", gender: "Female" },
  ],
  "REGIONAL OFFICE - CHENNAI": [
    { name: "KUMAR S / 201",       designation: "DEPUTY MANAGER",        pfNumber: "4012", gender: "Male"   },
    { name: "LAKSHMI R / 198",     designation: "ASSISTANT MANAGER",     pfNumber: "2875", gender: "Female" },
  ],
};

const DEFAULT_80D: DeductionRow[] = [
  { id: 1, item: "STD_DEDUCT/STANDARD DEDUCTION",     amount: "50000", desc: "" },
  { id: 2, item: "287/GROUP MEDICAL INSURANCE SCHEME", amount: "0",    desc: "" },
];

const DEFAULT_80C: DeductionRow[] = [
  { id: 1, item: "270/PROVIDENT FUND",            amount: "", desc: "" },
  { id: 2, item: "PFVC/VOLUNTARY PROVIDENT FUND", amount: "", desc: "" },
];

const DEFAULT_REBATE: DeductionRow[] = [
  { id: 1, item: "TAX ON TOTAL INCOME",    amount: "", desc: "" },
  { id: 2, item: "SURCHARGE",              amount: "0", desc: "" },
  { id: 3, item: "HEALTH & EDUCATION CESS", amount: "", desc: "" },
];

export default function AddIncomeTaxWorksheetPage() {
  const router = useRouter();

  // Header
  const [hoRo, setHoRo] = useState("");
  const [entityType, setEntityType] = useState("");
  const [entity, setEntity] = useState("");
  const [employeeVal, setEmployeeVal] = useState("");
  const [year, setYear] = useState("");
  const [taxOption, setTaxOption] = useState("");

  // Employee details (auto-filled)
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [pfNumber, setPfNumber] = useState("");

  const availableEmployees = hoRo ? (EMPLOYEES[hoRo] ?? []) : [];

  const handleEmployeeChange = (val: string) => {
    setEmployeeVal(val);
    const emp = availableEmployees.find((e) => e.name === val);
    setDesignation(emp?.designation ?? "");
    setGender(emp?.gender ?? "");
    setPfNumber(emp?.pfNumber ?? "");
  };

  // Income
  const [incomeFromSalaries, setIncomeFromSalaries] = useState("");
  const [tentativeIncome, setTentativeIncome] = useState("");
  const [eplSalary, setEplSalary] = useState("");
  const [salesCommission, setSalesCommission] = useState("");
  const [incentive, setIncentive] = useState("");
  const [bonusSpecial, setBonusSpecial] = useState("");
  const [eplSalaryArrears, setEplSalaryArrears] = useState("");
  const [others, setOthers] = useState("");

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

  // Deductions
  const [savings80D, setSavings80D] = useState<DeductionRow[]>(DEFAULT_80D.map((r) => ({ ...r })));
  const [savings80C, setSavings80C] = useState<DeductionRow[]>(DEFAULT_80C.map((r) => ({ ...r })));
  const [rebate, setRebate] = useState<DeductionRow[]>(DEFAULT_REBATE.map((r) => ({ ...r })));

  const total80D = savings80D.reduce((s, r) => s + parseFloat(r.amount || "0"), 0).toFixed(0);
  const raw80C = savings80C.reduce((s, r) => s + parseFloat(r.amount || "0"), 0);
  const capped80C = Math.min(raw80C, 150000).toFixed(0);
  const totalTaxableIncome = Math.max(0,
    parseFloat(totalGrossIncome) - parseFloat(total80D) - parseFloat(capped80C)
  ).toFixed(0);
  const totalTaxPayable = rebate.reduce((s, r) => s + parseFloat(r.amount || "0"), 0).toFixed(0);

  const [taxPaidSoFar, setTaxPaidSoFar] = useState("");
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
  const [noteFontFamily, setNoteFontFamily] = useState("Arial");
  const [noteFontSize, setNoteFontSize] = useState("14");

  const inputCls = "w-full rounded border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white";
  const selectCls = "flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white";

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
                placeholder="0"
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

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Add Income Tax Worksheet</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Add Income Tax Worksheet</li>
          </ol>
        </nav>
      </div>

      <div className="space-y-5">
        {/* Card 1 – Header Fields */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
            <h3 className="text-sm font-semibold text-white">Income Tax Worksheet</h3>
            <span className="text-xs text-white/80">( * Mandatory Fields)</span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* HO/RO */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">HO/RO <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                  </IconBox>
                  <select value={hoRo} onChange={(e) => { setHoRo(e.target.value); setEmployeeVal(""); setDesignation(""); setGender(""); setPfNumber(""); }} className={selectCls}>
                    <option value="">Select</option>
                    {HO_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Entity Type */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Entity Type <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                  </IconBox>
                  <select value={entityType} onChange={(e) => setEntityType(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    {ENTITY_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Entity */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Entity <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                  </IconBox>
                  <input type="text" value={entity} onChange={(e) => setEntity(e.target.value)} placeholder="Enter entity name" className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                </div>
              </div>

              {/* Employee */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Employee <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </IconBox>
                  <select value={employeeVal} onChange={(e) => handleEmployeeChange(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    {availableEmployees.map((e) => <option key={e.name}>{e.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Year <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </IconBox>
                  <select value={year} onChange={(e) => setYear(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    {YEAR_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Tax Option */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Tax Option <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox>
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                  </IconBox>
                  <select value={taxOption} onChange={(e) => setTaxOption(e.target.value)} className={selectCls}>
                    <option value="">Select</option>
                    {TAX_OPTION_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 – Details */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="p-5 space-y-6">
            {/* Employee Details */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Employee Details</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 border-b border-stroke pb-5 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
                <div>
                  <p className="text-xs text-gray-500">Designation</p>
                  <p className={`text-sm font-medium ${designation ? "text-[#2d8f7b]" : "text-gray-400"}`}>{designation || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className={`text-sm font-medium ${gender ? "text-[#2d8f7b]" : "text-gray-400"}`}>{gender || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Provident Fund Number</p>
                  <p className={`text-sm font-medium ${pfNumber ? "text-[#2d8f7b]" : "text-gray-400"}`}>{pfNumber || "—"}</p>
                </div>
              </div>
            </div>

            {/* Income */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <GridIco /><h4 className="text-sm font-semibold text-dark dark:text-white">Income</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 border-b border-stroke pb-5 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Income From Salaries <span className="text-red-500">*</span></label>
                  <input type="number" value={incomeFromSalaries} onChange={(e) => setIncomeFromSalaries(e.target.value)} placeholder="0" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Tentative Income</label>
                  <input type="number" value={tentativeIncome} onChange={(e) => setTentativeIncome(e.target.value)} placeholder="0" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">EPL Salary</label>
                  <input type="number" value={eplSalary} onChange={(e) => setEplSalary(e.target.value)} placeholder="0" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Sales Commission</label>
                  <input type="number" value={salesCommission} onChange={(e) => setSalesCommission(e.target.value)} placeholder="0" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Incentive</label>
                  <input type="number" value={incentive} onChange={(e) => setIncentive(e.target.value)} placeholder="0" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Bonus / Special Sales Commission</label>
                  <input type="number" value={bonusSpecial} onChange={(e) => setBonusSpecial(e.target.value)} placeholder="0" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">EPL Salary Arrears</label>
                  <input type="number" value={eplSalaryArrears} onChange={(e) => setEplSalaryArrears(e.target.value)} placeholder="0" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Others</label>
                  <input type="number" value={others} onChange={(e) => setOthers(e.target.value)} placeholder="0" className={inputCls} />
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
                      placeholder="0"
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
                  <RupeeBox value={parseFloat(actualIncomeTax || "0").toLocaleString()} />
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
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
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
