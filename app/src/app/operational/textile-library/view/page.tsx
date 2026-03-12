"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const TealVal = ({ value }: { value: string }) => (
  <p className="text-sm font-medium" style={{ color: "#17a2b8" }}>{value || "—"}</p>
);

const LabeledField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <TealVal value={value} />
  </div>
);

export default function ViewTextileLibraryPage() {
  const router = useRouter();

  // Pre-filled data from screenshot (Co-optex Employee record)
  const data = {
    visitorType: "Co-opex Employee",
    employeeCodeName: "P00950 / Dinesh D",
    contactNumber: "8989898990",
    dateOfVisit: "11-Mar-2026",
    inTime: "09:00",
    outTime: "16:00",
    purposeOfVisit: "sdvgsdg",
    name: "PANK",
    bookLend: "Yes",
    visitorsSuggestion: "",
    dueDate: "18-Mar-2026",
    bookReturnDate: "31-Mar-2026",
  };

  return (
    <div className="p-4">
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Textile Library</li>
          <li>/</li>
          <li className="text-gray-700">View Textile Library Register</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">View Textile Library Register</h1>

      <div className="bg-white rounded shadow-sm border border-gray-200">
        {/* Section header */}
        <div
          className="px-4 py-2 text-white text-sm font-semibold rounded-t"
          style={{ backgroundColor: "#17a2b8" }}
        >
          View Textile Library Register
        </div>

        <div className="p-4 space-y-5">
          {/* Visitor Type */}
          <div className="border-b border-gray-100 pb-4">
            <p className="text-xs text-gray-500 mb-0.5">Visitor Type</p>
            <TealVal value={data.visitorType} />
          </div>

          {/* Row 1: Employee Code/Name | Contact Number | Date of Visit | In Time */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-100 pb-4">
            <LabeledField label="Employee Code / Name" value={data.employeeCodeName} />
            <LabeledField label="Contact Number" value={data.contactNumber} />
            <LabeledField label="Date of Visit" value={data.dateOfVisit} />
            <LabeledField label="In Time" value={data.inTime} />
          </div>

          {/* Row 2: Out Time | Purpose of Visit | Name | Book Lend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-100 pb-4">
            <LabeledField label="Out Time" value={data.outTime} />
            <LabeledField label="Purpose of Visit" value={data.purposeOfVisit} />
            <LabeledField label="Name" value={data.name} />
            <LabeledField label="Book Lend" value={data.bookLend} />
          </div>

          {/* Row 3: Visitors Suggestion | Due Date | Book Return Date */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <LabeledField label="Visitors Suggestion" value={data.visitorsSuggestion} />
            <LabeledField label="Due Date" value={data.dueDate} />
            <LabeledField label="Book Return Date" value={data.bookReturnDate} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-4 py-3 border-t border-gray-200">
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#17a2b8" }}
            onClick={() => router.push("/operational/textile-library/list")}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
