"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AddInsurancePage() {
  const router = useRouter();
  const [hoRo, setHoRo] = useState("");
  const [entityType, setEntityType] = useState("");
  const [entity, setEntity] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeCodeName, setEmployeeCodeName] = useState("");
  const [insuranceType, setInsuranceType] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [maturityMonth, setMaturityMonth] = useState("");
  const [maturityYear, setMaturityYear] = useState("");
  const [insuredAmount, setInsuredAmount] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [paymentCycle, setPaymentCycle] = useState("");
  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + 5 - i);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Add Insurance</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Add Insurance</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Add Insurance</h3>
        </div>

        <div className="p-5">
          {/* Row 1: HO/RO, Entity Type, Entity, Department */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">HO/RO <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <select value={hoRo} onChange={(e) => setHoRo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="THANJAVUR">THANJAVUR</option>
                  <option value="SALEM">SALEM</option>
                  <option value="VIJAYAWADA">VIJAYAWADA</option>
                </select>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Entity Type <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                </span>
                <select value={entityType} onChange={(e) => setEntityType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Head Office">Head Office</option>
                  <option value="Showroom">Showroom</option>
                  <option value="Warehouse">Warehouse</option>
                </select>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Entity <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <select value={entity} onChange={(e) => setEntity(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="HEAD OFFICE">HEAD OFFICE</option>
                  <option value="THANJAVUR">THANJAVUR</option>
                  <option value="GUNTUR">GUNTUR</option>
                </select>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Department <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="TECHNICAL">TECHNICAL</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MARKETING">MARKETING</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 2: Employee Code/Name, Insurance Type, Start Month, Start Year, Maturity Month, Maturity Year */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Employee Code / Name <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <span className="text-sm font-bold text-gray-500">#</span>
                </span>
                <select value={employeeCodeName} onChange={(e) => setEmployeeCodeName(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="165/MANGALAM K">165/MANGALAM K</option>
                  <option value="694/UDAYAKUMAR L">694/UDAYAKUMAR L</option>
                  <option value="860/RAJARANI H">860/RAJARANI H</option>
                </select>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Insurance Type <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </span>
                <select value={insuranceType} onChange={(e) => setInsuranceType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="LIC 1(CUD)">LIC 1(CUD)</option>
                  <option value="LIC 4(VJA)">LIC 4(VJA)</option>
                  <option value="LIC 1(SALEM)">LIC 1(SALEM)</option>
                  <option value="LIC 1(TNJ)">LIC 1(TNJ)</option>
                </select>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Start Month <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {MONTHS.map((m) => (<option key={m} value={m}>{m}</option>))}
                </select>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Start Year <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <select value={startYear} onChange={(e) => setStartYear(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                </select>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Maturity Month</p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <select value={maturityMonth} onChange={(e) => setMaturityMonth(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {MONTHS.map((m) => (<option key={m} value={m}>{m}</option>))}
                </select>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Maturity Year</p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </span>
                <select value={maturityYear} onChange={(e) => setMaturityYear(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                </select>
              </div>
            </div>
          </div>

          {/* Row 3: Insured Amount, Employee Insurance Premium Amount, Payment Cycle */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Insured Amount</p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <span className="text-sm font-bold text-gray-500">&#8377;</span>
                </span>
                <input type="text" value={insuredAmount} onChange={(e) => setInsuredAmount(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white" />
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Employee Insurance Premium Amount</p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <span className="text-sm font-bold text-gray-500">&#8377;</span>
                </span>
                <input type="text" value={premiumAmount} onChange={(e) => setPremiumAmount(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white" />
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Payment Cycle <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                </span>
                <select value={paymentCycle} onChange={(e) => setPaymentCycle(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half-Yearly">Half-Yearly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 4: Forward To, Forward For */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Forward To <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                </span>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white" />
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-dark dark:text-white">Forward For <span className="text-red-500">*</span></p>
              <div className="flex">
                <span className="inline-flex items-center rounded-l border border-r-0 border-stroke bg-gray-50 px-3 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>
                </span>
                <select value={forwardFor} onChange={(e) => setForwardFor(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="APPROVAL">Approval</option>
                  <option value="REVIEW">Review</option>
                  <option value="INFORMATION">Information</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/personnel/human-resource/insurance/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* Rich Text Toolbar */}
              <div className="mb-0 flex flex-wrap items-center gap-1 rounded-t border border-b-0 border-stroke bg-gray-50 px-3 py-2 dark:border-dark-3 dark:bg-dark-2">
                <select className="rounded border border-stroke bg-transparent px-2 py-0.5 text-xs outline-none dark:border-dark-3 dark:text-white"><option>Sans Serif</option></select>
                <select className="rounded border border-stroke bg-transparent px-2 py-0.5 text-xs outline-none dark:border-dark-3 dark:text-white"><option>Normal</option></select>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></div>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm font-bold text-gray-600">B</span></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm italic text-gray-600">I</span></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm underline text-gray-600">U</span></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm line-through text-gray-600">S</span></button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></div>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm text-gray-600">A</span></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg></button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></div>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-xs text-gray-600">x<sub>2</sub></span></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-xs text-gray-600">x<sup>2</sup></span></button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></div>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm text-gray-600">H<sub>1</sub></span></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm text-gray-600">H<sub>2</sub></span></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm text-gray-600">&#8220;&#8221;</span></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><span className="text-sm text-gray-600">&lt;/&gt;</span></button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></div>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="23,7 16,12 23,17 23,7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg></button>
                <div className="mx-1 h-5 w-px bg-gray-300 dark:bg-dark-3"></div>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg></button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-dark-3"><svg className="size-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg></button>
              </div>

              {/* Textarea */}
              <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Enter text ..." className="mb-4 min-h-[150px] w-full rounded-b border border-stroke bg-transparent p-4 text-sm outline-none focus:border-primary dark:border-dark-3 dark:text-white" />

              {/* Created By Card */}
              <div className="mb-4 flex items-center">
                <button className="mr-3 rounded-full bg-gray-200 p-2 text-gray-400 dark:bg-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
                </button>
                <div className="rounded border border-stroke p-4 dark:border-dark-3">
                  <p className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</p>
                  <p className="text-xs text-dark dark:text-white">Name : <span className="font-semibold">SANKARANARAYANAN</span></p>
                  <p className="text-xs text-dark dark:text-white">Designation : <span className="font-semibold">ASSISTANT SALES MAN</span></p>
                  <p className="text-xs text-dark dark:text-white">Date : <span className="font-semibold">12-Mar-2026</span></p>
                </div>
                <button className="ml-3 rounded-full bg-gray-200 p-2 text-gray-400 dark:bg-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
                </button>
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
