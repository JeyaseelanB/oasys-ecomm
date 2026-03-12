"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type RateConfig = {
  id: number;
  categoryCodeName: string;
  groupCodeName: string;
  productCodeName: string;
  unitRate: number;
  eCommerceRate: number;
  status: "ACTIVE" | "INACTIVE";
};

const SAMPLE_DATA: RateConfig[] = [
  { id: 1, categoryCodeName: "AJ / Half Fine Silk", groupCodeName: "31 / HALF FINE SILK ITEMS", productCodeName: "SSL9 / SALEM AJ SILK SAREE 9 YARDS", unitRate: 11310.00, eCommerceRate: 12326.00, status: "ACTIVE" },
  { id: 2, categoryCodeName: "AJ / Half Fine Silk", groupCodeName: "31 / HALF FINE SILK ITEMS", productCodeName: "SSL9 / SALEM AJ SILK SAREE 9 YARDS", unitRate: 10960.00, eCommerceRate: 11961.00, status: "ACTIVE" },
  { id: 3, categoryCodeName: "AJ / Half Fine Silk", groupCodeName: "31 / HALF FINE SILK ITEMS", productCodeName: "SSL9 / SALEM AJ SILK SAREE 9 YARDS", unitRate: 10660.00, eCommerceRate: 11648.00, status: "ACTIVE" },
  { id: 4, categoryCodeName: "AJ / Half Fine Silk", groupCodeName: "31 / HALF FINE SILK ITEMS", productCodeName: "SSL9 / SALEM AJ SILK SAREE 9 YARDS", unitRate: 9090.00, eCommerceRate: 10012.00, status: "ACTIVE" },
  { id: 5, categoryCodeName: "AJ / Half Fine Silk", groupCodeName: "31 / HALF FINE SILK ITEMS", productCodeName: "SALB / ARNI SILK HALF FINE ZARI SAREE WITH BLOUSE", unitRate: 10510.00, eCommerceRate: 11492.00, status: "ACTIVE" },
  { id: 6, categoryCodeName: "AJ / Half Fine Silk", groupCodeName: "31 / HALF FINE SILK ITEMS", productCodeName: "SALB / ARNI SILK HALF FINE ZARI SAREE WITH BLOUSE", unitRate: 10210.00, eCommerceRate: 11179.00, status: "ACTIVE" },
  { id: 7, categoryCodeName: "A / Pure Silk Variety", groupCodeName: "130 / PURE SILK", productCodeName: "SABTA / Arni Silk Saree with Thread Work", unitRate: 12710.00, eCommerceRate: 13785.00, status: "ACTIVE" },
  { id: 8, categoryCodeName: "A / Pure Silk Variety", groupCodeName: "130 / PURE SILK", productCodeName: "SABTA / Arni Silk Saree with Thread Work", unitRate: 12160.00, eCommerceRate: 13212.00, status: "ACTIVE" },
  { id: 9, categoryCodeName: "A / Pure Silk Variety", groupCodeName: "130 / PURE SILK", productCodeName: "SABTA / Arni Silk Saree with Thread Work", unitRate: 8030.00, eCommerceRate: 8907.00, status: "ACTIVE" },
  { id: 10, categoryCodeName: "A / Pure Silk Variety", groupCodeName: "130 / PURE SILK", productCodeName: "SABTA / Arni Silk Saree with Thread Work", unitRate: 7930.00, eCommerceRate: 8803.00, status: "ACTIVE" },
];

const TEAL = "#26A69A";

