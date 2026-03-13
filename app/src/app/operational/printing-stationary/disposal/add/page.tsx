"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DisposalItem {
  id: number;
  itemTypeCodeName: string;
  uom: string;
  requestQuantity: number;
  receivedQuantity: number;
  alreadyDisposalQuantity: number;
  currentDisposalQuantity: number;
  balanceQuantity: number;
}

// Dropdown options
const HO_RO_OPTIONS = ["11 / COIMBATORE", "12 / CHENNAI", "13 / MADURAI", "14 / SALEM"];
const ENTITY_TYPE_OPTIONS = ["SHOW_ROOM / Showroom", "WAREHOUSE / Warehouse", "OFFICE / Office"];
const ENTITY_CODE_OPTIONS = ["1114 / MARUTHAM", "1115 / ANNAMALAI", "1116 / KAVERI"];
const DEPARTMENT_OPTIONS = ["MARKETING / MARKETING", "SALES / SALES", "ADMIN / ADMIN", "EDP / EDP"];
const SECTION_OPTIONS = ["Export / Export", "Import / Import", "Local / Local"];
const REQUEST_OPTIONS = ["Select", "REQ-2025-001", "REQ-2025-002", "REQ-2025-003"];
const ITEM_OPTIONS = ["Select Item Code / Name", "3771 / XEROX & PRINT", "ORDF / ORDER FORMS", "POU6 / POUCH BROWN 6", "SPRL / SPIRAL BINDING"];

const ScaleIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="12" y1="3" x2="12" y2="21" /><line x1="3" y1="12" x2="21" y2="12" />
    <path d="M5 8l-2 4 2 4" /><path d="M19 8l2 4-2 4" />
  </svg>
);

const PieChartIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21.21 15.89A10 10 0 118 2.83" />
    <path d="M22 12A10 10 0 0012 2v10z" />
  </svg>
);

const HashIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 21V9h6v12" />
  </svg>
);

const ListIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="23,4 23,10 17,10" /><polyline points="1,20 1,14 7,14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);

