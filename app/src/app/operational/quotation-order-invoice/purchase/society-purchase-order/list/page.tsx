"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SocietyPOItem = {
  id: number;
  poRefNumber: string;
  procurementType: string;
  societyCodeName: string;
  planCode: string;
  productionSupervisor: string;
  shippingEntity: string;
  intendingEntity: string;
  createdDate: string;
  status: string;
};

const MOCK_DATA: SocietyPOItem[] = [
  {
    id: 1,
    poRefNumber: "PO-434-21Mar2024-124",
    procurementType: "Export Order",
    societyCodeName: "111111 / AYYANPETTAI KANDAPPAR WEAVERS COOP.SOCIETY G.2067",
    planCode: "PURCHASE",
    productionSupervisor: "CHANDRAN S",
    shippingEntity: "2025 / COURTALLAM",
    intendingEntity: "2025 / COURTALLAM",
    createdDate: "21-Mar-2024",
    status: "FINAL-APPROVED",
  },
  {
    id: 2,
    poRefNumber: "PO-434-21Mar2024-123",
    procurementType: "Contract Order",
    societyCodeName: "111147 / ARIGNAR ANNA SILK WEAVERS COOP. SOCIETY, K.H.1,",
    planCode: "NEWPLAN",
    productionSupervisor: "EASWARI K",
    shippingEntity: "6028 / Distribution Warehouse - Tirunelveli",
    intendingEntity: "6028 / Distribution Warehouse - Tirunelveli",
    createdDate: "21-Mar-2024",
    status: "FINAL-APPROVED",
  },
  {
    id: 3,
    poRefNumber: "PO-434-18Mar2024-122",
    procurementType: "Contract Order",
    societyCodeName: "211117 / CHINNALAPATTI KALAIVANAR N.S. KRISHNAN INDL. WCS. MH.26,",
    planCode: "TEST",
    productionSupervisor: "EASWARI K",
    shippingEntity: "1114 / MARUTHAM",
    intendingEntity: "/",
    createdDate: "18-Mar-2024",
    status: "FINAL-APPROVED",
  },
];

const TEAL = "#2aa781";

const STATUS_COLORS: Record<string, string> = {
  "FINAL-APPROVED": "#28a745",
  APPROVED: "#17a2b8",
  PENDING: "#FFA70B",
  SUBMITTED: "#5750F1",
  REJECTED: "#dc3545",
};

export default function SocietyPurchaseOrderListPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    poRefNumber: "",
    procurementType: "",
    societyCodeName: "",
    planCode: "",
    productionSupervisor: "",
    shippingEntity: "",
    intendingEntity: "",
    createdDate: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = MOCK_DATA.filter(
    (row) =>
      (!filters.poRefNumber ||
        row.poRefNumber.toLowerCase().includes(filters.poRefNumber.toLowerCase())) &&
      (!filters.procurementType || row.procurementType === filters.procurementType) &&
      (!filters.societyCodeName ||
        row.societyCodeName.toLowerCase().includes(filters.societyCodeName.toLowerCase())) &&
      (!filters.planCode ||
        row.planCode.toLowerCase().includes(filters.planCode.toLowerCase())) &&
      (!filters.productionSupervisor ||
        row.productionSupervisor.toLowerCase().includes(filters.productionSupervisor.toLowerCase())) &&
      (!filters.shippingEntity ||
        row.shippingEntity.toLowerCase().includes(filters.shippingEntity.toLowerCase())) &&
      (!filters.intendingEntity ||
        row.intendingEntity.toLowerCase().includes(filters.intendingEntity.toLowerCase())) &&
      (!filters.createdDate || row.createdDate.includes(filters.createdDate)) &&
      (!filters.status || row.status === filters.status)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleClear = () => {
    setSelectedId(null);
    setFilters({
      poRefNumber: "",
      procurementType: "",
      societyCodeName: "",
      planCode: "",
      productionSupervisor: "",
      shippingEntity: "",
      intendingEntity: "",
      createdDate: "",
      status: "",
    });
  };

  const th: React.CSSProperties = {
    padding: "8px 10px",
    color: "#fff",
    fontWeight: 600,
    textAlign: "left",
    whiteSpace: "nowrap",
    borderRight: "1px solid rgba(255,255,255,0.2)",
    fontSize: "12px",
  };

  const filterTd: React.CSSProperties = {
    padding: "4px 6px",
    borderRight: "1px solid rgba(255,255,255,0.2)",
  };

  const filterInput: React.CSSProperties = {
    width: "100%",
    padding: "3px 7px",
    fontSize: "12px",
    border: "none",
    borderRadius: "2px",
    outline: "none",
    color: "#333",
    backgroundColor: "#fff",
    boxSizing: "border-box",
  };

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
          <li className="hover:text-teal-600 cursor-pointer">Quotation/Order/Invoice</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Purchase</li>
          <li>/</li>
          <li className="text-gray-700">Society Purchase Order Item List</li>
        </ol>
      </nav>

      <h1 className="text-base font-semibold text-gray-800 mb-3">
        Society Purchase Order Item List
      </h1>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span style={{ fontSize: "13px", color: "#374151" }}>
          {filtered.length} -{" "}
          <span style={{ color: TEAL, fontWeight: 500 }}>Society Purchase Order Item(s)</span>
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {/* Add */}
          <button
            onClick={() =>
              router.push(
                "/operational/quotation-order-invoice/purchase/society-purchase-order/add"
              )
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#28a745",
              cursor: "pointer",
            }}
          >
            <svg
              style={{ width: "13px", height: "13px" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Add
          </button>

          {/* View */}
          <button
            disabled={!selectedId}
            onClick={() =>
              selectedId &&
              router.push(
                `/operational/quotation-order-invoice/purchase/society-purchase-order/view?id=${selectedId}`
              )
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#5bc0de",
              cursor: !selectedId ? "not-allowed" : "pointer",
              opacity: !selectedId ? 0.65 : 1,
            }}
          >
            <svg
              style={{ width: "13px", height: "13px" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View
          </button>

          {/* Clear */}
          <button
            onClick={handleClear}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 12px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#6c757d",
              cursor: "pointer",
            }}
          >
            <svg
              style={{ width: "13px", height: "13px" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: "4px",
          border: "1px solid #dee2e6",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              {/* Header row */}
              <tr style={{ backgroundColor: TEAL }}>
                <th style={{ ...th, textAlign: "center", width: "42px" }}>#</th>
                <th style={th}>Purchase Order Reference Number ⇅</th>
                <th style={th}>Procurement type ⇅</th>
                <th style={th}>Society Code/ Name ⇅</th>
                <th style={th}>Plan Code ⇅</th>
                <th style={th}>Production Supervisor ⇅</th>
                <th style={th}>Shipping Entity ⇅</th>
                <th style={th}>Intending Entity ⇅</th>
                <th style={th}>Created Date ⇅</th>
                <th style={th}>Status ⇅</th>
                <th
                  style={{
                    ...th,
                    textAlign: "center",
                    borderRight: "none",
                    width: "64px",
                  }}
                >
                  Select
                </th>
              </tr>

              {/* Filter row */}
              <tr style={{ backgroundColor: TEAL, borderBottom: "3px solid #dee2e6" }}>
                <td style={filterTd}></td>
                <td style={filterTd}>
                  <input
                    value={filters.poRefNumber}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, poRefNumber: e.target.value }))
                    }
                    style={filterInput}
                  />
                </td>
                <td style={filterTd}>
                  <select
                    value={filters.procurementType}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, procurementType: e.target.value }))
                    }
                    style={filterInput}
                  >
                    <option value="">Select</option>
                    <option>Export Order</option>
                    <option>Contract Order</option>
                    <option>Direct Purchase</option>
                  </select>
                </td>
                <td style={filterTd}>
                  <input
                    value={filters.societyCodeName}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, societyCodeName: e.target.value }))
                    }
                    style={filterInput}
                  />
                </td>
                <td style={filterTd}>
                  <input
                    value={filters.planCode}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, planCode: e.target.value }))
                    }
                    style={filterInput}
                  />
                </td>
                <td style={filterTd}>
                  <input
                    value={filters.productionSupervisor}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, productionSupervisor: e.target.value }))
                    }
                    style={filterInput}
                  />
                </td>
                <td style={filterTd}>
                  <input
                    value={filters.shippingEntity}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, shippingEntity: e.target.value }))
                    }
                    style={filterInput}
                  />
                </td>
                <td style={filterTd}>
                  <input
                    value={filters.intendingEntity}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, intendingEntity: e.target.value }))
                    }
                    style={filterInput}
                  />
                </td>
                <td style={filterTd}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      value={filters.createdDate}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, createdDate: e.target.value }))
                      }
                      placeholder="dd-MMM-yyyy"
                      style={{
                        ...filterInput,
                        borderRadius: "2px 0 0 2px",
                        flex: 1,
                        minWidth: 0,
                      }}
                    />
                    <button
                      style={{
                        flexShrink: 0,
                        width: "26px",
                        height: "26px",
                        backgroundColor: TEAL,
                        border: "1px solid rgba(255,255,255,0.5)",
                        borderRadius: "0 2px 2px 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <svg
                        style={{ width: "12px", height: "12px", stroke: "#fff" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td style={filterTd}>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, status: e.target.value }))
                    }
                    style={filterInput}
                  >
                    <option value="">Select</option>
                    <option>FINAL-APPROVED</option>
                    <option>APPROVED</option>
                    <option>PENDING</option>
                    <option>SUBMITTED</option>
                    <option>REJECTED</option>
                  </select>
                </td>
                <td style={{ ...filterTd, borderRight: "none" }}></td>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    style={{ padding: "14px 12px", fontSize: "13px", color: "#6b7280" }}
                  >
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
                        backgroundColor: isSel ? "#f0fdfa" : "#fff",
                        cursor: "pointer",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                      onClick={() => setSelectedId(isSel ? null : row.id)}
                    >
                      <td
                        style={{
                          padding: "8px 10px",
                          textAlign: "center",
                          color: TEAL,
                          fontWeight: 500,
                          borderRight: "1px solid #e5e7eb",
                        }}
                      >
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: TEAL,
                          borderRight: "1px solid #e5e7eb",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.poRefNumber}
                      </td>
                      <td
                        style={{ padding: "8px 10px", color: "#374151", borderRight: "1px solid #e5e7eb" }}
                      >
                        {row.procurementType}
                      </td>
                      <td
                        style={{ padding: "8px 10px", color: TEAL, borderRight: "1px solid #e5e7eb" }}
                      >
                        {row.societyCodeName}
                      </td>
                      <td
                        style={{ padding: "8px 10px", color: "#374151", borderRight: "1px solid #e5e7eb" }}
                      >
                        {row.planCode}
                      </td>
                      <td
                        style={{ padding: "8px 10px", color: "#374151", borderRight: "1px solid #e5e7eb" }}
                      >
                        {row.productionSupervisor}
                      </td>
                      <td
                        style={{ padding: "8px 10px", color: "#374151", borderRight: "1px solid #e5e7eb" }}
                      >
                        {row.shippingEntity}
                      </td>
                      <td
                        style={{ padding: "8px 10px", color: "#374151", borderRight: "1px solid #e5e7eb" }}
                      >
                        {row.intendingEntity}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
                          color: "#374151",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          borderRight: "1px solid #e5e7eb",
                        }}
                      >
                        {row.createdDate}
                      </td>
                      <td
                        style={{ padding: "8px 10px", borderRight: "1px solid #e5e7eb" }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            borderRadius: "3px",
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#fff",
                            backgroundColor:
                              STATUS_COLORS[row.status] ?? "#6c757d",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td
                        style={{ padding: "8px 10px", textAlign: "center" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="radio"
                          name="spo-select"
                          checked={isSel}
                          onChange={() => setSelectedId(row.id)}
                          style={{
                            cursor: "pointer",
                            accentColor: TEAL,
                            width: "14px",
                            height: "14px",
                          }}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "7px 12px",
            borderTop: "1px solid #e5e7eb",
            gap: "4px",
          }}
        >
          <span style={{ fontSize: "12px", color: "#6b7280", marginRight: "6px" }}>
            ({page} of {totalPages})
          </span>
          {[
            { label: "◀|", action: () => setPage(1), disabled: page === 1 },
            { label: "◀", action: () => setPage((p) => p - 1), disabled: page === 1 },
          ].map((btn) => (
            <button
              key={btn.label}
              disabled={btn.disabled}
              onClick={btn.action}
              style={{
                width: "24px",
                height: "24px",
                border: "1px solid #dee2e6",
                borderRadius: "3px",
                background: "#fff",
                color: "#9ca3af",
                fontSize: "11px",
                cursor: "pointer",
                opacity: btn.disabled ? 0.4 : 1,
                padding: 0,
              }}
            >
              {btn.label}
            </button>
          ))}
          <button
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "3px",
              background: TEAL,
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
          {[
            {
              label: "▶",
              action: () => setPage((p) => p + 1),
              disabled: page >= totalPages,
            },
            {
              label: "|▶",
              action: () => setPage(totalPages),
              disabled: page >= totalPages,
            },
          ].map((btn) => (
            <button
              key={btn.label}
              disabled={btn.disabled}
              onClick={btn.action}
              style={{
                width: "24px",
                height: "24px",
                border: "1px solid #dee2e6",
                borderRadius: "3px",
                background: "#fff",
                color: "#9ca3af",
                fontSize: "11px",
                cursor: "pointer",
                opacity: btn.disabled ? 0.4 : 1,
                padding: 0,
              }}
            >
              {btn.label}
            </button>
          ))}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            style={{
              border: "1px solid #dee2e6",
              borderRadius: "3px",
              padding: "3px 6px",
              fontSize: "12px",
              color: "#374151",
              marginLeft: "4px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {[10, 25, 50].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
