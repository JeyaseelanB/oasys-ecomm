"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PurchaseOrderItem = {
  id: number;
  supplierTypeCode: string;
  supplierCodeName: string;
  quotationNumber: string;
  createdDate: string;
  status: string;
};

const SAMPLE_DATA: PurchaseOrderItem[] = [];

export default function PurchaseOrderItemListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    supplierTypeCode: "",
    supplierCodeName: "",
    quotationNumber: "",
    createdDate: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = SAMPLE_DATA.filter(
    (row) =>
      (!filters.supplierTypeCode ||
        row.supplierTypeCode
          .toLowerCase()
          .includes(filters.supplierTypeCode.toLowerCase())) &&
      (!filters.supplierCodeName ||
        row.supplierCodeName
          .toLowerCase()
          .includes(filters.supplierCodeName.toLowerCase())) &&
      (!filters.quotationNumber ||
        row.quotationNumber
          .toLowerCase()
          .includes(filters.quotationNumber.toLowerCase())) &&
      (!filters.createdDate ||
        row.createdDate.includes(filters.createdDate)) &&
      (!filters.status || row.status === filters.status)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

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
          <li className="hover:text-teal-600 cursor-pointer">
            Quotation/Order/Invoice
          </li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Purchase</li>
          <li>/</li>
          <li className="text-gray-700">Purchase Order Item List</li>
        </ol>
      </nav>

      <h1 className="text-base font-semibold text-gray-800 mb-3">
        Purchase Order Item List
      </h1>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          {filtered.length} - Purchase Order Item(s)
        </span>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded"
            style={{ backgroundColor: "#28a745" }}
            onClick={() =>
              router.push(
                "/operational/quotation-order-invoice/purchase/purchase-order/create"
              )
            }
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
              router.push(
                `/operational/quotation-order-invoice/purchase/purchase-order/edit?id=${selectedId}`
              )
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
              router.push(
                `/operational/quotation-order-invoice/purchase/purchase-order/view?id=${selectedId}`
              )
            }
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded"
            style={{ backgroundColor: "#6c757d" }}
            onClick={() => {
              setSelectedId(null);
              setFilters({
                supplierTypeCode: "",
                supplierCodeName: "",
                quotationNumber: "",
                createdDate: "",
                status: "",
              });
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
              <th className="px-3 py-2.5 text-center w-10 font-semibold">#</th>
              <th className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">
                Supplier Type Code
                <span className="ml-1 text-xs opacity-80">⇅</span>
              </th>
              <th className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">
                Supplier Code / Name
                <span className="ml-1 text-xs opacity-80">⇅</span>
              </th>
              <th className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">
                Quotation Number
                <span className="ml-1 text-xs opacity-80">⇅</span>
              </th>
              <th className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">
                Created Date
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
                  value={filters.supplierTypeCode}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      supplierTypeCode: e.target.value,
                    }))
                  }
                />
              </td>
              <td className="px-2 py-1.5">
                <input
                  type="text"
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.supplierCodeName}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      supplierCodeName: e.target.value,
                    }))
                  }
                />
              </td>
              <td className="px-2 py-1.5">
                <input
                  type="text"
                  className="w-full rounded px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                  value={filters.quotationNumber}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      quotationNumber: e.target.value,
                    }))
                  }
                />
              </td>
              <td className="px-2 py-1.5">
                <div className="flex items-center gap-1 bg-white rounded overflow-hidden">
                  <input
                    type="text"
                    placeholder="dd-MMM-yyyy"
                    className="flex-1 px-2 py-1 text-xs text-gray-800 focus:outline-none border-0"
                    value={filters.createdDate}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        createdDate: e.target.value,
                      }))
                    }
                  />
                  <span className="px-1.5 text-gray-500 text-xs">📅</span>
                </div>
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
                  <option value="FINAL-APPROVED">FINAL-APPROVED</option>
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                </select>
              </td>
              <td className="px-2 py-1.5"></td>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-4 text-sm text-gray-500"
                >
                  No records found
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-teal-50 ${selectedId === row.id ? "bg-teal-50" : ""}`}
                  onClick={() =>
                    setSelectedId(selectedId === row.id ? null : row.id)
                  }
                >
                  <td className="px-3 py-2 text-center text-gray-600">
                    {(page - 1) * pageSize + idx + 1}
                  </td>
                  <td className="px-3 py-2">{row.supplierTypeCode}</td>
                  <td className="px-3 py-2">{row.supplierCodeName}</td>
                  <td className="px-3 py-2">{row.quotationNumber}</td>
                  <td className="px-3 py-2">{row.createdDate}</td>
                  <td className="px-3 py-2">{row.status}</td>
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

      {/* Pagination */}
      <div className="flex items-center justify-end mt-2 gap-1.5 text-xs text-gray-500">
        <span className="mr-1">
          ({page} of {totalPages})
        </span>
        <button
          disabled={page === 1}
          onClick={() => setPage(1)}
          className="px-2 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-50"
        >
          ◀◀
        </button>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-2 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-50"
        >
          ◀
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-2 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-50"
        >
          ▶
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(totalPages)}
          className="px-2 py-1 border border-gray-300 rounded bg-white disabled:opacity-40 hover:bg-gray-50"
        >
          ▶▶
        </button>
        <select
          className="border border-gray-300 rounded px-1.5 py-1 focus:outline-none ml-1"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          {[10, 20, 50].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
