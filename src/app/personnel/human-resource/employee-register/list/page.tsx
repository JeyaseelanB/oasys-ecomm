"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EmpStatus = "ACTIVE" | "INACTIVE";

interface Employee {
  id: number;
  pfNumber: string;
  employeeName: string;
  designation: string;
  workLocation: string;
  department: string;
  dateOfJoining: string;
  status: EmpStatus;
}

const SAMPLE_DATA: Employee[] = [
  { id: 1, pfNumber: "3588", employeeName: "RAJ MOHAN R", designation: "SENIOR REGIONAL MANAGER(SG)", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "09-May-1989", status: "ACTIVE" },
  { id: 2, pfNumber: "3692", employeeName: "CAUVERI D", designation: "SENIOR REGIONAL MANAGER", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "13-Jan-2016", status: "ACTIVE" },
  { id: 3, pfNumber: "78292", employeeName: "Prakash B", designation: "ART DESIGNER", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "03-Apr-2025", status: "ACTIVE" },
  { id: 4, pfNumber: "70200", employeeName: "Dinesh D", designation: "JUNIOR ASSISTANT", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "30-Apr-2025", status: "ACTIVE" },
  { id: 5, pfNumber: "3590", employeeName: "VIJAYAKUMAR J", designation: "SENIOR MANAGER P AND D", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "09-May-2013", status: "ACTIVE" },
  { id: 6, pfNumber: "60989", employeeName: "Nethra M", designation: "SUPERINTENDENT", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "02-Jan-2025", status: "ACTIVE" },
  { id: 7, pfNumber: "68988", employeeName: "SANGEETHA K", designation: "JUNIOR ASSISTANT", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "30-Dec-2016", status: "ACTIVE" },
  { id: 8, pfNumber: "3669", employeeName: "KARTHIKEYAN R", designation: "JUNIOR SYSTEM ANALYST", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "18-Dec-2015", status: "ACTIVE" },
  { id: 9, pfNumber: "3559", employeeName: "JAYALAKSHMI M", designation: "SENIOR ASSISTANT", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "03-May-2013", status: "ACTIVE" },
  { id: 10, pfNumber: "1653", employeeName: "SHANTHI K", designation: "SUPERINTENDENT", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "07-Aug-1986", status: "INACTIVE" },
  { id: 11, pfNumber: "4201", employeeName: "KUMAR S", designation: "MANAGER", workLocation: "REGIONAL OFFICE", department: "FINANCE", dateOfJoining: "15-Mar-2010", status: "ACTIVE" },
  { id: 12, pfNumber: "4305", employeeName: "MEENA R", designation: "ACCOUNTANT", workLocation: "HEAD OFFICE", department: "FINANCE", dateOfJoining: "22-Jun-2012", status: "ACTIVE" },
  { id: 13, pfNumber: "5100", employeeName: "SURESH P", designation: "SENIOR OFFICER", workLocation: "HEAD OFFICE", department: "IT", dateOfJoining: "10-Jan-2018", status: "ACTIVE" },
  { id: 14, pfNumber: "5201", employeeName: "RANI T", designation: "SYSTEM ANALYST", workLocation: "HEAD OFFICE", department: "IT", dateOfJoining: "05-Aug-2019", status: "ACTIVE" },
  { id: 15, pfNumber: "6100", employeeName: "BABU N", designation: "DRIVER", workLocation: "FIELD OFFICE", department: "TRANSPORT", dateOfJoining: "01-Apr-2005", status: "ACTIVE" },
  { id: 16, pfNumber: "6201", employeeName: "RAVI K", designation: "PEON", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "12-Nov-2008", status: "INACTIVE" },
  { id: 17, pfNumber: "7100", employeeName: "PRIYA L", designation: "JUNIOR ASSISTANT", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "20-Feb-2020", status: "ACTIVE" },
  { id: 18, pfNumber: "7201", employeeName: "NISHA M", designation: "CLERK", workLocation: "REGIONAL OFFICE", department: "ADMIN", dateOfJoining: "14-Jul-2021", status: "ACTIVE" },
  { id: 19, pfNumber: "8100", employeeName: "ANBU S", designation: "SENIOR MANAGER", workLocation: "HEAD OFFICE", department: "MARKETING", dateOfJoining: "11-Sep-2003", status: "ACTIVE" },
  { id: 20, pfNumber: "8201", employeeName: "GEETHA V", designation: "ASSISTANT MANAGER", workLocation: "HEAD OFFICE", department: "MARKETING", dateOfJoining: "25-Oct-2015", status: "ACTIVE" },
  { id: 21, pfNumber: "9100", employeeName: "SELVAM R", designation: "INSPECTOR", workLocation: "FIELD OFFICE", department: "QUALITY", dateOfJoining: "08-Mar-2007", status: "ACTIVE" },
  { id: 22, pfNumber: "9201", employeeName: "DEEPA K", designation: "QUALITY ANALYST", workLocation: "HEAD OFFICE", department: "QUALITY", dateOfJoining: "17-Dec-2014", status: "ACTIVE" },
  { id: 23, pfNumber: "10100", employeeName: "MOHAN T", designation: "STORE KEEPER", workLocation: "WAREHOUSE", department: "STORES", dateOfJoining: "03-Jun-2009", status: "ACTIVE" },
  { id: 24, pfNumber: "10201", employeeName: "LALITHA B", designation: "ASSISTANT", workLocation: "HEAD OFFICE", department: "HR", dateOfJoining: "29-Jan-2022", status: "ACTIVE" },
  { id: 25, pfNumber: "11100", employeeName: "PANDIAN M", designation: "WEAVER", workLocation: "PRODUCTION UNIT", department: "PRODUCTION", dateOfJoining: "18-May-2006", status: "INACTIVE" },
  { id: 26, pfNumber: "11201", employeeName: "SUGANYA R", designation: "SUPERVISOR", workLocation: "PRODUCTION UNIT", department: "PRODUCTION", dateOfJoining: "07-Feb-2011", status: "ACTIVE" },
  { id: 27, pfNumber: "12100", employeeName: "ARUMUGAM K", designation: "REGIONAL MANAGER", workLocation: "REGIONAL OFFICE", department: "ADMIN", dateOfJoining: "01-Aug-2000", status: "ACTIVE" },
  { id: 28, pfNumber: "12201", employeeName: "VALLI S", designation: "SENIOR ASSISTANT", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "14-Nov-2013", status: "ACTIVE" },
  { id: 29, pfNumber: "13100", employeeName: "SUBRAMANIAN P", designation: "ENGINEER", workLocation: "HEAD OFFICE", department: "TECHNICAL", dateOfJoining: "22-Apr-2004", status: "ACTIVE" },
  { id: 30, pfNumber: "13201", employeeName: "KAVITHA N", designation: "TECHNICIAN", workLocation: "HEAD OFFICE", department: "TECHNICAL", dateOfJoining: "09-Sep-2017", status: "ACTIVE" },
  { id: 31, pfNumber: "14100", employeeName: "MURUGESAN V", designation: "AUDITOR", workLocation: "HEAD OFFICE", department: "AUDIT", dateOfJoining: "16-Jul-2002", status: "ACTIVE" },
  { id: 32, pfNumber: "14201", employeeName: "ANITHA C", designation: "JUNIOR AUDITOR", workLocation: "HEAD OFFICE", department: "AUDIT", dateOfJoining: "28-Mar-2019", status: "ACTIVE" },
  { id: 33, pfNumber: "15100", employeeName: "DURAISAMY G", designation: "DRIVER", workLocation: "FIELD OFFICE", department: "TRANSPORT", dateOfJoining: "05-Jan-2001", status: "ACTIVE" },
  { id: 34, pfNumber: "15201", employeeName: "SARANYA M", designation: "RECEPTIONIST", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "11-Oct-2020", status: "ACTIVE" },
  { id: 35, pfNumber: "16100", employeeName: "RAJAN P", designation: "SECURITY GUARD", workLocation: "HEAD OFFICE", department: "SECURITY", dateOfJoining: "30-Jun-1998", status: "ACTIVE" },
  { id: 36, pfNumber: "16201", employeeName: "SUMATHI K", designation: "HELPER", workLocation: "WAREHOUSE", department: "STORES", dateOfJoining: "19-Feb-2016", status: "ACTIVE" },
  { id: 37, pfNumber: "17100", employeeName: "ESWARAN D", designation: "ASSISTANT ENGINEER", workLocation: "HEAD OFFICE", department: "TECHNICAL", dateOfJoining: "24-Aug-2008", status: "ACTIVE" },
  { id: 38, pfNumber: "17201", employeeName: "THENMOZHI R", designation: "CLERK", workLocation: "REGIONAL OFFICE", department: "ADMIN", dateOfJoining: "06-Dec-2018", status: "ACTIVE" },
  { id: 39, pfNumber: "18100", employeeName: "SRINIVASAN A", designation: "MANAGER", workLocation: "HEAD OFFICE", department: "FINANCE", dateOfJoining: "13-Mar-1999", status: "INACTIVE" },
  { id: 40, pfNumber: "18201", employeeName: "MALATHI B", designation: "CASHIER", workLocation: "HEAD OFFICE", department: "FINANCE", dateOfJoining: "01-May-2010", status: "ACTIVE" },
  { id: 41, pfNumber: "19100", employeeName: "BALAN S", designation: "INSPECTOR", workLocation: "FIELD OFFICE", department: "QUALITY", dateOfJoining: "17-Jun-2005", status: "ACTIVE" },
  { id: 42, pfNumber: "19201", employeeName: "REVATHI P", designation: "ANALYST", workLocation: "HEAD OFFICE", department: "IT", dateOfJoining: "03-Nov-2021", status: "ACTIVE" },
  { id: 43, pfNumber: "20100", employeeName: "KRISHNASAMY T", designation: "FOREMAN", workLocation: "PRODUCTION UNIT", department: "PRODUCTION", dateOfJoining: "20-Apr-2003", status: "ACTIVE" },
  { id: 44, pfNumber: "20201", employeeName: "USHA V", designation: "TYPIST", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "08-Jul-2015", status: "ACTIVE" },
  { id: 45, pfNumber: "21100", employeeName: "SARAVANAN M", designation: "PURCHASE OFFICER", workLocation: "HEAD OFFICE", department: "PURCHASE", dateOfJoining: "14-Feb-2007", status: "ACTIVE" },
  { id: 46, pfNumber: "21201", employeeName: "GOMATHI N", designation: "STORES OFFICER", workLocation: "WAREHOUSE", department: "STORES", dateOfJoining: "26-Sep-2012", status: "ACTIVE" },
  { id: 47, pfNumber: "22100", employeeName: "MANICKAM R", designation: "SALES OFFICER", workLocation: "REGIONAL OFFICE", department: "MARKETING", dateOfJoining: "09-Jan-2009", status: "ACTIVE" },
  { id: 48, pfNumber: "22201", employeeName: "HEMA K", designation: "JUNIOR SALES OFFICER", workLocation: "HEAD OFFICE", department: "MARKETING", dateOfJoining: "15-Aug-2022", status: "ACTIVE" },
  { id: 49, pfNumber: "23100", employeeName: "PALANIVEL S", designation: "WELFARE OFFICER", workLocation: "HEAD OFFICE", department: "HR", dateOfJoining: "22-Mar-2006", status: "ACTIVE" },
  { id: 50, pfNumber: "23201", employeeName: "INDIRA M", designation: "HR OFFICER", workLocation: "HEAD OFFICE", department: "HR", dateOfJoining: "11-Oct-2011", status: "ACTIVE" },
  { id: 51, pfNumber: "24100", employeeName: "NATARAJAN V", designation: "LEGAL OFFICER", workLocation: "HEAD OFFICE", department: "LEGAL", dateOfJoining: "05-Jun-2004", status: "ACTIVE" },
  { id: 52, pfNumber: "24201", employeeName: "PARVATHI R", designation: "JUNIOR LEGAL OFFICER", workLocation: "HEAD OFFICE", department: "LEGAL", dateOfJoining: "18-Apr-2018", status: "ACTIVE" },
  { id: 53, pfNumber: "25100", employeeName: "THIRUNAVUKKARASU G", designation: "ENGINEER", workLocation: "HEAD OFFICE", department: "TECHNICAL", dateOfJoining: "30-Jul-2001", status: "ACTIVE" },
  { id: 54, pfNumber: "25201", employeeName: "MEENAKSHI S", designation: "ASSISTANT", workLocation: "REGIONAL OFFICE", department: "ADMIN", dateOfJoining: "23-Nov-2016", status: "ACTIVE" },
  { id: 55, pfNumber: "26100", employeeName: "BALAKRISHNAN T", designation: "ACCOUNTS OFFICER", workLocation: "HEAD OFFICE", department: "FINANCE", dateOfJoining: "12-Feb-2003", status: "ACTIVE" },
  { id: 56, pfNumber: "26201", employeeName: "JAYANTHI N", designation: "CLERK", workLocation: "HEAD OFFICE", department: "FINANCE", dateOfJoining: "07-Sep-2019", status: "ACTIVE" },
  { id: 57, pfNumber: "27100", employeeName: "GOVINDASAMY P", designation: "WEAVER", workLocation: "PRODUCTION UNIT", department: "PRODUCTION", dateOfJoining: "14-Nov-2002", status: "INACTIVE" },
  { id: 58, pfNumber: "27201", employeeName: "SHOBANA K", designation: "QUALITY CONTROLLER", workLocation: "PRODUCTION UNIT", department: "QUALITY", dateOfJoining: "29-Jan-2014", status: "ACTIVE" },
  { id: 59, pfNumber: "28100", employeeName: "ANNAMALAI R", designation: "TRANSPORT OFFICER", workLocation: "HEAD OFFICE", department: "TRANSPORT", dateOfJoining: "03-May-2007", status: "ACTIVE" },
  { id: 60, pfNumber: "28201", employeeName: "PADMAVATHI S", designation: "SECRETARY", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "20-Aug-2013", status: "ACTIVE" },
  { id: 61, pfNumber: "29100", employeeName: "RAJASEKARAN M", designation: "IT MANAGER", workLocation: "HEAD OFFICE", department: "IT", dateOfJoining: "08-Oct-2005", status: "ACTIVE" },
  { id: 62, pfNumber: "29201", employeeName: "LATHA B", designation: "PROGRAMMER", workLocation: "HEAD OFFICE", department: "IT", dateOfJoining: "16-Mar-2017", status: "ACTIVE" },
  { id: 63, pfNumber: "30100", employeeName: "CHELLAMUTHU V", designation: "SALES EXECUTIVE", workLocation: "REGIONAL OFFICE", department: "MARKETING", dateOfJoining: "11-Jul-2009", status: "ACTIVE" },
  { id: 64, pfNumber: "30201", employeeName: "NIRMALA P", designation: "BILLING OFFICER", workLocation: "HEAD OFFICE", department: "FINANCE", dateOfJoining: "25-Feb-2020", status: "ACTIVE" },
  { id: 65, pfNumber: "31100", employeeName: "SUNDARAM K", designation: "SUPERINTENDENT", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "01-Jan-1997", status: "ACTIVE" },
  { id: 66, pfNumber: "31201", employeeName: "VIJAYA R", designation: "TYPIST", workLocation: "REGIONAL OFFICE", department: "ADMIN", dateOfJoining: "14-Jun-2015", status: "ACTIVE" },
  { id: 67, pfNumber: "32100", employeeName: "MURUGAN D", designation: "ELECTRICIAN", workLocation: "PRODUCTION UNIT", department: "TECHNICAL", dateOfJoining: "27-Sep-2008", status: "ACTIVE" },
  { id: 68, pfNumber: "32201", employeeName: "AMBIKA N", designation: "RECEPTIONIST", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "09-Apr-2021", status: "ACTIVE" },
  { id: 69, pfNumber: "33100", employeeName: "ELANGOVAN S", designation: "WELFARE INSPECTOR", workLocation: "FIELD OFFICE", department: "HR", dateOfJoining: "18-Dec-2006", status: "ACTIVE" },
  { id: 70, pfNumber: "33201", employeeName: "SARASWATHI V", designation: "ACCOUNTS ASSISTANT", workLocation: "HEAD OFFICE", department: "FINANCE", dateOfJoining: "03-Mar-2012", status: "ACTIVE" },
  { id: 71, pfNumber: "34100", employeeName: "ARJUNAN P", designation: "STORE KEEPER", workLocation: "WAREHOUSE", department: "STORES", dateOfJoining: "22-Oct-2004", status: "ACTIVE" },
  { id: 72, pfNumber: "34201", employeeName: "MANIMEGALAI K", designation: "JUNIOR ANALYST", workLocation: "HEAD OFFICE", department: "IT", dateOfJoining: "15-Jul-2023", status: "ACTIVE" },
  { id: 73, pfNumber: "35100", employeeName: "VENKATACHALAM R", designation: "PRODUCTION SUPERVISOR", workLocation: "PRODUCTION UNIT", department: "PRODUCTION", dateOfJoining: "07-Feb-2003", status: "ACTIVE" },
  { id: 74, pfNumber: "35201", employeeName: "RAJESWARI M", designation: "NURSE", workLocation: "HEAD OFFICE", department: "MEDICAL", dateOfJoining: "20-Nov-2018", status: "ACTIVE" },
  { id: 75, pfNumber: "36100", employeeName: "THIYAGARAJAN S", designation: "SENIOR MANAGER", workLocation: "HEAD OFFICE", department: "ADMIN", dateOfJoining: "14-Apr-2000", status: "ACTIVE" },
  { id: 76, pfNumber: "36201", employeeName: "MYTHILI B", designation: "INSPECTOR", workLocation: "FIELD OFFICE", department: "QUALITY", dateOfJoining: "01-Jun-2016", status: "ACTIVE" },
  { id: 77, pfNumber: "37100", employeeName: "KARUPPASWAMY V", designation: "TECHNICAL OFFICER", workLocation: "HEAD OFFICE", department: "TECHNICAL", dateOfJoining: "08-Jan-2009", status: "ACTIVE" },
  { id: 78, pfNumber: "37201", employeeName: "SATHYAVATHI N", designation: "JUNIOR CLERK", workLocation: "REGIONAL OFFICE", department: "ADMIN", dateOfJoining: "25-Aug-2024", status: "ACTIVE" },
];

