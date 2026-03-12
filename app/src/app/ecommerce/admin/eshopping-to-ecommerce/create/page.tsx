"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TEAL = "#17a2b8";

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "32px", height: "32px", flexShrink: 0,
    backgroundColor: "#f3f4f6", border: "1px solid #d1d5db",
    borderRight: "none", borderRadius: "3px 0 0 3px",
  }}>
    {children}
  </span>
);

const FieldInput = ({ value, onChange, readOnly, placeholder }: { value: string; onChange?: (v: string) => void; readOnly?: boolean; placeholder?: string }) => (
  <input
    value={value}
    onChange={e => onChange?.(e.target.value)}
    readOnly={readOnly}
    placeholder={placeholder}
    style={{
      flex: 1, minWidth: 0, height: "32px", padding: "0 8px", fontSize: "13px",
      border: "1px solid #d1d5db", borderRadius: "0 3px 3px 0", outline: "none",
      color: "#374151", backgroundColor: readOnly ? "#f9fafb" : "#fff",
      boxSizing: "border-box",
    }}
  />
);

const Label = ({ text, required }: { text: string; required?: boolean }) => (
  <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
    {text}{required && <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>}
  </p>
);

export default function EShoppingCreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    qrCode: "",
    categoryCodeName: "",
    availableQty: "",
    actualPrice: "",
    groupCodeName: "",
    productCodeName: "",
    quantity: "",
    eCommercePrice: "",
    description: "",
  });

  const set = (field: string) => (val: string) => setForm(f => ({ ...f, [field]: val }));

  const handleClear = () => setForm({ qrCode: "", categoryCodeName: "", availableQty: "", actualPrice: "", groupCodeName: "", productCodeName: "", quantity: "", eCommercePrice: "", description: "" });

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

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: "4px", border: "1px solid #dee2e6", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>

        {/* Teal header bar */}
        <div style={{ backgroundColor: TEAL, padding: "8px 14px", borderRadius: "4px 4px 0 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: "13px" }}>E-Shopping to E-Commerce</span>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "12px" }}>( * Mandatory Fields)</span>
        </div>

        <div style={{ padding: "16px" }}>
          {/* Product Details heading */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
            <span style={{ display: "inline-flex", gap: "1px" }}>
              <span style={{ display: "inline-grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                {[0,1,2,3].map(i => <span key={i} style={{ width: "6px", height: "6px", backgroundColor: "#374151", borderRadius: "1px" }} />)}
              </span>
            </span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Product Details</span>
          </div>

          {/* Row 1: QR Code | Category Code/Name | Available Qty | Actual Price + Group Code/Name */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "14px" }}>
            {/* QR Code */}
            <div>
              <Label text="QR Code" required />
              <div style={{ display: "flex" }}>
                <IconBox>
                  <svg style={{ width: "14px", height: "14px", color: "#374151" }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm8-2h7v7h-7V3zm2 2v3h3V5h-3zM3 13h7v7H3v-7zm2 2v3h3v-3H5zm10 0h2v2h-2v-2zm0-2h-2v2h2v-2zm2 2h2v2h-2v-2zm-2 4h2v2h-2v-2zm2-2h2v2h-2v-2zm2 2h2v2h-2v-2zm-4-4h2v2h-2v-2z"/>
                  </svg>
                </IconBox>
                <FieldInput value={form.qrCode} onChange={set("qrCode")} />
                <button style={{ flexShrink: 0, width: "32px", height: "32px", backgroundColor: TEAL, border: "none", borderRadius: "0 3px 3px 0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: "-1px" }}>
                  <svg style={{ width: "13px", height: "13px", stroke: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Category Code/Name */}
            <div>
              <Label text="Category Code / Name" />
              <div style={{ display: "flex" }}>
                <IconBox>
                  <svg style={{ width: "14px", height: "14px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </IconBox>
                <FieldInput value={form.categoryCodeName} onChange={set("categoryCodeName")} readOnly />
              </div>
            </div>

            {/* Available Qty */}
            <div>
              <Label text="Available Qty" />
              <div style={{ display: "flex" }}>
                <IconBox>
                  <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600 }}>#</span>
                </IconBox>
                <FieldInput value={form.availableQty} readOnly />
              </div>
            </div>

            {/* Actual Price + Convertor + Group Code/Name stacked */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <Label text="Actual Price" required />
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <div style={{ display: "flex", flex: 1 }}>
                    <IconBox>
                      <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600 }}>₹</span>
                    </IconBox>
                    <FieldInput value={form.actualPrice} onChange={set("actualPrice")} />
                  </div>
                  <button style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "4px", padding: "5px 10px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "3px", border: "none", backgroundColor: "#28a745", cursor: "pointer", whiteSpace: "nowrap" }}>
                    <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Convertor
                  </button>
                </div>
              </div>
              <div>
                <Label text="Group Code / Name" />
                <div style={{ display: "flex" }}>
                  <IconBox>
                    <svg style={{ width: "13px", height: "13px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </IconBox>
                  <FieldInput value={form.groupCodeName} onChange={set("groupCodeName")} />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Product Code/Name | Quantity | E-Commerce Price + Clear */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "16px", alignItems: "flex-end", marginBottom: "14px" }}>
            {/* Product Code/Name */}
            <div>
              <Label text="Product Code / Name" />
              <div style={{ display: "flex" }}>
                <IconBox>
                  <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600 }}>#</span>
                </IconBox>
                <FieldInput value={form.productCodeName} readOnly />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <Label text="Quantity" required />
              <div style={{ display: "flex" }}>
                <IconBox>
                  <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600 }}>#</span>
                </IconBox>
                <FieldInput value={form.quantity} onChange={set("quantity")} />
              </div>
            </div>

            {/* E-Commerce Price */}
            <div>
              <Label text="E-Commerce Price" required />
              <div style={{ display: "flex" }}>
                <IconBox>
                  <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: 600 }}>₹</span>
                </IconBox>
                <FieldInput value={form.eCommercePrice} onChange={set("eCommercePrice")} />
                <button style={{ flexShrink: 0, width: "32px", height: "32px", backgroundColor: TEAL, border: "none", borderRadius: "0 3px 3px 0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: "-1px" }}>
                  <svg style={{ width: "13px", height: "13px", stroke: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Clear button aligned to bottom */}
            <div>
              <button
                onClick={handleClear}
                style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "4px", border: "none", backgroundColor: "#6c757d", cursor: "pointer", height: "32px" }}
              >
                <svg style={{ width: "13px", height: "13px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "4px" }}>
            <Label text="Description" />
            <textarea
              value={form.description}
              onChange={e => set("description")(e.target.value)}
              maxLength={250}
              rows={3}
              style={{ width: "100%", padding: "8px", fontSize: "13px", border: "1px solid #d1d5db", borderRadius: "3px", outline: "none", color: "#374151", resize: "vertical", boxSizing: "border-box" }}
            />
            <p style={{ fontSize: "11px", color: "#ef4444", marginTop: "2px" }}>Should be maximum 250 characters</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", padding: "10px 16px", borderTop: "1px solid #e5e7eb" }}>
          <button
            onClick={() => router.push("/ecommerce/admin/eshopping-to-ecommerce/list")}
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 16px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "4px", border: "none", backgroundColor: "#6c757d", cursor: "pointer" }}
          >
            <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 16px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "4px", border: "none", backgroundColor: "#28a745", cursor: "pointer" }}
          >
            <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
