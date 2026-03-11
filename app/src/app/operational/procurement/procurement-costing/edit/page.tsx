"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OtherCharge { id: number; name: string; amount: number; }

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);
const RupeeIcon = () => <IconBox><span className="text-sm font-bold">₹</span></IconBox>;
const SectionHeader = ({ label }: { label: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{label}</h4>
  </div>
);

const inputCls = "w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";
const roInputCls = "w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white";
const selectCls = "w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";
const numInputCls = "w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-right text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white";
const roNumInputCls = "w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-right text-sm text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white";

export default function EditProcurementCostingPage() {
  const router = useRouter();

  // Pre-filled with mock data (ZBR4 / PRINTED BEDSHEET 60X90)
  const [categoryCode, setCategoryCode] = useState("D");
  const [groupCode, setGroupCode] = useState("69");
  const [productCode, setProductCode] = useState("ZBR4");
  const [designName, setDesignName] = useState("Printed Bed Sheet Design");
  const [periodFrom, setPeriodFrom] = useState("01-Jan-2019");
  const [periodTo, setPeriodTo] = useState("31-Mar-2019");

  const [prodLength, setProdLength] = useState("0");
  const [prodWidth, setProdWidth] = useState("0");
  const [warpYarnCount, setWarpYarnCount] = useState("");
  const [weftYarnCount, setWeftYarnCount] = useState("");
  const [warpYarnQuality, setWarpYarnQuality] = useState("");
  const [weftYarnQuality, setWeftYarnQuality] = useState("");
  const [warpYarnWeight, setWarpYarnWeight] = useState("0");
  const [weftYarnWeight, setWeftYarnWeight] = useState("0");
  const [hankYarnWeight, setHankYarnWeight] = useState("0");
  const [endsPerInch, setEndsPerInch] = useState("0");
  const [picksPerInch, setPicksPerInch] = useState("0");

  const [warpWastage, setWarpWastage] = useState("10.00");
  const [weftWastage, setWeftWastage] = useState("10.00");
  const [warpYarnRate, setWarpYarnRate] = useState("10.00");
  const [weftYarnRate, setWeftYarnRate] = useState("10.00");
  const [numberOfUnits, setNumberOfUnits] = useState("1.00");
  const [weightPerUnit, setWeightPerUnit] = useState("10.00");
  const [warpYarnGms, setWarpYarnGms] = useState("10.00");
  const [weftYarnGms, setWeftYarnGms] = useState("10.00");

  const [weavingWages, setWeavingWages] = useState("100.00");
  const [preparatoryCharges, setPreparatoryCharges] = useState("10.00");
  const [profitPercentage, setProfitPercentage] = useState("10");
  const [labelCharge, setLabelCharge] = useState("10.00");
  const [finishingCharge, setFinishingCharge] = useState("10.00");
  const [boxCharge, setBoxCharge] = useState("10.00");
  const [polythinCoverCharge, setPolythinCoverCharge] = useState("100.00");
  const [printingCharge, setPrintingCharge] = useState("100.00");
  const [coverCharge, setCoverCharge] = useState("100.00");

  const warpYarnCost = (parseFloat(warpYarnGms) || 0) * (parseFloat(warpYarnRate) || 0) / 1000;
  const weftYarnCost = (parseFloat(weftYarnGms) || 0) * (parseFloat(weftYarnRate) || 0) / 1000;
  const warpWastageAmt = warpYarnCost * (parseFloat(warpWastage) || 0) / 100;
  const weftWastageAmt = weftYarnCost * (parseFloat(weftWastage) || 0) / 100;
  const baseRate = warpYarnCost + weftYarnCost + warpWastageAmt + weftWastageAmt + (parseFloat(weavingWages) || 0) + (parseFloat(preparatoryCharges) || 0);
  const totalRate = baseRate * (1 + (parseFloat(profitPercentage) || 0) / 100);
  const ratePerUnit = totalRate * (parseFloat(numberOfUnits) || 0);
  const totalPurchasePrice = ratePerUnit + (parseFloat(labelCharge) || 0) + (parseFloat(finishingCharge) || 0) + (parseFloat(boxCharge) || 0) + (parseFloat(polythinCoverCharge) || 0) + (parseFloat(printingCharge) || 0) + (parseFloat(coverCharge) || 0);

  const [otherCharges, setOtherCharges] = useState<OtherCharge[]>([]);
  const [otherChargeName, setOtherChargeName] = useState("");
  const [otherChargeAmount, setOtherChargeAmount] = useState("0.00");
  const [nextOtherId, setNextOtherId] = useState(1);

  const handleAddOtherCharge = () => {
    if (!otherChargeName) return;
    setOtherCharges((prev) => [...prev, { id: nextOtherId, name: otherChargeName, amount: parseFloat(otherChargeAmount) || 0 }]);
    setNextOtherId((n) => n + 1);
    setOtherChargeName("");
    setOtherChargeAmount("0.00");
  };

  const [forwardTo, setForwardTo] = useState("");
  const [forwardFor, setForwardFor] = useState("Final Approved");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const listIconSvg = <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
  const waveIconSvg = <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2a3 3 0 013 3v1h4l1 16H4L5 6h4V5a3 3 0 013-3z"/></svg>;
  const filterIconSvg = <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>;

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Procurement Costing</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Edit Procurement Costing</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Procurement Costing</h3>
          <span className="text-xs text-white opacity-80">(* Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Header fields */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Category Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg></IconBox>
                <select className={selectCls} value={categoryCode} onChange={(e) => setCategoryCode(e.target.value)}>
                  <option value="">Select</option>
                  <option value="C">C / Cotton Variety</option>
                  <option value="D">D / Powerloom Variety</option>
                  <option value="S">S / Silk Variety</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Group Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></IconBox>
                <select className={selectCls} value={groupCode} onChange={(e) => setGroupCode(e.target.value)}>
                  <option value="">Select</option>
                  <option value="11">11 / COTTON SAREES</option>
                  <option value="69">69 / PL BEDSHEET & TABLE CLOTH</option>
                  <option value="1000">1000 / ANGAVAS SALEM</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Product Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                <select className={selectCls} value={productCode} onChange={(e) => setProductCode(e.target.value)}>
                  <option value="">Select</option>
                  <option value="SSEB">SSEB / SAREES SALEM 80S WITH BLOUSE</option>
                  <option value="ZBR4">ZBR4 / PRINTED BEDSHEET 60X90</option>
                  <option value="ASWS">ASWS / ANGAVAS SALEM WOVEN SILK PURE SILK</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Design Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></IconBox>
                <select className={selectCls} value={designName} onChange={(e) => setDesignName(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Salem 80s Sarees">Salem 80s Sarees - Blouse Attached</option>
                  <option value="Printed Bed Sheet Design">Printed Bed Sheet Design</option>
                  <option value="Angavas Salem Design">Angavas Salem Design</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Period From <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={periodFrom} onChange={(e) => setPeriodFrom(e.target.value)} className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Period To <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={periodTo} onChange={(e) => setPeriodTo(e.target.value)} className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-[#17a2b8] text-white dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Product Specification */}
          <div className="mb-5">
            <SectionHeader label="Product Specification" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Product Length (Meters)", value: prodLength, set: setProdLength, icon: filterIconSvg },
                { label: "Product Width (Meters)", value: prodWidth, set: setProdWidth, icon: filterIconSvg },
                { label: "Warp Yarn Count", value: warpYarnCount, set: setWarpYarnCount, icon: listIconSvg },
                { label: "Weft Yarn Count", value: weftYarnCount, set: setWeftYarnCount, icon: listIconSvg },
                { label: "Warp Yarn Quality", value: warpYarnQuality, set: setWarpYarnQuality, icon: listIconSvg },
                { label: "Weft Yarn Quality", value: weftYarnQuality, set: setWeftYarnQuality, icon: listIconSvg },
                { label: "Warp Yarn Weight (in gms)", value: warpYarnWeight, set: setWarpYarnWeight, icon: waveIconSvg },
                { label: "Weft Yarn Weight (in gms)", value: weftYarnWeight, set: setWeftYarnWeight, icon: waveIconSvg },
                { label: "Hank Yarn Weight", value: hankYarnWeight, set: setHankYarnWeight, icon: filterIconSvg },
                { label: "Ends Per Inch", value: endsPerInch, set: setEndsPerInch, icon: filterIconSvg },
                { label: "Picks Per Inch", value: picksPerInch, set: setPicksPerInch, icon: filterIconSvg },
              ].map(({ label, value, set, icon }) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
                  <div className="flex"><IconBox>{icon}</IconBox><input type="text" value={value} onChange={(e) => set(e.target.value)} className={numInputCls} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Yarn Details */}
          <div className="mb-5">
            <SectionHeader label="Yarn Details" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Warp Wastage (%)", value: warpWastage, set: setWarpWastage, pct: true },
                { label: "Weft Wastage (%)", value: weftWastage, set: setWeftWastage, pct: true },
                { label: "Warp Yarn Rate", value: warpYarnRate, set: setWarpYarnRate, pct: false },
                { label: "Weft Yarn Rate", value: weftYarnRate, set: setWeftYarnRate, pct: false },
                { label: "Number of Units", value: numberOfUnits, set: setNumberOfUnits, hash: true },
                { label: "Weight Per Unit", value: weightPerUnit, set: setWeightPerUnit, pct: false },
                { label: "Warp Yarn (in gms)", value: warpYarnGms, set: setWarpYarnGms, wave: true },
                { label: "Weft Yarn (in gms)", value: weftYarnGms, set: setWeftYarnGms, wave: true },
              ].map(({ label, value, set, pct, hash, wave }) => (
                <div key={label}>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label} <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <IconBox>
                      {pct ? <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                        : hash ? <span className="text-sm font-bold">#</span>
                        : wave ? waveIconSvg
                        : <span className="text-sm font-bold">₹</span>}
                    </IconBox>
                    <input type="text" value={value} onChange={(e) => set(e.target.value)} className={numInputCls} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Cost Details */}
          <div className="mb-5">
            <SectionHeader label="Cost Details" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><label className="mb-1 block text-xs font-medium text-gray-500">Warp Yarn</label><div className="flex"><RupeeIcon /><div className={roNumInputCls}>{warpYarnCost.toFixed(2)}</div></div></div>
              <div><label className="mb-1 block text-xs font-medium text-gray-500">Weft Yarn</label><div className="flex"><RupeeIcon /><div className={roNumInputCls}>{weftYarnCost.toFixed(2)}</div></div></div>
              <div><label className="mb-1 block text-xs font-medium text-gray-500">Warp Wastage Amount</label><div className="flex"><RupeeIcon /><div className={roNumInputCls}>{warpWastageAmt.toFixed(2)}</div></div></div>
              <div><label className="mb-1 block text-xs font-medium text-gray-500">Weft Wastage Amount</label><div className="flex"><RupeeIcon /><div className={roNumInputCls}>{weftWastageAmt.toFixed(2)}</div></div></div>
              {[
                { label: "Weaving Wages", value: weavingWages, set: setWeavingWages },
                { label: "Preparatory Charges", value: preparatoryCharges, set: setPreparatoryCharges },
              ].map(({ label, value, set }) => (
                <div key={label}><label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label} <span className="text-red-500">*</span></label><div className="flex"><RupeeIcon /><input type="text" value={value} onChange={(e) => set(e.target.value)} className={numInputCls} /></div></div>
              ))}
              <div>
                <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Profit Percentage <span className="text-red-500">*</span></label>
                <div className="flex">
                  <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg></IconBox>
                  <input type="text" value={profitPercentage} onChange={(e) => setProfitPercentage(e.target.value)} className={numInputCls} />
                </div>
              </div>
              <div><label className="mb-1 block text-xs font-medium text-gray-500">Total Rate</label><div className="flex"><RupeeIcon /><div className={roNumInputCls}>{totalRate.toFixed(2)}</div></div></div>
              <div><label className="mb-1 block text-xs font-medium text-gray-500">Rate Per Unit</label><div className="flex"><RupeeIcon /><div className={roNumInputCls}>{ratePerUnit.toFixed(2)}</div></div></div>
              {[
                { label: "Label Charge", value: labelCharge, set: setLabelCharge },
                { label: "Finishing Charge", value: finishingCharge, set: setFinishingCharge },
                { label: "Box Charge", value: boxCharge, set: setBoxCharge },
                { label: "Polythin Cover Charge", value: polythinCoverCharge, set: setPolythinCoverCharge },
                { label: "Printing Charge", value: printingCharge, set: setPrintingCharge },
                { label: "Cover Charge", value: coverCharge, set: setCoverCharge },
              ].map(({ label, value, set }) => (
                <div key={label}><label className="mb-1 block text-xs font-medium text-dark dark:text-white">{label} <span className="text-red-500">*</span></label><div className="flex"><RupeeIcon /><input type="text" value={value} onChange={(e) => set(e.target.value)} className={numInputCls} /></div></div>
              ))}
              <div><label className="mb-1 block text-xs font-medium text-gray-500">Total Purchase Price</label><div className="flex"><RupeeIcon /><div className={roNumInputCls}>{totalPurchasePrice.toFixed(2)}</div></div></div>
            </div>

            {/* Other Charges */}
            <div className="mt-5">
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Other Charges Name <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></IconBox>
                    <input type="text" value={otherChargeName} onChange={(e) => setOtherChargeName(e.target.value)} className="w-52 rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Other Charges Amount <span className="text-red-500">*</span></label>
                  <div className="flex"><RupeeIcon /><input type="text" value={otherChargeAmount} onChange={(e) => setOtherChargeAmount(e.target.value)} className="w-36 rounded-r border border-stroke bg-transparent px-3 py-2 text-right text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" /></div>
                </div>
                <button onClick={handleAddOtherCharge} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                  Add
                </button>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="w-10 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Other Charges Name</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Other Charges Amount (₹)</th>
                      <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherCharges.length === 0 ? (
                      <tr><td colSpan={4} className="py-4 text-center text-xs text-gray-400">No records found</td></tr>
                    ) : (
                      otherCharges.map((oc, idx) => (
                        <tr key={oc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                          <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                          <td className="border border-stroke px-3 py-2 dark:border-dark-3">{oc.name}</td>
                          <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{oc.amount.toFixed(2)}</td>
                          <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                            <button onClick={() => setOtherCharges((prev) => prev.filter((o) => o.id !== oc.id))} className="rounded bg-red-500 px-2 py-0.5 text-xs font-medium text-white hover:opacity-90">Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Workflow */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward to <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg></IconBox>
                <input type="text" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Forward for <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg></IconBox>
                <select className={selectCls} value={forwardFor} onChange={(e) => setForwardFor(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Approval">Approval</option>
                  <option value="Review">Review</option>
                  <option value="Final Approved">Final Approved</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => setShowNoteModal(true)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Note
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/operational/procurement/procurement-costing/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-[10px] bg-white shadow-xl dark:bg-gray-dark">
            <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              <div className="mb-2 flex flex-wrap items-center gap-1 rounded border border-stroke bg-gray-50 px-3 py-2 dark:border-dark-3 dark:bg-dark-2">
                {["B","I","U","S"].map((f) => <button key={f} className="flex size-6 items-center justify-center rounded text-xs font-bold text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-3">{f}</button>)}
                <div className="mx-1 h-4 w-px bg-gray-300"></div>
                {["H1","H2",'""',"<>"].map((f) => <button key={f} className="flex h-6 items-center rounded px-1 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-dark-3">{f}</button>)}
              </div>
              <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder="Enter your content" rows={6} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              <div className="mt-3 inline-block rounded border-2 border-red-400 px-4 py-3">
                <p className="mb-1 text-xs font-semibold text-dark dark:text-white">Created By</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Name : ARULMARY</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Designation : ASSISTANT SALES WOMEN</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Date : 11-Mar-2026</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-stroke px-5 py-3 dark:border-dark-3">
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Cancel</button>
              <button onClick={() => setShowNoteModal(false)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
