"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Icons
const PersonIco = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const HashIco = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
  </svg>
);
const PhoneIco = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const CalIco = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const ClockIco = () => (
  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const DocIco = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const BookIco = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
const ListIco = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const F = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex border border-gray-300 rounded overflow-hidden">
    <div className="flex items-center justify-center px-2 bg-gray-100 border-r border-gray-300 min-w-[36px]">
      {icon}
    </div>
    <div className="flex-1">{children}</div>
  </div>
);

const TimeField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const adjust = (dir: 1 | -1) => {
    const [h, m] = (value || "00:00").split(":").map(Number);
    let newMin = m + dir * 30;
    let newHour = h;
    if (newMin >= 60) { newMin -= 60; newHour = (newHour + 1) % 24; }
    if (newMin < 0) { newMin += 60; newHour = (newHour - 1 + 24) % 24; }
    onChange(`${String(newHour).padStart(2, "0")}:${String(newMin).padStart(2, "0")}`);
  };
  return (
    <div className="flex border border-gray-300 rounded overflow-hidden">
      <div className="flex items-center justify-center px-2 bg-gray-100 border-r border-gray-300 min-w-[36px]">
        <ClockIco />
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="HH:MM"
        className="flex-1 px-2 py-1.5 text-sm text-gray-800 outline-none"
      />
      <div className="flex flex-col border-l border-gray-300">
        <button onClick={() => adjust(1)} className="flex-1 px-2 flex items-center justify-center hover:bg-gray-100 text-gray-600 text-xs">▲</button>
        <button onClick={() => adjust(-1)} className="flex-1 px-2 flex items-center justify-center hover:bg-gray-100 text-gray-600 text-xs border-t border-gray-300">▼</button>
      </div>
    </div>
  );
};

