"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface JourneyDetail {
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

const BILL_DATA: Record<number, {
  taBillType: string;
  tourProgramPlanCodeName: string;
  employeeCodeName: string;
  designation: string;
  month: string;
  year: string;
  entityCodeName: string;
  basicPay: string;
  journeyDetails: JourneyDetail[];
}> = {
  1: {
    taBillType: "TOUR_PROGRAM_CLAIM",
    tourProgramPlanCodeName: "Tentative",
    employeeCodeName: "252 / SANKARANARAYANAN",
    designation: "ASSISTANT SALES MAN",
    month: "MAY",
    year: "2021",
    entityCodeName: "10 / HEAD OFFICE",
    basicPay: "₹ 43530.00",
    journeyDetails: [
      {
        id: 1,
        dateFrom: "01-May-2022 / 00:00:00",
        dateTo: "31-May-2022 / 00:00:00",
        routeFrom: "chennai",
        routeTo: "Tirunelveli",
        purposeOfJourney: "Inspection",
        modeType: "Train",
        amount: 1040.0,
        numberOfKilometers: 350.0,
        railClass: "Sleeper",
        railFare: 1040.0,
        additionalFare: 0.0,
        noOfDays: 3.0,
        dailyAllowance: 1500.0,
        totalAmount: 3580.0,
        remarks: "",
      },
    ],
  },
  2: {
    taBillType: "OTHER_CLAIM",
    tourProgramPlanCodeName: "",
    employeeCodeName: "518 / PANDIYAMMAL R",
    designation: "SALES ASSISTANT",
    month: "JUNE",
    year: "2021",
    entityCodeName: "10 / HEAD OFFICE",
    basicPay: "₹ 28000.00",
    journeyDetails: [
      { id: 1, dateFrom: "01-Jun-2021", dateTo: "02-Jun-2021", routeFrom: "Chennai", routeTo: "Coimbatore", purposeOfJourney: "TA BILL", modeType: "Bus", amount: 482.0, numberOfKilometers: 200.0, railClass: "-", railFare: 0.0, additionalFare: 0.0, noOfDays: 1.0, dailyAllowance: 482.0, totalAmount: 482.0, remarks: "" },
    ],
  },
};

function ViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam) : 1;
  const bill = BILL_DATA[id] ?? BILL_DATA[1];

  const totals = bill.journeyDetails.reduce(
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
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Travelling Allowance Bill</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Travelling Allowance Bill</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Form Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">TA Bill</h3>
        </div>

        <div className="p-5">
          {/* TA Bill Header Info */}
          <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">TA Bill Type</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{bill.taBillType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tour Program Plan Code Name</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{bill.tourProgramPlanCodeName || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Employee Code Name</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{bill.employeeCodeName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Designation</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{bill.designation}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Month</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{bill.month}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Year</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{bill.year}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Entity Code Name</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{bill.entityCodeName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Basic Pay</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{bill.basicPay}</p>
            </div>
          </div>

          <div className="mb-4 border-t border-stroke dark:border-dark-3"></div>

          {/* Journey & Allowance Details */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Journey &amp; Allowance Details</h4>
          </div>

          <div className="overflow-x-auto">
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
                {bill.journeyDetails.length === 0 ? (
                  <tr><td colSpan={16} className="border border-stroke px-3 py-4 text-center text-gray-400 dark:border-dark-3">No records found.</td></tr>
                ) : (
                  bill.journeyDetails.map((row, idx) => (
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
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.remarks || ""}</td>
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
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Back Button */}
          <div className="mt-6 flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/personnel/human-resource/ta-bill/list")} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ViewTABillPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
      <ViewContent />
    </Suspense>
  );
}
