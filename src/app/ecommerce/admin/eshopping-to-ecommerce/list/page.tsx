"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type EShoppingItem = {
  id: number;
  productCategoryCodeName: string;
  productVarietyCodeName: string;
  atNumber: string;
  eShoppingQrCode: string;
  eCommerceQrCode: string;
  price: number;
};

const SAMPLE_DATA: EShoppingItem[] = [
  { id: 1, productCategoryCodeName: "C - Cotton Variety", productVarietyCodeName: "BJRD - BEDSHEET JAIPUR PRINTED 90X108 +2 PILLOW COVER", atNumber: "20230111684794", eShoppingQrCode: "", eCommerceQrCode: "23815670449", price: 1690.00 },
  { id: 2, productCategoryCodeName: "C - Cotton Variety", productVarietyCodeName: "BEP6 - BEDSHEET ERODE PLAIN 90X108", atNumber: "20230111676319", eShoppingQrCode: "", eCommerceQrCode: "23815665182", price: 1390.00 },
  { id: 3, productCategoryCodeName: "A - Pure Silk Variety", productVarietyCodeName: "DSWS - DHOTHIES SALEM WOVEN SILK", atNumber: "05364", eShoppingQrCode: "", eCommerceQrCode: "18812076887", price: 8210.00 },
  { id: 4, productCategoryCodeName: "AJ - Half Fine Silk", productVarietyCodeName: "DSJS - PURE SILK AND HF ZARI DHOTHY", atNumber: "8874", eShoppingQrCode: "", eCommerceQrCode: "18812076845", price: 5390.00 },
  { id: 5, productCategoryCodeName: "AJ - Half Fine Silk", productVarietyCodeName: "DSJS - PURE SILK AND HF ZARI DHOTHY", atNumber: "8998", eShoppingQrCode: "", eCommerceQrCode: "18812076835", price: 5890.00 },
];

const TEAL = "#158a80";

export default function EShoppingListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    productCategoryCodeName: "",
    productVarietyCodeName: "",
    atNumber: "",
    eShoppingQrCode: "",
    eCommerceQrCode: "",
    price: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filtered = SAMPLE_DATA.filter((r) =>
    (!filters.productCategoryCodeName || r.productCategoryCodeName.toLowerCase().includes(filters.productCategoryCodeName.toLowerCase())) &&
    (!filters.productVarietyCodeName || r.productVarietyCodeName.toLowerCase().includes(filters.productVarietyCodeName.toLowerCase())) &&
    (!filters.atNumber || r.atNumber.includes(filters.atNumber)) &&
    (!filters.eShoppingQrCode || r.eShoppingQrCode.includes(filters.eShoppingQrCode)) &&
    (!filters.eCommerceQrCode || r.eCommerceQrCode.includes(filters.eCommerceQrCode)) &&
    (!filters.price || r.price.toString().includes(filters.price))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleClear = () => {
    setSelectedId(null);
    setFilters({ productCategoryCodeName: "", productVarietyCodeName: "", atNumber: "", eShoppingQrCode: "", eCommerceQrCode: "", price: "" });
    setPage(1);
  };

  const visiblePages = Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1);

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
          <li className="text-gray-700">E-Shopping to E-Commerce</li>
        </ol>
      </nav>

      {/* Title */}
      <h1 className="text-base font-semibold text-gray-800 mb-3">E-Shopping to E-Commerce</h1>

      {/* Toolbar — outside card */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "13px", color: "#374151" }}>
          {filtered.length} - <span style={{ color: TEAL, fontWeight: 500 }}>E-Shopping to E-Commerce(s)</span>
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {/* Download */}
          <button
            style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "5px 12px", fontSize: "12px", fontWeight: 600,
              color: "#fff", borderRadius: "4px", border: "none",
              backgroundColor: TEAL, cursor: "pointer",
            }}
          >
            <svg style={{ width: "13px", height: "13px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>

          {/* Add */}
          <button
            disabled={selectedId !== null}
            onClick={() => router.push("/ecommerce/admin/eshopping-to-ecommerce/create")}
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

          {/* View */}
          <button
            disabled={!selectedId}
            onClick={() => selectedId && router.push(`/ecommerce/admin/eshopping-to-ecommerce/view?id=${selectedId}`)}
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

      {/* Card: table + pagination */}
      <div style={{ background: "#fff", borderRadius: "4px", border: "1px solid #dee2e6", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ backgroundColor: TEAL }}>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", width: "42px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>#</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Product Category Code / Name &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Product Variety Code / Name &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>AT Number &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>E-Shopping QR Code &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>E-Commerce QR Code &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap", borderRight: "1px solid rgba(255,255,255,0.2)" }}>Price (₹) &nbsp;⇅</th>
                <th style={{ padding: "8px 10px", color: "#fff", fontWeight: 600, textAlign: "center", width: "60px" }}>Select</th>
              </tr>

              {/* Filter row */}
              <tr style={{ backgroundColor: TEAL, borderBottom: "3px solid #dee2e6" }}>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}></td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.productCategoryCodeName} onChange={e => setFilters(f => ({ ...f, productCategoryCodeName: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.productVarietyCodeName} onChange={e => setFilters(f => ({ ...f, productVarietyCodeName: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.atNumber} onChange={e => setFilters(f => ({ ...f, atNumber: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.eShoppingQrCode} onChange={e => setFilters(f => ({ ...f, eShoppingQrCode: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.eCommerceQrCode} onChange={e => setFilters(f => ({ ...f, eCommerceQrCode: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
                </td>
                <td style={{ padding: "4px 6px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <input value={filters.price} onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}
                    style={{ width: "100%", padding: "3px 7px", fontSize: "12px", border: "none", borderRadius: "2px", outline: "none", color: "#333", backgroundColor: "#fff", boxSizing: "border-box" }} />
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
                      <td style={{ padding: "8px 10px", color: "#6b7280", borderRight: "1px solid #e5e7eb" }}>{row.productCategoryCodeName}</td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", borderRight: "1px solid #e5e7eb" }}>{row.productVarietyCodeName}</td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", borderRight: "1px solid #e5e7eb" }}>{row.atNumber}</td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", borderRight: "1px solid #e5e7eb" }}>{row.eShoppingQrCode}</td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", borderRight: "1px solid #e5e7eb" }}>{row.eCommerceQrCode}</td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", textAlign: "right", borderRight: "1px solid #e5e7eb" }}>{row.price.toFixed(2)}</td>
                      <td style={{ padding: "8px 10px", textAlign: "center" }} onClick={e => e.stopPropagation()}>
                        <input type="radio" name="esh-select" checked={isSel} onChange={() => setSelectedId(row.id)}
                          style={{ cursor: "pointer", accentColor: TEAL, width: "14px", height: "14px" }} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination — inside card with numbered pages */}
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
            {[5, 10, 25, 50].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
