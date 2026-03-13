"use client";

import { useState } from "react";
import Link from "next/link";

type BillItem = {
  id: number;
  invoiceNumber: string;
  supplierCodeName: string;
  amount: string;
  createdDate: string;
  status: string;
};

const MOCK_DATA: BillItem[] = [
  { id: 1,  invoiceNumber: "PIMAR2024-2023240283",         supplierCodeName: "BANY001 / BANYAN INFORMATICS",                    amount: "5200.00",  createdDate: "08-Mar-2024", status: "SUBMITTED" },
  { id: 2,  invoiceNumber: "PIMAR2024-GV/23-24/113",       supplierCodeName: "GVENTER / GV ENTERPRISES",                        amount: "1300.00",  createdDate: "05-Mar-2024", status: "SUBMITTED" },
  { id: 3,  invoiceNumber: "PIMAR2024-146/2023-2024",      supplierCodeName: "VSOLU001 / V-SOLUTIONS",                          amount: "2360.00",  createdDate: "05-Mar-2024", status: "SUBMITTED" },
  { id: 4,  invoiceNumber: "PIMAR2024-TN-B1-116347197",    supplierCodeName: "ACTFIBERNET / ACT FIBERNET",                      amount: "1858.50",  createdDate: "05-Mar-2024", status: "SUBMITTED" },
  { id: 5,  invoiceNumber: "PIFEB2024-143/2023-2024",      supplierCodeName: "VSOLU001 / V-SOLUTIONS",                          amount: "3672.00",  createdDate: "27-Feb-2024", status: "SUBMITTED" },
  { id: 6,  invoiceNumber: "PIFEB2024-TIPL-23-24-00055",   supplierCodeName: "TATHAGATA / TATHAGATA INFOTECH PRIVATE LIMITED",  amount: "1533.00",  createdDate: "19-Feb-2024", status: "SUBMITTED" },
  { id: 7,  invoiceNumber: "PIFEB2024-1-5229768664589",    supplierCodeName: "AIRTEL / AIRTEL",                                 amount: "410.08",   createdDate: "15-Feb-2024", status: "SUBMITTED" },
  { id: 8,  invoiceNumber: "PIFEB2024-139/2023-2024",      supplierCodeName: "VSOLU001 / V-SOLUTIONS",                          amount: "660.00",   createdDate: "09-Feb-2024", status: "SUBMITTED" },
  { id: 9,  invoiceNumber: "PIFEB2024-511/SR/2023-2024",   supplierCodeName: "VSOLU001 / V-SOLUTIONS",                          amount: "10411.00", createdDate: "08-Feb-2024", status: "SUBMITTED" },
  { id: 10, invoiceNumber: "PIFEB2024-BM2433I010761545",   supplierCodeName: "AIRTEL / AIRTEL",                                 amount: "410.08",   createdDate: "07-Feb-2024", status: "SUBMITTED" },
  { id: 11, invoiceNumber: "PIJAN2024-201/2023-2024",      supplierCodeName: "VSOLU001 / V-SOLUTIONS",                          amount: "2360.00",  createdDate: "28-Jan-2024", status: "SUBMITTED" },
  { id: 12, invoiceNumber: "PIJAN2024-TN-B1-115890123",    supplierCodeName: "ACTFIBERNET / ACT FIBERNET",                      amount: "1858.50",  createdDate: "25-Jan-2024", status: "SUBMITTED" },
  { id: 13, invoiceNumber: "PIJAN2024-1-5229668123456",    supplierCodeName: "AIRTEL / AIRTEL",                                 amount: "410.08",   createdDate: "22-Jan-2024", status: "APPROVED" },
  { id: 14, invoiceNumber: "PIJAN2024-TIPL-23-24-00048",   supplierCodeName: "TATHAGATA / TATHAGATA INFOTECH PRIVATE LIMITED",  amount: "1533.00",  createdDate: "18-Jan-2024", status: "SUBMITTED" },
  { id: 15, invoiceNumber: "PIJAN2024-GV/23-24/098",       supplierCodeName: "GVENTER / GV ENTERPRISES",                        amount: "1800.00",  createdDate: "15-Jan-2024", status: "SUBMITTED" },
  { id: 16, invoiceNumber: "PIDEC2023-188/2023-2024",      supplierCodeName: "VSOLU001 / V-SOLUTIONS",                          amount: "3120.00",  createdDate: "29-Dec-2023", status: "SUBMITTED" },
  { id: 17, invoiceNumber: "PIDEC2023-BM2400I009876543",   supplierCodeName: "AIRTEL / AIRTEL",                                 amount: "410.08",   createdDate: "22-Dec-2023", status: "FINAL-APPROVED" },
  { id: 18, invoiceNumber: "PIDEC2023-TN-B1-115001234",    supplierCodeName: "ACTFIBERNET / ACT FIBERNET",                      amount: "1858.50",  createdDate: "18-Dec-2023", status: "SUBMITTED" },
  { id: 19, invoiceNumber: "PIDEC2023-TIPL-23-24-00039",   supplierCodeName: "TATHAGATA / TATHAGATA INFOTECH PRIVATE LIMITED",  amount: "2100.00",  createdDate: "12-Dec-2023", status: "SUBMITTED" },
  { id: 20, invoiceNumber: "PIDEC2023-GV/23-24/082",       supplierCodeName: "GVENTER / GV ENTERPRISES",                        amount: "950.00",   createdDate: "08-Dec-2023", status: "SUBMITTED" },
  { id: 21, invoiceNumber: "PINOV2023-167/2023-2024",      supplierCodeName: "VSOLU001 / V-SOLUTIONS",                          amount: "2360.00",  createdDate: "28-Nov-2023", status: "SUBMITTED" },
  { id: 22, invoiceNumber: "PINOV2023-1-5228901234567",    supplierCodeName: "AIRTEL / AIRTEL",                                 amount: "410.08",   createdDate: "21-Nov-2023", status: "APPROVED" },
  { id: 23, invoiceNumber: "PINOV2023-TN-B1-114200567",    supplierCodeName: "ACTFIBERNET / ACT FIBERNET",                      amount: "1858.50",  createdDate: "15-Nov-2023", status: "SUBMITTED" },
  { id: 24, invoiceNumber: "PINOV2023-TIPL-23-24-00031",   supplierCodeName: "TATHAGATA / TATHAGATA INFOTECH PRIVATE LIMITED",  amount: "1533.00",  createdDate: "10-Nov-2023", status: "SUBMITTED" },
  { id: 25, invoiceNumber: "PINOV2023-GV/23-24/071",       supplierCodeName: "GVENTER / GV ENTERPRISES",                        amount: "1450.00",  createdDate: "05-Nov-2023", status: "SUBMITTED" },
  { id: 26, invoiceNumber: "PIOCT2023-152/2023-2024",      supplierCodeName: "VSOLU001 / V-SOLUTIONS",                          amount: "4080.00",  createdDate: "27-Oct-2023", status: "SUBMITTED" },
  { id: 27, invoiceNumber: "PIOCT2023-BM2300I008765432",   supplierCodeName: "AIRTEL / AIRTEL",                                 amount: "410.08",   createdDate: "20-Oct-2023", status: "FINAL-APPROVED" },
  { id: 28, invoiceNumber: "PIOCT2023-TN-B1-113500890",    supplierCodeName: "ACTFIBERNET / ACT FIBERNET",                      amount: "1858.50",  createdDate: "14-Oct-2023", status: "SUBMITTED" },
  { id: 29, invoiceNumber: "PIOCT2023-TIPL-23-24-00022",   supplierCodeName: "TATHAGATA / TATHAGATA INFOTECH PRIVATE LIMITED",  amount: "1250.00",  createdDate: "08-Oct-2023", status: "SUBMITTED" },
  { id: 30, invoiceNumber: "PIOCT2023-GV/23-24/059",       supplierCodeName: "GVENTER / GV ENTERPRISES",                        amount: "760.00",   createdDate: "02-Oct-2023", status: "SUBMITTED" },
];

