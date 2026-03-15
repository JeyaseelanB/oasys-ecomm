"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ─────────────────────── Icon Input wrapper ─────────────────────── */
function IconInput({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center overflow-hidden rounded border border-stroke dark:border-dark-3">
      <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center border-r border-stroke bg-gray-50 text-gray-500 dark:border-dark-3 dark:bg-[#1a2232] dark:text-gray-400">
        {icon}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

/* ─────────────────────── Icon Select wrapper ─────────────────────── */
function IconSelect({
  icon,
  label,
  required,
  options,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <IconInput icon={icon}>
        <select
          className="h-[40px] w-full bg-transparent px-3 text-sm text-dark outline-none dark:text-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </IconInput>
    </div>
  );
}

/* ─────────────────────── Icon Text Input wrapper ─────────────────────── */
function IconTextInput({
  icon,
  label,
  required,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <IconInput icon={icon}>
        <input
          type="text"
          className="h-[40px] w-full bg-transparent px-3 text-sm text-dark outline-none dark:text-white"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </IconInput>
    </div>
  );
}

/* ─────────────────────── Icons ─────────────────────── */
const ListIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const HashIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const QrIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="2" width="8" height="8" rx="1" />
    <rect x="14" y="2" width="8" height="8" rx="1" />
    <rect x="2" y="14" width="8" height="8" rx="1" />
    <rect x="14" y="14" width="4" height="4" />
    <line x1="22" y1="14" x2="22" y2="22" />
    <line x1="14" y1="22" x2="22" y2="22" />
  </svg>
);

const StackIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polygon points="12,2 2,7 12,12 22,7" />
    <polyline points="2,17 12,22 22,17" />
    <polyline points="2,12 12,17 22,12" />
  </svg>
);

const WeightIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 2a3 3 0 00-3 3h6a3 3 0 00-3-3z" />
    <path d="M5 8h14l-1.5 12H6.5L5 8z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16,8 20,8 23,11 23,16 16,16 16,8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const FileIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" />
  </svg>
);

const RupeeIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 3h12M6 8h12M6 3c0 5 6 10 12 17M14 3c-4 0-7 2-7 5s3 5 7 5" />
  </svg>
);

