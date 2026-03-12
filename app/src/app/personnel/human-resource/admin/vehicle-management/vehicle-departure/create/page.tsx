"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ── Icons ── */
const GridIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="0.5" /><rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="9" width="6" height="6" rx="0.5" /><rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);
const HashIco = () => <span className="text-gray-500 text-xs font-bold">#</span>;
const TruckIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
  </svg>
);
const DropIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);
const IdIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);
const CalIco = () => (
  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);
const ClockIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);
const MapIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);
const PurposeIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);
const EmpIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);
const UploadIco = () => (
  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

/* ── Reusable field components ── */
const F = ({ label, required, icon, children }: { label: string; required?: boolean; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-700">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
    <div className="flex border border-gray-300 rounded overflow-hidden h-8">
      <div className="bg-gray-100 border-r border-gray-300 px-2 flex items-center justify-center min-w-[30px]">{icon}</div>
      {children}
    </div>
  </div>
);

const Sel = ({ label, required, icon, options, value, onChange }: { label: string; required?: boolean; icon: React.ReactNode; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) => (
  <F label={label} required={required} icon={icon}>
    <select className="flex-1 px-2 text-sm focus:outline-none bg-white" value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Select</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </F>
);

const Inp = ({ label, required, icon, value, onChange, readOnly, placeholder }: { label: string; required?: boolean; icon: React.ReactNode; value: string; onChange?: (v: string) => void; readOnly?: boolean; placeholder?: string }) => (
  <F label={label} required={required} icon={icon}>
    <input readOnly={readOnly} placeholder={placeholder} className={`flex-1 px-2 text-sm focus:outline-none ${readOnly ? "bg-gray-50 text-gray-500" : "bg-white"}`} value={value} onChange={e => onChange?.(e.target.value)} />
  </F>
);

const DateF = ({ label, required, value, onChange }: { label: string; required?: boolean; value: string; onChange: (v: string) => void }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-700">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
    <div className="flex border border-gray-300 rounded overflow-hidden h-8">
      <input type="text" placeholder="dd-MMM-yyyy" className="flex-1 px-2 text-sm focus:outline-none bg-white" value={value} onChange={e => onChange(e.target.value)} />
      <div className="px-2 flex items-center border-l border-gray-300 cursor-pointer" style={{ backgroundColor: "#17a2b8" }}><CalIco /></div>
    </div>
  </div>
);

const VEHICLE_OPTIONS = [
  { value: "TN01 AL 47 57", label: "TN01 AL 47 57" },
  { value: "TN01 AM7457", label: "TN01 AM7457" },
  { value: "TN01 AE4757", label: "TN01 AE4757" },
  { value: "TN 01 BH 8877", label: "TN 01 BH 8877" },
];

const VEHICLE_DATA: Record<string, { make: string; variant: string; driverPf: string; driverName: string }> = {
  "TN01 AL 47 57": { make: "Toyota Kirloskar Motor Ltd", variant: "Diesel", driverPf: "3458/BALU N", driverName: "BALU" },
  "TN01 AM7457": { make: "Maruti Suzuki", variant: "Petrol", driverPf: "3459/BALU N", driverName: "BALU" },
  "TN01 AE4757": { make: "Tata Motors", variant: "Diesel", driverPf: "3460/BALU N", driverName: "BALU" },
  "TN 01 BH 8877": { make: "Hyundai", variant: "Petrol", driverPf: "3461/BALU N", driverName: "BALU" },
};

const EMPLOYEE_OPTIONS = [
  { value: "EMP001", label: "EMP001 / STALIN P" },
  { value: "EMP002", label: "EMP002 / VAASU R" },
  { value: "EMP003", label: "EMP003 / ALOK BABELAY" },
  { value: "EMP004", label: "EMP004 / BALASUBRAMANIAN R" },
];

const EMPLOYEE_NAMES: Record<string, string> = {
  EMP001: "STALIN P",
  EMP002: "VAASU R",
  EMP003: "ALOK BABELAY",
  EMP004: "BALASUBRAMANIAN R",
};

export default function CreateVehicleDeparturePage() {
  const router = useRouter();

  // Vehicle & Driver
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [variant, setVariant] = useState("");
  const [driverPf, setDriverPf] = useState("");
  const [driverName, setDriverName] = useState("");

  // Departure Details
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("00:00");
  const [startKm, setStartKm] = useState("");
  const [destination, setDestination] = useState("");
  const [purpose, setPurpose] = useState("");

  // Officer Traveled
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeeNames, setEmployeeNames] = useState<string[]>([]);
  const [numEmployees, setNumEmployees] = useState("");
  const [insuranceFile, setInsuranceFile] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleVehicleChange = (v: string) => {
    setVehicleNumber(v);
    const d = VEHICLE_DATA[v];
    if (d) {
      setVehicleMake(d.make);
      setVariant(d.variant);
      setDriverPf(d.driverPf);
      setDriverName(d.driverName);
    } else {
      setVehicleMake(""); setVariant(""); setDriverPf(""); setDriverName("");
    }
  };

  const handleAddEmployee = () => {
    if (selectedEmployee && EMPLOYEE_NAMES[selectedEmployee]) {
      const name = EMPLOYEE_NAMES[selectedEmployee];
      if (!employeeNames.includes(name)) {
        const updated = [...employeeNames, name];
        setEmployeeNames(updated);
        setNumEmployees(String(updated.length));
      }
    }
  };

  const incrementTime = () => {
    const [h, m] = departureTime.split(":").map(Number);
    const total = h * 60 + m + 30;
    setDepartureTime(`${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`);
  };
  const decrementTime = () => {
    const [h, m] = departureTime.split(":").map(Number);
    const total = Math.max(0, h * 60 + m - 30);
    setDepartureTime(`${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`);
  };

  const LIST_URL = "/personnel/human-resource/admin/vehicle-management/vehicle-departure/list";

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Personnel</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Human Resource</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Admin</li>
          <li>/</li>
          <li><Link href={LIST_URL} className="hover:text-teal-600">Vehicle Management</Link></li>
          <li>/</li>
          <li className="text-gray-700">Create Vehicle Departure</li>
        </ol>
      </nav>

      <h1 className="text-base font-semibold text-gray-800 mb-3">Create Vehicle Departure</h1>

      {/* Main card */}
      <div className="bg-white rounded shadow-sm border border-gray-200 mb-4">
        {/* Card header */}
        <div className="px-4 py-2 flex items-center justify-between text-white text-sm font-semibold rounded-t" style={{ backgroundColor: "#2d8f7b" }}>
          <span>Vehicle Departure</span>
          <span className="text-xs font-normal opacity-90">(* Mandatory Fields)</span>
        </div>

        <div className="p-4 space-y-5">
          {/* Section: Vehicle & Driver Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GridIco />
              <span className="font-semibold text-sm text-gray-800">Vehicle &amp; Driver Details</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Sel
                label="Vehicle Number"
                required
                icon={<HashIco />}
                options={VEHICLE_OPTIONS}
                value={vehicleNumber}
                onChange={handleVehicleChange}
              />
              <Inp label="Vehicle Make" icon={<TruckIco />} value={vehicleMake} readOnly placeholder="Auto-filled" />
              <Inp label="Variant" icon={<DropIco />} value={variant} readOnly placeholder="Auto-filled" />
              <Inp label="Driver PF No / Name" required icon={<IdIco />} value={driverPf} readOnly placeholder="Auto-filled" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <Inp label="Driver Name" icon={<IdIco />} value={driverName} readOnly placeholder="Auto-filled" />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Departure Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GridIco />
              <span className="font-semibold text-sm text-gray-800">Departure Details</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <DateF label="Departure Date" required value={departureDate} onChange={setDepartureDate} />

              {/* Departure Time with +/- */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Departure Time<span className="text-red-500 ml-0.5">*</span></label>
                <div className="flex border border-gray-300 rounded overflow-hidden h-8">
                  <div className="bg-gray-100 border-r border-gray-300 px-2 flex items-center justify-center min-w-[30px]"><ClockIco /></div>
                  <input type="text" className="flex-1 px-2 text-sm focus:outline-none bg-white" value={departureTime}
                    onChange={e => setDepartureTime(e.target.value)} />
                  <div className="flex flex-col border-l border-gray-300">
                    <button className="flex-1 px-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-b border-gray-300 text-xs leading-none" onClick={incrementTime}>▲</button>
                    <button className="flex-1 px-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-xs leading-none" onClick={decrementTime}>▼</button>
                  </div>
                </div>
              </div>

              <Inp label="Start Kilometer" required icon={<HashIco />} value={startKm} onChange={setStartKm} placeholder="0.0" />
              <Inp label="Destination" required icon={<MapIco />} value={destination} onChange={setDestination} placeholder="Enter destination" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <Inp label="Purpose" required icon={<PurposeIco />} value={purpose} onChange={setPurpose} placeholder="Enter purpose" />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Section: Officer Traveled Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GridIco />
              <span className="font-semibold text-sm text-gray-800">Officer Traveled Details</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* Employee Code/Name dropdown */}
              <Sel
                label="Employee Code / Name"
                required
                icon={<EmpIco />}
                options={EMPLOYEE_OPTIONS}
                value={selectedEmployee}
                onChange={setSelectedEmployee}
              />

              {/* Add Employee button */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700 opacity-0">Add</label>
                <button
                  className="flex items-center justify-center gap-1.5 h-8 px-4 text-white text-xs font-semibold rounded"
                  style={{ backgroundColor: "#28a745" }}
                  onClick={handleAddEmployee}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Add Employee
                </button>
              </div>

              {/* Employee Name display */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Employee Name<span className="text-red-500 ml-0.5">*</span></label>
                <div className="flex border border-gray-300 rounded overflow-hidden min-h-[32px]">
                  <div className="bg-gray-100 border-r border-gray-300 px-2 flex items-start justify-center min-w-[30px] pt-1.5"><HashIco /></div>
                  <div className="flex-1 px-2 py-1 text-xs bg-gray-50 text-gray-700 min-h-[32px]">
                    {employeeNames.join(",")}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <Inp label="No. of Employees Travelled" required icon={<HashIco />} value={numEmployees} onChange={setNumEmployees} placeholder="0" />

              {/* Upload Insurance Document */}
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs text-gray-700">Upload Insurance Document</label>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 border border-gray-300 rounded h-8 flex items-center px-2 bg-white text-xs text-gray-500">
                    {insuranceFile || ""}
                  </div>
                  <label className="flex items-center gap-1.5 px-3 h-8 text-white text-xs font-semibold rounded cursor-pointer" style={{ backgroundColor: "#17a2b8" }}>
                    <UploadIco />
                    Upload
                    <input type="file" className="hidden" accept=".png,.jpeg,.jpg,.pdf,.doc"
                      onChange={e => setInsuranceFile(e.target.files?.[0]?.name || "")} />
                  </label>
                </div>
                <span className="text-xs text-gray-400">File format: png, jpeg, pdf, doc and file size should be less than 2MB</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Remarks<span className="text-red-500 ml-0.5">*</span></label>
                <textarea
                  rows={3}
                  maxLength={250}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none resize-none w-full"
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  placeholder="Enter remarks..."
                />
                <span className="text-xs text-gray-400">Should be maximum 250 characters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#6c757d" }}
            onClick={() => router.push(LIST_URL)}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#28a745" }}
            onClick={() => router.push(LIST_URL)}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