const DESIGNATIONS = [...new Set(SAMPLE_DATA.map((e) => e.designation))].sort();
const WORK_LOCATIONS = [...new Set(SAMPLE_DATA.map((e) => e.workLocation))].sort();
const DEPARTMENTS = [...new Set(SAMPLE_DATA.map((e) => e.department))].sort();

const STATUS_STYLES: Record<EmpStatus, string> = {
  ACTIVE: "bg-[#219653] text-white",
  INACTIVE: "bg-[#6c757d] text-white",
};

type SortKey = keyof Employee;
type SortDir = "asc" | "desc";
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

/* ─── Create Login Modal ─── */
function CreateLoginModal({ employee, onClose }: { employee: Employee | null; onClose: () => void }) {
  const [pfNum, setPfNum] = useState(employee?.pfNumber ?? "");

  const igWrap = "flex overflow-hidden rounded border border-[#ced4da] bg-white text-sm";
  const igIcon = "flex min-w-[42px] items-center justify-center border-r border-[#ced4da] bg-[#e9ecef] text-[#6c757d]";
  const igInput = "flex-1 bg-white px-3 py-[8px] text-sm text-[#495057] outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-[420px] rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
          <span className="text-base font-semibold text-white">Create Login</span>
          <button onClick={onClose} className="flex size-6 items-center justify-center rounded text-lg font-bold leading-none text-white hover:bg-white/20">×</button>
        </div>
        <div className="space-y-5 p-6">
          <div>
            <label className="mb-1.5 block text-sm text-[#212529]">Name</label>
            <div className={igWrap}>
              <span className={igIcon}><svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.337 0-10 1.676-10 5v1h20v-1c0-3.324-6.663-5-10-5z" /></svg></span>
              <input value={employee?.employeeName ?? ""} readOnly className={igInput + " bg-[#e9ecef] cursor-default text-[#6c757d]"} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-[#212529]">Designation</label>
            <div className={igWrap}>
              <span className={igIcon}><svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm4-4h8v2h-8z" /></svg></span>
              <input value={employee?.designation ?? ""} readOnly className={igInput + " bg-[#e9ecef] cursor-default text-[#6c757d]"} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-[#212529]">PF Number <span className="text-[#dc3545]">*</span></label>
            <div className={igWrap}>
              <span className={igIcon + " text-base font-bold"}>#</span>
              <input value={pfNum} onChange={(e) => setPfNum(e.target.value)} className={igInput} />
            </div>
          </div>
          <button className="w-full rounded bg-[#28a745] py-2.5 text-sm font-semibold text-white hover:bg-[#218838] active:bg-[#1e7e34]">Submit</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Delete Confirm Modal ─── */
function DeleteModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-lg bg-white shadow-xl dark:bg-gray-dark">
        <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">Confirm Delete</span>
          <button onClick={onClose} className="text-xl font-bold leading-none text-white hover:opacity-70">×</button>
        </div>
        <div className="p-6">
          <p className="mb-6 text-center text-sm text-dark dark:text-white">Are you sure you want to delete this record?</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={onClose} className="flex items-center gap-1.5 rounded bg-[#343a40] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              No
            </button>
            <button onClick={onConfirm} className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12" /></svg>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmployeeServiceRegisterListPage() {
  const [data, setData] = useState<Employee[]>(SAMPLE_DATA);
  const [filters, setFilters] = useState({ pfNumber: "", employeeName: "", designation: "", workLocation: "", department: "", dateOfJoining: "", status: "" });
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCreateLogin, setShowCreateLogin] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  const selectedEmployee = data.find((e) => e.id === selectedId) ?? null;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const filtered = data.filter((row) =>
    row.pfNumber.toLowerCase().includes(filters.pfNumber.toLowerCase()) &&
    row.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase()) &&
    (filters.designation === "" || row.designation === filters.designation) &&
    (filters.workLocation === "" || row.workLocation === filters.workLocation) &&
    (filters.department === "" || row.department === filters.department) &&
    (filters.dateOfJoining === "" || row.dateOfJoining.toLowerCase().includes(filters.dateOfJoining.toLowerCase())) &&
    (filters.status === "" || row.status === filters.status)
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey]; const bVal = b[sortKey];
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col text-[10px] leading-none opacity-70">
      <span className={sortKey === col && sortDir === "asc" ? "opacity-100" : "opacity-40"}>▲</span>
      <span className={sortKey === col && sortDir === "desc" ? "opacity-100" : "opacity-40"}>▼</span>
    </span>
  );

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 10) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else {
      pages.push(1, 2);
      if (currentPage > 4) pages.push("...");
      for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 1, totalPages);
    }
    return [...new Set(pages)];
  };

  const handleClear = () => {
    setFilters({ pfNumber: "", employeeName: "", designation: "", workLocation: "", department: "", dateOfJoining: "", status: "" });
    setSelectedId(null); setCurrentPage(1);
  };

  const handleDelete = () => {
    setData((prev) => prev.filter((e) => e.id !== selectedId));
    setSelectedId(null); setShowDeleteConfirm(false);
  };

  return (
    <div className="mx-auto">
      {showCreateLogin && <CreateLoginModal employee={selectedEmployee} onClose={() => setShowCreateLogin(false)} />}
      {showDeleteConfirm && <DeleteModal onClose={() => setShowDeleteConfirm(false)} onConfirm={handleDelete} />}

      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Employee Service Register List
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-primary hover:underline">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Employee Service Register List</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <p className="text-sm font-semibold text-dark dark:text-white">
            <span className="text-primary">{filtered.length}</span> &nbsp;- Employee(s)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {/* Create Login */}
            <button onClick={() => setShowCreateLogin(true)} className="flex items-center gap-1.5 rounded bg-[#e83e8c] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><path d="M9 21V9" /></svg>
              Create Login
            </button>
            {/* Add */}
            <Link href="/personnel/human-resource/employee-register/create">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><path d="M9 21V9" /></svg>
                Add
              </button>
            </Link>
            {/* Edit */}
            <button disabled={selectedId === null} onClick={() => selectedId !== null && router.push("/personnel/human-resource/employee-register/edit")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              Edit
            </button>
            {/* Delete */}
            <button disabled={selectedId === null} onClick={() => setShowDeleteConfirm(true)} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
              Delete
            </button>
            {/* View */}
            <button disabled={selectedId === null} onClick={() => selectedId !== null && router.push("/personnel/human-resource/employee-register/view")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
              View
            </button>
            {/* Download PDF */}
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="12" y1="18" x2="12" y2="12" /><polyline points="9,15 12,18 15,15" /></svg>
              Download PDF
            </button>
            {/* Clear */}
            <button onClick={handleClear} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="1,4 1,10 7,10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg>
              Clear
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="w-10 border border-[#3aa88f] px-3 py-3 text-center font-semibold">#</th>
                {([["pfNumber", "PF Number"], ["employeeName", "Employee Name"], ["designation", "Designation"], ["workLocation", "Work Location"], ["department", "Department"], ["dateOfJoining", "Date of Joining"], ["status", "Status"]] as [SortKey, string][]).map(([key, label]) => (
                  <th key={key} onClick={() => handleSort(key)} className="cursor-pointer border border-[#3aa88f] px-3 py-3 text-center font-semibold hover:bg-[#267a68]">
                    {label} <SortIcon col={key} />
                  </th>
                ))}
                <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Select</th>
              </tr>
              {/* Filter row */}
              <tr className="bg-white dark:bg-gray-dark">
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.pfNumber} onChange={(e) => { setFilters((f) => ({ ...f, pfNumber: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.employeeName} onChange={(e) => { setFilters((f) => ({ ...f, employeeName: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.designation} onChange={(e) => { setFilters((f) => ({ ...f, designation: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    {DESIGNATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.workLocation} onChange={(e) => { setFilters((f) => ({ ...f, workLocation: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    {WORK_LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.department} onChange={(e) => { setFilters((f) => ({ ...f, department: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <input type="text" placeholder="dd-MMM-yyyy" className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white" value={filters.dateOfJoining} onChange={(e) => { setFilters((f) => ({ ...f, dateOfJoining: e.target.value })); setCurrentPage(1); }} />
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3">
                  <select className="w-full rounded border border-stroke bg-transparent px-2 py-1 text-xs text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setCurrentPage(1); }}>
                    <option value="">Select</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </td>
                <td className="border border-stroke px-2 py-1.5 dark:border-dark-3" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="py-8 text-center text-gray-400">No records found</td></tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${selectedId === row.id ? "bg-blue-50 dark:bg-[#1e2d42]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"} hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td className="border-r border-stroke px-3 py-3 text-[#17a2b8] dark:border-dark-3">{row.pfNumber}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.employeeName}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.designation}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.workLocation}</td>
                    <td className="border-r border-stroke px-3 py-3 text-dark dark:border-dark-3 dark:text-white">{row.department}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center text-dark dark:border-dark-3 dark:text-white">{row.dateOfJoining}</td>
                    <td className="border-r border-stroke px-3 py-3 text-center dark:border-dark-3">
                      <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${STATUS_STYLES[row.status]}`}>{row.status}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <input type="radio" name="esrSelectRow" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-primary" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">({currentPage} of {totalPages})</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">«</button>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">‹</button>
            {visiblePages().map((page, i) =>
              page === "..." ? <span key={`e-${i}`} className="px-1 text-gray-400">...</span> :
                <button key={page} onClick={() => setCurrentPage(page as number)} className={`flex size-8 items-center justify-center rounded border text-sm ${currentPage === page ? "border-primary bg-primary text-white" : "border-stroke hover:bg-gray-100 dark:border-dark-3 dark:hover:bg-dark-2"}`}>{page}</button>
            )}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">›</button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="flex size-8 items-center justify-center rounded border border-stroke text-sm hover:bg-gray-100 disabled:opacity-40 dark:border-dark-3 dark:hover:bg-dark-2">»</button>
            <select className="ml-2 rounded border border-stroke bg-transparent px-2 py-1 text-sm text-dark outline-none dark:border-dark-3 dark:text-white" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
              {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
