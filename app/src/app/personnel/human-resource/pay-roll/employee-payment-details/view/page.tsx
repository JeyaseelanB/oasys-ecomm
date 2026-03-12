"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ViewEmployeePaymentDetailsPage() {
  const router = useRouter();

  const record = {
    cadres:      "ASSISTANT SALESMAN / ASSISTANT SALESWOMAN",
    headOffice:  "HEAD OFFICE",
    employeeName: "MURUGESAN",
    designation: "MANAGER",
    basicPay:    "0.00",
  };

  const payHeads = [
    { id: 1, head: "BASIC PAY",  amount: "0.00", payAspect: "Earnings"   },
    { id: 2, head: "D.A",        amount: "0.00", payAspect: "Earnings"   },
    { id: 3, head: "H.R.A",      amount: "",     payAspect: "Earnings"   },
    { id: 4, head: "C.C.A",      amount: "",     payAspect: "Earnings"   },
    { id: 5, head: "P.F",        amount: "",     payAspect: "Deductions" },
    { id: 6, head: "INCOME TAX", amount: "",     payAspect: "Deductions" },
  ];

  return (
    <div className="mx-auto">
      {/* Title + Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Employee Payment Details</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Pay Roll</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Employee Payment Details</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card Header */}
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Employee Payment Details</h3>
        </div>

        <div className="p-5">
          {/* Employee Info */}
          <div className="mb-5 grid grid-cols-1 gap-4 border-b border-stroke pb-5 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div>
              <p className="text-xs text-gray-500">Cadres</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{record.cadres}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Head / Regional Office</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{record.headOffice}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Employee Name</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{record.employeeName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Designation</p>
              <p className="text-sm font-medium text-[#2d8f7b]">{record.designation}</p>
            </div>
          </div>

          {/* Basic Pay */}
          <div className="mb-5 border-b border-stroke pb-5 dark:border-dark-3">
            <p className="text-sm text-gray-500">Basic Pay</p>
            <p className="mt-1 text-base font-semibold text-[#2d8f7b]">₹ {record.basicPay}</p>
          </div>

          {/* Pay Heads Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Head</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Amount (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Pay Aspect</th>
                </tr>
              </thead>
              <tbody>
                {payHeads.map((h, idx) => (
                  <tr key={h.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3">{h.head}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">
                      {h.amount !== "" ? h.amount : ""}
                    </td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3">{h.payAspect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => router.push("/personnel/human-resource/pay-roll/employee-payment-details/list")}
              className="flex items-center gap-1.5 rounded bg-[#2d8f7b] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