const TEAL = "#2aa781";
const STATUS_COLORS: Record<string, string> = {
  "SUBMITTED":      "#FFA70B",
  "APPROVED":       "#17a2b8",
  "FINAL-APPROVED": "#28a745",
  "REJECTED":       "#dc3545",
};

export default function BillListPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    invoiceNumber: "",
    supplierCodeName: "",
    amount: "",
    createdDate: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = MOCK_DATA.filter(
    (row) =>
      (!filters.invoiceNumber ||
        row.invoiceNumber.toLowerCase().includes(filters.invoiceNumber.toLowerCase())) &&
      (!filters.supplierCodeName ||
        row.supplierCodeName.toLowerCase().includes(filters.supplierCodeName.toLowerCase())) &&
      (!filters.amount || row.amount.includes(filters.amount)) &&
      (!filters.createdDate || row.createdDate.includes(filters.createdDate)) &&
      (!filters.status || row.status === filters.status)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleClear = () => {
    setSelectedId(null);
    setFilters({ invoiceNumber: "", supplierCodeName: "", amount: "", createdDate: "", status: "" });
    setPage(1);
  };

  const filterInput: React.CSSProperties = {
    width: "100%", padding: "3px 7px", fontSize: "12px", border: "none",
    borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff",
    boxSizing: "border-box",
  };
  const th: React.CSSProperties = {
    padding: "8px 12px", color: "#fff", fontWeight: 600, whiteSpace: "nowrap",
    borderRight: "1px solid rgba(255,255,255,0.2)", fontSize: "12px",
  };

  /* visible page buttons: show up to 10 around current page */
  const visiblePages = (() => {
    const total = totalPages;
    const max = 10;
    let start = Math.max(1, page - Math.floor(max / 2));
    let end = start + max - 1;
    if (end > total) { end = total; start = Math.max(1, end - max + 1); }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  })();

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li><li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li><li className="hover:text-teal-600 cursor-pointer">Quotation/Order/Invoice</li>
          <li>/</li><li className="hover:text-teal-600 cursor-pointer">Purchase</li>
          <li>/</li><li className="text-gray-700">list Bill List</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">Bill List</h1>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "13px", color: "#374151" }}>
          {filtered.length} - <span style={{ color: TEAL, fontWeight: 500 }}>Bill(s)</span>
        </span>
        <button
          onClick={handleClear}
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            padding: "5px 14px", fontSize: "12px", fontWeight: 600,
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

      {/* Table Card */}
      <div style={{ background: "#fff", borderRadius: "4px", border: "1px solid #dee2e6", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              {/* Header row */}
              <tr style={{ backgroundColor: TEAL }}>
                <th style={{ ...th, width: "42px", textAlign: "center" }}>#</th>
                <th style={th}>Invoice Number ⇅</th>
                <th style={th}>Supplier Code / Name ⇅</th>
                <th style={{ ...th, textAlign: "right" }}>Amount (₹) ⇅</th>
                <th style={{ ...th, textAlign: "center" }}>Created Date ⇅</th>
                <th style={{ ...th, textAlign: "center" }}>Status ⇅</th>
                <th style={{ ...th, textAlign: "center", width: "64px", borderRight: "none" }}>Select</th>
              </tr>

              {/* Filter row */}
              <tr style={{ backgroundColor: TEAL, borderBottom: "3px solid #dee2e6" }}>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }} />
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input
                    value={filters.invoiceNumber}
                    onChange={e => { setFilters(f => ({ ...f, invoiceNumber: e.target.value })); setPage(1); }}
                    style={filterInput}
                  />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input
                    value={filters.supplierCodeName}
                    onChange={e => { setFilters(f => ({ ...f, supplierCodeName: e.target.value })); setPage(1); }}
                    style={filterInput}
                  />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input
                    value={filters.amount}
                    onChange={e => { setFilters(f => ({ ...f, amount: e.target.value })); setPage(1); }}
                    style={filterInput}
                  />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      value={filters.createdDate}
                      onChange={e => { setFilters(f => ({ ...f, createdDate: e.target.value })); setPage(1); }}
                      placeholder="dd-MMM-yyyy"
                      style={{ ...filterInput, borderRadius: "2px 0 0 2px", flex: 1, minWidth: 0 }}
                    />
                    <button style={{ flexShrink: 0, width: "26px", height: "26px", backgroundColor: TEAL, border: "1px solid rgba(255,255,255,0.5)", borderRadius: "0 2px 2px 0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
                      <svg style={{ width: "12px", height: "12px", stroke: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <select
                    value={filters.status}
                    onChange={e => { setFilters(f => ({ ...f, status: e.target.value })); setPage(1); }}
                    style={filterInput}
                  >
                    <option value="">Select</option>
                    <option>SUBMITTED</option>
                    <option>APPROVED</option>
                    <option>FINAL-APPROVED</option>
                    <option>REJECTED</option>
                  </select>
                </td>
                <td style={{ padding: "4px 6px" }} />
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "14px 12px", fontSize: "13px", color: "#6b7280" }}>
                    No records found.
                  </td>
                </tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSel = selectedId === row.id;
                  return (
                    <tr
                      key={row.id}
                      style={{
                        backgroundColor: isSel ? TEAL : "#fff",
                        cursor: "pointer",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                      onClick={() => setSelectedId(isSel ? null : row.id)}
                    >
                      {/* # */}
                      <td style={{ padding: "8px 12px", textAlign: "center", color: isSel ? "#fff" : TEAL, fontWeight: 500, borderRight: "1px solid #e5e7eb" }}>
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      {/* Invoice Number */}
                      <td style={{ padding: "8px 12px", color: isSel ? "#fff" : TEAL, borderRight: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>
                        {row.invoiceNumber}
                      </td>
                      {/* Supplier Code / Name */}
                      <td style={{ padding: "8px 12px", color: isSel ? "#e0f7f2" : "#374151", borderRight: "1px solid #e5e7eb" }}>
                        {row.supplierCodeName}
                      </td>
                      {/* Amount */}
                      <td style={{ padding: "8px 12px", textAlign: "right", color: isSel ? "#fff" : "#374151", borderRight: "1px solid #e5e7eb" }}>
                        {row.amount}
                      </td>
                      {/* Created Date */}
                      <td style={{ padding: "8px 12px", textAlign: "center", color: isSel ? "#fff" : "#374151", whiteSpace: "nowrap", borderRight: "1px solid #e5e7eb" }}>
                        {row.createdDate}
                      </td>
                      {/* Status */}
                      <td style={{ padding: "8px 12px", textAlign: "center", borderRight: "1px solid #e5e7eb" }}>
                        <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: "3px", fontSize: "11px", fontWeight: 700, color: "#fff", backgroundColor: STATUS_COLORS[row.status] ?? "#6c757d" }}>
                          {row.status}
                        </span>
                      </td>
                      {/* Select */}
                      <td style={{ padding: "8px 12px", textAlign: "center" }} onClick={e => e.stopPropagation()}>
                        <input
                          type="radio"
                          name="bill-select"
                          checked={isSel}
                          onChange={() => setSelectedId(row.id)}
                          style={{ cursor: "pointer", accentColor: TEAL, width: "14px", height: "14px" }}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "7px 12px", borderTop: "1px solid #e5e7eb", gap: "3px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280", marginRight: "6px" }}>({page} of {totalPages})</span>

          {/* First */}
          <button
            disabled={page === 1}
            onClick={() => setPage(1)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: page === 1 ? "default" : "pointer", opacity: page === 1 ? 0.4 : 1, padding: 0 }}
          >|◀</button>

          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: page === 1 ? "default" : "pointer", opacity: page === 1 ? 0.4 : 1, padding: 0 }}
          >◀</button>

          {/* Page numbers */}
          {visiblePages.map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{ width: "24px", height: "24px", borderRadius: "3px", background: p === page ? TEAL : "#fff", color: p === page ? "#fff" : "#374151", fontSize: "12px", fontWeight: p === page ? 700 : 400, border: p === page ? "none" : "1px solid #dee2e6", cursor: "pointer", padding: 0 }}
            >{p}</button>
          ))}

          {/* Next */}
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => p + 1)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: page >= totalPages ? "default" : "pointer", opacity: page >= totalPages ? 0.4 : 1, padding: 0 }}
          >▶</button>

          {/* Last */}
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(totalPages)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: page >= totalPages ? "default" : "pointer", opacity: page >= totalPages ? 0.4 : 1, padding: 0 }}
          >▶|</button>

          {/* Page size */}
          <select
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            style={{ border: "1px solid #dee2e6", borderRadius: "3px", padding: "3px 6px", fontSize: "12px", color: "#374151", marginLeft: "4px", outline: "none", cursor: "pointer" }}
          >
            {[10, 25, 50].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
