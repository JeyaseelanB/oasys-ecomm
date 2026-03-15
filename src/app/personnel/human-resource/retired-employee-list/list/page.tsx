"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

/* ─── Types ─── */
type ModalType = "runPayroll" | "downloadPayslip" | "editPayslip" | null;

interface Employee {
  id: number;
  pfNumber: string;
  employeeName: string;
  designation: string;
  workLocation: string;
  department: string;
  dateOfJoining: string;
  status: "ACTIVE" | "INACTIVE";
}

/* ─── Sample data (matches screenshot) ─── */
const ALL_EMPLOYEES: Employee[] = [
  { id: 1,   pfNumber: "789",  employeeName: "KUMAR A",          designation: "MANAGER GRADE – III", workLocation: "",           department: "MARKETING", dateOfJoining: "",            status: "INACTIVE" },
  { id: 2,   pfNumber: "9017", employeeName: "SRIDHARAN R",      designation: "MANAGER GRADE – III", workLocation: "",           department: "MARKETING", dateOfJoining: "",            status: "ACTIVE"   },
  { id: 3,   pfNumber: "",     employeeName: "PITCHAIMANI M",     designation: "",                    workLocation: "",           department: "",          dateOfJoining: "",            status: "INACTIVE" },
  { id: 4,   pfNumber: "",     employeeName: "SETHURAJAN G",      designation: "",                    workLocation: "",           department: "",          dateOfJoining: "",            status: "INACTIVE" },
  { id: 5,   pfNumber: "",     employeeName: "PANDIAN V",         designation: "",                    workLocation: "MADURAI",    department: "",          dateOfJoining: "",            status: "INACTIVE" },
  { id: 6,   pfNumber: "",     employeeName: "CHELLAIAH V",       designation: "",                    workLocation: "",           department: "",          dateOfJoining: "",            status: "INACTIVE" },
  { id: 7,   pfNumber: "3764", employeeName: "EMAYAVARMBAN V",    designation: "MANAGER GRADE – III", workLocation: "VIJAYAWADA", department: "",          dateOfJoining: "",            status: "INACTIVE" },
  { id: 8,   pfNumber: "",     employeeName: "PANNERSELVAM A",    designation: "",                    workLocation: "MADURAI",    department: "",          dateOfJoining: "",            status: "INACTIVE" },
  { id: 9,   pfNumber: "",     employeeName: "POOVELAN M",        designation: "",                    workLocation: "",           department: "",          dateOfJoining: "",            status: "INACTIVE" },
  { id: 10,  pfNumber: "1243", employeeName: "GOWRISANKAR M",     designation: "MANAGER GRADE – II",  workLocation: "TIRUNELVELI",department: "MARKETING", dateOfJoining: "10-Sep-1981", status: "INACTIVE" },
  { id: 11,  pfNumber: "2345", employeeName: "RAMALINGAM S",      designation: "SENIOR MANAGER",      workLocation: "CHENNAI",    department: "FINANCE",   dateOfJoining: "15-Jun-1985", status: "INACTIVE" },
  { id: 12,  pfNumber: "3456", employeeName: "ANNAMALAI K",       designation: "DEPUTY MANAGER",      workLocation: "COIMBATORE", department: "ADMIN",     dateOfJoining: "20-Mar-1990", status: "INACTIVE" },
  { id: 13,  pfNumber: "4567", employeeName: "MURUGESAN P",       designation: "MANAGER GRADE – I",   workLocation: "MADURAI",    department: "MARKETING", dateOfJoining: "05-Jan-1988", status: "INACTIVE" },
  { id: 14,  pfNumber: "5678", employeeName: "VENKATARAMAN T",    designation: "GENERAL MANAGER",     workLocation: "HEAD OFFICE",department: "ADMIN",     dateOfJoining: "01-Apr-1982", status: "ACTIVE"   },
  { id: 15,  pfNumber: "6789", employeeName: "SELVAKUMAR R",      designation: "MANAGER GRADE – II",  workLocation: "TRICHY",     department: "IT",        dateOfJoining: "12-Aug-1993", status: "INACTIVE" },
  { id: 16,  pfNumber: "7890", employeeName: "ARUMUGAM N",        designation: "SENIOR ASSISTANT",    workLocation: "SALEM",      department: "FINANCE",   dateOfJoining: "18-Nov-1991", status: "INACTIVE" },
  { id: 17,  pfNumber: "8901", employeeName: "KRISHNAMURTHY V",   designation: "MANAGER GRADE – III", workLocation: "CHENNAI",    department: "MARKETING", dateOfJoining: "25-Feb-1987", status: "INACTIVE" },
  { id: 18,  pfNumber: "9012", employeeName: "BALASUBRAMANIAN G", designation: "DEPUTY MANAGER",      workLocation: "MADURAI",    department: "ADMIN",     dateOfJoining: "09-Jul-1989", status: "ACTIVE"   },
  { id: 19,  pfNumber: "1234", employeeName: "RAJENDRAN M",       designation: "SENIOR MANAGER",      workLocation: "COIMBATORE", department: "HR",        dateOfJoining: "14-Dec-1984", status: "INACTIVE" },
  { id: 20,  pfNumber: "2356", employeeName: "SUBRAMANIAN A",     designation: "MANAGER GRADE – I",   workLocation: "TRICHY",     department: "FINANCE",   dateOfJoining: "30-Sep-1986", status: "INACTIVE" },
  { id: 21,  pfNumber: "3467", employeeName: "PALANISWAMY K",     designation: "GENERAL MANAGER",     workLocation: "HEAD OFFICE",department: "MARKETING", dateOfJoining: "07-Mar-1980", status: "INACTIVE" },
  { id: 22,  pfNumber: "4578", employeeName: "NATARAJAN C",       designation: "DEPUTY MANAGER",      workLocation: "SALEM",      department: "ADMIN",     dateOfJoining: "22-Jun-1992", status: "INACTIVE" },
  { id: 23,  pfNumber: "5689", employeeName: "VENKATESAN R",      designation: "MANAGER GRADE – II",  workLocation: "CHENNAI",    department: "IT",        dateOfJoining: "11-Oct-1988", status: "ACTIVE"   },
  { id: 24,  pfNumber: "6790", employeeName: "SUNDARAM P",        designation: "SENIOR ASSISTANT",    workLocation: "MADURAI",    department: "FINANCE",   dateOfJoining: "03-Jan-1994", status: "INACTIVE" },
  { id: 25,  pfNumber: "7801", employeeName: "KANNAN S",          designation: "MANAGER GRADE – III", workLocation: "TRICHY",     department: "HR",        dateOfJoining: "16-Aug-1987", status: "INACTIVE" },
  { id: 26,  pfNumber: "8912", employeeName: "THIRUMARAN V",      designation: "SENIOR MANAGER",      workLocation: "COIMBATORE", department: "ADMIN",     dateOfJoining: "28-Nov-1983", status: "INACTIVE" },
  { id: 27,  pfNumber: "9023", employeeName: "SENTHILKUMAR N",    designation: "MANAGER GRADE – I",   workLocation: "HEAD OFFICE",department: "MARKETING", dateOfJoining: "19-May-1990", status: "INACTIVE" },
  { id: 28,  pfNumber: "1346", employeeName: "DURAIRAJ M",        designation: "DEPUTY MANAGER",      workLocation: "SALEM",      department: "FINANCE",   dateOfJoining: "06-Feb-1985", status: "ACTIVE"   },
  { id: 29,  pfNumber: "2457", employeeName: "ARUNACHALAM K",     designation: "MANAGER GRADE – II",  workLocation: "CHENNAI",    department: "HR",        dateOfJoining: "24-Sep-1991", status: "INACTIVE" },
  { id: 30,  pfNumber: "3568", employeeName: "PALANISAMY R",      designation: "GENERAL MANAGER",     workLocation: "MADURAI",    department: "ADMIN",     dateOfJoining: "13-Dec-1982", status: "INACTIVE" },
];

