"use client";
import { useState } from "react";
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

const EMPLOYEE = {
  name: "SANKARANARAYANAN C",
  pfNumber: "3325",
  workLocation: "HEAD OFFICE",
  designation: "SUPERINTENDENT",
  department: "ADMIN",
  section: "EDP",
};

const LOAN = {
  loanNumber: "LRF1230",
  loanType: "ESD1",
  startDate: "01-Apr-2020",
  endDate: "31-Mar-2024",
  loanAmount: "₹ 21800.00",
  sanctionAmt: "₹ 21800.00",
  balanceAmount: "₹ 9900.00",
  rateOfInterest: "0.00 %",
  totalTenure: "48 Months",
  completedTenure: "26 Months",
  remainingTenure: "22 Months",
};

const EMI_ROWS: EMIRow[] = [
  { id: 1, year: 2020, month: "April", emiAmount: 650.00, principalAmount: 21800.00, interestAmount: 0.00, balanceAmount: 21150.00, paidAmount: 650.00, paidDate: "30-Apr-2020", status: "PAID" },
  { id: 2, year: 2020, month: "May", emiAmount: 450.00, principalAmount: 21150.00, interestAmount: 0.00, balanceAmount: 20700.00, paidAmount: 450.00, paidDate: "25-May-2020", status: "PAID" },
  { id: 3, year: 2020, month: "June", emiAmount: 450.00, principalAmount: 20700.00, interestAmount: 0.00, balanceAmount: 20250.00, paidAmount: 450.00, paidDate: "28-Jun-2020", status: "PAID" },
  { id: 4, year: 2020, month: "July", emiAmount: 450.00, principalAmount: 20250.00, interestAmount: 0.00, balanceAmount: 19800.00, paidAmount: 450.00, paidDate: "28-Jul-2020", status: "PAID" },
  { id: 5, year: 2020, month: "August", emiAmount: 450.00, principalAmount: 19800.00, interestAmount: 0.00, balanceAmount: 19350.00, paidAmount: 450.00, paidDate: "27-Aug-2020", status: "PAID" },
];

export default function RequestForLoanPreclosurePage() {
  const router = useRouter();
  const [employeeExpanded, setEmployeeExpanded] = useState(true);
  const [penaltyAmount, setPenaltyAmount] = useState("0.00");
  const [payBy, setPayBy] = useState("");

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-700 mb-1">Request for Loan Preclosure</h1>
      <p className="text-sm text-gray-500 mb-4">
        <span className="text-gray-400">Home / Personnel / Employee Self Service / </span>Request for Loan Preclosure
      </p>

      {/* Employee Details Card */}
      <div className="bg-white rounded shadow mb-4">
        <div
          className="px-4 py-2 rounded-t flex items-center justify-between cursor-pointer"
          style={{ backgroundColor: "#17a2b8" }}
          onClick={() => setEmployeeExpanded(v => !v)}
        >
          <span className="text-white font-semibold text-sm">Employee Details</span>
          <span className="text-white text-lg font-bold leading-none">{employeeExpanded ? "−" : "+"}</span>
        </div>
        {employeeExpanded && (
          <div className="px-4 py-4">
            <div className="grid grid-cols-4 gap-x-4 mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Employee Name</div>
                <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">PF Number</div>
                <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.pfNumber}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Work Location</div>
                <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.workLocation}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Designation</div>
                <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.designation}</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-x-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Department</div>
                <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.department}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Section</div>
                <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.section}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loan Preclosure Card */}
      <div className="bg-white rounded shadow">
        <div className="px-4 py-2 rounded-t" style={{ backgroundColor: "#17a2b8" }}>
          <span className="text-white font-semibold text-sm">Loan Preclosure</span>
        </div>

        <div className="px-4 py-4 border-b border-gray-200">
          {/* Row 1: Loan Number | Loan Type | Start Date | End Date */}
          <div className="grid grid-cols-4 gap-x-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Loan Number</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.loanNumber}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Loan Type</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.loanType}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Start Date</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.startDate}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">End Date</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.endDate}</div>
            </div>
          </div>

          {/* Row 2: Loan Amount | Sanction Amt | Balance Amount | Rate of Interest */}
          <div className="grid grid-cols-4 gap-x-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Loan Amount</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.loanAmount}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Sanction Amt</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.sanctionAmt}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Balance Amount</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.balanceAmount}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Rate of Interest on Total Loan Amount</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.rateOfInterest}</div>
            </div>
          </div>

          {/* Row 3: Total Tenure (full width) */}
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-1">Total Tenure</div>
            <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.totalTenure}</div>
          </div>

          {/* Row 4: Completed Tenure | Remaining Tenure */}
          <div className="grid grid-cols-4 gap-x-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Completed Tenure</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.completedTenure}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Remaining Tenure</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.remainingTenure}</div>
            </div>
          </div>
        </div>

        {/* EMI Table */}
        <div className="overflow-x-auto">
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

        {/* Bottom input row */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            {/* Balance Amount (readonly) */}
            <div>
              <div className="text-xs text-gray-500 mb-1">Balance Amount</div>
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <span className="px-2 py-2 bg-gray-100 text-gray-500 text-sm border-r border-gray-300">₹</span>
                <input
                  type="text"
                  readOnly
                  value="9900.00"
                  className="flex-1 px-2 py-2 text-sm text-gray-700 bg-gray-50 outline-none"
                />
              </div>
            </div>

            {/* Penalty Amount */}
            <div>
              <div className="text-xs text-gray-500 mb-1">Penalty Amount</div>
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <span className="px-2 py-2 bg-gray-100 text-gray-500 text-sm border-r border-gray-300">₹</span>
                <input
                  type="text"
                  value={penaltyAmount}
                  onChange={e => setPenaltyAmount(e.target.value)}
                  className="flex-1 px-2 py-2 text-sm text-gray-700 outline-none"
                />
              </div>
            </div>

            {/* Pay By */}
            <div>
              <div className="text-xs text-gray-500 mb-1">
                Pay By <span className="text-red-500">*</span>
              </div>
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <span className="px-2 py-2 bg-gray-100 text-gray-500 text-sm border-r border-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </span>
                <select
                  value={payBy}
                  onChange={e => setPayBy(e.target.value)}
                  className="flex-1 px-2 py-2 text-sm text-gray-700 outline-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="CASH">Cash</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="ONLINE">Online Transfer</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 px-4 py-2 text-sm text-white rounded"
            style={{ backgroundColor: "#343a40" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Cancel
          </button>
          <button
            className="flex items-center gap-1 px-4 py-2 text-sm text-white rounded"
            style={{ backgroundColor: "#28a745" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
