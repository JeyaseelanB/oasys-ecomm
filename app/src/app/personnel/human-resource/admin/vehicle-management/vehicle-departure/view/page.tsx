"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK_EMPLOYEES = [
  { id: 1, empCode: "EMP001", empName: "Arjun Kumar" },
  { id: 2, empCode: "EMP002", empName: "Priya Sharma" },
];

const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>
);

export default function ViewVehicleDeparturePage() {
  const router = useRouter();

  const record = {
    vehicleNumber: "TN-01-AB-1234",
    vehicleMake: "TATA",
    vehicleVariant: "TATA ACE",
    driverName: "Ravi Kumar",
    departureDate: "12-Mar-2026",
    departureTime: "09:30 AM",
    startKm: 12500,
    destination: "Chennai Warehouse",
    purpose: "Goods Delivery",
    hasDocument: true,
    arrivalDate: "12-Mar-2026",
    arrivalTime: "02:45 PM",
    endKm: 12680,
    remarks: "Delivered all goods successfully.",
  };

  const totalKm = record.endKm - record.startKm;

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Vehicle Departure</h2>
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
            <li className="font-medium text-primary">View Vehicle Departure</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Vehicle Departure</h3>
        </div>

        <div className="p-5">
          {/* Section 1: Vehicle & Driver Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Vehicle &amp; Driver Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div>
              <p className="text-xs text-gray-500">Vehicle Number</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.vehicleNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Vehicle Make</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.vehicleMake}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Vehicle Variant</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.vehicleVariant}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Driver Name</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.driverName}</p>
            </div>
          </div>

          {/* Section 2: Departure Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Departure Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-3 dark:border-dark-3">
            <div>
              <p className="text-xs text-gray-500">Departure Date</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.departureDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Departure Time</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.departureTime}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Start KM</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.startKm}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Destination</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.destination}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Purpose</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.purpose}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Attached Document</p>
              {record.hasDocument ? (
                <button className="mt-1 flex items-center gap-1 rounded bg-[#17a2b8] px-3 py-1 text-xs font-medium text-white hover:opacity-90">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="8,17 12,21 16,17"/>
                    <line x1="12" y1="12" x2="12" y2="21"/>
                    <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>
                  </svg>
                  Download
                </button>
              ) : (
                <p className="text-sm font-medium text-[#17a2b8]">-</p>
              )}
            </div>
          </div>

          {/* Section 3: Arrival Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Arrival Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div>
              <p className="text-xs text-gray-500">Arrival Date</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.arrivalDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Arrival Time</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.arrivalTime}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">End KM</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.endKm}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total KM</p>
              <p className="text-sm font-medium text-[#17a2b8]">{totalKm}</p>
            </div>
          </div>

          {/* Section 4: Officer Traveled Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Officer Traveled Details</h4>
          </div>
          <div className="mb-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Employee Code</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Employee Name</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_EMPLOYEES.map((emp, idx) => (
                  <tr key={emp.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{emp.empCode}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3">{emp.empName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">Number of Employees</p>
              <p className="text-sm font-medium text-[#17a2b8]">{MOCK_EMPLOYEES.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Remarks</p>
              <p className="text-sm font-medium text-[#17a2b8]">{record.remarks}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/admin/vehicle-management/vehicle-departure/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12,19 5,12 12,5"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
