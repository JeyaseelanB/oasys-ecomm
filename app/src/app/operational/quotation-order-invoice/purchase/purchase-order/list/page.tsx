"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type POItem = {
  id: number;
  supplierTypeCode: string;
  supplierCodeName: string;
  quotationNumber: string;
  createdDate: string;
  status: string;
};

const MOCK_DATA: POItem[] = [
  { id: 1,  supplierTypeCode: "SOCIETY", supplierCodeName: "SRI MUSHNAM W.C.S.E.1908",                               quotationNumber: "-", createdDate: "11-Sep-2025", status: "SUBMITTED" },
  { id: 2,  supplierTypeCode: "SOCIETY", supplierCodeName: "TVMH 04 VIVEKANANDA COTTON AND SILK HLM WEAVERS SO",      quotationNumber: "-", createdDate: "21-Aug-2025", status: "SUBMITTED" },
  { id: 3,  supplierTypeCode: "SOCIETY", supplierCodeName: "PIDARIYUR ANNA WEAVERS COOP. SOCIETY EH.105",            quotationNumber: "-", createdDate: "21-Aug-2025", status: "SUBMITTED" },
  { id: 4,  supplierTypeCode: "SOCIETY", supplierCodeName: "SALEM SUPER SILK WEAVERS COOP. SOCIETY SA.22",           quotationNumber: "-", createdDate: "21-Aug-2025", status: "SUBMITTED" },
  { id: 5,  supplierTypeCode: "SOCIETY", supplierCodeName: "KH(H)2,THIYAGIKUMARAN HANDLOOM WCS LTD.,",               quotationNumber: "-", createdDate: "18-Aug-2025", status: "SUBMITTED" },
  { id: 6,  supplierTypeCode: "SOCIETY", supplierCodeName: "RADHAPURAM THIRUMURUGAN W.C.S. TRH. 77",                 quotationNumber: "-", createdDate: "25-Jul-2025", status: "SUBMITTED" },
  { id: 7,  supplierTypeCode: "SOCIETY", supplierCodeName: "KANCHEEPURAM MURUGAN SILK WCS. G.1653,",                 quotationNumber: "-", createdDate: "25-Jul-2025", status: "SUBMITTED" },
  { id: 8,  supplierTypeCode: "SOCIETY", supplierCodeName: "NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", quotationNumber: "-", createdDate: "08-Jul-2025", status: "SUBMITTED" },
  { id: 9,  supplierTypeCode: "SOCIETY", supplierCodeName: "T(H) 107, ANDIKKADU SRI AMMAN PL.WC.S. LTD.,",           quotationNumber: "-", createdDate: "19-Jun-2025", status: "SUBMITTED" },
  { id: 10, supplierTypeCode: "SOCIETY", supplierCodeName: "CHENNIMALAI KONGU WEAVERS COOP. SOCIETY EH.113",         quotationNumber: "-", createdDate: "19-Jun-2025", status: "SUBMITTED" },
  { id: 11, supplierTypeCode: "SOCIETY", supplierCodeName: "ARIYALUR DISTRICT WEAVERS COOP. SOCIETY",                quotationNumber: "-", createdDate: "10-Jun-2025", status: "SUBMITTED" },
  { id: 12, supplierTypeCode: "SOCIETY", supplierCodeName: "KOVILPATTI HANDLOOM WEAVERS COOP. SOCIETY",              quotationNumber: "-", createdDate: "05-Jun-2025", status: "APPROVED" },
  { id: 13, supplierTypeCode: "SOCIETY", supplierCodeName: "THANJAVUR SILK WEAVERS COOP. SOCIETY TJ.44",             quotationNumber: "-", createdDate: "02-Jun-2025", status: "SUBMITTED" },
  { id: 14, supplierTypeCode: "SOCIETY", supplierCodeName: "PUDUKKOTTAI COTTON WEAVERS COOP. SOCIETY",               quotationNumber: "-", createdDate: "28-May-2025", status: "APPROVED" },
  { id: 15, supplierTypeCode: "SOCIETY", supplierCodeName: "ERODE HANDLOOM WEAVERS COOP. SOCIETY EH.201",            quotationNumber: "-", createdDate: "20-May-2025", status: "SUBMITTED" },
  { id: 16, supplierTypeCode: "SOCIETY", supplierCodeName: "TIRUPUR COTTON MILLS WEAVERS COOP. SOCIETY",             quotationNumber: "-", createdDate: "15-May-2025", status: "SUBMITTED" },
  { id: 17, supplierTypeCode: "SOCIETY", supplierCodeName: "MADURAI SILK WEAVERS COOP. SOCIETY MS.77",               quotationNumber: "-", createdDate: "12-May-2025", status: "FINAL-APPROVED" },
  { id: 18, supplierTypeCode: "SOCIETY", supplierCodeName: "COIMBATORE HANDLOOM WEAVERS COOP. SOCIETY",              quotationNumber: "-", createdDate: "08-May-2025", status: "SUBMITTED" },
  { id: 19, supplierTypeCode: "SOCIETY", supplierCodeName: "NAMAKKAL WEAVERS COOP. SOCIETY NM.33",                   quotationNumber: "-", createdDate: "02-May-2025", status: "SUBMITTED" },
  { id: 20, supplierTypeCode: "SOCIETY", supplierCodeName: "VILLUPURAM COTTON WEAVERS COOP. SOCIETY",                quotationNumber: "-", createdDate: "28-Apr-2025", status: "SUBMITTED" },
  { id: 21, supplierTypeCode: "SOCIETY", supplierCodeName: "VELLORE SILK WEAVERS COOP. SOCIETY VS.12",               quotationNumber: "-", createdDate: "22-Apr-2025", status: "SUBMITTED" },
  { id: 22, supplierTypeCode: "SOCIETY", supplierCodeName: "TIRUNELVELI HANDLOOM WEAVERS COOP. SOCIETY",             quotationNumber: "-", createdDate: "18-Apr-2025", status: "APPROVED" },
  { id: 23, supplierTypeCode: "SOCIETY", supplierCodeName: "NAGAPATTINAM COTTON WEAVERS COOP. SOCIETY",              quotationNumber: "-", createdDate: "14-Apr-2025", status: "SUBMITTED" },
  { id: 24, supplierTypeCode: "SOCIETY", supplierCodeName: "DHARMAPURI WEAVERS COOP. SOCIETY DH.55",                 quotationNumber: "-", createdDate: "10-Apr-2025", status: "SUBMITTED" },
  { id: 25, supplierTypeCode: "SOCIETY", supplierCodeName: "KRISHNAGIRI SILK WEAVERS COOP. SOCIETY",                 quotationNumber: "-", createdDate: "05-Apr-2025", status: "SUBMITTED" },
  { id: 26, supplierTypeCode: "SOCIETY", supplierCodeName: "CUDDALORE WEAVERS COOP. SOCIETY CU.88",                  quotationNumber: "-", createdDate: "01-Apr-2025", status: "SUBMITTED" },
  { id: 27, supplierTypeCode: "SOCIETY", supplierCodeName: "PERAMBALUR HANDLOOM WEAVERS COOP. SOCIETY",              quotationNumber: "-", createdDate: "28-Mar-2025", status: "FINAL-APPROVED" },
  { id: 28, supplierTypeCode: "SOCIETY", supplierCodeName: "SIVAGANGA COTTON WEAVERS COOP. SOCIETY",                 quotationNumber: "-", createdDate: "24-Mar-2025", status: "SUBMITTED" },
  { id: 29, supplierTypeCode: "SOCIETY", supplierCodeName: "RAMANATHAPURAM WEAVERS COOP. SOCIETY RM.22",             quotationNumber: "-", createdDate: "20-Mar-2025", status: "SUBMITTED" },
  { id: 30, supplierTypeCode: "SOCIETY", supplierCodeName: "THOOTHUKUDI HANDLOOM WEAVERS COOP. SOCIETY",             quotationNumber: "-", createdDate: "16-Mar-2025", status: "SUBMITTED" },
  { id: 31, supplierTypeCode: "SOCIETY", supplierCodeName: "VIRUDHUNAGAR SILK WEAVERS COOP. SOCIETY",                quotationNumber: "-", createdDate: "12-Mar-2025", status: "SUBMITTED" },
  { id: 32, supplierTypeCode: "SOCIETY", supplierCodeName: "DINDIGUL WEAVERS COOP. SOCIETY DD.44",                   quotationNumber: "-", createdDate: "08-Mar-2025", status: "SUBMITTED" },
  { id: 33, supplierTypeCode: "SOCIETY", supplierCodeName: "KARUR COTTON WEAVERS COOP. SOCIETY KR.66",               quotationNumber: "-", createdDate: "04-Mar-2025", status: "APPROVED" },
  { id: 34, supplierTypeCode: "SOCIETY", supplierCodeName: "TIRUCHIRAPPALLI HANDLOOM WEAVERS COOP. SOCIETY",         quotationNumber: "-", createdDate: "28-Feb-2025", status: "SUBMITTED" },
  { id: 35, supplierTypeCode: "SOCIETY", supplierCodeName: "TIRUVANNAMALAI WEAVERS COOP. SOCIETY TV.99",             quotationNumber: "-", createdDate: "24-Feb-2025", status: "SUBMITTED" },
  { id: 36, supplierTypeCode: "SOCIETY", supplierCodeName: "KALLAKURICHI SILK WEAVERS COOP. SOCIETY",                quotationNumber: "-", createdDate: "20-Feb-2025", status: "SUBMITTED" },
  { id: 37, supplierTypeCode: "SOCIETY", supplierCodeName: "RANIPET COTTON WEAVERS COOP. SOCIETY RP.11",             quotationNumber: "-", createdDate: "16-Feb-2025", status: "SUBMITTED" },
  { id: 38, supplierTypeCode: "SOCIETY", supplierCodeName: "TENKASI HANDLOOM WEAVERS COOP. SOCIETY",                 quotationNumber: "-", createdDate: "12-Feb-2025", status: "SUBMITTED" },
  { id: 39, supplierTypeCode: "SOCIETY", supplierCodeName: "CHENGALPATTU WEAVERS COOP. SOCIETY CP.33",               quotationNumber: "-", createdDate: "08-Feb-2025", status: "SUBMITTED" },
  { id: 40, supplierTypeCode: "SOCIETY", supplierCodeName: "KANCHIPURAM SILK WEAVERS COOP. SOCIETY KP.77",           quotationNumber: "-", createdDate: "04-Feb-2025", status: "FINAL-APPROVED" },
  { id: 41, supplierTypeCode: "SOCIETY", supplierCodeName: "MAYILADUTHURAI COTTON WEAVERS COOP. SOCIETY",            quotationNumber: "-", createdDate: "28-Jan-2025", status: "SUBMITTED" },
  { id: 42, supplierTypeCode: "SOCIETY", supplierCodeName: "THENI HANDLOOM WEAVERS COOP. SOCIETY TH.55",             quotationNumber: "-", createdDate: "24-Jan-2025", status: "SUBMITTED" },
  { id: 43, supplierTypeCode: "SOCIETY", supplierCodeName: "ARIYALUR SILK WEAVERS COOP. SOCIETY AR.88",              quotationNumber: "-", createdDate: "20-Jan-2025", status: "SUBMITTED" },
  { id: 44, supplierTypeCode: "SOCIETY", supplierCodeName: "TIRUPPUR HANDLOOM WEAVERS COOP. SOCIETY",                quotationNumber: "-", createdDate: "16-Jan-2025", status: "SUBMITTED" },
  { id: 45, supplierTypeCode: "SOCIETY", supplierCodeName: "NILGIRIS COTTON WEAVERS COOP. SOCIETY NL.22",            quotationNumber: "-", createdDate: "12-Jan-2025", status: "APPROVED" },
  { id: 46, supplierTypeCode: "SOCIETY", supplierCodeName: "OOTY HANDLOOM WEAVERS COOP. SOCIETY OT.44",              quotationNumber: "-", createdDate: "08-Jan-2025", status: "SUBMITTED" },
  { id: 47, supplierTypeCode: "SOCIETY", supplierCodeName: "HOSUR SILK WEAVERS COOP. SOCIETY HS.66",                 quotationNumber: "-", createdDate: "04-Jan-2025", status: "SUBMITTED" },
  { id: 48, supplierTypeCode: "SOCIETY", supplierCodeName: "AMBUR COTTON WEAVERS COOP. SOCIETY AB.11",               quotationNumber: "-", createdDate: "28-Dec-2024", status: "SUBMITTED" },
  { id: 49, supplierTypeCode: "SOCIETY", supplierCodeName: "VANIAMBADI HANDLOOM WEAVERS COOP. SOCIETY",              quotationNumber: "-", createdDate: "24-Dec-2024", status: "SUBMITTED" },
  { id: 50, supplierTypeCode: "SOCIETY", supplierCodeName: "GUDIYATTAM WEAVERS COOP. SOCIETY GD.33",                 quotationNumber: "-", createdDate: "20-Dec-2024", status: "SUBMITTED" },
  { id: 51, supplierTypeCode: "SOCIETY", supplierCodeName: "JOLARPET SILK WEAVERS COOP. SOCIETY JL.55",              quotationNumber: "-", createdDate: "16-Dec-2024", status: "SUBMITTED" },
  { id: 52, supplierTypeCode: "SOCIETY", supplierCodeName: "TIRUPATTUR COTTON WEAVERS COOP. SOCIETY",                quotationNumber: "-", createdDate: "12-Dec-2024", status: "FINAL-APPROVED" },
  { id: 53, supplierTypeCode: "SOCIETY", supplierCodeName: "VANIYAMBADI HANDLOOM WEAVERS COOP. SOCIETY",             quotationNumber: "-", createdDate: "08-Dec-2024", status: "SUBMITTED" },
  { id: 54, supplierTypeCode: "SOCIETY", supplierCodeName: "PENNAGARAM WEAVERS COOP. SOCIETY PG.77",                 quotationNumber: "-", createdDate: "04-Dec-2024", status: "SUBMITTED" },
  { id: 55, supplierTypeCode: "SOCIETY", supplierCodeName: "PALACODE SILK WEAVERS COOP. SOCIETY PL.99",              quotationNumber: "-", createdDate: "28-Nov-2024", status: "SUBMITTED" },
  { id: 56, supplierTypeCode: "SOCIETY", supplierCodeName: "HARUR COTTON WEAVERS COOP. SOCIETY HR.22",               quotationNumber: "-", createdDate: "24-Nov-2024", status: "SUBMITTED" },
  { id: 57, supplierTypeCode: "SOCIETY", supplierCodeName: "PAPIREDDIPATTI HANDLOOM WEAVERS COOP. SOCIETY",          quotationNumber: "-", createdDate: "20-Nov-2024", status: "APPROVED" },
  { id: 58, supplierTypeCode: "SOCIETY", supplierCodeName: "NALLAMPALLI WEAVERS COOP. SOCIETY NP.44",                quotationNumber: "-", createdDate: "16-Nov-2024", status: "SUBMITTED" },
  { id: 59, supplierTypeCode: "SOCIETY", supplierCodeName: "MARANDAHALLI SILK WEAVERS COOP. SOCIETY",                quotationNumber: "-", createdDate: "12-Nov-2024", status: "SUBMITTED" },
  { id: 60, supplierTypeCode: "SOCIETY", supplierCodeName: "BARGUR COTTON WEAVERS COOP. SOCIETY BG.66",              quotationNumber: "-", createdDate: "08-Nov-2024", status: "SUBMITTED" },
  { id: 61, supplierTypeCode: "SOCIETY", supplierCodeName: "ANCHETTY HANDLOOM WEAVERS COOP. SOCIETY AN.88",          quotationNumber: "-", createdDate: "04-Nov-2024", status: "SUBMITTED" },
];

