"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ═══════════════════════════════════════════
   ICONS
═══════════════════════════════════════════ */
const CategoryIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="3" width="7" height="7" rx="1" /><rect x="15" y="3" width="7" height="7" rx="1" />
    <rect x="2" y="14" width="7" height="7" rx="1" /><rect x="15" y="14" width="7" height="7" rx="1" />
  </svg>
);
const GroupIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const ProductIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);
const DesignIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const CalIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const RulerIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M3 3l18 18M3 9l6-6M9 3l6 6M15 9l3-3M9 15l3 3" />
  </svg>
);
const ListIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const WeightIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 3a3 3 0 100 6 3 3 0 000-6z" />
    <path d="M6.343 8.657L3.515 11.485A8 8 0 1020.485 11.485L17.657 8.657" />
  </svg>
);
const GridIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);
const HashIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);
const PercentIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);
const RupeeIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 3h12M6 8h12M6 13l8 8M6 13h3a4 4 0 000-8" />
  </svg>
);
const UserIcon = () => (
  <svg className="size-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const TrashIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="3,6 5,6 21,6" />
    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" />
  </svg>
);
const SectionIcon = () => (
  <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1" /><rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="10" width="4" height="4" rx="1" /><rect x="10" y="10" width="4" height="4" rx="1" />
  </svg>
);

