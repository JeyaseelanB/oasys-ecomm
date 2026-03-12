"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

// Pre-filled departure record (read-only)
const DEPARTURE_RECORD = {
  departureDate: "01-Sep-2024",
  departureTime: "10:20 AM",
  startKm: "1500.0",
  destination: "Secretariat",
  purpose: "Meeting",
};

export default function EditVehicleArrivalPage() {
  const router = useRouter();

  // Vehicle & Driver Details (read-only, from linked record)
  const [hoRo] = useState("HEAD OFFICE");
  const [vehicleNumber] = useState("TN01 AL 47 57");
  const [vehicleMake] = useState("Toyota Kirloskar Motor Ltd");
  const [variant] = useState("Diesel");
  const [driverId] = useState("183");
  const [driverName] = useState("BALU");

  // Officer Traveling Details
  const [employeeName, setEmployeeName] = useState("ALOK BABELAY,VAASU R");
  const [numEmployeesTravelled, setNumEmployeesTravelled] = useState("2");

  // Arrival Details
  const [arrivalDate, setArrivalDate] = useState("09-Sep-2024");
  const [arrivalHour, setArrivalHour] = useState("13");
  const [arrivalMin, setArrivalMin] = useState("00");
  const [endKm, setEndKm] = useState("1525.0");
  const [reason, setReason] = useState("Meeting");

  const totalKm = (parseFloat(endKm) || 0) - (parseFloat(DEPARTURE_RECORD.startKm) || 0);

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Vehicle Arrival</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
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
            <li className="font-medium text-primary">Edit Vehicle Arrival</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Vehicle Arrival</h3>
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
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">HO/RO</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                  </svg>
                </IconBox>
                <input type="text" value={hoRo} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Vehicle Number</label>
              <div className="flex">
                <IconBox>
                  <span className="text-sm font-bold">#</span>
                </IconBox>
                <input type="text" value={vehicleNumber} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Vehicle Make</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </IconBox>
                <input type="text" value={vehicleMake} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Variant</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 8v4l3 3"/>
                  </svg>
                </IconBox>
                <input type="text" value={variant} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Driver ID</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                </IconBox>
                <input type="text" value={driverId} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
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

          {/* Section 2: Departure Details (read-only) */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Departure Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Departure Date</label>
              <div className="flex">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <input type="text" value={DEPARTURE_RECORD.departureDate} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Departure Time</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                  </svg>
                </IconBox>
                <input type="text" value={DEPARTURE_RECORD.departureTime} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Start Kilometer</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </IconBox>
                <input type="text" value={DEPARTURE_RECORD.startKm} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Destination</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </IconBox>
                <input type="text" value={DEPARTURE_RECORD.destination} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Purpose</label>
              <div className="flex">
                <IconBox>
                  <span className="text-sm font-bold">#</span>
                </IconBox>
                <input type="text" value={DEPARTURE_RECORD.purpose} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Section 3: Officer Traveling Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Officer Traveling Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Employee Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </IconBox>
                <textarea value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} rows={2} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">No. of Employees Travelled</label>
              <div className="flex">
                <IconBox>
                  <span className="text-sm font-bold">#</span>
                </IconBox>
                <input type="number" value={numEmployeesTravelled} onChange={(e) => setNumEmployeesTravelled(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Section 4: Arrival Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Arrival Details</h4>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Arrival Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
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
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Arrival Time <span className="text-red-500">*</span></label>
              <div className="flex items-stretch gap-1">
                <div className="flex flex-1 items-center gap-1 rounded border border-stroke bg-transparent px-2 py-1 dark:border-dark-3 dark:bg-gray-dark">
                  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <input type="text" value={arrivalHour} onChange={(e) => setArrivalHour(e.target.value.replace(/\D/g, "").slice(0, 2))} className="w-8 bg-transparent text-center text-sm outline-none dark:text-white" maxLength={2} />
                  <span className="text-gray-400">:</span>
                  <input type="text" value={arrivalMin} onChange={(e) => setArrivalMin(e.target.value.replace(/\D/g, "").slice(0, 2))} className="w-8 bg-transparent text-center text-sm outline-none dark:text-white" maxLength={2} />
                </div>
                <div className="flex flex-col">
                  <button onClick={() => setArrivalHour((h) => String(Math.min(23, parseInt(h || "0") + 1)).padStart(2, "0"))} className="flex h-5 w-6 items-center justify-center rounded-t border border-stroke bg-gray-100 text-xs text-gray-500 hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2">▲</button>
                  <button onClick={() => setArrivalHour((h) => String(Math.max(0, parseInt(h || "0") - 1)).padStart(2, "0"))} className="flex h-5 w-6 items-center justify-center rounded-b border border-t-0 border-stroke bg-gray-100 text-xs text-gray-500 hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2">▼</button>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">End KM <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </IconBox>
                <input type="number" value={endKm} onChange={(e) => setEndKm(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Total Kilometer</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </IconBox>
                <input type="text" value={totalKm >= 0 ? totalKm.toFixed(1) : "0.0"} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Reason <span className="text-red-500">*</span></label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} maxLength={250} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
            <p className="mt-1 text-xs text-gray-400">Should be maximum 250 characters</p>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/admin/vehicle-management/vehicle-arrival/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
              </svg>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