const TEAL = "#2aa781";
const STATUS_COLORS: Record<string, string> = {
  "SUBMITTED":     "#FFA70B",
  "APPROVED":      "#17a2b8",
  "FINAL-APPROVED":"#28a745",
  "REJECTED":      "#dc3545",
};

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

  const filtered = MOCK_DATA.filter(
    (row) =>
      (!filters.supplierTypeCode ||
        row.supplierTypeCode.toLowerCase().includes(filters.supplierTypeCode.toLowerCase())) &&
      (!filters.supplierCodeName ||
        row.supplierCodeName.toLowerCase().includes(filters.supplierCodeName.toLowerCase())) &&
      (!filters.quotationNumber ||
        row.quotationNumber.toLowerCase().includes(filters.quotationNumber.toLowerCase())) &&
      (!filters.createdDate || row.createdDate.includes(filters.createdDate)) &&
      (!filters.status || row.status === filters.status)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleClear = () => {
    setSelectedId(null);
    setFilters({ supplierTypeCode: "", supplierCodeName: "", quotationNumber: "", createdDate: "", status: "" });
    setPage(1);
  };

  const th: React.CSSProperties = {
    padding: "8px 10px", color: "#fff", fontWeight: 600, whiteSpace: "nowrap",
    borderRight: "1px solid rgba(255,255,255,0.2)", fontSize: "12px", textAlign: "center",
  };
  const filterTd: React.CSSProperties = {
    padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)",
  };
  const filterInput: React.CSSProperties = {
    width: "100%", padding: "3px 7px", fontSize: "12px", border: "none",
    borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box",
  };

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li><li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li><li className="hover:text-teal-600 cursor-pointer">Quotation/Order/Invoice</li>
          <li>/</li><li className="hover:text-teal-600 cursor-pointer">Purchase</li>
          <li>/</li><li className="text-gray-700">Purchase Order Item List</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">Purchase Order Item List</h1>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "13px", color: "#374151" }}>
          {filtered.length} - <span style={{ color: TEAL, fontWeight: 500 }}>Purchase Order Item(s)</span>
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {/* Add */}
          <button
            onClick={() => router.push("/operational/quotation-order-invoice/purchase/purchase-order/create")}
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "4px", border: "none", backgroundColor: "#28a745", cursor: "pointer" }}
          >
            <svg style={{ width: "13px", height: "13px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Add
          </button>
          {/* Edit */}
          <button
            disabled={!selectedId}
            onClick={() => selectedId && router.push(`/operational/quotation-order-invoice/purchase/purchase-order/create?id=${selectedId}`)}
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "4px", border: "none", backgroundColor: TEAL, cursor: !selectedId ? "not-allowed" : "pointer", opacity: !selectedId ? 0.65 : 1 }}
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
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "4px", border: "none", backgroundColor: "#5bc0de", cursor: !selectedId ? "not-allowed" : "pointer", opacity: !selectedId ? 0.65 : 1 }}
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
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "4px", border: "none", backgroundColor: "#6c757d", cursor: "pointer" }}
          >
            <svg style={{ width: "13px", height: "13px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div style={{ background: "#fff", borderRadius: "4px", border: "1px solid #dee2e6", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ backgroundColor: TEAL }}>
                <th style={{ ...th, width: "42px" }}>#</th>
                <th style={th}>Supplier Type Code ⇅</th>
                <th style={{ ...th, textAlign: "left" }}>Supplier Code / Name ⇅</th>
                <th style={th}>Quotation Number ⇅</th>
                <th style={th}>Created Date ⇅</th>
                <th style={th}>Status ⇅</th>
                <th style={{ ...th, width: "64px", borderRight: "none" }}>Select</th>
              </tr>
              <tr style={{ backgroundColor: TEAL, borderBottom: "3px solid #dee2e6" }}>
                <td style={filterTd} />
                <td style={filterTd}>
                  <input value={filters.supplierTypeCode} onChange={e => setFilters(f => ({ ...f, supplierTypeCode: e.target.value }))} style={filterInput} />
                </td>
                <td style={filterTd}>
                  <input value={filters.supplierCodeName} onChange={e => setFilters(f => ({ ...f, supplierCodeName: e.target.value }))} style={filterInput} />
                </td>
                <td style={filterTd}>
                  <input value={filters.quotationNumber} onChange={e => setFilters(f => ({ ...f, quotationNumber: e.target.value }))} style={filterInput} />
                </td>
                <td style={filterTd}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input value={filters.createdDate} onChange={e => setFilters(f => ({ ...f, createdDate: e.target.value }))} placeholder="dd-MMM-yyyy" style={{ ...filterInput, borderRadius: "2px 0 0 2px", flex: 1, minWidth: 0 }} />
                    <button style={{ flexShrink: 0, width: "26px", height: "26px", backgroundColor: TEAL, border: "1px solid rgba(255,255,255,0.5)", borderRadius: "0 2px 2px 0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
                      <svg style={{ width: "12px", height: "12px", stroke: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td style={filterTd}>
                  <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} style={filterInput}>
                    <option value="">Select</option>
                    <option>SUBMITTED</option>
                    <option>APPROVED</option>
                    <option>FINAL-APPROVED</option>
                    <option>REJECTED</option>
                  </select>
                </td>
                <td style={{ ...filterTd, borderRight: "none" }} />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: "14px 12px", fontSize: "13px", color: "#6b7280" }}>No records found.</td></tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSel = selectedId === row.id;
                  return (
                    <tr key={row.id} style={{ backgroundColor: isSel ? "#f0fdfa" : "#fff", cursor: "pointer", borderBottom: "1px solid #e5e7eb" }} onClick={() => setSelectedId(isSel ? null : row.id)}>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: TEAL, fontWeight: 500, borderRight: "1px solid #e5e7eb" }}>
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: "#374151", borderRight: "1px solid #e5e7eb" }}>{row.supplierTypeCode}</td>
                      <td style={{ padding: "8px 10px", color: TEAL, borderRight: "1px solid #e5e7eb" }}>{row.supplierCodeName}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: "#374151", borderRight: "1px solid #e5e7eb" }}>{row.quotationNumber}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: "#374151", whiteSpace: "nowrap", borderRight: "1px solid #e5e7eb" }}>{row.createdDate}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center", borderRight: "1px solid #e5e7eb" }}>
                        <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "3px", fontSize: "11px", fontWeight: 700, color: "#fff", backgroundColor: STATUS_COLORS[row.status] ?? "#6c757d" }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center" }} onClick={e => e.stopPropagation()}>
                        <input type="radio" name="po-select" checked={isSel} onChange={() => setSelectedId(row.id)} style={{ cursor: "pointer", accentColor: TEAL, width: "14px", height: "14px" }} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "7px 12px", borderTop: "1px solid #e5e7eb", gap: "4px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280", marginRight: "6px" }}>({page} of {totalPages})</span>
          <button disabled={page === 1} onClick={() => setPage(1)} style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: "pointer", opacity: page === 1 ? 0.4 : 1, padding: 0 }}>|◀</button>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: "pointer", opacity: page === 1 ? 0.4 : 1, padding: 0 }}>◀</button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} style={{ width: "24px", height: "24px", borderRadius: "3px", background: p === page ? TEAL : "#fff", color: p === page ? "#fff" : "#374151", fontSize: "12px", fontWeight: p === page ? 700 : 400, border: p === page ? "none" : "1px solid #dee2e6", cursor: "pointer" }}>{p}</button>
          ))}
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: "pointer", opacity: page >= totalPages ? 0.4 : 1, padding: 0 }}>▶</button>
          <button disabled={page >= totalPages} onClick={() => setPage(totalPages)} style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "11px", cursor: "pointer", opacity: page >= totalPages ? 0.4 : 1, padding: 0 }}>▶|</button>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} style={{ border: "1px solid #dee2e6", borderRadius: "3px", padding: "3px 6px", fontSize: "12px", color: "#374151", marginLeft: "4px", outline: "none", cursor: "pointer" }}>
            {[10, 25, 50].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
