"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TEAL = "#2aa781";

type PromotionItem = {
  id: number;
  empCodeName: string;
  currentHoRo: string;
  currentEntityType: string;
  currentEntity: string;
  currentDesignation: string;
  currentPayscale: string;
  currentBasicPay: string;
  promotedHoRo: string;
  promotedEntityType: string;
  promotedEntity: string;
  promotedDesignation: string;
  revisedPayscale: string;
  revisedBasicPay: string;
  balanceSecDeposit: string;
  balanceSecDepEmi: string;
};

const HO_RO_OPTIONS = ["HEAD OFFICE", "VIJAYAWADA", "COIMBATORE", "ERODE", "CHENNAI", "TIRUPUR"];
const DEPT_OPTIONS = ["FINANCE", "ADMIN", "PRODUCTION", "HR", "MARKETING", "IT", "ACCOUNTS"];
const DESGN_OPTIONS = [
  "ASSISTANT MANAGER", "DEPUTY MANAGER", "MANAGER", "SENIOR MANAGER",
  "SUPERINTENDENT", "DEPUTY DIRECTOR", "ASSISTANT DIRECTOR", "DIRECTOR",
  "DEPUTY REGIONAL MANAGER", "REGIONAL MANAGER",
];
const ENTITY_TYPE_OPTIONS = ["Head Office", "Regional Office", "D & P Office", "Inspection Center", "Depot", "Showroom"];
const ENTITY_OPTIONS = ["VIJAYAWADA", "COIMBATORE", "ERODE", "CHENNAI", "TIRUPUR", "MADURAI", "NMP CFDS CENTRE ERODE"];
const PAYSCALE_OPTIONS = ["150-3050", "650-1630", "1800-3800", "1850-4450", "7120-30000", "28480.0-90570.0", "29800.0-95000.0"];
const FORWARD_FOR_OPTIONS = ["APPROVAL", "INFORMATION", "REVIEW", "ACTION"];

const EMPLOYEES: { code: string; name: string }[] = [
  { code: "140",  name: "ARULRAJAN" },
  { code: "165",  name: "MANGALAM" },
  { code: "174",  name: "LAVANYA" },
  { code: "191",  name: "PREMKUMAR" },
  { code: "194",  name: "LAKSHMI PRABHA" },
  { code: "242",  name: "ANURADHA" },
  { code: "253",  name: "SARAVANAN P" },
  { code: "312",  name: "SELVI" },
  { code: "577",  name: "LALITHA" },
  { code: "1889", name: "MAHALINGAM" },
];

const TOOLBAR_BUTTONS = [
  "Sans Serif", "Normal", "B", "I", "U", "S", "A", "Ā", "x₂", "x²", "H₁", "H₂", "❝", "</>",
  "≡", "•", "⇤", "⇥", "¶", "—", "🔗", "🖼", "⊞", "Tx",
];

// Icon helpers
function TealIconBox({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center px-2 shrink-0 border border-r-0 border-gray-300 bg-gray-100 rounded-l"
      style={{ minWidth: 32, height: 32 }}>
      {icon}
    </div>
  );
}

function BuildingIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="1" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="7" r="4" /><path d="M5 21v-1a7 7 0 0 1 14 0v1" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="3" cy="6" r="1" fill="currentColor" /><circle cx="3" cy="12" r="1" fill="currentColor" /><circle cx="3" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function RupeeIcon() {
  return <span className="text-gray-500 text-xs font-semibold">₹</span>;
}

