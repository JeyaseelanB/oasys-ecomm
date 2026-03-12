"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </div>
);

const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>
);

type Nominee = { id: number; empName: string; empNumber: string; department: string; designation: string };

const SEARCH_RESULTS: Nominee[] = [
  { id: 1, empName: "KUMAR / S",  empNumber: "201", department: "ADMIN",    designation: "MANAGER"    },
  { id: 2, empName: "PRIYA / M",  empNumber: "215", department: "HR",       designation: "EXECUTIVE"  },
  { id: 3, empName: "RAJAN / K",  empNumber: "198", department: "ACCOUNTS", designation: "ACCOUNTANT" },
  { id: 4, empName: "SELVI / P",  empNumber: "230", department: "ADMIN",    designation: "OFFICER"    },
  { id: 5, empName: "MOHAN / R",  empNumber: "187", department: "IT",       designation: "DEVELOPER"  },
];

export default function CreateNomineesPage() {
  const router = useRouter();
  const [searchEmp, setSearchEmp] = useState("");
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [selectedSearch, setSelectedSearch] = useState<number | null>(null);

  const filteredSearch = SEARCH_RESULTS.filter(
    (e) =>
      !nominees.find((n) => n.id === e.id) &&
      (e.empName.toLowerCase().includes(searchEmp.toLowerCase()) ||
        e.empNumber.includes(searchEmp))
  );

  const addNominee = () => {
    if (selectedSearch === null) return;
    const emp = SEARCH_RESULTS.find((e) => e.id === selectedSearch);
    if (emp) { setNominees((prev) => [...prev, emp]); setSelectedSearch(null); }
  };

  const removeNominee = (id: number) => setNominees((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Nominees</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Training</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Nominees</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Create Nominees — INTR-28</h3>
          <span className="inline-block rounded bg-[#28a745] px-2.5 py-0.5 text-xs font-semibold text-white">FINAL_APPROVED</span>
        </div>

        <div className="p-5">
          {/* Training Info (read-only) */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Training Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div><p className="text-xs text-gray-500">Reference Number</p><p className="text-sm font-medium text-[#17a2b8]">INTR-28</p></div>
            <div><p className="text-xs text-gray-500">Training Type</p><p className="text-sm font-medium text-[#17a2b8]">INTERNAL</p></div>
            <div><p className="text-xs text-gray-500">Training Name</p><p className="text-sm font-medium text-[#17a2b8]">Trail</p></div>
            <div><p className="text-xs text-gray-500">No. of Days</p><p className="text-sm font-medium text-[#17a2b8]">3</p></div>
            <div><p className="text-xs text-gray-500">Start Date</p><p className="text-sm font-medium text-[#17a2b8]">04-Jul-2022</p></div>
            <div><p className="text-xs text-gray-500">End Date</p><p className="text-sm font-medium text-[#17a2b8]">06-Jul-2022</p></div>
          </div>

          {/* Search & Add Employee */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Add Nominees</h4>
          </div>
          <div className="mb-4 flex flex-wrap items-end gap-3 border-b border-stroke pb-6 dark:border-dark-3">
            <div className="flex-1 min-w-[200px]">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Search Employee</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </IconBox>
                <input
                  type="text"
                  value={searchEmp}
                  onChange={(e) => setSearchEmp(e.target.value)}
                  placeholder="Name or Employee Number..."
                  className="flex-1 rounded-r border border-stroke px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d8f7b] dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>
            <button
              onClick={addNominee}
              disabled={selectedSearch === null}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
          </div>

          {/* Search Results */}
          {searchEmp && filteredSearch.length > 0 && (
            <div className="mb-4 overflow-x-auto rounded border border-stroke dark:border-dark-3">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Employee Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Emp. Number</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Department</th>
                    <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Designation</th>
                    <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSearch.map((emp, idx) => (
                    <tr
                      key={emp.id}
                      onClick={() => setSelectedSearch(emp.id)}
                      className={`cursor-pointer transition-colors ${selectedSearch === emp.id ? "bg-[#e8f4f8] dark:bg-[#1a2e3a]" : idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}
                    >
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{emp.empName}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{emp.empNumber}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{emp.department}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{emp.designation}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <input type="radio" checked={selectedSearch === emp.id} onChange={() => setSelectedSearch(emp.id)} className="size-4 accent-[#2d8f7b]" onClick={(e) => e.stopPropagation()} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Nominees Table */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Selected Nominees ({nominees.length})</h4>
          </div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Employee Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Employee Number</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Department</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Designation</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {nominees.length === 0 ? (
                  <tr><td colSpan={6} className="border border-stroke px-4 py-6 text-center text-gray-400 dark:border-dark-3">No nominees added yet.</td></tr>
                ) : (
                  nominees.map((emp, idx) => (
                    <tr key={emp.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{emp.empName}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{emp.empNumber}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{emp.department}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{emp.designation}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <button
                          onClick={() => removeNominee(emp.id)}
                          className="rounded bg-[#dc3545] px-2 py-1 text-xs font-medium text-white hover:opacity-90"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/admin/training/internal-external-training/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button
              disabled={nominees.length === 0}
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
