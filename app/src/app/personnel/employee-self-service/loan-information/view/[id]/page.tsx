"use client";
import { useRouter } from "next/navigation";

interface EMIRow {
  id: number;
  year: number;
  month: string;
  emiAmount: number;
  principalAmount: number;
  interestAmount: number;
  balanceAmount: number;
  paidAmount: number;
  paidDate: string;
  status: "PAID" | "PENDING";
}

const DATA = {
  loanNumber: "LRF6415",
  loanType: "FAMILY BENEFIT FUND SCHEME",
  startDate: "22-Dec-2023",
  endDate: "30-Apr-2024",
  loanAmount: "₹ 2197.00",
  sanctionAmt: "₹ 2197.00",
  balanceAmount: "₹ 0.00",
  rateOfInterest: "0.00 %",
  totalTenure: "5 Months",
  completedTenure: "5 Months",
  remainingTenure: "0 Months",
  penaltyAmount: "0.0",
};

const EMI_ROWS: EMIRow[] = [
  { id: 1, year: 2023, month: "December", emiAmount: 441.00, principalAmount: 2197.00, interestAmount: 0.00, balanceAmount: 1756.00, paidAmount: 441.00, paidDate: "31-Dec-2023", status: "PAID" },
  { id: 2, year: 2024, month: "January", emiAmount: 439.00, principalAmount: 1756.00, interestAmount: 0.00, balanceAmount: 1317.00, paidAmount: 439.00, paidDate: "31-Jan-2024", status: "PAID" },
  { id: 3, year: 2024, month: "February", emiAmount: 439.00, principalAmount: 1317.00, interestAmount: 0.00, balanceAmount: 878.00, paidAmount: 439.00, paidDate: "29-Feb-2024", status: "PAID" },
  { id: 4, year: 2024, month: "March", emiAmount: 439.00, principalAmount: 878.00, interestAmount: 0.00, balanceAmount: 439.00, paidAmount: 439.00, paidDate: "31-May-2024", status: "PAID" },
  { id: 5, year: 2024, month: "April", emiAmount: 439.00, principalAmount: 439.00, interestAmount: 0.00, balanceAmount: 0.00, paidAmount: 439.00, paidDate: "31-Aug-2024", status: "PAID" },
];
export default function ViewLoanInformationPage() {
  const router = useRouter();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-700 mb-1">View Loan Information</h1>
      <p className="text-sm text-gray-500 mb-4">
        <span className="text-gray-400">Home / Personnel / Employee Self Service / </span>View Loan Information
      </p>

      <div className="bg-white rounded shadow">
        {/* Card Header */}
        <div className="px-4 py-2 rounded-t flex items-center justify-between" style={{ backgroundColor: "#17a2b8" }}>
          <span className="text-white font-semibold text-sm">Loan Schedule</span>
        </div>

        {/* Loan Details Grid */}
        <div className="px-2 py-3 border-b border-gray-200">
          {/* Row 1: Loan Number | Loan Type | Start Date | End Date */}
          <div className="grid grid-cols-4">
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Loan Number</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Loan Type</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Start Date</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">End Date</div>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.loanNumber}</div>
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.loanType}</div>
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.startDate}</div>
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.endDate}</div>
            </div>
          </div>

          {/* Row 2: Loan Amount | Sanction Amt | Balance Amount | Rate of Interest */}
          <div className="grid grid-cols-4">
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Loan Amount</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Sanction Amt</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Balance Amount</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Rate of Interest on Total Loan Amount</div>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.loanAmount}</div>
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.sanctionAmt}</div>
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.balanceAmount}</div>
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.rateOfInterest}</div>
            </div>
          </div>

          {/* Row 3: Total Tenure | Completed Tenure | Remaining Tenure | Penalty Amount */}
          <div className="grid grid-cols-4">
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Total Tenure</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Completed Tenure</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Remaining Tenure</div>
            </div>
            <div className="px-3 py-1">
              <div className="text-xs text-gray-500">Penalty Amount</div>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.totalTenure}</div>
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.completedTenure}</div>
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.remainingTenure}</div>
            </div>
            <div className="px-3 pb-3">
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{DATA.penaltyAmount}</div>
            </div>
          </div>
        </div>

        {/* EMI Schedule Table */}
        <div className="px-4 py-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: "#2d8f7b", color: "#fff" }}>
                <th className="px-3 py-2 text-center w-10">#</th>
                <th className="px-3 py-2 text-left">Year</th>
                <th className="px-3 py-2 text-left">Month</th>
                <th className="px-3 py-2 text-right">EMI Amount (₹)</th>
                <th className="px-3 py-2 text-right">Principal Amount (₹)</th>
                <th className="px-3 py-2 text-right">Interest Amount (₹)</th>
                <th className="px-3 py-2 text-right">Balance Amount (₹)</th>
                <th className="px-3 py-2 text-right">Paid Amount (₹)</th>
                <th className="px-3 py-2 text-left">Paid Date</th>
                <th className="px-3 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {EMI_ROWS.map((row, idx) => (
                <tr key={row.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="px-3 py-2 text-center text-gray-600">{row.id}</td>
                  <td className="px-3 py-2 text-gray-700">{row.year}</td>
                  <td className="px-3 py-2 text-gray-700">{row.month}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{row.emiAmount.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{row.principalAmount.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{row.interestAmount.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{row.balanceAmount.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right text-gray-700">{row.paidAmount.toFixed(2)}</td>
                  <td className="px-3 py-2 text-gray-700">{row.paidDate}</td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className="px-3 py-1 rounded text-white text-xs font-semibold"
                      style={{ backgroundColor: row.status === "PAID" ? "#28a745" : "#ffc107" }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-4 py-3 border-t border-gray-200">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 px-4 py-2 text-sm text-white rounded"
            style={{ backgroundColor: "#17a2b8" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
