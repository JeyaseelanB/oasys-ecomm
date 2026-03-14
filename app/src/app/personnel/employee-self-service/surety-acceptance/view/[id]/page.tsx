"use client";
import { useRouter } from "next/navigation";

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

interface SuretyDetailRow {
  id: number;
  pfNumberName: string;
  designation: string;
  department: string;
  section: string;
  status: string;
  remarks: string;
}

interface DocumentRow {
  id: number;
  documentName: string;
}

const EMPLOYEE = {
  employeeId: "165",
  employeeName: "MANGALAM K",
  designation: "",
  fatherName: "M SUNILKUMAR",
  entityType: "Head Office",
  entity: "HEAD OFFICE",
  department: "ADMIN",
};

const SURETY_ROWS: SuretyDetailRow[] = [
  { id: 1, pfNumberName: "69070 / KARTHIK", designation: "JUNIOR SYSTEM ANALYST", department: "ADMIN", section: "COMPUTER WING", status: "", remarks: "" },
  { id: 2, pfNumberName: "3325 / SANKARANARAYANAN", designation: "SUPERINTENDENT", department: "ADMIN", section: "EDP", status: "ACCEPTED", remarks: "Accepted" },
];

const LOAN = {
  loanAdvanceType: "Loan",
  eligibilityAmount: "₹ 100000.00",
  maximumAmount: "₹ 100000.00",
  minimumAmount: "₹ 1000.00",
  amountRequired: "₹ 100000.00",
  rateOfInterest: "6.0",
  noOfInstallments: "36",
  reason: "Personal",
};

const DOCUMENTS: DocumentRow[] = [
  { id: 1, documentName: "Document.docx" },
];
export default function ViewSuretyAcceptancePage() {
  const router = useRouter();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-700 mb-1">View Surety Acceptance</h1>
      <p className="text-sm text-gray-500 mb-4">
        <span className="text-gray-400">Home / Personnel / Employee Self Service / </span>View Surety Acceptance
      </p>

      <div className="bg-white rounded shadow">
        {/* Card Header */}
        <div className="px-4 py-2 rounded-t" style={{ backgroundColor: "#17a2b8" }}>
          <span className="text-white font-semibold text-sm">Surety Acceptance</span>
        </div>

        <div className="px-4 py-4">
          {/* Employee Details Section */}
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "#2d8f7b" }}><GridIcon /></span>
            <span className="font-semibold text-gray-700">Employee Details</span>
          </div>

          <div className="grid grid-cols-4 gap-x-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Employee ID</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.employeeId}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Employee Name</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.employeeName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Designation</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.designation || "\u00a0"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Father Name</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.fatherName}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-x-4 mb-6">
            <div>
              <div className="text-xs text-gray-500 mb-1">Entity Type</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.entityType}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Entity</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.entity}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Department</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{EMPLOYEE.department}</div>
            </div>
          </div>

          {/* Surety Details Section */}
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: "#2d8f7b" }}><GridIcon /></span>
            <span className="font-semibold text-gray-700">Surety Details</span>
          </div>

          <div className="mb-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ backgroundColor: "#2d8f7b", color: "#fff" }}>
                  <th className="px-3 py-2 text-center w-10">#</th>
                  <th className="px-3 py-2 text-left">Employee PF Number / Name</th>
                  <th className="px-3 py-2 text-left">Designation</th>
                  <th className="px-3 py-2 text-left">Department</th>
                  <th className="px-3 py-2 text-left">Section</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {SURETY_ROWS.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-3 py-2 text-center text-gray-600">{row.id}</td>
                    <td className="px-3 py-2 text-gray-700">{row.pfNumberName}</td>
                    <td className="px-3 py-2 text-gray-700">{row.designation}</td>
                    <td className="px-3 py-2 text-gray-700">{row.department}</td>
                    <td className="px-3 py-2 text-gray-700">{row.section}</td>
                    <td className="px-3 py-2 text-gray-700">{row.status}</td>
                    <td className="px-3 py-2 text-gray-700">{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Loan / Advance Details Section */}
          <div className="flex items-center gap-2 mb-4">
            <span style={{ color: "#2d8f7b" }}><GridIcon /></span>
            <span className="font-semibold text-gray-700">Loan / Advance Details</span>
          </div>

          <div className="grid grid-cols-4 gap-x-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Loan / Advance Type</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.loanAdvanceType}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Eligibility Amount</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.eligibilityAmount}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Maximum Amount</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.maximumAmount}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Minimum Amount</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.minimumAmount}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-x-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Amount Required</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.amountRequired}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Rate of Interest (%)</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.rateOfInterest}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">No. of Installments</div>
              <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.noOfInstallments}</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-xs text-gray-500 mb-1">Reason</div>
            <div className="text-sm font-medium" style={{ color: "#17a2b8" }}>{LOAN.reason}</div>
          </div>

          {/* Uploaded Documents Section */}
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: "#2d8f7b" }}><GridIcon /></span>
            <span className="font-semibold text-gray-700">Uploaded Documents</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ backgroundColor: "#2d8f7b", color: "#fff" }}>
                  <th className="px-3 py-2 text-center w-10">#</th>
                  <th className="px-3 py-2 text-left">Document Name</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {DOCUMENTS.map((doc, idx) => (
                  <tr key={doc.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-3 py-2 text-center text-gray-600">{doc.id}</td>
                    <td className="px-3 py-2 text-gray-700">{doc.documentName}</td>
                    <td className="px-3 py-2 text-center">
                      <button
                        className="flex items-center gap-1 px-3 py-1 text-white text-xs rounded mx-auto"
                        style={{ backgroundColor: "#17a2b8" }}
                      >
                        <DownloadIcon />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
