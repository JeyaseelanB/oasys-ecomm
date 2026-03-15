"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Dropdown data ─────────────────────────────────────────────────── */
const HO_RO_LIST   = ["HEAD OFFICE", "REGION - CHENNAI", "REGION - COIMBATORE", "REGION - MADURAI"];
const ENTITY_TYPES = ["Head Office", "Regional Office", "Showroom", "Society"];
const ENTITIES     = ["HEAD OFFICE", "CHENNAI REGION", "COIMBATORE REGION", "MADURAI REGION"];
const DEPARTMENTS  = ["MARKETING", "FINANCE", "HR & ADMIN", "IT", "OPERATIONS"];
const SECTIONS     = ["GENERAL", "ACCOUNTS", "PURCHASE", "SALES"];
const MONTHS       = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const YEARS        = ["2020","2021","2022","2023","2024","2025","2026"];

const EMPLOYEES: Record<string, {
  code: string; name: string; pfNo: string; uanNo: string;
  designation: string; fatherName: string; categStat: string;
  incrDue: string; cadrCod: string; fpf: string;
  unitSection: string; dob: string; doj: string; dor: string;
  effectiveFrom: string; basicPay: number; da: number; daPay: number;
  hra: number; cca: number;
  incomeTax: number; gratuity: number; retirementBenefit: number;
  familyBenefit: number; professionalTax: number;
  otherAllowances: { code: string; amount: number }[];
}> = {
  "EMP001": {
    code: "EMP001", name: "SANKARANARAYANAN",
    pfNo: "3325", uanNo: "100987654321",
    designation: "SUPERINTENDENT", fatherName: "RAMASAMY",
    categStat: "REGULAR / ACTIVE", incrDue: "01-Jul-2025",
    cadrCod: "SC-001", fpf: "FPF-3325",
    unitSection: "HO / MARKETING", dob: "15-Jun-1975",
    doj: "01-Apr-2005", dor: "30-Jun-2035",
    effectiveFrom: "01-Apr-2024",
    basicPay: 32500, da: 18525, daPay: 1200, hra: 9750, cca: 1500,
    incomeTax: 4250, gratuity: 1500, retirementBenefit: 800,
    familyBenefit: 300, professionalTax: 200,
    otherAllowances: [
      { code: "TA", amount: 3200 },
      { code: "SPL", amount: 2000 },
      { code: "WASH", amount: 500 },
      { code: "", amount: 0 },
      { code: "", amount: 0 },
    ],
  },
  "EMP002": {
    code: "EMP002", name: "ARULRAJAN",
    pfNo: "2210", uanNo: "100123456789",
    designation: "JUNIOR ASSISTANT", fatherName: "MURUGESAN",
    categStat: "REGULAR / ACTIVE", incrDue: "01-Jan-2026",
    cadrCod: "JA-002", fpf: "FPF-2210",
    unitSection: "HO / FINANCE", dob: "20-Mar-1985",
    doj: "15-Jun-2010", dor: "31-Mar-2045",
    effectiveFrom: "01-Apr-2024",
    basicPay: 24000, da: 13680, daPay: 900, hra: 7200, cca: 1000,
    incomeTax: 1800, gratuity: 1100, retirementBenefit: 600,
    familyBenefit: 200, professionalTax: 200,
    otherAllowances: [
      { code: "TA", amount: 2400 },
      { code: "SPL", amount: 1500 },
      { code: "", amount: 0 },
      { code: "", amount: 0 },
      { code: "", amount: 0 },
    ],
  },
};

const EMP_OPTIONS = Object.values(EMPLOYEES).map(e => ({
  label: `${e.code} / ${e.name}`,
  value: e.code,
}));

const fmt = (n: number) => n > 0 ? n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";

/* ── Icon helpers ─────────────────────────────────────────────────── */
const IconBox = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-[42px] w-10 flex-shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </span>
);

const BuildingIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="1"/>
    <path d="M9 22V12h6v10M3 9h18"/>
  </svg>
);
const ListIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
const OrgIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="9" y="2" width="6" height="4" rx="1"/>
    <rect x="2" y="16" width="6" height="4" rx="1"/>
    <rect x="9" y="16" width="6" height="4" rx="1"/>
    <rect x="16" y="16" width="6" height="4" rx="1"/>
    <path d="M12 6v4M5 16v-4h14v4"/>
  </svg>
);
const CopyIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);
const UserIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const CalIco = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

/* ── Section header ────────────────────────────────────────────────── */
const SectionHeader = ({ title }: { title: string }) => (
  <div className="rounded-t bg-[#2d8f7b] px-4 py-2">
    <p className="text-sm font-semibold text-white">{title}</p>
  </div>
);

/* ── Key-value row in info tables ───────────────────────────────────── */
const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <tr className="border-b border-stroke dark:border-dark-3">
    <td className="bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white whitespace-nowrap">
      {label}
    </td>
    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{value ?? ""}</td>
  </tr>
);