/* ─── Icons ─── */
const IcoKey = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
const IcoCalendar = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M7 2.75a.75.75 0 01.75.75v.5h8.5v-.5a.75.75 0 011.5 0v.5h1a2.75 2.75 0 012.75 2.75v11a2.75 2.75 0 01-2.75 2.75H5.25A2.75 2.75 0 012.5 17.75v-11A2.75 2.75 0 015.25 4h1v-.5A.75.75 0 017 2.75zm-1.75 3.5A1.25 1.25 0 004 7.5v1h16v-1a1.25 1.25 0 00-1.25-1.25H5.25zm14.75 4H4v7.5a1.25 1.25 0 001.25 1.25h13.5A1.25 1.25 0 0020 17.75V10.25z" />
  </svg>
);
const IcoSort = () => (
  <svg className="size-3.5 text-white/70" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 10l5-5 5 5H7zm0 4l5 5 5-5H7z" />
  </svg>
);
const IcoRunPayroll = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </svg>
);
const IcoDownload = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IcoEdit = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const IcoClear = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 20H7L3 16l10-10 7 7-2.5 2.5" />
    <path d="M6.0001 17.0001L13 10" />
  </svg>
);
const IcoClose = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IcoX = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IcoCheck = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="20,6 9,17 4,12" />
  </svg>
);
const IcoFirst = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="11,17 6,12 11,7" /><line x1="18" y1="17" x2="18" y2="7" />
  </svg>
);
const IcoPrev = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="15,18 9,12 15,6" />
  </svg>
);
const IcoNext = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="9,18 15,12 9,6" />
  </svg>
);
const IcoLast = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="13,17 18,12 13,7" /><line x1="6" y1="17" x2="6" y2="7" />
  </svg>
);

