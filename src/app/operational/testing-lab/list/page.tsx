"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TestReport = {
  id: number;
  stockInwardNumber: string;
  stockInwardDate: string;
  sampleNumber: string;
  productVarietyCodeName: string;
  status: "ACTIVE" | "INACTIVE";
};

const SAMPLE_DATA: TestReport[] = [
  {
    id: 1,
    stockInwardNumber: "Jun21170439",
    stockInwardDate: "23-Jun-2021",
    sampleNumber: "10649905",
    productVarietyCodeName: "SAWB/ARNI SILK SAREE WITH BLOUS...",
    status: "ACTIVE",
  },
];

export default function TestingLabListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    stockInwardNumber: "",
    stockInwardDate: "",
    sampleNumber: "",
    productVarietyCodeName: "",
    status: "",
  });

  const filtered = SAMPLE_DATA.filter(
    (row) =>
      (!filters.stockInwardNumber ||
        row.stockInwardNumber
          .toLowerCase()
          .includes(filters.stockInwardNumber.toLowerCase())) &&
      (!filters.stockInwardDate ||
        row.stockInwardDate.includes(filters.stockInwardDate)) &&
      (!filters.sampleNumber ||
        row.sampleNumber.includes(filters.sampleNumber)) &&
      (!filters.productVarietyCodeName ||
        row.productVarietyCodeName
          .toLowerCase()
          .includes(filters.productVarietyCodeName.toLowerCase())) &&
      (!filters.status || row.status === filters.status)
  );

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-teal-600">
              🏠 Home
            </Link>
          </li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Testing Lab</li>
          <li>/</li>
          <li className="text-gray-700">Testing Lab - Test Report List</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">
        Testing Lab - Test Report List
      </h1>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          {filtered.length} - Test Report(s)
        </span>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded"
            style={{ backgroundColor: "#28a745" }}
            onClick={() => router.push("/operational/testing-lab/create")}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Add
          </button>
          <button
            disabled={!selectedId}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded ${!selectedId ? "opacity-60 cursor-not-allowed" : ""}`}
            style={{ backgroundColor: "#17a2b8" }}
            onClick={() =>
              selectedId &&
              router.push(`/operational/testing-lab/edit?id=${selectedId}`)
            }
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            disabled={!selectedId}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded ${!selectedId ? "opacity-60 cursor-not-allowed" : ""}`}
            style={{ backgroundColor: "#17a2b8" }}
            onClick={() =>
              selectedId &&
              router.push(`/operational/testing-lab/view?id=${selectedId}`)
            }
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
          <button
            disabled={!selectedId}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded ${!selectedId ? "opacity-60 cursor-not-allowed" : ""}`}
            style={{ backgroundColor: "#dc3545" }}
            onClick={() => selectedId && setShowDeleteModal(true)}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded"
            style={{ backgroundColor: "#6c757d" }}
            onClick={() => {
              setSelectedId(null);
              setFilters({
                stockInwardNumber: "",
                stockInwardDate: "",
                sampleNumber: "",
                productVarietyCodeName: "",
                status: "",
              });
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 13.5V17h3.5l9.026-9.026-3.5-3.5L4 13.5z" />
            </svg>
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow-sm border border-gray-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#2d8f7b" }} className="text-white">
              <th className="px-3 py-2.5 text-center font-semibold w-10">#</th>
              <th className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">
                Stock Inward Number
                <span className="ml-1 text-xs opacity-80">⇅</span>
              </th>
              <th className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">
                Stock Inward Date
                <span className="ml-1 text-xs opacity-80">⇅</span>
              </th>
              <th className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">
                Sample Number
                <span className="ml-1 text-xs opacity-80">⇅</span>
              </th>
              <th className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">
                Product Variety Code / Name
                <span className="ml-1 text-xs opacity-80">⇅</span>
              </th>
              <th className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">
                Status
                <span className="ml-1 text-xs opacity-80">⇅</span>
              </th>
              <th className="px-3 py-2.5 text-center font-semibold">Select</th>
            </tr>
            <tr style={{ backgroundColor: "#2d8f7b" }}>
              <td className="px-2 py-1.5"></td>
              <td className="px-2 py-1.5">
                <input
                  type="text"
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.stockInwardNumber}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      stockInwardNumber: e.target.value,
                    }))
                  }
                />
              </td>
              <td className="px-2 py-1.5">
                <div className="flex items-center bg-white rounded overflow-hidden">
                  <input
                    type="text"
                    placeholder="dd-MMM-yyyy"
                    className="flex-1 px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                    value={filters.stockInwardDate}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        stockInwardDate: e.target.value,
                      }))
                    }
                  />
                  <span
                    className="px-1.5 py-1 flex items-center justify-center"
                    style={{ backgroundColor: "#17a2b8" }}
                  >
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </td>
              <td className="px-2 py-1.5">
                <input
                  type="text"
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.sampleNumber}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, sampleNumber: e.target.value }))
                  }
                />
              </td>
              <td className="px-2 py-1.5">
                <input
                  type="text"
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.productVarietyCodeName}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      productVarietyCodeName: e.target.value,
                    }))
                  }
                />
              </td>
              <td className="px-2 py-1.5">
                <select
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  <option value="">Select</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </td>
              <td className="px-2 py-1.5"></td>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-4 text-sm text-gray-500">
                  No records found
                </td>
              </tr>
            ) : (
              filtered.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-teal-50 ${selectedId === row.id ? "bg-teal-50" : ""}`}
                  onClick={() =>
                    setSelectedId(selectedId === row.id ? null : row.id)
                  }
                >
                  <td className="px-3 py-2 text-center text-gray-600">
                    {idx + 1}
                  </td>
                  <td className="px-3 py-2">{row.stockInwardNumber}</td>
                  <td className="px-3 py-2">{row.stockInwardDate}</td>
                  <td className="px-3 py-2">{row.sampleNumber}</td>
                  <td className="px-3 py-2">{row.productVarietyCodeName}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        row.status === "ACTIVE"
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input
                      type="radio"
                      checked={selectedId === row.id}
                      onChange={() => setSelectedId(row.id)}
                      className="accent-teal-600"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-xl w-80">
            <div
              className="px-4 py-2 text-white font-semibold text-sm rounded-t flex items-center justify-between"
              style={{ backgroundColor: "#2d8f7b" }}
            >
              <span>Confirm Delete</span>
              <button
                className="text-white hover:opacity-70 text-base"
                onClick={() => setShowDeleteModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-700">
                Are you sure you want to delete this record?
              </p>
            </div>
            <div className="flex justify-center gap-3 pb-5">
              <button
                className="flex items-center gap-1.5 px-5 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#6c757d" }}
                onClick={() => setShowDeleteModal(false)}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                No
              </button>
              <button
                className="flex items-center gap-1.5 px-5 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#28a745" }}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedId(null);
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