export default function PayMasterPage() {
  const [hoRo,     setHoRo]     = useState("");
  const [entType,  setEntType]  = useState("");
  const [entity,   setEntity]   = useState("");
  const [dept,     setDept]     = useState("");
  const [section,  setSection]  = useState("");
  const [empCode,  setEmpCode]  = useState("");
  const [month,    setMonth]    = useState("");
  const [year,     setYear]     = useState("");
  const [generated, setGenerated] = useState(false);
  const [error,    setError]    = useState("");

  const emp = generated && empCode ? EMPLOYEES[empCode] : null;

  const monthlyEarning    = emp ? emp.basicPay + emp.da + emp.daPay + emp.hra + emp.cca : 0;
  const monthlyAllowance  = emp ? emp.otherAllowances.reduce((s, a) => s + a.amount, 0) : 0;
  const monthlyDeduction  = emp ? emp.incomeTax + emp.gratuity + emp.retirementBenefit + emp.familyBenefit + emp.professionalTax : 0;
  const amountToAdd       = 0;
  const amountToSubtract  = 0;
  const monthlyNetPay     = monthlyEarning + monthlyAllowance - monthlyDeduction + amountToAdd - amountToSubtract;

  const handleGenerate = () => {
    if (!hoRo || !entType || !entity || !dept || !section || !empCode || !month || !year) {
      setError("Please fill all mandatory fields before generating.");
      return;
    }
    setError("");
    setGenerated(true);
  };

  const handleClear = () => {
    setHoRo(""); setEntType(""); setEntity(""); setDept("");
    setSection(""); setEmpCode(""); setMonth(""); setYear("");
    setGenerated(false); setError("");
  };

  const selectCls = "h-[42px] w-full rounded-r border border-stroke bg-white px-3 text-sm text-gray-700 focus:border-[#2d8f7b] focus:ring-1 focus:ring-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-gray-300";

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Pay Master</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Pay Master</li>
          </ol>
        </nav>
      </div>

      {/* ── Form Card ──────────────────────────────────────────────── */}
      <div className="mb-5 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Pay Master</h3>
          <span className="text-sm text-white/80">( Mandatory Fields ) <span className="font-bold text-white">—</span></span>
        </div>

        <div className="p-5">
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">HO/RO <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><BuildingIco /></IconBox>
                <select value={hoRo} onChange={e => setHoRo(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  {HO_RO_LIST.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Entity Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><ListIco /></IconBox>
                <select value={entType} onChange={e => setEntType(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  {ENTITY_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Entity <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><BuildingIco /></IconBox>
                <select value={entity} onChange={e => setEntity(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  {ENTITIES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Department <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><OrgIco /></IconBox>
                <select value={dept} onChange={e => setDept(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  {DEPARTMENTS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Section <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><CopyIco /></IconBox>
                <select value={section} onChange={e => setSection(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  {SECTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Employee Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><UserIco /></IconBox>
                <select value={empCode} onChange={e => setEmpCode(e.target.value)} className={selectCls}>
                  <option value="">Select</option>
                  {EMP_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Month <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><CalIco /></IconBox>
                <select value={month} onChange={e => setMonth(e.target.value)} className={selectCls}>
                  <option value="">Sele</option>
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Year <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><CalIco /></IconBox>
                <select value={year} onChange={e => setYear(e.target.value)} className={selectCls}>
                  <option value="">Sele</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>

          {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

          {/* Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
              Clear
            </button>
            <button onClick={handleGenerate} className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="23,4 23,10 17,10"/><polyline points="1,20 1,14 7,14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              Generate
            </button>
          </div>
        </div>
      </div>

      {/* ── Preview Card — always visible ─────────────────────────── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5 space-y-5">

          {/* Primary Information */}
          <div className="overflow-hidden rounded border border-stroke dark:border-dark-3">
            <SectionHeader title="Primary Information" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <tbody>
                  <tr className="border-b border-stroke dark:border-dark-3">
                    <td className="w-[14%] bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">P.F NO</td>
                    <td className="w-[19%] px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.pfNo ?? ""}</td>
                    <td className="w-[14%] bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">CATEG / STAT</td>
                    <td className="w-[19%] px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.categStat ?? ""}</td>
                    <td className="w-[14%] bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">UNIT/OFF - SECTION</td>
                    <td className="w-[20%] px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.unitSection ?? ""}</td>
                  </tr>
                  <tr className="border-b border-stroke dark:border-dark-3">
                    <td className="bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">Employee Name</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.name ?? ""}</td>
                    <td className="bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">INCR-DUE</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.incrDue ?? ""}</td>
                    <td className="bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">Date of Birth</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.dob ?? ""}</td>
                  </tr>
                  <tr className="border-b border-stroke dark:border-dark-3">
                    <td className="bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">Designation</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.designation ?? ""}</td>
                    <td className="bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">CADR-COD</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.cadrCod ?? ""}</td>
                    <td className="bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">Date of Joining</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.doj ?? ""}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">Father / Husband Name</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.fatherName ?? ""}</td>
                    <td className="bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">FPF</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.fpf ?? ""}</td>
                    <td className="bg-gray-50 px-3 py-2 text-xs font-semibold text-dark dark:bg-gray-700 dark:text-white">Date of Retirement</td>
                    <td className="px-3 py-2 text-xs text-gray-700 dark:text-gray-300">{emp?.dor ?? ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Salary Rates | Other Deduction */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Salary Rates */}
            <div className="overflow-hidden rounded border border-stroke dark:border-dark-3">
              <SectionHeader title="Salary Rates" />
              <table className="w-full text-sm">
                <tbody>
                  <InfoRow label="Effective From Date" value={emp?.effectiveFrom} />
                  <InfoRow label="Basic Pay"           value={emp ? fmt(emp.basicPay) : ""} />
                  <InfoRow label="D.A"                 value={emp ? fmt(emp.da)       : ""} />
                  <InfoRow label="D.A. PAY"            value={emp ? fmt(emp.daPay)    : ""} />
                  <InfoRow label="H.R.A"               value={emp ? fmt(emp.hra)      : ""} />
                  <InfoRow label="C.C.A"               value={emp ? fmt(emp.cca)      : ""} />
                </tbody>
              </table>
            </div>

            {/* Other Deduction */}
            <div className="overflow-hidden rounded border border-stroke dark:border-dark-3">
              <SectionHeader title="Other Deduction" />
              <table className="w-full text-sm">
                <tbody>
                  <InfoRow label="P.F. Voluntary"          value={""} />
                  <InfoRow label="Income Tax"              value={emp ? fmt(emp.incomeTax)         : ""} />
                  <InfoRow label="Gratutity"               value={emp ? fmt(emp.gratuity)          : ""} />
                  <InfoRow label="Retirement Benefit Scheme" value={emp ? fmt(emp.retirementBenefit) : ""} />
                  <InfoRow label="Family Benefit Scheme"   value={emp ? fmt(emp.familyBenefit)     : ""} />
                  <InfoRow label="Professional Tax"        value={emp ? fmt(emp.professionalTax)   : ""} />
                </tbody>
              </table>
            </div>
          </div>

          {/* Other Allowance | Summary */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Other Allowance */}
            <div className="overflow-hidden rounded border border-stroke dark:border-dark-3">
              <SectionHeader title="Other Allowance" />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stroke bg-gray-50 dark:border-dark-3 dark:bg-gray-700">
                      <th className="px-3 py-2 text-center text-xs font-semibold text-dark dark:text-white w-[15%]">S.No</th>
                      <th className="border-l border-stroke px-3 py-2 text-center text-xs font-semibold text-dark dark:border-dark-3 dark:text-white w-[45%]">Code</th>
                      <th className="border-l border-stroke px-3 py-2 text-center text-xs font-semibold text-dark dark:border-dark-3 dark:text-white w-[40%]">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, i) => {
                      const row = emp?.otherAllowances[i];
                      return (
                        <tr key={i} className="border-b border-stroke dark:border-dark-3">
                          <td className="px-3 py-2 text-center text-xs text-gray-700 dark:text-gray-300">{i + 1}.</td>
                          <td className="border-l border-stroke px-3 py-2 text-center text-xs text-gray-700 dark:border-dark-3 dark:text-gray-300">{row?.code ?? ""}</td>
                          <td className="border-l border-stroke px-3 py-2 text-right text-xs text-gray-700 dark:border-dark-3 dark:text-gray-300">
                            {row && row.amount > 0 ? fmt(row.amount) : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="overflow-hidden rounded border border-stroke dark:border-dark-3">
              <SectionHeader title="Summary" />
              <table className="w-full text-sm">
                <tbody>
                  <InfoRow label="Monthly Earning"      value={emp ? fmt(monthlyEarning)   : ""} />
                  <InfoRow label="Monthly Allowance"    value={emp ? fmt(monthlyAllowance) : ""} />
                  <InfoRow label="Monthly Deduction"    value={emp ? fmt(monthlyDeduction) : ""} />
                  <InfoRow label="Amount to be Add"     value={emp ? fmt(amountToAdd)      : ""} />
                  <InfoRow label="Amount to be Subtract" value={emp ? fmt(amountToSubtract): ""} />
                  <tr className="border-b border-stroke bg-[#e8f4f0] dark:border-dark-3 dark:bg-[#1a3d35]">
                    <td className="px-3 py-2 text-xs font-bold text-[#2d8f7b]">Monthly Net Pay</td>
                    <td className="px-3 py-2 text-xs font-bold text-[#2d8f7b]">{emp ? fmt(monthlyNetPay) : ""}</td>
                  </tr>
                  <InfoRow label="Post- Month &amp; Year" value={emp && month && year ? `${month} ${year}` : ""} />
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-between pt-2">
            {/* Left — PDF + Excel */}
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                PDF
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Excel
              </button>
            </div>

            {/* Right — Cancel + Print */}
            <div className="flex gap-2">
              <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="6,9 6,2 18,2 18,9"/>
                  <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                  <rect x="6" y="14" width="12" height="8"/>
                </svg>
                Print
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