export default function ECommerceRateConfigListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    productCodeName: "",
    unitRate: "",
    eCommerceRate: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = SAMPLE_DATA.filter((r) =>
    (!filters.productCodeName || r.productCodeName.toLowerCase().includes(filters.productCodeName.toLowerCase())) &&
    (!filters.unitRate || r.unitRate.toString().includes(filters.unitRate)) &&
    (!filters.eCommerceRate || r.eCommerceRate.toString().includes(filters.eCommerceRate)) &&
    (!filters.status || r.status === filters.status)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleClear = () => {
    setSelectedId(null);
    setFilters({ productCodeName: "", unitRate: "", eCommerceRate: "", status: "" });
    setPage(1);
  };

  const visiblePages = (() => {
    const total = Math.min(10, totalPages);
    const start = Math.max(1, Math.min(page - 4, totalPages - total + 1));
    return Array.from({ length: total }, (_, i) => start + i);
  })();

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">E-Commerce</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Admin</li>
          <li>/</li>
          <li className="text-gray-700">E-Commerce Rate Configuration List</li>
        </ol>
      </nav>

      {/* Title */}
      <h1 className="text-base font-semibold text-gray-800 mb-3">E-Commerce Rate Configuration List</h1>

      {/* Toolbar — outside card */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "13px", color: "#374151" }}>
          {filtered.length} - <span style={{ color: TEAL, fontWeight: 500 }}>Ecommerce Rate Configuration(s)</span>
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {/* Add */}
          <button
            disabled={selectedId !== null}
            onClick={() => router.push("/ecommerce/admin/ecommerce-rate-configuration/create")}
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
            onClick={() => selectedId && router.push(`/ecommerce/admin/ecommerce-rate-configuration/edit?id=${selectedId}`)}
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
            onClick={() => selectedId && router.push(`/ecommerce/admin/ecommerce-rate-configuration/view?id=${selectedId}`)}
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

      {/* Card: table + pagination */}
      <div style={{ background: "#fff", borderRadius: "4px", border: "1px solid #dee2e6", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ backgroundColor: TEAL }}>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", width: "42px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>#</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Category Code / Name</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Group Code / Name</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  Product Code / Name &nbsp;
                  <span style={{ opacity: 0.8 }}>⇅</span>
                </th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  Unit Rate &nbsp;<span style={{ opacity: 0.8 }}>⇅</span>
                </th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  E-Commerce Rate &nbsp;<span style={{ opacity: 0.8 }}>⇅</span>
                </th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Status</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", width: "60px" }}>Select</th>
              </tr>

              {/* Filter row */}
              <tr style={{ backgroundColor: TEAL, borderBottom: "3px solid #dee2e6" }}>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}></td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}></td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}></td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.productCodeName} onChange={e => setFilters(f => ({ ...f, productCodeName: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.unitRate} onChange={e => setFilters(f => ({ ...f, unitRate: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.eCommerceRate} onChange={e => setFilters(f => ({ ...f, eCommerceRate: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }}>
                    <option value="">Select</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </td>
                <td style={{ padding: "4px 6px" }}></td>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "14px 12px", fontSize: "13px", color: "#6b7280" }}>No records found</td>
                </tr>
              ) : (
                paginated.map((row, idx) => {
                  const isSel = selectedId === row.id;
                  return (
                    <tr key={row.id}
                      style={{ backgroundColor: isSel ? "#f0fdfa" : "#fff", cursor: "pointer", borderBottom: "1px solid #e5e7eb" }}
                      onClick={() => setSelectedId(isSel ? null : row.id)}>
                      <td style={{ padding: "8px 10px", textAlign: "center", color: "#6b7280", fontWeight: 500, borderRight: "1px solid #e5e7eb" }}>
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", borderRight: "1px solid #e5e7eb" }}>{row.categoryCodeName}</td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", borderRight: "1px solid #e5e7eb" }}>{row.groupCodeName}</td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", borderRight: "1px solid #e5e7eb" }}>{row.productCodeName}</td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", textAlign: "right", borderRight: "1px solid #e5e7eb" }}>{row.unitRate.toFixed(2)}</td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", textAlign: "right", borderRight: "1px solid #e5e7eb" }}>{row.eCommerceRate.toFixed(2)}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center", borderRight: "1px solid #e5e7eb" }}>
                        <span style={{ padding: "2px 8px", borderRadius: "3px", fontSize: "11px", fontWeight: 600, backgroundColor: row.status === "ACTIVE" ? "#28a745" : "#6c757d", color: "#fff" }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: "8px 10px", textAlign: "center" }} onClick={e => e.stopPropagation()}>
                        <input type="radio" name="rc-select" checked={isSel} onChange={() => setSelectedId(row.id)}
                          style={{ cursor: "pointer", accentColor: TEAL, width: "14px", height: "14px" }} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination inside card */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "7px 12px", borderTop: "1px solid #e5e7eb", gap: "3px" }}>
          <span style={{ fontSize: "12px", color: "#6b7280", marginRight: "6px" }}>({page} of {totalPages})</span>
          <button disabled={page === 1} onClick={() => setPage(1)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "10px", cursor: "pointer", opacity: page === 1 ? 0.4 : 1, padding: 0 }}>◀|</button>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "10px", cursor: "pointer", opacity: page === 1 ? 0.4 : 1, padding: 0 }}>◀</button>
          {visiblePages.map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ width: "24px", height: "24px", border: page === p ? "none" : "1px solid #dee2e6", borderRadius: "3px", background: page === p ? TEAL : "#fff", color: page === p ? "#fff" : "#374151", fontSize: "11px", fontWeight: page === p ? 700 : 400, cursor: "pointer", padding: 0 }}>
              {p}
            </button>
          ))}
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "10px", cursor: "pointer", opacity: page >= totalPages ? 0.4 : 1, padding: 0 }}>▶</button>
          <button disabled={page >= totalPages} onClick={() => setPage(totalPages)}
            style={{ width: "24px", height: "24px", border: "1px solid #dee2e6", borderRadius: "3px", background: "#fff", color: "#9ca3af", fontSize: "10px", cursor: "pointer", opacity: page >= totalPages ? 0.4 : 1, padding: 0 }}>|▶</button>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            style={{ border: "1px solid #dee2e6", borderRadius: "3px", padding: "3px 6px", fontSize: "12px", color: "#374151", marginLeft: "4px", outline: "none", cursor: "pointer" }}>
            {[10, 25, 50].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
