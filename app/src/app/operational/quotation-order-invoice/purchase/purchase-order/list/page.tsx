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
const TEAL = "#2aa781";

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

  const filtered = SAMPLE_DATA.filter((row) =>
    (!filters.supplierTypeCode || row.supplierTypeCode.toLowerCase().includes(filters.supplierTypeCode.toLowerCase())) &&
    (!filters.supplierCodeName || row.supplierCodeName.toLowerCase().includes(filters.supplierCodeName.toLowerCase())) &&
    (!filters.quotationNumber || row.quotationNumber.toLowerCase().includes(filters.quotationNumber.toLowerCase())) &&
    (!filters.createdDate || row.createdDate.includes(filters.createdDate)) &&
    (!filters.status || row.status === filters.status)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleClear = () => {
    setSelectedId(null);
    setFilters({ supplierTypeCode: "", supplierCodeName: "", quotationNumber: "", createdDate: "", status: "" });
  };

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Quotation/Order/Invoice</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Purchase</li>
          <li>/</li>
          <li className="text-gray-700">Purchase Order Item List</li>
        </ol>
      </nav>

      {/* Title */}
      <h1 className="text-base font-semibold text-gray-800 mb-3">Purchase Order Item List</h1>

      {/* Toolbar — outside card */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "13px", color: "#374151" }}>
          {filtered.length} - <span style={{ color: TEAL, fontWeight: 500 }}>Purchase Order Item(s)</span>
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {/* Add */}
          <button
            disabled={selectedId !== null}
            onClick={() => router.push("/operational/quotation-order-invoice/purchase/purchase-order/create")}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 12px", fontSize: "12px", fontWeight: 600,
              color: "#fff", borderRadius: "4px", border: "none",
              backgroundColor: selectedId !== null ? "#8fce9f" : "#28a745",
              cursor: selectedId !== null ? "not-allowed" : "pointer",
              opacity: selectedId !== null ? 0.75 : 1,
            }}
          >
            <svg style={{ width: "13px", height: "13px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Add
          </button>

          {/* Edit */}
          <button
            disabled={!selectedId}
            onClick={() => selectedId && router.push(`/operational/quotation-order-invoice/purchase/purchase-order/edit?id=${selectedId}`)}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 12px", fontSize: "12px", fontWeight: 600,
              color: "#fff", borderRadius: "4px", border: "none",
              backgroundColor: TEAL,
              cursor: !selectedId ? "not-allowed" : "pointer",
              opacity: !selectedId ? 0.65 : 1,
            }}
          >
            <svg style={{ width: "13px", height: "13px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>

          {/* View */}
          <button
            disabled={!selectedId}
            onClick={() => selectedId && router.push(`/operational/quotation-order-invoice/purchase/purchase-order/view?id=${selectedId}`)}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 12px", fontSize: "12px", fontWeight: 600,
              color: "#fff", borderRadius: "4px", border: "none",
              backgroundColor: "#5bc0de",
              cursor: !selectedId ? "not-allowed" : "pointer",
              opacity: !selectedId ? 0.65 : 1,
            }}
          >
            <svg style={{ width: "13px", height: "13px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>

          {/* Clear */}
          <button
            onClick={handleClear}
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 12px", fontSize: "12px", fontWeight: 600,
              color: "#fff", borderRadius: "4px", border: "none",
              backgroundColor: "#6c757d", cursor: "pointer",
            }}
          >
            <svg style={{ width: "13px", height: "13px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        </div>
      </div>

      {/* Card: table + pagination inside */}
      <div style={{ background: "#fff", borderRadius: "4px", border: "1px solid #dee2e6", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              {/* Header row */}
              <tr style={{ backgroundColor: TEAL }}>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", width: "42px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>#</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Supplier Type Code &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Supplier Code / Name &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Quotation Number &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Created Date &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Status &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", width: "64px" }}>Select</th>
              </tr>

              {/* Filter row */}
              <tr style={{ backgroundColor: TEAL, borderBottom: "3px solid #dee2e6" }}>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}></td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.supplierTypeCode} onChange={e => setFilters(f => ({ ...f, supplierTypeCode: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.supplierCodeName} onChange={e => setFilters(f => ({ ...f, supplierCodeName: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.quotationNumber} onChange={e => setFilters(f => ({ ...f, quotationNumber: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                    <input value={filters.createdDate} onChange={e => setFilters(f => ({ ...f, createdDate: e.target.value }))}
                      placeholder="dd-MMM-yyyy"
                      style={{ flex: 1, minWidth: 0, padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px 0 0 2px", outline: "none", color: "#333", backgroundColor: "#fff" }} />
                    <button style={{ flexShrink: 0, width: "26px", height: "26px", backgroundColor: TEAL, border: "1px solid rgba(255,255,255,0.5)", borderRadius: "0 2px 2px 0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
                      <svg style={{ width: "12px", height: "12px", stroke: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                    style={{ width: "100%", padding: "3px 6px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }}>
                    <option value="">Select</option>
                    <option value="FINAL-APPROVED">FINAL-APPROVED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                  </select>
                </td>
                <td style={{ padding: "4px 6px" }}></td>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "14px 12px", fontSize: "13px", color: "#6b7280" }}>
                    No records found
                  </td>
                </tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSel = selectedId === row.id;
                  return (
                    <tr key={row.id}
                      style={{ backgroundColor: isSel ? "#f0fdfa" : "#fff", cursor: "pointer", borderBottom: "1px solid #e5e7eb" }}
                      onClick={() => setSelectedId(isSel ? null : row.id)}>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: TEAL, fontWeight: 500, borderRight: "1px solid #e5e7eb" }}>
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td style={{ padding: "8px 10px", color: "#374151", borderRight: "1px solid #e5e7eb" }}>{row.supplierTypeCode}</td>
                      <td style={{ padding: "8px 10px", color: TEAL, borderRight: "1px solid #e5e7eb" }}>{row.supplierCodeName}</td>
                      <td style={{ padding: "8px 10px", color: "#374151", borderRight: "1px solid #e5e7eb" }}>{row.quotationNumber}</td>
                      <td style={{ padding: "8px 10px", color: "#374151", textAlign: "center", borderRight: "1px solid #e5e7eb" }}>{row.createdDate}</td>
                      <td style={{ padding: "8px 10px", color: "#374151", borderRight: "1px solid #e5e7eb" }}>{row.status}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center" }} onClick={e => e.stopPropagation()}>
                        <input type="radio" name="po-select" checked={isSel} onChange={() => setSelectedId(row.id)}
                          style={{ cursor: "pointer", accentColor: TEAL, width: "14px", height: "14px" }} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination — inside card */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "7px 12px", borderTop: "1px solid #e5e7eb", gap: "4px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280", marginRight: "6px" }}>({page} of {totalPages})</span>
          <button disabled={page === 1} onClick={() => setPage(1)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: "pointer", opacity: page === 1 ? 0.4 : 1, padding: 0 }}>◀|</button>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: "pointer", opacity: page === 1 ? 0.4 : 1, padding: 0 }}>◀</button>
          <button style={{ width: "24px", height: "24px", borderRadius: "3px", background: TEAL, color: "#fff", fontSize: "12px", fontWeight: 700, border: "none", cursor: "pointer" }}>{page}</button>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: "pointer", opacity: page >= totalPages ? 0.4 : 1, padding: 0 }}>▶</button>
          <button disabled={page >= totalPages} onClick={() => setPage(totalPages)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: "pointer", opacity: page >= totalPages ? 0.4 : 1, padding: 0 }}>|▶</button>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            style={{ border: "1px solid #dee2e6", borderRadius: "3px", padding: "3px 6px", fontSize: "12px", color: "#374151", marginLeft: "4px", outline: "none", cursor: "pointer" }}>
            {[10, 25, 50].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