const DateField = ({ value, onChange, placeholder = "dd-MMM-yyyy" }: { value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div className="flex border border-gray-300 rounded overflow-hidden">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 px-2 py-1.5 text-sm text-gray-800 outline-none"
    />
    <button className="px-2 flex items-center justify-center" style={{ backgroundColor: "#17a2b8" }}>
      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </button>
  </div>
);

export default function EditTextileLibraryPage() {
  const router = useRouter();

  // Pre-filled data from screenshot
  const [visitorType, setVisitorType] = useState("Co-optex Employee");
  const [employeeCode, setEmployeeCode] = useState("P00950");
  const [contactNumber, setContactNumber] = useState("8989898990");
  const [name, setName] = useState("");
  const [date, setDate] = useState("11-Mar-2026");
  const [inTime, setInTime] = useState("09:00");
  const [outTime, setOutTime] = useState("16:00");
  const [purposeOfVisit, setPurposeOfVisit] = useState("sdvgsdg");
  const [bookName, setBookName] = useState("");
  const [bookLend, setBookLend] = useState("Yes");
  const [visitorsSuggestion, setVisitorsSuggestion] = useState("");
  const [dueDate, setDueDate] = useState("18-Mar-2026");
  const [bookReturnDate, setBookReturnDate] = useState("31-Mar-2026");

  const isEmployee = visitorType === "Co-optex Employee";
  const isGeneral = visitorType === "General Public";

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
          <li className="text-gray-700">Edit Textile Library Register</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">Edit Textile Library Register</h1>

      <div className="bg-white rounded shadow-sm border border-gray-200">
        {/* Section header */}
        <div className="px-4 py-2 flex items-center justify-between text-white text-sm font-semibold rounded-t" style={{ backgroundColor: "#17a2b8" }}>
          <span>Textile Library Register</span>
          <span className="text-xs font-normal">( * Mandatory Fields)</span>
        </div>

        <div className="p-4 space-y-5">
          {/* Visitor Type */}
          <div className="max-w-xs">
            <p className="text-xs text-gray-600 mb-1 font-medium">Visitor Type <span className="text-red-500">*</span></p>
            <F icon={<PersonIco />}>
              <select
                value={visitorType}
                onChange={e => setVisitorType(e.target.value)}
                className="w-full px-2 py-1.5 text-sm text-gray-800 bg-white outline-none"
              >
                <option value="">Select</option>
                <option value="Co-optex Employee">Co-optex Employee</option>
                <option value="General Public">General Public</option>
              </select>
            </F>
          </div>

          {/* Employee fields */}
          {isEmployee && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Employee Code / Name <span className="text-red-500">*</span></p>
                  <F icon={<HashIco />}>
                    <select
                      value={employeeCode}
                      onChange={e => setEmployeeCode(e.target.value)}
                      className="w-full px-2 py-1.5 text-sm text-gray-800 bg-white outline-none"
                    >
                      <option value="">Select</option>
                      <option value="P00950">P00950 / Dinesh D</option>
                      <option value="P00123">P00123 / Ramesh K</option>
                    </select>
                  </F>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Contact Number</p>
                  <F icon={<PhoneIco />}>
                    <input
                      type="text"
                      value={contactNumber}
                      onChange={e => setContactNumber(e.target.value)}
                      className="w-full px-2 py-1.5 text-sm text-gray-800 outline-none"
                    />
                  </F>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Date <span className="text-red-500">*</span></p>
                  <DateField value={date} onChange={setDate} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">In Time <span className="text-red-500">*</span></p>
                  <TimeField value={inTime} onChange={setInTime} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Out Time <span className="text-red-500">*</span></p>
                  <TimeField value={outTime} onChange={setOutTime} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Purpose of Visit <span className="text-red-500">*</span></p>
                  <div className="flex border border-gray-300 rounded overflow-hidden min-h-[80px]">
                    <div className="flex items-start justify-center px-2 pt-2 bg-gray-100 border-r border-gray-300 min-w-[36px]">
                      <DocIco />
                    </div>
                    <textarea
                      value={purposeOfVisit}
                      onChange={e => setPurposeOfVisit(e.target.value)}
                      className="flex-1 px-2 py-1.5 text-sm text-gray-800 outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Book Name <span className="text-red-500">*</span></p>
                  <F icon={<BookIco />}>
                    <select
                      value={bookName}
                      onChange={e => setBookName(e.target.value)}
                      className="w-full px-2 py-1.5 text-sm text-gray-800 bg-white outline-none"
                    >
                      <option value="">Select</option>
                      <option value="PANK">PANK</option>
                      <option value="Textile Design">Textile Design</option>
                      <option value="Weaving Techniques">Weaving Techniques</option>
                    </select>
                  </F>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Book Lend <span className="text-red-500">*</span></p>
                  <F icon={<ListIco />}>
                    <select
                      value={bookLend}
                      onChange={e => setBookLend(e.target.value)}
                      className="w-full px-2 py-1.5 text-sm text-gray-800 bg-white outline-none"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </F>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Visitors Suggestion</p>
                  <div className="flex border border-gray-300 rounded overflow-hidden min-h-[80px]">
                    <div className="flex items-start justify-center px-2 pt-2 bg-gray-100 border-r border-gray-300 min-w-[36px]">
                      <DocIco />
                    </div>
                    <textarea
                      value={visitorsSuggestion}
                      onChange={e => setVisitorsSuggestion(e.target.value)}
                      className="flex-1 px-2 py-1.5 text-sm text-gray-800 outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                {bookLend === "Yes" && (
                  <>
                    <div>
                      <p className="text-xs text-gray-600 mb-1 font-medium">Due Date <span className="text-red-500">*</span></p>
                      <DateField value={dueDate} onChange={setDueDate} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1 font-medium">Book Return Date <span className="text-red-500">*</span></p>
                      <DateField value={bookReturnDate} onChange={setBookReturnDate} />
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* General Public fields */}
          {isGeneral && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Name <span className="text-red-500">*</span></p>
                  <F icon={<PersonIco />}>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-2 py-1.5 text-sm text-gray-800 outline-none"
                    />
                  </F>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Contact Number <span className="text-red-500">*</span></p>
                  <F icon={<PhoneIco />}>
                    <input
                      type="text"
                      value={contactNumber}
                      onChange={e => setContactNumber(e.target.value)}
                      className="w-full px-2 py-1.5 text-sm text-gray-800 outline-none"
                    />
                  </F>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Date <span className="text-red-500">*</span></p>
                  <DateField value={date} onChange={setDate} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">In Time <span className="text-red-500">*</span></p>
                  <TimeField value={inTime} onChange={setInTime} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Out Time <span className="text-red-500">*</span></p>
                  <TimeField value={outTime} onChange={setOutTime} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Purpose of Visit <span className="text-red-500">*</span></p>
                  <div className="flex border border-gray-300 rounded overflow-hidden min-h-[80px]">
                    <div className="flex items-start justify-center px-2 pt-2 bg-gray-100 border-r border-gray-300 min-w-[36px]">
                      <DocIco />
                    </div>
                    <textarea
                      value={purposeOfVisit}
                      onChange={e => setPurposeOfVisit(e.target.value)}
                      className="flex-1 px-2 py-1.5 text-sm text-gray-800 outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Book Name <span className="text-red-500">*</span></p>
                  <F icon={<BookIco />}>
                    <select
                      value={bookName}
                      onChange={e => setBookName(e.target.value)}
                      className="w-full px-2 py-1.5 text-sm text-gray-800 bg-white outline-none"
                    >
                      <option value="">Select</option>
                      <option value="PANK">PANK</option>
                      <option value="Textile Design">Textile Design</option>
                      <option value="Weaving Techniques">Weaving Techniques</option>
                    </select>
                  </F>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-medium">Visitors Suggestion</p>
                  <div className="flex border border-gray-300 rounded overflow-hidden min-h-[80px]">
                    <div className="flex items-start justify-center px-2 pt-2 bg-gray-100 border-r border-gray-300 min-w-[36px]">
                      <DocIco />
                    </div>
                    <textarea
                      value={visitorsSuggestion}
                      onChange={e => setVisitorsSuggestion(e.target.value)}
                      className="flex-1 px-2 py-1.5 text-sm text-gray-800 outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
          <button
            onClick={() => router.push("/operational/textile-library/list")}
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#17a2b8" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#28a745" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
