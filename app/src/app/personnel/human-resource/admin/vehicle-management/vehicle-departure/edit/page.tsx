"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EmployeeRow {
  id: number;
  empCode: string;
  empName: string;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
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

const VEHICLE_DATA: Record<string, { make: string; variant: string; driver: string }> = {
  "TN-01-AB-1234": { make: "TATA", variant: "TATA ACE", driver: "Ravi Kumar" },
  "TN-02-CD-5678": { make: "ASHOK LEYLAND", variant: "DOST+", driver: "Murugan S" },
  "TN-03-EF-9012": { make: "MAHINDRA", variant: "BOLERO PICKUP", driver: "Selvam P" },
};

export default function EditVehicleDeparturePage() {
  const router = useRouter();

  // Pre-filled with existing record (id=1)
  const [vehicleNumber, setVehicleNumber] = useState("TN-01-AB-1234");
  const [vehicleMake, setVehicleMake] = useState("TATA");
  const [vehicleVariant, setVehicleVariant] = useState("TATA ACE");
  const [driverName, setDriverName] = useState("Ravi Kumar");

  const [departureDate, setDepartureDate] = useState("12-Mar-2026");
  const [departureHour, setDepartureHour] = useState("09");
  const [departureMin, setDepartureMin] = useState("30");
  const [startKm, setStartKm] = useState("12500");
  const [destination, setDestination] = useState("Chennai Warehouse");
  const [purpose, setPurpose] = useState("Goods Delivery");
  const [uploadDocument, setUploadDocument] = useState("");

  const [selectedEmp, setSelectedEmp] = useState("");
  const [selectedEmpName, setSelectedEmpName] = useState("");
  const [employeeRows, setEmployeeRows] = useState<EmployeeRow[]>([
    { id: 1, empCode: "EMP001", empName: "Arjun Kumar" },
    { id: 2, empCode: "EMP002", empName: "Priya Sharma" },
  ]);
  const [numEmployees, setNumEmployees] = useState("2");
  const [remarks, setRemarks] = useState("Delivered all goods successfully.");

  const handleVehicleChange = (vNum: string) => {
    setVehicleNumber(vNum);
    const info = VEHICLE_DATA[vNum];
    if (info) {
      setVehicleMake(info.make);
      setVehicleVariant(info.variant);
      setDriverName(info.driver);
    } else {
      setVehicleMake(""); setVehicleVariant(""); setDriverName("");
    }
  };

  const handleAddEmployee = () => {
    if (!selectedEmp) return;
    const exists = employeeRows.find((e) => e.empCode === selectedEmp);
    if (exists) return;
    const newRow: EmployeeRow = { id: Date.now(), empCode: selectedEmp, empName: selectedEmpName };
    setEmployeeRows((prev) => {
      const updated = [...prev, newRow];
      setNumEmployees(String(updated.length));
      return updated;
    });
    setSelectedEmp(""); setSelectedEmpName("");
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployeeRows((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      setNumEmployees(String(updated.length));
      return updated;
    });
  };

  const EMPLOYEES = [
    { code: "EMP001", name: "Arjun Kumar" },
    { code: "EMP002", name: "Priya Sharma" },
    { code: "EMP003", name: "Suresh Babu" },
    { code: "EMP004", name: "Lakshmi Devi" },
  ];

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Vehicle Departure</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Vehicle Management</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Vehicle Departure</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Vehicle Departure</h3>
          <span className="text-xs text-white opacity-80">( * Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Section 1: Vehicle & Driver Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Vehicle &amp; Driver Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Vehicle Number <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </IconBox>
                <select value={vehicleNumber} onChange={(e) => handleVehicleChange(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Vehicle</option>
                  {Object.keys(VEHICLE_DATA).map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Vehicle Make</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </IconBox>
                <input type="text" value={vehicleMake} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Vehicle Variant</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </IconBox>
                <input type="text" value={vehicleVariant} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Driver Name</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </IconBox>
                <input type="text" value={driverName} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Section 2: Departure Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Departure Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Departure Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Departure Time <span className="text-red-500">*</span></label>
              <div className="flex items-stretch gap-1">
                <div className="flex flex-1 items-center gap-1 rounded border border-stroke bg-transparent px-2 py-1 dark:border-dark-3 dark:bg-gray-dark">
                  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <input type="text" value={departureHour} onChange={(e) => setDepartureHour(e.target.value.replace(/\D/g, "").slice(0, 2))} className="w-8 bg-transparent text-center text-sm outline-none dark:text-white" maxLength={2} />
                  <span className="text-gray-400">:</span>
                  <input type="text" value={departureMin} onChange={(e) => setDepartureMin(e.target.value.replace(/\D/g, "").slice(0, 2))} className="w-8 bg-transparent text-center text-sm outline-none dark:text-white" maxLength={2} />
                </div>
                <div className="flex flex-col">
                  <button onClick={() => setDepartureHour((h) => String(Math.min(23, parseInt(h || "0") + 1)).padStart(2, "0"))} className="flex h-5 w-6 items-center justify-center rounded-t border border-stroke bg-gray-100 text-xs text-gray-500 hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2">▲</button>
                  <button onClick={() => setDepartureHour((h) => String(Math.max(0, parseInt(h || "0") - 1)).padStart(2, "0"))} className="flex h-5 w-6 items-center justify-center rounded-b border border-t-0 border-stroke bg-gray-100 text-xs text-gray-500 hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2">▼</button>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Start KM <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </IconBox>
                <input type="number" value={startKm} onChange={(e) => setStartKm(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Destination <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </IconBox>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Purpose <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </IconBox>
                <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select Purpose</option>
                  <option value="Goods Delivery">Goods Delivery</option>
                  <option value="Staff Transport">Staff Transport</option>
                  <option value="Official Work">Official Work</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Upload Document</label>
              <div className="flex">
                <input type="text" value={uploadDocument} readOnly placeholder="No file chosen" className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <button className="flex items-center gap-1 rounded-r border border-stroke bg-[#17a2b8] px-3 py-2 text-xs font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="16,16 12,12 8,16"/><line x1="12" y1="12" x2="12" y2="21"/>
                    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
                  </svg>
                  Upload
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Section 3: Officer Traveled Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Officer Traveled Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Employee</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </IconBox>
                <select
                  value={selectedEmp}
                  onChange={(e) => {
                    const code = e.target.value;
                    setSelectedEmp(code);
                    const emp = EMPLOYEES.find((em) => em.code === code);
                    setSelectedEmpName(emp ? emp.name : "");
                  }}
                  className="w-full border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Select Employee</option>
                  {EMPLOYEES.map((emp) => <option key={emp.code} value={emp.code}>{emp.code} - {emp.name}</option>)}
                </select>
                <button onClick={handleAddEmployee} className="flex items-center gap-1 rounded-r border border-l-0 border-stroke bg-[#28a745] px-3 py-2 text-xs font-medium text-white hover:opacity-90 whitespace-nowrap">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add
                </button>
              </div>
            </div>
            {selectedEmpName && (
              <div className="flex items-end">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Selected: <span className="font-medium text-dark dark:text-white">{selectedEmpName}</span>
                </p>
              </div>
            )}
          </div>

          {/* Employee Table */}
          <div className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Employee Code</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Employee Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeRows.length === 0 ? (
                  <tr><td colSpan={4} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                ) : (
                  employeeRows.map((emp, idx) => (
                    <tr key={emp.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{emp.empCode}</td>
                      <td className="border border-stroke px-2 py-2 dark:border-dark-3">{emp.empName}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <button onClick={() => handleDeleteEmployee(emp.id)} className="inline-flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Number of Employees</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  </svg>
                </IconBox>
                <input type="number" value={numEmployees} onChange={(e) => setNumEmployees(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Remarks</label>
            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/admin/vehicle-management/vehicle-departure/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