/* ═══════════════════════════════════════════
   REUSABLE COMPONENTS
═══════════════════════════════════════════ */
function FieldGroup({
  label, required, icon, children,
}: {
  label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-dark dark:text-white">
        {label}{required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="flex items-center overflow-hidden rounded border border-stroke bg-white focus-within:border-[#17a2b8] dark:border-dark-3 dark:bg-gray-dark">
        {icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border-r border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
            {icon}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

function FInput({
  className = "", ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-10 w-full bg-transparent px-3 text-sm text-dark outline-none placeholder:text-gray-400 disabled:bg-gray-50 dark:text-white dark:placeholder:text-gray-500 dark:disabled:bg-dark-2 ${className}`}
    />
  );
}

function FSelect({
  children, ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="h-10 w-full bg-transparent px-3 text-sm text-dark outline-none dark:bg-gray-dark dark:text-white"
    >
      {children}
    </select>
  );
}

/* Section header — teal strip */
function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
      <span className="flex items-center gap-2 font-semibold text-white">
        <SectionIcon />
        {title}
      </span>
      {sub && <span className="text-xs text-white/80">{sub}</span>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PRODUCT CATEGORY OPTIONS
═══════════════════════════════════════════ */
const CATEGORIES = [
  "A / Pure Silk Variety", "AJ / Half Fine Silk", "B / Polyster Variety",
  "C / Cotton Variety", "D / Powerloom Variety", "F / Government Scheme Handloom",
  "G / Government Scheme Powerloom", "PANDS / Printing and Stationary Items",
  "COMPRP / COMPUTER AND PRINTER OTEHR REPAIRS", "3000 / ACT INTERNET CHARGES",
  "405 / TAXI CHARGES", "INSURCR / INSURANCE CHARGES", "401 / Plumbing Items",
  "COVID-19/ITEMS / COVID19 ITEMS", "EBRENTGST / EBRENTGST", "COURIER / Courier Charges",
  "PACKING MATERIAL / PACKING MATERIAL", "EB MONTHLY CHARGES / EB MONTHLY CHARGES",
  "MANPWR / MANPOWER SECURITY SERVICE", "9001 / Monthly Billing Service",
  "ADVTSUP / Advertisement supplier", "500 / LIFT SERVICE", "TEST / TESTING CHARGES",
  "10010 / Rebate Claim", "4000 / TDS SERVICE", "1010 / CCTV ACCESSORIES",
  "101 / Electrical Fittings and other installation charges",
  "Network Items / Network Items", "CO-OPTEX IT RETURSN / COOPTEX IT RETURNS",
  "CA001 / CHARTERED ACCOUNTANT", "HATHWAY / HATHWAY", "MODERNIZATION / MODERNIZATION",
  "AC REPAIR CHARGES / AC REPAIR CHARGES", "AC AMC CHARGES / AC AMC CHARGES",
  "MISCELLANEOUS/OTHERS / MISCELLANEOUS OTHERS", "1003 / INFOTEX HARDWARES",
  "1004 / TANII HARDWARES", "1050 / HSP HARDWARES", "FACE LIFTING / FACE LIFTING",
  "205 / Rent and Taxes", "TESTING / FABRIC TESTING",
  "VC / Video Conferencing", "SHIP / SHIPPING CHARGE",
  "1011 / Procurement Lables and Others", "1012 / Freight Charges",
  "1013 / FDS Cooly charges", "CONV001 / CONVEYANCE", "SRCALL / SYSTEM SERVICE",
  "103 / Hardware issues", "774 / clares needlart",
  "222 / Tamilnadu Handloom Development Corporation", "333 / STITCHING CHARGES",
  "300 / Furniture's and Fittings", "400 / ELECTRICAL ITEMS",
  "ELE1 / Electrical Item", "50W CAIDEN / 50W CAIDEN",
  "COMMBANK / COMMISSION TO BANK", "POMS / Purchase of Market Samples",
  "002 / AUDITOR FEES", "Foam Board / Foam Board Printing Charges",
  "Digital Signature / Digital Signature", "JOB-01 / JOB WORK",
  "Lapto001 / Laptopi5", "Desktop001 / Desktopi5", "Desktop002 / Desktopi7",
  "SSD51202 / 512GB SSD Desktop", "ELCOT / ELCOT Service Charges",
  "ADVE / Advertisement Charges Prorata", "NSDL GSP SERVICE / NSDL GSP SERVICE",
  "063 SURANGI / MOM DAUGHTER", "MANPWRNLP / NEW LIFE PLACEMENTS PVT LTD",
  "307/TRANSPORT CHARGES / TRANSPORT CHARGES", "MANP01 / MANPOWER OUTSOURCING",
  "ISLAM / Procurement of goods from Interstate Handloom cluster",
  "Stutiweaves / Procurement of goods ISHC", "Bunkar studio / Bunkar Studio",
  "Angika Hathkargha / Procurement of Handloom Cluster",
  "2017 / Banarasi Weavers", "JAMDANI / Interstate Handloom cluster",
  "127 / Jamdani Emporium", "Zahir Silk / Zahir Silk Collection",
  "Nutan Fulia / Tangail Handloom Cotton Sarees",
  "Nutan Fulia tantubay / Linen Fabric", "CONCOMM / CONSIGNMENT COMMISSION",
  "373/REPAIR & RENEWALS / REPAIR & RENEWALS", "207/MODERNIZATION / 207 MODERNIZATION",
  "Mtnce / Maintenance", "5555 / AMOGAA NETWORKS", "2050 / Looms and Accessories",
  "Micro images / micro images", "Kavidharahandlooms / Kavidharahandlooms",
  "F&F / Furntiure and Fittings", "201 / Land and Building", "355 / EXPO",
  "ERD/ABINAV BATTERY WORKS / ABINAV BATTERY WORKS", "258 / SRI VARSAN FORM",
  "4820 / delivery challan", "901 / InfoTex OPEX", "1015 / lab coat",
  "900 / CooptexHardwares", "Revolving-Chair / Revolving Chair EDP",
  "202 / PlantMacinery", "SCS / Secure Code System",
  "10000 / INFOTEX HARDWARE AND NETWORKING OPEX",
  "10003 / iNFOTEX OPEX SMS ANTIVIRUS HELPDESK",
  "10004 / INFOTEX APPLICATIION SOFTWARE OPEX", "10006 / INFOTEX CLOUD OPEX",
  "AIRTEL / AIRTEL DATA CHARGES", "PINE LABS SWIPPING MACHINE / PLUTUS POS SERVICE FEE",
  "INFOTEX / INFOTEX PROJECT", "382/PLUMBING / PLUMBING ITEMS",
  "Madharsha / Purchase of Sample sarees for product development",
  "1120 / Anwaar paper stationery", "Eletricals01 / Electricals",
  "Repair / Repair", "mysore01 / mysoresilk", "Boyanika / Boyanika",
  "3732 / PLUMBING WORK ITEMS", "InfoTex_Consultant / InfotexConsultant",
  "AA / AA Silk Varieties", "Central Cottage / Central Cottage",
  "1001 / other expenses", "1021 / Bucket", "GENSUP / service",
  "1014 / water bottles", "ATHIRAI PIPES & FITTINGS / PLUMBING",
  "373 / METROTRADER REPAIR & RENEWAL / REPAIR RENEWAL",
  "sakthi0001 / Purchase of Hardware", "001/ADVOCATE FEES / ADVOCATE FEES",
  "382/LOCK / 382LOCK", "202/PLANT & MACHINERY / EXIDE BATTERY",
  "382 / SUNDRY EXPENSES", "ePSON005INKTANK / ePSON BLACK INK TONER",
  "KRISHNA ELECTRICALS / KRS ELEC", "PORTRONICS SOUND DRUM / PORTRONICS",
  "PENDRI / PENDRIVE", "BLUETOOTH / BLUETOOTH",
  "InfoTex_Cloud_Service / InfoTex Cloud Service",
  "InfoTex_MileStone_Payment / InfoTex Milestone Payment",
  "INFO001 / InfoTex CAPEX", "203 F AND F / F AND F",
  "4821 / Packing Slip", "10002 / INFOTEX HARDWARE QC MACHINE",
  "10005 / INFOTEX CLOUD CAPEX", "SUBSCRIPTION / Subscription",
  "Backup Media / Computer Accessories", "356/HSP / 356HSP",
  "CARD MACHINE BANK CHARGES / CARD MACHINE BANK CHARGES",
  "SSD / 512GB SSD", "Surangi / Pouches",
];

/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */
interface OtherCharge {
  id: number;
  name: string;
  amount: number;
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function CreateProcurementCostingSocietyPage() {
  const router = useRouter();

  /* ── Procurement Costing header ── */
  const [form, setForm] = useState({
    category: "",
    group: "",
    product: "",
    design: "",
    periodFrom: "",
    periodTo: "",
  });

  /* ── Product Specification ── */
  const [spec, setSpec] = useState({
    length: "",
    width: "",
    warpCount: "",
    weftCount: "",
    warpQuality: "",
    weftQuality: "",
    warpWeight: "",
    weftWeight: "",
    endsPerInch: "",
    picksPerInch: "",
  });

  /* ── Yarn Details ── */
  const [yarn, setYarn] = useState({
    warpWastage: "",
    weftWastage: "",
    warpRate: "",
    weftRate: "",
    units: "",
    weightPerUnit: "",
    warpGms: "",
    weftGms: "",
  });

  /* ── Cost Details ── */
  const [cost, setCost] = useState({
    warpYarn: "",
    weftYarn: "",
    warpWastageAmt: "",
    weftWastageAmt: "",
    weavingWages: "",
    preparatoryCharges: "",
    profitPercentage: "",
    totalRate: "",
    ratePerUnit: "",
    label: "",
    finishing: "",
    box: "",
    polythene: "",
    totalPurchasePrice: "",
  });

  /* ── Other Charges ── */
  const [otherName, setOtherName] = useState("");
  const [otherAmount, setOtherAmount] = useState("");
  const [otherRows, setOtherRows] = useState<OtherCharge[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleAddCharge = () => {
    if (!otherName.trim() || !otherAmount.trim()) return;
    setOtherRows((prev) => [
      ...prev,
      { id: nextId, name: otherName.trim(), amount: parseFloat(otherAmount) || 0 },
    ]);
    setNextId((n) => n + 1);
    setOtherName("");
    setOtherAmount("");
  };

  const handleDeleteCharge = (id: number) =>
    setOtherRows((prev) => prev.filter((r) => r.id !== id));

  const fmt = (v: string) =>
    v === "" ? "0.00" : parseFloat(v).toFixed(2);

  return (
    <div className="mx-auto space-y-5">

      {/* ── Breadcrumb ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          Create Procurement Costing Society
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Weavers</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Procurement Costing Society</li>
          </ol>
        </nav>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — PROCUREMENT COSTING
      ══════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <SectionHeader title="Procurement Costing" sub="( * Mandatory Fields)" />

        <div className="space-y-4 p-5">
          {/* Row 1 — 4 columns */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <FieldGroup label="Product Category Code / Name" required icon={<CategoryIcon />}>
              <FSelect
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                <option value="">Select</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </FSelect>
            </FieldGroup>

            <FieldGroup label="Product Group Code / Name" required icon={<GroupIcon />}>
              <FSelect
                value={form.group}
                onChange={(e) => setForm((f) => ({ ...f, group: e.target.value }))}
              >
                <option value="">Select</option>
                <option value="GRP001">GRP001 / Silk Group</option>
                <option value="GRP002">GRP002 / Cotton Group</option>
                <option value="GRP003">GRP003 / Polyester Group</option>
              </FSelect>
            </FieldGroup>

            <FieldGroup label="Product Code / Name" required icon={<ProductIcon />}>
              <FSelect
                value={form.product}
                onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
              >
                <option value="">Select</option>
                <option value="YDCH">YDCH / PL SET DHOTHY 9 X 5</option>
                <option value="SSEB">SSEB / SAREES SALEM 80S WITH BLOUSE</option>
                <option value="ASWS">ASWS / ANGAVAS SALEM WOVEN SILK PURE SILK</option>
                <option value="FODC">FODC / OAP DHOTHY 202122</option>
              </FSelect>
            </FieldGroup>

            <FieldGroup label="Design Name" required icon={<DesignIcon />}>
              <FSelect
                value={form.design}
                onChange={(e) => setForm((f) => ({ ...f, design: e.target.value }))}
              >
                <option value="">Select</option>
                <option value="13">13 / DOTHY-YDCH</option>
                <option value="27180">27180 / SALEM 80s SAREES - BLOUSE ATTACHED</option>
                <option value="1000">1000 / ANGAVAS SALEM</option>
              </FSelect>
            </FieldGroup>
          </div>

          {/* Row 2 — Period From / To */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldGroup label="Period From" required icon={<CalIcon />}>
              <FInput
                type="text"
                placeholder="dd-MMM-yyyy"
                value={form.periodFrom}
                onChange={(e) => setForm((f) => ({ ...f, periodFrom: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Period To" required icon={<CalIcon />}>
              <FInput
                type="text"
                placeholder="dd-MMM-yyyy"
                value={form.periodTo}
                onChange={(e) => setForm((f) => ({ ...f, periodTo: e.target.value }))}
              />
            </FieldGroup>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 2 — PRODUCT SPECIFICATION
      ══════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <SectionIcon /> Product Specification
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">

          <FieldGroup label="Product Length (Meters)" icon={<RulerIcon />}>
            <FInput
              type="number"
              placeholder="0"
              value={spec.length}
              onChange={(e) => setSpec((s) => ({ ...s, length: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Product Width (Meters)" icon={<RulerIcon />}>
            <FInput
              type="number"
              placeholder="0"
              value={spec.width}
              onChange={(e) => setSpec((s) => ({ ...s, width: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Warp Yarn Count" icon={<ListIcon />}>
            <FInput
              type="number"
              placeholder="0"
              value={spec.warpCount}
              onChange={(e) => setSpec((s) => ({ ...s, warpCount: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Weft Yarn Count" icon={<ListIcon />}>
            <FInput
              type="number"
              placeholder="0"
              value={spec.weftCount}
              onChange={(e) => setSpec((s) => ({ ...s, weftCount: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Warp Yarn Quality" icon={<ListIcon />}>
            <FInput
              type="text"
              value={spec.warpQuality}
              onChange={(e) => setSpec((s) => ({ ...s, warpQuality: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Weft Yarn Quality" icon={<ListIcon />}>
            <FInput
              type="text"
              value={spec.weftQuality}
              onChange={(e) => setSpec((s) => ({ ...s, weftQuality: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Warp Yarn Weight (in gms)" icon={<WeightIcon />}>
            <FInput
              type="number"
              placeholder="0"
              value={spec.warpWeight}
              onChange={(e) => setSpec((s) => ({ ...s, warpWeight: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Weft Yarn Weight (in gms)" icon={<WeightIcon />}>
            <FInput
              type="number"
              placeholder="0"
              value={spec.weftWeight}
              onChange={(e) => setSpec((s) => ({ ...s, weftWeight: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Ends Per Inch" icon={<GridIcon />}>
            <FInput
              type="number"
              placeholder="0"
              value={spec.endsPerInch}
              onChange={(e) => setSpec((s) => ({ ...s, endsPerInch: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Picks Per Inch" icon={<GridIcon />}>
            <FInput
              type="number"
              placeholder="0"
              value={spec.picksPerInch}
              onChange={(e) => setSpec((s) => ({ ...s, picksPerInch: e.target.value }))}
            />
          </FieldGroup>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 3 — YARN DETAILS
      ══════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <SectionIcon /> Yarn Details
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">

          <FieldGroup label="Warp Wastage (%)" required icon={<PercentIcon />}>
            <FInput
              type="number"
              placeholder="0.00"
              value={yarn.warpWastage}
              onChange={(e) => setYarn((y) => ({ ...y, warpWastage: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Weft Wastage (%)" required icon={<PercentIcon />}>
            <FInput
              type="number"
              placeholder="0.00"
              value={yarn.weftWastage}
              onChange={(e) => setYarn((y) => ({ ...y, weftWastage: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Warp Yarn Rate" required icon={<RupeeIcon />}>
            <FInput
              type="number"
              placeholder="0.00"
              value={yarn.warpRate}
              onChange={(e) => setYarn((y) => ({ ...y, warpRate: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Weft Yarn Rate" required icon={<RupeeIcon />}>
            <FInput
              type="number"
              placeholder="0.00"
              value={yarn.weftRate}
              onChange={(e) => setYarn((y) => ({ ...y, weftRate: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Number of Units" required icon={<HashIcon />}>
            <FInput
              type="number"
              placeholder="0.00"
              value={yarn.units}
              onChange={(e) => setYarn((y) => ({ ...y, units: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Weight Per Unit" required icon={<RupeeIcon />}>
            <FInput
              type="number"
              placeholder="0.00"
              value={yarn.weightPerUnit}
              onChange={(e) => setYarn((y) => ({ ...y, weightPerUnit: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Warp Yarn (in gms)" required icon={<WeightIcon />}>
            <FInput
              type="number"
              placeholder="0.00"
              value={yarn.warpGms}
              onChange={(e) => setYarn((y) => ({ ...y, warpGms: e.target.value }))}
            />
          </FieldGroup>

          <FieldGroup label="Weft Yarn (in gms)" required icon={<WeightIcon />}>
            <FInput
              type="number"
              placeholder="0.00"
              value={yarn.weftGms}
              onChange={(e) => setYarn((y) => ({ ...y, weftGms: e.target.value }))}
            />
          </FieldGroup>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 4 — COST DETAILS
      ══════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <SectionIcon /> Cost Details
          </h3>
        </div>

        <div className="space-y-4 p-5">
          {/* Cost fields grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <FieldGroup label="Warp Yarn" icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.warpYarn}
                onChange={(e) => setCost((c) => ({ ...c, warpYarn: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Weft Yarn" icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.weftYarn}
                onChange={(e) => setCost((c) => ({ ...c, weftYarn: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Warp Wastage Amount" icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.warpWastageAmt}
                onChange={(e) => setCost((c) => ({ ...c, warpWastageAmt: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Weft Wastage Amount" icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.weftWastageAmt}
                onChange={(e) => setCost((c) => ({ ...c, weftWastageAmt: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Weaving Wages" required icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.weavingWages}
                onChange={(e) => setCost((c) => ({ ...c, weavingWages: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Preparatory Charges" required icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.preparatoryCharges}
                onChange={(e) => setCost((c) => ({ ...c, preparatoryCharges: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Profit Percentage" required icon={<PercentIcon />}>
              <FInput
                type="number"
                placeholder="0"
                value={cost.profitPercentage}
                onChange={(e) => setCost((c) => ({ ...c, profitPercentage: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Total Rate" icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.totalRate}
                onChange={(e) => setCost((c) => ({ ...c, totalRate: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Rate Per Unit" icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.ratePerUnit}
                onChange={(e) => setCost((c) => ({ ...c, ratePerUnit: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Label" required icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.label}
                onChange={(e) => setCost((c) => ({ ...c, label: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Finishing" required icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.finishing}
                onChange={(e) => setCost((c) => ({ ...c, finishing: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Box" required icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.box}
                onChange={(e) => setCost((c) => ({ ...c, box: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Polythene Cover" required icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.polythene}
                onChange={(e) => setCost((c) => ({ ...c, polythene: e.target.value }))}
              />
            </FieldGroup>

            <FieldGroup label="Total Purchase Price" icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={cost.totalPurchasePrice}
                onChange={(e) => setCost((c) => ({ ...c, totalPurchasePrice: e.target.value }))}
              />
            </FieldGroup>

          </div>

          {/* ── Other Charges Add Row ── */}
          <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-3">

            <FieldGroup label="Other Charges Name" required icon={<UserIcon />}>
              <FInput
                type="text"
                value={otherName}
                onChange={(e) => setOtherName(e.target.value)}
                placeholder="Enter charge name"
              />
            </FieldGroup>

            <FieldGroup label="Other Charges Amount" required icon={<RupeeIcon />}>
              <FInput
                type="number"
                placeholder="0.00"
                value={otherAmount}
                onChange={(e) => setOtherAmount(e.target.value)}
              />
            </FieldGroup>

            <div className="flex items-end pb-0.5">
              <button
                onClick={handleAddCharge}
                className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add
              </button>
            </div>

          </div>

          {/* ── Other Charges Table ── */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-4 py-3 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-4 py-3 text-center font-semibold">Other Charges Name</th>
                  <th className="border border-[#3aa88f] px-4 py-3 text-center font-semibold">Other Charges Amount (₹)</th>
                  <th className="border border-[#3aa88f] px-4 py-3 text-center font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {otherRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-400">No records found</td>
                  </tr>
                ) : (
                  otherRows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`border-b border-stroke dark:border-dark-3 ${
                        idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"
                      } hover:bg-blue-50 dark:hover:bg-[#1e2d42]`}
                    >
                      <td className="border-r border-stroke px-4 py-2.5 text-center text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border-r border-stroke px-4 py-2.5 text-dark dark:border-dark-3 dark:text-white">{row.name}</td>
                      <td className="border-r border-stroke px-4 py-2.5 text-right text-dark dark:border-dark-3 dark:text-white">
                        {row.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <button
                          onClick={() => handleDeleteCharge(row.id)}
                          className="flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90 mx-auto"
                          title="Delete"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* ── Footer Buttons ── */}
      <div className="flex justify-end gap-3 pb-4">
        <button
          onClick={() => router.push("/weavers/procurement-costing-society/list")}
          className="flex items-center gap-2 rounded bg-[#5a6268] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Cancel
        </button>

        <button
          className="flex items-center gap-2 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="20,6 9,17 4,12" />
          </svg>
          Submit
        </button>
      </div>

    </div>
  );
}