function HashIcon() {
  return <span className="text-gray-500 text-xs font-semibold">#</span>;
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg className="w-4 h-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function SelectField({ icon, value, onChange, options, placeholder = "Select" }: {
  icon: React.ReactNode; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string;
}) {
  return (
    <div className="flex border border-gray-300 rounded overflow-hidden" style={{ height: 32 }}>
      <TealIconBox icon={icon} />
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-2 text-xs text-gray-800 bg-white focus:outline-none border-l border-gray-300">
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ReadOnlyField({ icon, value, placeholder = "" }: { icon: React.ReactNode; value: string; placeholder?: string }) {
  return (
    <div className="flex border border-gray-300 rounded overflow-hidden bg-gray-50" style={{ height: 32 }}>
      <TealIconBox icon={icon} />
      <input type="text" readOnly value={value} placeholder={placeholder}
        className="flex-1 px-2 text-xs text-gray-700 bg-gray-50 focus:outline-none border-l border-gray-300" />
    </div>
  );
}

function InputField({ icon, value, onChange, placeholder = "" }: {
  icon: React.ReactNode; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="flex border border-gray-300 rounded overflow-hidden" style={{ height: 32 }}>
      <TealIconBox icon={icon} />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="flex-1 px-2 text-xs text-gray-800 bg-white focus:outline-none border-l border-gray-300" />
    </div>
  );
}

export default function AddPromotionPage() {
  const router = useRouter();

  // Top search filters
  const [hoRo,         setHoRo]         = useState("");
  const [department,   setDepartment]   = useState("");
  const [designation,  setDesignation]  = useState("");
  const [empSearch,    setEmpSearch]    = useState("");
  const [selectedEmp,  setSelectedEmp]  = useState<{ code: string; name: string } | null>(null);

  // Current Details (auto-populated after Generate)
  const [curHoRo,        setCurHoRo]        = useState("");
  const [curEntityType,  setCurEntityType]  = useState("");
  const [curEntity,      setCurEntity]      = useState("");
  const [curDesignation, setCurDesignation] = useState("");
  const [curReportingTo, setCurReportingTo] = useState("");
  const [curPayscale,    setCurPayscale]    = useState("");
  const [curBasicPay,    setCurBasicPay]    = useState("");

  // Promotion Details
  const [proHoRo,         setProHoRo]         = useState("");
  const [proEntityType,   setProEntityType]   = useState("");
  const [proEntity,       setProEntity]       = useState("");
  const [proDesignation,  setProDesignation]  = useState("");
  const [proReportingTo,  setProReportingTo]  = useState("");
  const [proPayscale,     setProPayscale]     = useState("");
  const [proBasicPay,     setProBasicPay]     = useState("");
  const [collectedDeposit,setCollectedDeposit]= useState("");
  const [balanceDeposit,  setBalanceDeposit]  = useState("");
  const [balanceEmi,      setBalanceEmi]      = useState("");

  // Table
  const [items, setItems] = useState<PromotionItem[]>([]);
  const [nextId, setNextId] = useState(1);

  // Forward
  const [forwardTo,  setForwardTo]  = useState("");
  const [forwardFor, setForwardFor] = useState("");

  // Note modal
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText,      setNoteText]      = useState("");
  const [noteCardIdx,   setNoteCardIdx]   = useState(0);

  const handleGenerate = () => {
    if (!hoRo || !empSearch) return;
    const emp = EMPLOYEES.find((e) => e.code === empSearch || e.name.includes(empSearch));
    if (emp) {
      setSelectedEmp(emp);
      setCurHoRo(hoRo);
      setCurEntityType("Head Office");
      setCurEntity(hoRo);
      setCurDesignation(designation || "DEPUTY MANAGER");
      setCurReportingTo("DIRECTOR");
      setCurPayscale("7120-30000");
      setCurBasicPay("52120");
    }
  };

  const handleClearTop = () => {
    setHoRo(""); setDepartment(""); setDesignation(""); setEmpSearch("");
    setSelectedEmp(null);
    setCurHoRo(""); setCurEntityType(""); setCurEntity(""); setCurDesignation("");
    setCurReportingTo(""); setCurPayscale(""); setCurBasicPay("");
  };

  const handleAddItem = () => {
    if (!selectedEmp || !proHoRo || !proDesignation) return;
    const newItem: PromotionItem = {
      id: nextId,
      empCodeName: `${selectedEmp.code} / ${selectedEmp.name}`,
      currentHoRo: curHoRo,
      currentEntityType: curEntityType,
      currentEntity: curEntity,
      currentDesignation: curDesignation,
      currentPayscale: curPayscale,
      currentBasicPay: curBasicPay,
      promotedHoRo: proHoRo,
      promotedEntityType: proEntityType,
      promotedEntity: proEntity,
      promotedDesignation: proDesignation,
      revisedPayscale: proPayscale,
      revisedBasicPay: proBasicPay,
      balanceSecDeposit: balanceDeposit,
      balanceSecDepEmi: balanceEmi,
    };
    setItems((prev) => [...prev, newItem]);
    setNextId((n) => n + 1);
  };

  const handleRemoveItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Promotion section header */}
      <div className="bg-white rounded shadow-sm mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2" style={{ backgroundColor: TEAL }}>
          <h2 className="text-xs font-semibold text-white">Promotion</h2>
          <span className="text-xs text-white/80">* Mandatory Fields</span>
        </div>
        {/* Top filter row */}
        <div className="p-3 grid grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">HO/RO *</label>
            <SelectField icon={<BuildingIcon />} value={hoRo} onChange={setHoRo} options={HO_RO_OPTIONS} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Department *</label>
            <SelectField icon={<BuildingIcon />} value={department} onChange={setDepartment} options={DEPT_OPTIONS} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Designation *</label>
            <SelectField icon={<PersonIcon />} value={designation} onChange={setDesignation} options={DESGN_OPTIONS} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Employee Code / Name / Seniority *</label>
            <div className="flex border border-gray-300 rounded overflow-hidden" style={{ height: 32 }}>
              <TealIconBox icon={<HashIcon />} />
              <select value={empSearch} onChange={(e) => setEmpSearch(e.target.value)}
                className="flex-1 px-2 text-xs text-gray-800 bg-white focus:outline-none border-l border-gray-300">
                <option value="">Select</option>
                {EMPLOYEES.map((e) => (
                  <option key={e.code} value={e.code}>{e.code} / {e.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 px-3 pb-3">
          <button onClick={handleClearTop}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: "#6c757d" }}>
            ✕ Clear
          </button>
          <button onClick={handleGenerate}
            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: TEAL }}>
            ⟳ Generate
          </button>
        </div>
      </div>

      {/* Current Details */}
      <div className="bg-white rounded shadow-sm mb-4 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
          <GridIcon />
          <h2 className="text-xs font-semibold text-gray-700">Current Details</h2>
        </div>
        <div className="p-3 grid grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">HO/RO</label>
            <ReadOnlyField icon={<BuildingIcon />} value={curHoRo} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Entity Type</label>
            <ReadOnlyField icon={<ListIcon />} value={curEntityType} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Entity</label>
            <ReadOnlyField icon={<BuildingIcon />} value={curEntity} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Current Designation</label>
            <ReadOnlyField icon={<PersonIcon />} value={curDesignation} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Reporting To</label>
            <ReadOnlyField icon={<PersonIcon />} value={curReportingTo} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Current Payscale</label>
            <ReadOnlyField icon={<RupeeIcon />} value={curPayscale} placeholder="-" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Current Basic Pay</label>
            <ReadOnlyField icon={<RupeeIcon />} value={curBasicPay} />
          </div>
        </div>
      </div>

      {/* Promotion Details */}
      <div className="bg-white rounded shadow-sm mb-4 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
          <GridIcon />
          <h2 className="text-xs font-semibold text-gray-700">Promotion Details</h2>
        </div>
        <div className="p-3 grid grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">HO/RO *</label>
            <SelectField icon={<BuildingIcon />} value={proHoRo} onChange={setProHoRo} options={HO_RO_OPTIONS} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Entity Type *</label>
            <SelectField icon={<ListIcon />} value={proEntityType} onChange={setProEntityType} options={ENTITY_TYPE_OPTIONS} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Entity *</label>
            <SelectField icon={<BuildingIcon />} value={proEntity} onChange={setProEntity} options={ENTITY_OPTIONS} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Promoted Designation *</label>
            <SelectField icon={<PersonIcon />} value={proDesignation} onChange={setProDesignation} options={DESGN_OPTIONS} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Reporting To *</label>
            <SelectField icon={<PersonIcon />} value={proReportingTo} onChange={setProReportingTo} options={DESGN_OPTIONS} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Revised Payscale *</label>
            <SelectField icon={<RupeeIcon />} value={proPayscale} onChange={setProPayscale} options={PAYSCALE_OPTIONS} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Revised Basic Pay *</label>
            <InputField icon={<RupeeIcon />} value={proBasicPay} onChange={setProBasicPay} placeholder="0.00" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Collected Security Deposit</label>
            <InputField icon={<RupeeIcon />} value={collectedDeposit} onChange={setCollectedDeposit} placeholder="0.00" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Balance Security Deposit</label>
            <InputField icon={<RupeeIcon />} value={balanceDeposit} onChange={setBalanceDeposit} placeholder="0.00" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Balance Security Deposit EMI</label>
            <InputField icon={<HashIcon />} value={balanceEmi} onChange={setBalanceEmi} placeholder="" />
          </div>
          <div className="flex items-end">
            <button onClick={handleAddItem}
              className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white rounded"
              style={{ backgroundColor: TEAL }}>
              + Add
            </button>
          </div>
        </div>

        {/* Items table */}
        <div className="mx-3 mb-3 overflow-x-auto rounded border border-gray-200">
          <table className="text-xs w-full border-collapse" style={{ minWidth: 1200 }}>
            <thead>
              <tr style={{ backgroundColor: TEAL }}>
                <th className="px-2 py-2 text-white text-center font-semibold border border-white/30 w-8">#</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Employee Code / Name</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current HO/RO</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current Entity Type</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current Entity</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current Designation</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current Payscale</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Current Basic Pay</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Promoted HO/RO</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Promoted Entity Type</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Promoted Entity</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Promoted Designation</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Revised Payscale</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Revised Basic Pay</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Balance Security Deposit</th>
                <th className="px-2 py-2 text-white text-left font-semibold border border-white/30">Balance Security Deposit EMI</th>
                <th className="px-2 py-2 text-white text-center font-semibold border border-white/30 w-12">Del</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={17} className="text-center py-4 text-gray-400">No records found</td>
                </tr>
              ) : (
                items.map((item, idx) => (
                  <tr key={item.id} style={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#f9fafb" }}>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-center text-gray-700">{idx + 1}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700 whitespace-nowrap">{item.empCodeName}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.currentHoRo}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.currentEntityType}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.currentEntity}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.currentDesignation}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.currentPayscale}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.currentBasicPay}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.promotedHoRo}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.promotedEntityType}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.promotedEntity}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.promotedDesignation}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.revisedPayscale}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.revisedBasicPay}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.balanceSecDeposit}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-gray-700">{item.balanceSecDepEmi}</td>
                    <td className="px-2 py-1.5 border-b border-gray-100 text-center">
                      <button onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 font-bold text-xs">✕</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Forward To / For */}
        <div className="p-3 grid grid-cols-4 gap-3 border-t border-gray-100">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Forward To *</label>
            <InputField icon={<ArrowIcon />} value={forwardTo} onChange={setForwardTo} placeholder="Forward To" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Forward For *</label>
            <SelectField icon={<ArrowIcon />} value={forwardFor} onChange={setForwardFor} options={FORWARD_FOR_OPTIONS} />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={() => setShowNoteModal(true)}
          className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white rounded"
          style={{ backgroundColor: TEAL }}>
          + Create Note
        </button>
        <div className="flex gap-2">
          <button onClick={() => router.back()}
            className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: "#dc3545" }}>
            ✕ Cancel
          </button>
          <button onClick={() => router.push("/personnel/human-resource/promotion/list")}
            className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white rounded"
            style={{ backgroundColor: "#28a745" }}>
            ✓ Submit
          </button>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-2 rounded-t-lg" style={{ backgroundColor: TEAL }}>
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white/80 hover:text-white text-lg font-bold">×</button>
            </div>
            <div className="flex flex-wrap gap-1 px-3 py-2 border-b bg-gray-50">
              {TOOLBAR_BUTTONS.map((btn) => (
                <button key={btn} className="px-1.5 py-0.5 text-[10px] border border-gray-300 rounded bg-white hover:bg-gray-100 text-gray-700 font-medium">
                  {btn}
                </button>
              ))}
            </div>
            <div className="px-4 py-3">
              <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter text ..." rows={5}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none resize-none" />
            </div>
            <div className="px-4 pb-3 flex items-center justify-center gap-3">
              <button onClick={() => setNoteCardIdx((i) => Math.max(0, i - 1))}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold">‹</button>
              <div className="border rounded p-3 flex-1 max-w-xs" style={{ borderColor: "#f97316" }}>
                <p className="text-xs font-semibold text-gray-600 mb-1.5 text-center">Created By</p>
                <p className="text-xs text-gray-700">Name : SANKARANARAYANAN</p>
                <p className="text-xs text-gray-700">Designation : ASSISTANT SALES MAN</p>
                <p className="text-xs text-gray-700">Date : 13-Mar-2026</p>
              </div>
              <button onClick={() => setNoteCardIdx((i) => i + 1)}
                className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold">›</button>
            </div>
            <div className="flex justify-end gap-2 px-4 pb-4">
              <button onClick={() => setShowNoteModal(false)}
                className="px-4 py-1.5 text-xs font-semibold rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => setShowNoteModal(false)}
                className="px-4 py-1.5 text-xs font-semibold text-white rounded"
                style={{ backgroundColor: TEAL }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