const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" opacity="0.7" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function CreateStockOutwardPage() {
  const router = useRouter();
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  /* Form state */
  const [type, setType] = useState("");
  const [entityType, setEntityType] = useState("");
  const [bundleNumber, setBundleNumber] = useState("");
  const [qrCode, setQrCode] = useState("");

  /* Bundle Details */
  const [totalBundles, setTotalBundles] = useState("");
  const [bundleNum, setBundleNum] = useState("");
  const [totalBundleWeight, setTotalBundleWeight] = useState("");

  /* Transport Details */
  const [transportServiceType, setTransportServiceType] = useState("");
  const [transportServiceName, setTransportServiceName] = useState("");
  const [waybillAvailable, setWaybillAvailable] = useState("");
  const [waybillNumber, setWaybillNumber] = useState("");
  const [transportChargeAvailable, setTransportChargeAvailable] = useState("");
  const [transportChargeType, setTransportChargeType] = useState("");
  const [transportChargeAmount, setTransportChargeAmount] = useState("");

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Stock Outward - ISSR
        </h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">ISSR</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Stock Outward - ISSR</li>
          </ol>
        </nav>
      </div>

      {/* ── Section 1: Create Stock Outward Header ── */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div
          className="flex cursor-pointer items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3"
          onClick={() => setIsHeaderOpen(!isHeaderOpen)}
        >
          <span className="text-sm font-semibold text-white">Create Stock Outward - ISSR</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white">(<span className="text-red-300">*</span> Mandatory Fields)</span>
            <svg
              className={`size-4 text-white transition-transform duration-200 ${isHeaderOpen ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </div>
        </div>

        {isHeaderOpen && (
          <div className="p-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <IconSelect
                icon={<ListIcon />}
                label="Type"
                required
                options={["ISSR", "DWH", "SHOWROOM"]}
                value={type}
                onChange={setType}
              />
              <IconSelect
                icon={<ListIcon />}
                label="Entity Type"
                required
                options={["ISSR", "DWH", "SHOWROOM"]}
                value={entityType}
                onChange={setEntityType}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Section 2: Add Products ── */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-dark dark:text-white">
            <GridIcon /> Add Products
          </h3>

          <div className="mb-5 flex flex-wrap items-end gap-4">
            <div className="w-full md:w-[280px]">
              <IconTextInput
                icon={<HashIcon />}
                label="Bundle Number"
                required
                value={bundleNumber}
                onChange={setBundleNumber}
              />
            </div>
            <div className="w-full md:w-[280px]">
              <IconTextInput
                icon={<QrIcon />}
                label="QR Code"
                required
                value={qrCode}
                onChange={setQrCode}
              />
            </div>
            <button className="flex h-[42px] items-center gap-1.5 rounded bg-[#28a745] px-5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
              </svg>
              Add
            </button>
          </div>

          {/* Product Variety Details Table */}
          <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-dark dark:text-white">
            <GridIcon /> Product Variety Details
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold w-12">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">UOM</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Dispatched Quantity</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Available Quantity</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Value (&#8377;)</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold w-16">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="border border-stroke px-3 py-3 text-gray-400 dark:border-dark-3">
                    No records found.
                  </td>
                </tr>
                {/* Total Row */}
                <tr className="bg-gray-50 font-semibold dark:bg-[#1a2232]">
                  <td className="border border-stroke px-3 py-2.5 dark:border-dark-3" colSpan={2}></td>
                  <td className="border border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">Total</td>
                  <td className="border border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">0.00</td>
                  <td className="border border-stroke px-3 py-2.5 dark:border-dark-3"></td>
                  <td className="border border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">0.00</td>
                  <td className="border border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Section 3: Bundle Details ── */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-dark dark:text-white">
            <GridIcon /> Bundle Details
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <IconTextInput
              icon={<StackIcon />}
              label="Total Number of Bundles"
              value={totalBundles}
              onChange={setTotalBundles}
            />
            <IconTextInput
              icon={<StackIcon />}
              label="Bundle Number"
              value={bundleNum}
              onChange={setBundleNum}
            />
            <IconTextInput
              icon={<WeightIcon />}
              label="Total Bundle Weight"
              value={totalBundleWeight}
              onChange={setTotalBundleWeight}
            />
          </div>
        </div>
      </div>

      {/* ── Section 4: Transport Details ── */}
      <div className="mb-6 rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-dark dark:text-white">
            <GridIcon /> Transport Details
          </h3>

          <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-4">
            <IconSelect
              icon={<TruckIcon />}
              label="Transport Service Type"
              options={["BY ROAD", "BY RAIL", "BY AIR", "BY SEA"]}
              value={transportServiceType}
              onChange={setTransportServiceType}
            />
            <IconSelect
              icon={<TruckIcon />}
              label="Transport Service Name"
              options={["SERVICE 1", "SERVICE 2", "SERVICE 3"]}
              value={transportServiceName}
              onChange={setTransportServiceName}
            />
            <IconSelect
              icon={<StackIcon />}
              label="Waybill Available"
              options={["Yes", "No"]}
              value={waybillAvailable}
              onChange={setWaybillAvailable}
            />
            <IconTextInput
              icon={<FileIcon />}
              label="Waybill Number"
              value={waybillNumber}
              onChange={setWaybillNumber}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <IconSelect
              icon={<StackIcon />}
              label="Transport Charge Available"
              options={["Yes", "No"]}
              value={transportChargeAvailable}
              onChange={setTransportChargeAvailable}
            />
            <IconSelect
              icon={<FileIcon />}
              label="Transport Charge Type"
              options={["FIXED", "PERCENTAGE"]}
              value={transportChargeType}
              onChange={setTransportChargeType}
            />
            <IconTextInput
              icon={<RupeeIcon />}
              label="Transport Charge Amount"
              value={transportChargeAmount}
              onChange={setTransportChargeAmount}
            />
          </div>
        </div>
      </div>

      {/* ── Footer Buttons ── */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => router.push("/operational/warehouse-management/issr/stock-outward/list")}
          className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Cancel
        </button>
        <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
          </svg>
          Save
        </button>
        <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="20,6 9,17 4,12" />
          </svg>
          Submit
        </button>
      </div>
    </div>
  );
}
