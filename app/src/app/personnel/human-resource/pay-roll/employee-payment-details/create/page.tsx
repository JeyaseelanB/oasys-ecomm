"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </div>
);

type PayHead = { id: number; head: string; amount: string; payAspect: string };

const PAY_HEADS_BY_CADRE: Record<string, PayHead[]> = {
  "ASSISTANT SALESMAN / ASSISTANT SALESWOMAN": [
    { id: 1, head: "BASIC PAY",     amount: "",  payAspect: "Earnings" },
    { id: 2, head: "D.A",           amount: "",  payAspect: "Earnings" },
    { id: 3, head: "H.R.A",         amount: "",  payAspect: "Earnings" },
    { id: 4, head: "C.C.A",         amount: "",  payAspect: "Earnings" },
    { id: 5, head: "P.F",           amount: "",  payAspect: "Deductions" },
    { id: 6, head: "INCOME TAX",    amount: "",  payAspect: "Deductions" },
  ],
  "GENERAL MANAGER": [
    { id: 1, head: "BASIC PAY",     amount: "",  payAspect: "Earnings" },
    { id: 2, head: "D.A",           amount: "",  payAspect: "Earnings" },
    { id: 3, head: "H.R.A",         amount: "",  payAspect: "Earnings" },
    { id: 4, head: "C.C.A",         amount: "",  payAspect: "Earnings" },
    { id: 5, head: "SPECIAL PAY",   amount: "",  payAspect: "Earnings" },
    { id: 6, head: "P.F",           amount: "",  payAspect: "Deductions" },
  ],
  "PROBATION": [
    { id: 1, head: "BASIC PAY",     amount: "",  payAspect: "Earnings" },
    { id: 2, head: "D.A",           amount: "",  payAspect: "Earnings" },
    { id: 3, head: "H.R.A",         amount: "",  payAspect: "Earnings" },
    { id: 4, head: "P.F",           amount: "",  payAspect: "Deductions" },
  ],
};

const EMPLOYEES: Record<string, { name: string; designation: string }[]> = {
  "HEAD OFFICE": [
    { name: "MURUGESAN",   designation: "MANAGER"               },
    { name: "VIJAYAKUMAR", designation: "GENERAL MANAGER"        },
    { name: "LAKSHMI",     designation: "GENERAL MANAGER (ADMIN)" },
    { name: "MAHALINGAM",  designation: "ART DESIGNER"           },
  ],
  "E-COMMERCE":  [{ name: "JAYASURIYA",  designation: "ASSISTANT SALES MAN" }],
  "UDUMALPET":   [{ name: "BALAMURUGAN", designation: "SALESMAN"            }],
  "GOPI":        [{ name: "SARANYA",     designation: "SALES WOMAN"         }],
  "THRISSUR":    [{ name: "VISHNU DAS",  designation: "ASSISTANT SALES MAN" }],
  "COIMBATORE":  [{ name: "PRIYA",       designation: "SALES WOMAN"         }],
};

export default function CreateEmployeePaymentDetailsPage() {
  const router = useRouter();

  const [cadres, setCadres] = useState("");
  const [headOffice, setHeadOffice] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [designation, setDesignation] = useState("");
  const [payHeads, setPayHeads] = useState<PayHead[]>([]);
  const [generated, setGenerated] = useState(false);

  const availableEmployees = headOffice ? (EMPLOYEES[headOffice] ?? []) : [];

  const handleEmployeeChange = (val: string) => {
    setEmployeeCode(val);
    const emp = availableEmployees.find((e) => e.name === val);
    setDesignation(emp?.designation ?? "");
    setGenerated(false);
    setPayHeads([]);
  };

  const handleGenerate = () => {
    if (!cadres) return;
    const heads = PAY_HEADS_BY_CADRE[cadres] ?? [
      { id: 1, head: "BASIC PAY", amount: "", payAspect: "Earnings" },
      { id: 2, head: "D.A",       amount: "", payAspect: "Earnings" },
      { id: 3, head: "H.R.A",     amount: "", payAspect: "Earnings" },
      { id: 4, head: "C.C.A",     amount: "", payAspect: "Earnings" },
    ];
    setPayHeads(heads.map((h) => ({ ...h })));
    setGenerated(true);
  };

  const handleClear = () => {
    setCadres(""); setHeadOffice(""); setEmployeeCode(""); setDesignation("");
    setPayHeads([]); setGenerated(false);
  };

  const handleAmountChange = (id: number, val: string) => {
    setPayHeads((prev) => prev.map((h) => h.id === id ? { ...h, amount: val } : h));
  };

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Employee Payment Details</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Employee Payment Details</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Employee Payment Details</h3>
          <span className="text-xs text-white/80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Filter Row */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Cadres */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cadres <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </IconBox>
                <select
                  value={cadres}
                  onChange={(e) => { setCadres(e.target.value); setGenerated(false); setPayHeads([]); }}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select</option>
                  <option>ASSISTANT SALESMAN / ASSISTANT SALESWOMAN</option>
                  <option>GENERAL MANAGER</option>
                  <option>PROBATION</option>
                </select>
              </div>
            </div>

            {/* Head / Regional Office */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Head / Regional Office <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </IconBox>
                <select
                  value={headOffice}
                  onChange={(e) => { setHeadOffice(e.target.value); setEmployeeCode(""); setDesignation(""); }}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select</option>
                  {Object.keys(EMPLOYEES).map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
            </div>

            {/* Employee Code / Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Employee Code / Name <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </IconBox>
                <select
                  value={employeeCode}
                  onChange={(e) => handleEmployeeChange(e.target.value)}
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select</option>
                  {availableEmployees.map((e) => <option key={e.name} value={e.name}>{e.name}</option>)}
                </select>
              </div>
            </div>

            {/* Designation (auto-filled) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Designation</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </IconBox>
                <input
                  type="text"
                  value={designation}
                  readOnly
                  className="flex-1 rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-dark-3 dark:bg-gray-700 dark:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Clear + Generate */}
          <div className="mb-5 flex items-center justify-end gap-2 border-b border-stroke pb-5 dark:border-dark-3">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Clear
            </button>
            <button
              onClick={handleGenerate}
              disabled={!cadres || !employeeCode}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="23,4 23,10 17,10"/><polyline points="1,20 1,14 7,14"/>
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
              </svg>
              Generate
            </button>
          </div>

          {/* Pay Heads Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Head</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Amount (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Pay Aspect</th>
                </tr>
              </thead>
              <tbody>
                {!generated || payHeads.length === 0 ? (
                  <tr><td colSpan={4} className="border border-stroke px-4 py-6 text-center text-gray-400 dark:border-dark-3">No records found</td></tr>
                ) : (
                  payHeads.map((h, idx) => (
                    <tr key={h.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{h.head}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">
                        <input
                          type="number"
                          value={h.amount}
                          onChange={(e) => handleAmountChange(h.id, e.target.value)}
                          placeholder="0.00"
                          className="w-full rounded border border-stroke px-2 py-1 text-right text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                        />
                      </td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{h.payAspect}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/employee-payment-details/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button
              disabled={!generated || payHeads.length === 0}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