const PinIcon = () => (
  <svg className="size-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Select field with icon prefix
const SelectField = ({ icon, value, onChange, options }: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => (
  <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
      {icon}
    </span>
    <select
      className="h-9 flex-1 bg-transparent px-2 text-sm text-dark outline-none dark:text-white dark:bg-gray-dark"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

// Read-only input with icon prefix
const ReadonlyField = ({ icon, value }: { icon: React.ReactNode; value: string | number }) => (
  <div className="flex items-center overflow-hidden rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center border-r border-stroke dark:border-dark-3">
      {icon}
    </span>
    <input
      readOnly
      value={value}
      className="h-9 flex-1 bg-transparent px-2 text-sm text-dark outline-none dark:text-white"
    />
  </div>
);

export default function CreatePrintingStationaryDisposalPage() {
  const router = useRouter();

  // Header form state
  const [form, setForm] = useState({
    hoRo: "11 / COIMBATORE",
    entityType: "SHOW_ROOM / Showroom",
    entityCode: "1114 / MARUTHAM",
    departmentCode: "MARKETING / MARKETING",
    sectionCode: "Export / Export",
    requestCode: "Select",
  });

  // Item entry state
  const [itemEntry, setItemEntry] = useState({
    itemCodeName: "Select Item Code / Name",
    uom: "",
    requestQuantity: "",
    receivedQuantity: 0,
    alreadyDisposalQuantity: "",
    currentDisposalQuantity: "",
    balanceQuantity: "",
  });

  // Added items table
  const [items, setItems] = useState<DisposalItem[]>([]);
  const [nextId, setNextId] = useState(1);

  const totalCurrentDisposal = items.reduce((s, i) => s + i.currentDisposalQuantity, 0);

  const handleAddItem = () => {
    if (itemEntry.itemCodeName === "Select Item Code / Name") return;
    const newItem: DisposalItem = {
      id: nextId,
      itemTypeCodeName: itemEntry.itemCodeName,
      uom: itemEntry.uom,
      requestQuantity: Number(itemEntry.requestQuantity) || 0,
      receivedQuantity: itemEntry.receivedQuantity,
      alreadyDisposalQuantity: Number(itemEntry.alreadyDisposalQuantity) || 0,
      currentDisposalQuantity: Number(itemEntry.currentDisposalQuantity) || 0,
      balanceQuantity: Number(itemEntry.balanceQuantity) || 0,
    };
    setItems((prev) => [...prev, newItem]);
    setNextId((n) => n + 1);
    setItemEntry({ itemCodeName: "Select Item Code / Name", uom: "", requestQuantity: "", receivedQuantity: 0, alreadyDisposalQuantity: "", currentDisposalQuantity: "", balanceQuantity: "" });
  };

  const handleClearItem = () => {
    setItemEntry({ itemCodeName: "Select Item Code / Name", uom: "", requestQuantity: "", receivedQuantity: 0, alreadyDisposalQuantity: "", currentDisposalQuantity: "", balanceQuantity: "" });
  };

  const handleDeleteItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSubmit = () => {
    router.push("/operational/printing-stationary/disposal/list");
  };

  const handleCancel = () => {
    router.push("/operational/printing-stationary/disposal/list");
  };

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Printing &amp; Stationary Disposal
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Printing &amp; Stationary</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Printing &amp; Stationary Disposal</li>
          </ol>
        </nav>
      </div>

      {/* Card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        {/* Card Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2dc4b2] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Printing &amp; Stationary Disposal</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white opacity-90">( * Mandatory Fields)</span>
            <button className="text-white hover:opacity-80">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">

          {/* Row 1: HO/RO, Entity Type, Entity Code, Department */}
          <div className="mb-5 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">
                HO/RO <span className="text-red-500">*</span>
              </label>
              <SelectField icon={<BuildingIcon />} value={form.hoRo} onChange={(v) => setForm((f) => ({ ...f, hoRo: v }))} options={HO_RO_OPTIONS} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">
                Entity Type Code / Name <span className="text-red-500">*</span>
              </label>
              <SelectField icon={<ListIcon />} value={form.entityType} onChange={(v) => setForm((f) => ({ ...f, entityType: v }))} options={ENTITY_TYPE_OPTIONS} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">
                Entity Code / Name <span className="text-red-500">*</span>
              </label>
              <SelectField icon={<HashIcon />} value={form.entityCode} onChange={(v) => setForm((f) => ({ ...f, entityCode: v }))} options={ENTITY_CODE_OPTIONS} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">
                Department Code / Name <span className="text-red-500">*</span>
              </label>
              <SelectField icon={<HashIcon />} value={form.departmentCode} onChange={(v) => setForm((f) => ({ ...f, departmentCode: v }))} options={DEPARTMENT_OPTIONS} />
            </div>
          </div>

          {/* Row 2: Section, Request Code */}
          <div className="mb-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">
                Section Code / Name <span className="text-red-500">*</span>
              </label>
              <SelectField icon={<PieChartIcon />} value={form.sectionCode} onChange={(v) => setForm((f) => ({ ...f, sectionCode: v }))} options={SECTION_OPTIONS} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">
                Request Code / Name <span className="text-red-500">*</span>
              </label>
              <SelectField icon={<RefreshIcon />} value={form.requestCode} onChange={(v) => setForm((f) => ({ ...f, requestCode: v }))} options={REQUEST_OPTIONS} />
            </div>
          </div>

          {/* Payment Details Section */}
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
            <svg className="size-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <rect x="1" y="1" width="7" height="7" rx="1" /><rect x="12" y="1" width="7" height="7" rx="1" />
              <rect x="1" y="12" width="7" height="7" rx="1" /><rect x="12" y="12" width="7" height="7" rx="1" />
            </svg>
            Payment Details
          </h4>

          {/* Item Entry Row 1: Item Code, UOM, Request Qty, Received Qty */}
          <div className="mb-4 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">
                Item Code / Name <span className="text-red-500">*</span>
              </label>
              <SelectField icon={<PinIcon />} value={itemEntry.itemCodeName} onChange={(v) => setItemEntry((e) => ({ ...e, itemCodeName: v }))} options={ITEM_OPTIONS} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">UOM</label>
              <ReadonlyField icon={<ScaleIcon />} value={itemEntry.uom} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">Request Quantity</label>
              <ReadonlyField icon={<ScaleIcon />} value={itemEntry.requestQuantity} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">Received Quantity</label>
              <ReadonlyField icon={<ScaleIcon />} value={itemEntry.receivedQuantity} />
            </div>
          </div>

          {/* Item Entry Row 2: Already Disposal, Current Disposal, Balance, Actions */}
          <div className="mb-5 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">Already Disposal Quantity</label>
              <ReadonlyField icon={<ScaleIcon />} value={itemEntry.alreadyDisposalQuantity} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">Current Disposal Quantity</label>
              <div className="flex items-center overflow-hidden rounded border border-stroke focus-within:border-primary dark:border-dark-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                  <ScaleIcon />
                </span>
                <input
                  type="number"
                  min="0"
                  className="h-9 flex-1 bg-transparent px-2 text-sm text-dark outline-none dark:text-white"
                  value={itemEntry.currentDisposalQuantity}
                  onChange={(e) => setItemEntry((en) => ({ ...en, currentDisposalQuantity: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-dark dark:text-white">Balance Quantity to be Available</label>
              <ReadonlyField icon={<ScaleIcon />} value={itemEntry.balanceQuantity} />
            </div>
            {/* Clear & Add buttons aligned to bottom */}
            <div className="flex items-end gap-2">
              <button
                onClick={handleClearItem}
                className="flex flex-1 items-center justify-center gap-1.5 rounded bg-[#6c757d] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Clear
              </button>
              <button
                onClick={handleAddItem}
                className="flex flex-1 items-center justify-center gap-1.5 rounded bg-[#28a745] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
                </svg>
                Add
              </button>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-3 text-center font-semibold" style={{ width: "48px" }}>#</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Item Type Code / Name</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold" style={{ width: "80px" }}>UOM</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Request Quantity</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Received Quantity</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Already Disposal Quantity</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Current Disposal Quantity</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold">Balance Quantity to be Available</th>
                  <th className="border border-[#3aa88f] px-3 py-3 text-center font-semibold" style={{ width: "80px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">No records found.</td>
                  </tr>
                ) : (
                  items.map((row, idx) => (
                    <tr key={row.id} className={`border-b border-stroke dark:border-dark-3 ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`}>
                      <td className="border-r border-stroke px-2 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.itemTypeCodeName}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{row.uom}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.requestQuantity}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.receivedQuantity}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.alreadyDisposalQuantity}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.currentDisposalQuantity}</td>
                      <td className="border-r border-stroke px-3 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">{row.balanceQuantity}</td>
                      <td className="px-2 py-2.5 text-center">
                        <button onClick={() => handleDeleteItem(row.id)} className="rounded bg-[#dc3545] p-1 text-white hover:opacity-80">
                          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <polyline points="3,6 5,6 21,6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                {/* Total Row */}
                <tr className="bg-[#f0faf9] dark:bg-[#1a2232]">
                  <td colSpan={3} className="border-r border-t border-stroke px-3 py-2.5 text-right text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">Total</td>
                  <td colSpan={5} className="border-t border-stroke px-3 py-2.5 text-right text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">{totalCurrentDisposal}</td>
                  <td className="border-t border-stroke dark:border-dark-3"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="20,6 9,17 4,12" />
              </svg>
              Submit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}