/* ─── Modal component ─── */
function PayrollModal({
  title,
  onClose,
  prefillPassword,
}: {
  title: string;
  onClose: () => void;
  prefillPassword?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3.5">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <IcoClose />
          </button>
        </div>
        {/* Body */}
        <div className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-4">
            {/* Secondary Password */}
            <div className="flex flex-col gap-1 sm:flex-1">
              <label className="text-sm text-[#495057]">
                Secondary Password <span className="text-[#dc3545]">*</span>
              </label>
              <div className="flex overflow-hidden rounded border border-[#ced4da]">
                <span className="flex min-w-[36px] items-center justify-center border-r border-[#ced4da] bg-[#e9ecef] text-[#6c757d]">
                  <IcoKey />
                </span>
                <input
                  type="password"
                  defaultValue={prefillPassword ? "••••" : ""}
                  placeholder=""
                  className="flex-1 bg-white px-2.5 py-[7px] text-sm text-[#495057] outline-none"
                />
              </div>
            </div>
            {/* Month */}
            <div className="flex flex-col gap-1 sm:flex-1">
              <label className="text-sm text-[#495057]">
                Month <span className="text-[#dc3545]">*</span>
              </label>
              <div className="flex overflow-hidden rounded border border-[#ced4da]">
                <span className="flex min-w-[36px] items-center justify-center border-r border-[#ced4da] bg-[#e9ecef] text-[#6c757d]">
                  <IcoCalendar />
                </span>
                <select className="flex-1 bg-white px-2.5 py-[7px] text-sm text-[#495057] outline-none cursor-pointer">
                  <option value="">Select</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>
            </div>
            {/* Year */}
            <div className="flex flex-col gap-1 sm:flex-1">
              <label className="text-sm text-[#495057]">
                Year <span className="text-[#dc3545]">*</span>
              </label>
              <div className="flex overflow-hidden rounded border border-[#ced4da]">
                <span className="flex min-w-[36px] items-center justify-center border-r border-[#ced4da] bg-[#e9ecef] text-[#6c757d]">
                  <IcoCalendar />
                </span>
                <select className="flex-1 bg-white px-2.5 py-[7px] text-sm text-[#495057] outline-none cursor-pointer">
                  <option value="">Select</option>
                  {Array.from({ length: 10 }, (_, i) => 2024 - i).map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <IcoX /> Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <IcoCheck /> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Pagination nums helper ─── */
function pageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 10) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [];
  const around = new Set([1, 2, current - 1, current, current + 1, total - 1, total].filter((p) => p >= 1 && p <= total));
  let prev = 0;
  for (const p of [...around].sort((a, b) => a - b)) {
    if (p - prev > 1) pages.push("...");
    pages.push(p);
    prev = p;
  }
  return pages;
}

const PAGE_SIZE_OPTIONS = [10, 20, 30, 50];

export default function RetiredEmployeeListPage() {
  /* ── filters ── */
  const [filterPf, setFilterPf] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("");
  const [filterWorkLocation, setFilterWorkLocation] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDateOfJoining, setFilterDateOfJoining] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  /* ── sort ── */
  const [sortKey, setSortKey] = useState<keyof Employee | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  /* ── selection ── */
  const [selectedId, setSelectedId] = useState<number | null>(null);

  /* ── pagination ── */
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* ── modals ── */
  const [modal, setModal] = useState<ModalType>(null);

  /* ── filtered + sorted data ── */
  const filtered = useMemo(() => {
    let data = ALL_EMPLOYEES.filter((e) => {
      if (filterPf && !e.pfNumber.toLowerCase().includes(filterPf.toLowerCase())) return false;
      if (filterName && !e.employeeName.toLowerCase().includes(filterName.toLowerCase())) return false;
      if (filterDesignation && filterDesignation !== "" && e.designation !== filterDesignation) return false;
      if (filterWorkLocation && filterWorkLocation !== "" && e.workLocation !== filterWorkLocation) return false;
      if (filterDepartment && filterDepartment !== "" && e.department !== filterDepartment) return false;
      if (filterDateOfJoining && !e.dateOfJoining.toLowerCase().includes(filterDateOfJoining.toLowerCase())) return false;
      if (filterStatus && filterStatus !== "" && e.status !== filterStatus) return false;
      return true;
    });
    if (sortKey) {
      data = [...data].sort((a, b) => {
        const av = String(a[sortKey]);
        const bv = String(b[sortKey]);
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return data;
  }, [filterPf, filterName, filterDesignation, filterWorkLocation, filterDepartment, filterDateOfJoining, filterStatus, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: keyof Employee) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const handleClear = () => {
    setFilterPf(""); setFilterName(""); setFilterDesignation(""); setFilterWorkLocation("");
    setFilterDepartment(""); setFilterDateOfJoining(""); setFilterStatus("");
    setSortKey(null); setPage(1); setSelectedId(null);
  };

  /* ── unique filter options ── */
  const designations = [...new Set(ALL_EMPLOYEES.map((e) => e.designation).filter(Boolean))];
  const locations = [...new Set(ALL_EMPLOYEES.map((e) => e.workLocation).filter(Boolean))];
  const departments = [...new Set(ALL_EMPLOYEES.map((e) => e.department).filter(Boolean))];

  /* ── header cell ── */
  const Th = ({ label, field, filterEl }: { label: string; field: keyof Employee; filterEl: React.ReactNode }) => (
    <th className="border border-[#3aa88f] px-2 py-0 text-center text-xs font-semibold text-white">
      <div className="flex items-center justify-center gap-1 py-2.5">
        <span className="whitespace-nowrap">{label}</span>
        <button onClick={() => handleSort(field)}><IcoSort /></button>
      </div>
      <div className="pb-2">{filterEl}</div>
    </th>
  );

  return (
    <div className="mx-auto">
      {/* Modals */}
      {modal === "runPayroll" && <PayrollModal title="Run Payroll" onClose={() => setModal(null)} />}
      {modal === "downloadPayslip" && <PayrollModal title="Download Payslip" onClose={() => setModal(null)} prefillPassword />}
      {modal === "editPayslip" && <PayrollModal title="Edit Payslip" onClose={() => setModal(null)} />}

      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Retired Employee Payroll Register List
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Retired Employee List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-[#17a2b8]">1154</span> - Employee(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setModal("runPayroll")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <IcoRunPayroll /> Run Payroll
            </button>
            <button
              onClick={() => setModal("downloadPayslip")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <IcoDownload /> Download Payslip
            </button>
            <button
              onClick={() => setModal("editPayslip")}
              className="flex items-center gap-1.5 rounded bg-[#e05c2a] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <IcoEdit /> Edit Payslip
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <IcoClear /> Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b]">
                {/* # */}
                <th className="border border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white">#</th>
                {/* PF Number */}
                <Th
                  label="PF Number"
                  field="pfNumber"
                  filterEl={
                    <input
                      value={filterPf}
                      onChange={(e) => { setFilterPf(e.target.value); setPage(1); }}
                      className="w-full rounded border border-[#ced4da] bg-white px-2 py-1 text-xs text-[#495057] outline-none placeholder:text-[#adb5bd]"
                    />
                  }
                />
                {/* Employee Name */}
                <Th
                  label="Employee Name"
                  field="employeeName"
                  filterEl={
                    <input
                      value={filterName}
                      onChange={(e) => { setFilterName(e.target.value); setPage(1); }}
                      className="w-full rounded border border-[#ced4da] bg-white px-2 py-1 text-xs text-[#495057] outline-none placeholder:text-[#adb5bd]"
                    />
                  }
                />
                {/* Designation */}
                <Th
                  label="Designation"
                  field="designation"
                  filterEl={
                    <select
                      value={filterDesignation}
                      onChange={(e) => { setFilterDesignation(e.target.value); setPage(1); }}
                      className="w-full rounded border border-[#ced4da] bg-white px-2 py-1 text-xs text-[#495057] outline-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      {designations.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  }
                />
                {/* Work Location */}
                <Th
                  label="Work Location"
                  field="workLocation"
                  filterEl={
                    <select
                      value={filterWorkLocation}
                      onChange={(e) => { setFilterWorkLocation(e.target.value); setPage(1); }}
                      className="w-full rounded border border-[#ced4da] bg-white px-2 py-1 text-xs text-[#495057] outline-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      {locations.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  }
                />
                {/* Department */}
                <Th
                  label="Department"
                  field="department"
                  filterEl={
                    <select
                      value={filterDepartment}
                      onChange={(e) => { setFilterDepartment(e.target.value); setPage(1); }}
                      className="w-full rounded border border-[#ced4da] bg-white px-2 py-1 text-xs text-[#495057] outline-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      {departments.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  }
                />
                {/* Date of Joining */}
                <Th
                  label="Date of Joining"
                  field="dateOfJoining"
                  filterEl={
                    <div className="flex overflow-hidden rounded border border-[#ced4da] bg-white">
                      <input
                        value={filterDateOfJoining}
                        onChange={(e) => { setFilterDateOfJoining(e.target.value); setPage(1); }}
                        placeholder="dd-MMM-yyyy"
                        className="min-w-0 flex-1 bg-white px-2 py-1 text-xs text-[#495057] outline-none placeholder:text-[#adb5bd]"
                      />
                      <button type="button" className="flex items-center bg-[#17a2b8] px-2 text-white">
                        <IcoCalendar />
                      </button>
                    </div>
                  }
                />
                {/* Status */}
                <Th
                  label="Status"
                  field="status"
                  filterEl={
                    <select
                      value={filterStatus}
                      onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                      className="w-full rounded border border-[#ced4da] bg-white px-2 py-1 text-xs text-[#495057] outline-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                  }
                />
                {/* Select */}
                <th className="border border-[#3aa88f] px-3 py-2.5 text-center text-xs font-semibold text-white">Select</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-sm text-gray-400">No records found.</td>
                </tr>
              ) : (
                paginated.map((emp, idx) => {
                  const rowNum = (page - 1) * pageSize + idx + 1;
                  const isOdd = idx % 2 === 0;
                  const isSelected = selectedId === emp.id;
                  return (
                    <tr
                      key={emp.id}
                      onClick={() => setSelectedId(emp.id)}
                      className={`cursor-pointer transition-colors ${isSelected ? "bg-[#d1ecf1]" : isOdd ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-[#e8f7fa]`}
                    >
                      <td className="border border-stroke px-3 py-2.5 text-center text-xs text-[#17a2b8] dark:border-dark-3">{rowNum}</td>
                      <td className="border border-stroke px-3 py-2.5 text-center text-xs text-[#17a2b8] dark:border-dark-3">{emp.pfNumber}</td>
                      <td className="border border-stroke px-3 py-2.5 text-left text-xs font-medium text-dark dark:border-dark-3 dark:text-white">
                        {emp.employeeName}
                      </td>
                      <td className="border border-stroke px-3 py-2.5 text-center text-xs text-[#17a2b8] dark:border-dark-3">{emp.designation}</td>
                      <td className="border border-stroke px-3 py-2.5 text-center text-xs text-[#17a2b8] dark:border-dark-3">{emp.workLocation}</td>
                      <td className="border border-stroke px-3 py-2.5 text-center text-xs text-[#17a2b8] dark:border-dark-3">{emp.department}</td>
                      <td className="border border-stroke px-3 py-2.5 text-center text-xs text-[#17a2b8] dark:border-dark-3">{emp.dateOfJoining}</td>
                      <td className="border border-stroke px-3 py-2.5 text-center dark:border-dark-3">
                        <span
                          className={`inline-block rounded px-2.5 py-0.5 text-[11px] font-semibold ${
                            emp.status === "ACTIVE"
                              ? "bg-[#28a745] text-white"
                              : "bg-[#6c757d] text-white"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="border border-stroke px-3 py-2.5 text-center dark:border-dark-3">
                        <input
                          type="radio"
                          name="retiredEmpSelectRow"
                          checked={isSelected}
                          onChange={() => setSelectedId(emp.id)}
                          className="size-4 cursor-pointer accent-[#17a2b8]"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-stroke px-5 py-3 dark:border-dark-3 sm:flex-row">
          <p className="text-xs text-[#6c757d]">
            ({page} of {totalPages})
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="flex items-center justify-center rounded border border-stroke px-2 py-1 text-xs text-dark disabled:opacity-40 dark:border-dark-3 dark:text-white"
            >
              <IcoFirst />
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center justify-center rounded border border-stroke px-2 py-1 text-xs text-dark disabled:opacity-40 dark:border-dark-3 dark:text-white"
            >
              <IcoPrev />
            </button>
            {pageNumbers(page, totalPages).map((n, i) =>
              n === "..." ? (
                <span key={`ellipsis-${i}`} className="px-1 text-xs text-gray-400">...</span>
              ) : (
                <button
                  key={n}
                  onClick={() => setPage(n as number)}
                  className={`min-w-[28px] rounded border px-2 py-1 text-xs transition-colors ${
                    page === n
                      ? "border-[#17a2b8] bg-[#17a2b8] font-semibold text-white"
                      : "border-stroke text-dark hover:bg-gray-50 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
                  }`}
                >
                  {n}
                </button>
              )
            )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center justify-center rounded border border-stroke px-2 py-1 text-xs text-dark disabled:opacity-40 dark:border-dark-3 dark:text-white"
            >
              <IcoNext />
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="flex items-center justify-center rounded border border-stroke px-2 py-1 text-xs text-dark disabled:opacity-40 dark:border-dark-3 dark:text-white"
            >
              <IcoLast />
            </button>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="rounded border border-stroke bg-white px-2 py-1 text-xs text-[#495057] outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
            >
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
