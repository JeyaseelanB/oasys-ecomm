"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const TEAL = "#17a2b8";

const SectionHeading = ({ title }: { title: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px", paddingBottom: "6px", borderBottom: "1px solid #e5e7eb" }}>
    <span style={{ display: "inline-grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
      {[0, 1, 2, 3].map(i => <span key={i} style={{ width: "6px", height: "6px", backgroundColor: "#374151", borderRadius: "1px" }} />)}
    </span>
    <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>{title}</span>
  </div>
);

const Label = ({ text, required }: { text: string; required?: boolean }) => (
  <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
    {text}{required && <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>}
  </p>
);

const HashBox = () => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "32px", height: "32px", flexShrink: 0,
    backgroundColor: "#f3f4f6", border: "1px solid #d1d5db",
    borderRight: "none", borderRadius: "3px 0 0 3px", fontSize: "13px", color: "#6b7280", fontWeight: 600,
  }}>#</span>
);

const RupeeBox = () => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "32px", height: "32px", flexShrink: 0,
    backgroundColor: "#f3f4f6", border: "1px solid #d1d5db",
    borderRight: "none", borderRadius: "3px 0 0 3px", fontSize: "13px", color: "#6b7280", fontWeight: 600,
  }}>₹</span>
);

const LayersBox = () => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "32px", height: "32px", flexShrink: 0,
    backgroundColor: "#f3f4f6", border: "1px solid #d1d5db",
    borderRight: "none", borderRadius: "3px 0 0 3px",
  }}>
    <svg style={{ width: "14px", height: "14px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  </span>
);

const GridBox = () => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "32px", height: "32px", flexShrink: 0,
    backgroundColor: "#f3f4f6", border: "1px solid #d1d5db",
    borderRight: "none", borderRadius: "3px 0 0 3px",
  }}>
    <svg style={{ width: "13px", height: "13px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  </span>
);

const DocBox = () => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: "32px", height: "32px", flexShrink: 0,
    backgroundColor: "#f3f4f6", border: "1px solid #d1d5db",
    borderRight: "none", borderRadius: "3px 0 0 3px",
  }}>
    <svg style={{ width: "14px", height: "14px", color: "#6b7280" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </span>
);

const inputStyle = (readOnly?: boolean): React.CSSProperties => ({
  flex: 1, minWidth: 0, height: "32px", padding: "0 8px", fontSize: "13px",
  border: "1px solid #d1d5db", borderRadius: "0 3px 3px 0", outline: "none",
  color: "#374151", backgroundColor: readOnly ? "#f9fafb" : "#fff",
  boxSizing: "border-box",
});

const selectStyle: React.CSSProperties = {
  flex: 1, minWidth: 0, height: "32px", padding: "0 8px", fontSize: "13px",
  border: "1px solid #d1d5db", borderRadius: "0 3px 3px 0", outline: "none",
  color: "#374151", backgroundColor: "#fff", boxSizing: "border-box", cursor: "pointer",
};

export default function CreateECommerceRateConfigPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    categoryCodeName: "",
    groupCodeName: "",
    productCodeName: "",
    unitRate: "",
    courierCharge: "",
    courierTaxPercentage: "",
    photoCharge: "",
    photoTaxPercentage: "",
    bankCharge: "",
    bankChargeTaxPercentage: "",
    status: "Active",
    otherCharges: "",
  });

  const set = (field: string) => (val: string) => setForm(f => ({ ...f, [field]: val }));

  // Computed fields
  const courierTaxValue = (parseFloat(form.courierCharge) || 0) * (parseFloat(form.courierTaxPercentage) || 0) / 100;
  const courierChargeTotal = (parseFloat(form.courierCharge) || 0) + courierTaxValue;

  const photoTaxValue = (parseFloat(form.photoCharge) || 0) * (parseFloat(form.photoTaxPercentage) || 0) / 100;
  const photoChargeTotal = (parseFloat(form.photoCharge) || 0) + photoTaxValue;

  const bankChargeTaxValue = (parseFloat(form.bankCharge) || 0) * (parseFloat(form.bankChargeTaxPercentage) || 0) / 100;
  const bankChargeTotal = (parseFloat(form.bankCharge) || 0) + bankChargeTaxValue;

  const totalExpenses = courierChargeTotal + photoChargeTotal + bankChargeTotal;
  const unitRateVal = parseFloat(form.unitRate) || 0;
  const thirtyPctValue = unitRateVal * 0.30;

  const expenseMarginValue = totalExpenses;
  const expenseMarginPercentage = unitRateVal > 0 ? (expenseMarginValue / unitRateVal) * 100 : 0;
  const productGrossValue = unitRateVal + expenseMarginValue + (parseFloat(form.otherCharges) || 0);

  const fmt = (n: number) => n.toFixed(2);

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
          <li className="text-gray-700">Create E-Commerce Rate Configuration</li>
        </ol>
      </nav>

      <h1 className="text-base font-semibold text-gray-800 mb-3">Create E-Commerce Rate Configuration</h1>

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: "4px", border: "1px solid #dee2e6", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* Teal header */}
        <div style={{ backgroundColor: TEAL, padding: "8px 14px", borderRadius: "4px 4px 0 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: "13px" }}>Ecommerce Rate Configuration</span>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "12px" }}>( * Mandatory Fields)</span>
        </div>

        <div style={{ padding: "16px" }}>

          {/* ── Product Details ── */}
          <SectionHeading title="Product Details" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "14px" }}>
            {/* Category Code/Name */}
            <div>
              <Label text="Category Code / Name" />
              <div style={{ display: "flex" }}>
                <LayersBox />
                <select value={form.categoryCodeName} onChange={e => set("categoryCodeName")(e.target.value)} style={selectStyle}>
                  <option value="">Select</option>
                  <option value="AJ / Half Fine Silk">AJ / Half Fine Silk</option>
                  <option value="A / Pure Silk Variety">A / Pure Silk Variety</option>
                  <option value="C - Cotton Variety">C - Cotton Variety</option>
                </select>
              </div>
            </div>

            {/* Group Code/Name */}
            <div>
              <Label text="Group Code / Name" />
              <div style={{ display: "flex" }}>
                <GridBox />
                <select value={form.groupCodeName} onChange={e => set("groupCodeName")(e.target.value)} style={selectStyle}>
                  <option value="">Select</option>
                  <option value="31 / HALF FINE SILK ITEMS">31 / HALF FINE SILK ITEMS</option>
                  <option value="130 / PURE SILK">130 / PURE SILK</option>
                </select>
              </div>
            </div>

            {/* Product Code/Name */}
            <div>
              <Label text="Product Code / Name" />
              <div style={{ display: "flex" }}>
                <HashBox />
                <input value={form.productCodeName} onChange={e => set("productCodeName")(e.target.value)} style={inputStyle()} />
              </div>
            </div>

            {/* Unit Rate */}
            <div>
              <Label text="Unit Rate" required />
              <div style={{ display: "flex" }}>
                <RupeeBox />
                <input value={form.unitRate} onChange={e => set("unitRate")(e.target.value)} style={{ ...inputStyle(), flex: 1, borderRadius: "0" }} placeholder="0.00" />
                <select style={{ flexShrink: 0, height: "32px", padding: "0 6px", fontSize: "12px", border: "1px solid #d1d5db", borderLeft: "none", borderRadius: "0 3px 3px 0", outline: "none", color: "#374151", backgroundColor: "#fff", cursor: "pointer" }}>
                  <option>Select</option>
                </select>
              </div>
            </div>
          </div>

          {/* Clear + Search buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "20px" }}>
            <button
              onClick={() => setForm(f => ({ ...f, categoryCodeName: "", groupCodeName: "", productCodeName: "", unitRate: "" }))}
              style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "4px", border: "none", backgroundColor: "#6c757d", cursor: "pointer" }}
            >
              <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
            <button
              style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 14px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "4px", border: "none", backgroundColor: TEAL, cursor: "pointer" }}
            >
              <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>

          {/* ── Courier Charges ── */}
          <SectionHeading title="Courier Charges" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <Label text="Courier Charge" required />
              <div style={{ display: "flex" }}><HashBox /><input value={form.courierCharge} onChange={e => set("courierCharge")(e.target.value)} style={inputStyle()} placeholder="0.00" /></div>
            </div>
            <div>
              <Label text="Courier Tax Percentage" />
              <div style={{ display: "flex" }}><HashBox /><input value={form.courierTaxPercentage} onChange={e => set("courierTaxPercentage")(e.target.value)} style={inputStyle()} placeholder="0" /></div>
            </div>
            <div>
              <Label text="Courier Tax Value" />
              <div style={{ display: "flex" }}><HashBox /><input value={fmt(courierTaxValue)} readOnly style={inputStyle(true)} /></div>
            </div>
            <div>
              <Label text="Courier Charge Total" />
              <div style={{ display: "flex" }}><HashBox /><input value={fmt(courierChargeTotal)} readOnly style={inputStyle(true)} /></div>
            </div>
          </div>

          {/* ── Photo Charges ── */}
          <SectionHeading title="Photo Charges" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <Label text="Photo Charge" />
              <div style={{ display: "flex" }}><HashBox /><input value={form.photoCharge} onChange={e => set("photoCharge")(e.target.value)} style={inputStyle()} placeholder="0.00" /></div>
            </div>
            <div>
              <Label text="Photo Tax Percentage" />
              <div style={{ display: "flex" }}><HashBox /><input value={form.photoTaxPercentage} onChange={e => set("photoTaxPercentage")(e.target.value)} style={inputStyle()} placeholder="0" /></div>
            </div>
            <div>
              <Label text="Photo Tax Value" />
              <div style={{ display: "flex" }}><HashBox /><input value={fmt(photoTaxValue)} readOnly style={inputStyle(true)} /></div>
            </div>
            <div>
              <Label text="Photo Charge Total" />
              <div style={{ display: "flex" }}><HashBox /><input value={fmt(photoChargeTotal)} readOnly style={inputStyle(true)} /></div>
            </div>
          </div>

          {/* ── Bank Details ── */}
          <SectionHeading title="Bank Details" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <Label text="Bank Charge" />
              <div style={{ display: "flex" }}><HashBox /><input value={form.bankCharge} onChange={e => set("bankCharge")(e.target.value)} style={inputStyle()} placeholder="0.00" /></div>
            </div>
            <div>
              <Label text="Bank Charge Tax Percentage" />
              <div style={{ display: "flex" }}><HashBox /><input value={form.bankChargeTaxPercentage} onChange={e => set("bankChargeTaxPercentage")(e.target.value)} style={inputStyle()} placeholder="0" /></div>
            </div>
            <div>
              <Label text="Bank Charge Tax Value" />
              <div style={{ display: "flex" }}><HashBox /><input value={fmt(bankChargeTaxValue)} readOnly style={inputStyle(true)} /></div>
            </div>
            <div>
              <Label text="Bank Charge Total" />
              <div style={{ display: "flex" }}><HashBox /><input value={fmt(bankChargeTotal)} readOnly style={inputStyle(true)} /></div>
            </div>
          </div>

          {/* ── 30% Value ── */}
          <SectionHeading title="30% value" />
          <div style={{ marginBottom: "20px" }}>
            <div style={{ maxWidth: "calc(25% - 6px)" }}>
              <Label text="30% value" />
              <div style={{ display: "flex" }}><HashBox /><input value={fmt(thirtyPctValue)} readOnly style={inputStyle(true)} /></div>
            </div>
          </div>

          {/* ── Expense Details ── */}
          <SectionHeading title="Expense Details" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <div>
              <Label text="Expense Margin Percentage" />
              <div style={{ display: "flex" }}><HashBox /><input value={fmt(expenseMarginPercentage)} readOnly style={inputStyle(true)} /></div>
            </div>
            <div>
              <Label text="Expense Margin Value" />
              <div style={{ display: "flex" }}><HashBox /><input value={fmt(expenseMarginValue)} readOnly style={inputStyle(true)} /></div>
            </div>
            <div>
              <Label text="Product Gross Value(E-commRate)" />
              <div style={{ display: "flex" }}><HashBox /><input value={fmt(productGrossValue)} readOnly style={inputStyle(true)} /></div>
            </div>
          </div>

          {/* ── Status ── */}
          <SectionHeading title="Status" />
          <div style={{ marginBottom: "20px" }}>
            <div style={{ maxWidth: "calc(25% - 6px)" }}>
              <Label text="Status" />
              <div style={{ display: "flex" }}>
                <DocBox />
                <select value={form.status} onChange={e => set("status")(e.target.value)} style={selectStyle}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Other Charges ── */}
          <SectionHeading title="Other Charges" />
          <div style={{ marginBottom: "4px" }}>
            <div style={{ maxWidth: "calc(25% - 6px)" }}>
              <Label text="Other Charges" />
              <div style={{ display: "flex" }}><HashBox /><input value={form.otherCharges} onChange={e => set("otherCharges")(e.target.value)} style={inputStyle()} placeholder="0.00" /></div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", padding: "10px 16px", borderTop: "1px solid #e5e7eb" }}>
          <button
            onClick={() => router.push("/ecommerce/admin/ecommerce-rate-configuration/list")}
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
