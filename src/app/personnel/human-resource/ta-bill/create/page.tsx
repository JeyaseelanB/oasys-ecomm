"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface JourneyRow {
  id: number;
  dateFrom: string;
  dateTo: string;
  routeFrom: string;
  routeTo: string;
  purposeOfJourney: string;
  modeType: string;
  amount: number;
  numberOfKilometers: number;
  railClass: string;
  railFare: number;
  additionalFare: number;
  noOfDays: number;
  dailyAllowance: number;
  totalAmount: number;
  remarks: string;
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex size-10 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2 dark:text-gray-400">
    {children}
  </div>
);

export default function CreateTABillPage() {
  const router = useRouter();

  // TA Bill header fields
  const [taBillType, setTaBillType] = useState("");
  const [designation, setDesignation] = useState("");
  const [entityCodeName1, setEntityCodeName1] = useState("");
  const [entityCodeName2, setEntityCodeName2] = useState("");
  const basicPay = "43530.00";

  // Journey & Allowance form fields
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [routeFrom, setRouteFrom] = useState("");
  const [routeTo, setRouteTo] = useState("");
  const [purposeOfJourney, setPurposeOfJourney] = useState("");
  const [modeType, setModeType] = useState("");
  const [ratePerDay, setRatePerDay] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [numberOfKilometers, setNumberOfKilometers] = useState("");
  const [dailyAllowance, setDailyAllowance] = useState("");
  const [remark, setRemark] = useState("");
  const [journeyRows, setJourneyRows] = useState<JourneyRow[]>([]);

  const handleClearJourney = () => {
    setDateFrom(""); setDateTo(""); setRouteFrom(""); setRouteTo("");
    setPurposeOfJourney(""); setModeType(""); setRatePerDay("");
    setFromTime(""); setToTime(""); setNumberOfKilometers("");
    setDailyAllowance(""); setRemark("");
  };

  const handleAddJourney = () => {
    if (!dateFrom || !dateTo || !routeFrom || !routeTo || !purposeOfJourney || !modeType) return;
    const km = parseFloat(numberOfKilometers) || 0;
    const days = parseFloat(dailyAllowance) || 0;
    const rate = parseFloat(ratePerDay) || 0;
    const railFare = km * rate;
    const dailyAlw = days * 500;
    const total = railFare + dailyAlw;
    const newRow: JourneyRow = {
      id: Date.now(),
      dateFrom, dateTo, routeFrom, routeTo, purposeOfJourney,
      modeType, amount: railFare, numberOfKilometers: km,
      railClass: "Sleeper", railFare, additionalFare: 0,
      noOfDays: days, dailyAllowance: dailyAlw, totalAmount: total, remarks: remark,
    };
    setJourneyRows((prev) => [...prev, newRow]);
    handleClearJourney();
  };

  const handleDeleteJourney = (id: number) => setJourneyRows((prev) => prev.filter((r) => r.id !== id));

  const totals = journeyRows.reduce(
    (acc, r) => ({
      amount: acc.amount + r.amount,
      numberOfKilometers: acc.numberOfKilometers + r.numberOfKilometers,
      railFare: acc.railFare + r.railFare,
      additionalFare: acc.additionalFare + r.additionalFare,
      noOfDays: acc.noOfDays + r.noOfDays,
      dailyAllowance: acc.dailyAllowance + r.dailyAllowance,
      totalAmount: acc.totalAmount + r.totalAmount,
    }),
    { amount: 0, numberOfKilometers: 0, railFare: 0, additionalFare: 0, noOfDays: 0, dailyAllowance: 0, totalAmount: 0 }
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Travelling Allowance Bill</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Travelling Allowance Bill</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Form Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">TA Bill</h3>
          <span className="text-xs text-white opacity-80">( * Mandatory Fields) —</span>
        </div>

        <div className="p-5">
          {/* TA Bill Type + Generate/Clear */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">TA Bill Type <span className="text-red-500">*</span></label>
              <div className="flex items-stretch gap-2">
                <div className="flex flex-1">
                  <IconBox>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  </IconBox>
                  <select value={taBillType} onChange={(e) => setTaBillType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                    <option value="">Select</option>
                    <option value="TOUR_PROGRAM_CLAIM">TOUR_PROGRAM_CLAIM</option>
                    <option value="OTHER_CLAIM">OTHER_CLAIM</option>
                  </select>
                </div>
                <button onClick={handleClearJourney} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Clear
                </button>
                <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* Designation / Entity / Basic Pay row */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Designation</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </IconBox>
                <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity Code / Name</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={entityCodeName1} onChange={(e) => setEntityCodeName1(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Entity Code / Name</label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="text" value={entityCodeName2} onChange={(e) => setEntityCodeName2(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Basic Pay</label>
              <div className="flex">
                <IconBox><span className="text-sm font-semibold">₹</span></IconBox>
                <input type="text" value={basicPay} readOnly className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Journey & Allowance Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Journey &amp; Allowance Details</h4>
          </div>

          {/* Row 1: Date of Journey & Route */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Date of Journey &amp; Halts <span className="text-red-500">*</span></label>
              <label className="mb-1 block text-xs text-gray-500">From</label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">&nbsp;</label>
              <label className="mb-1 block text-xs text-gray-500">To</label>
              <div className="flex">
                <input type="text" placeholder="dd-MMM-yyyy" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full rounded-l border border-r-0 border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex size-10 shrink-0 items-center justify-center rounded-r border border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Route <span className="text-red-500">*</span></label>
              <label className="mb-1 block text-xs text-gray-500">From</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </IconBox>
                <input type="text" value={routeFrom} onChange={(e) => setRouteFrom(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">&nbsp;</label>
              <label className="mb-1 block text-xs text-gray-500">To</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </IconBox>
                <input type="text" value={routeTo} onChange={(e) => setRouteTo(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          {/* Row 2: Mode of Conveyance */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Mode of Conveyance <span className="text-red-500">*</span></label>
              <label className="mb-1 block text-xs text-gray-500">Type</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </IconBox>
                <select value={modeType} onChange={(e) => setModeType(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option value="">Select</option>
                  <option value="Train">Train</option>
                  <option value="Bus">Bus</option>
                  <option value="Auto">Auto</option>
                  <option value="Taxi">Taxi</option>
                  <option value="Own Vehicle">Own Vehicle</option>
                  <option value="Air">Air</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">&nbsp;</label>
              <label className="mb-1 block text-xs text-gray-500">Rate Per Day</label>
              <div className="flex">
                <IconBox><span className="text-sm font-semibold">₹</span></IconBox>
                <input type="number" value={ratePerDay} onChange={(e) => setRatePerDay(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Purpose of Journey <span className="text-red-500">*</span></label>
              <label className="mb-1 block text-xs text-gray-500">&nbsp;</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                </IconBox>
                <input type="text" value={purposeOfJourney} onChange={(e) => setPurposeOfJourney(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Number of Kilometers <span className="text-red-500">*</span></label>
              <label className="mb-1 block text-xs text-gray-500">&nbsp;</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                </IconBox>
                <input type="number" value={numberOfKilometers} onChange={(e) => setNumberOfKilometers(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          {/* Row 3: Time / Daily Allowance / Remark */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">From Time</label>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="HH:MM" value={fromTime} onChange={(e) => setFromTime(e.target.value)} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex flex-col">
                  <button onClick={() => {}} className="flex h-5 items-center justify-center rounded-t border border-stroke bg-gray-100 px-1 text-xs hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2">▲</button>
                  <button onClick={() => {}} className="flex h-5 items-center justify-center rounded-b border border-t-0 border-stroke bg-gray-100 px-1 text-xs hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2">▼</button>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">To Time</label>
              <div className="flex items-center gap-1">
                <input type="text" placeholder="HH:MM" value={toTime} onChange={(e) => setToTime(e.target.value)} className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                <div className="flex flex-col">
                  <button onClick={() => {}} className="flex h-5 items-center justify-center rounded-t border border-stroke bg-gray-100 px-1 text-xs hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2">▲</button>
                  <button onClick={() => {}} className="flex h-5 items-center justify-center rounded-b border border-t-0 border-stroke bg-gray-100 px-1 text-xs hover:bg-gray-200 dark:border-dark-3 dark:bg-dark-2">▼</button>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Daily Allowance <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox><span className="text-sm font-bold">#</span></IconBox>
                <input type="number" value={dailyAllowance} onChange={(e) => setDailyAllowance(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark dark:text-white">Remark</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </IconBox>
                <input type="text" value={remark} onChange={(e) => setRemark(e.target.value)} className="w-full rounded-r border border-stroke bg-transparent px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
              </div>
            </div>
          </div>

          {/* Add / Clear buttons for Journey */}
          <div className="mb-6 flex items-center justify-end gap-2">
            <button onClick={handleClearJourney} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Clear
            </button>
            <button onClick={handleAddJourney} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
              Add
            </button>
          </div>

          {/* Journey & Allowance Details Table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th rowSpan={2} className="w-10 border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">#</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Date of Journey &amp; Halts</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Route</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">Purpose of Journey</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Mode of Conveyance</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">Number of Kilometers</th>
                  <th colSpan={3} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Additional Rail Fare Eligibility of</th>
                  <th colSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Daily Allowance</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">Total Amount (₹)</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">Remarks</th>
                  <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">Action</th>
                </tr>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">From</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">To</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">From</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">To</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Type</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Amount(₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Class</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Rail Fare (₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Additional Fare (₹)</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">No. of Days</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {journeyRows.length === 0 ? (
                  <tr><td colSpan={17} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found.</td></tr>
                ) : (
                  journeyRows.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.dateFrom}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.dateTo}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.routeFrom}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.routeTo}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.purposeOfJourney}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.modeType}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.amount.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.numberOfKilometers.toFixed(1)}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.railClass}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.railFare.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.additionalFare.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.noOfDays.toFixed(1)}</td>
                      <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.dailyAllowance.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{row.totalAmount.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.remarks || "-"}</td>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">
                        <button onClick={() => handleDeleteJourney(row.id)} className="inline-flex items-center justify-center rounded bg-[#dc3545] p-1.5 text-white hover:opacity-90">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 dark:bg-[#1a2232]">
                  <td colSpan={7} className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">Total:</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.amount.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.numberOfKilometers.toFixed(1)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.railFare.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.additionalFare.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.noOfDays.toFixed(1)}</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.dailyAllowance.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right font-semibold dark:border-dark-3">{totals.totalAmount.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/human-resource/ta-bill/list")} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
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
  );
}
