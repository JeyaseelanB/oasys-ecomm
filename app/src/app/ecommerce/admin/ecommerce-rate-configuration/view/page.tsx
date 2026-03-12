"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const TEAL = "#17a2b8";

const SAMPLE_DATA = [
  { id: 1, categoryCodeName: "AJ / Half Fine Silk", groupCodeName: "31 / HALF FINE SILK ITEMS", productCodeName: "SSL9 / SALEM AJ SILK SAREE 9 YARDS", unitRate: 11310.00, courierCharge: 150.00, courierTaxPercentage: 18, photoCharge: 200.00, photoTaxPercentage: 0, bankCharge: 282.75, bankChargeTaxPercentage: 18, status: "Active", otherCharges: 0.00 },
];

const SectionHeading = ({ title }: { title: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px", paddingBottom: "6px", borderBottom: "1px solid #e5e7eb" }}>
    <span style={{ display: "inline-grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
      {[0, 1, 2, 3].map(i => <span key={i} style={{ width: "6px", height: "6px", backgroundColor: "#374151", borderRadius: "1px" }} />)}
    </span>
    <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>{title}</span>
  </div>
);

const Label = ({ text }: { text: string }) => (
  <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>{text}</p>
);

const Value = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: "13px", color: TEAL, fontWeight: 500 }}>{children}</p>
);

const Field = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <Label text={label} />
    <Value>{value}</Value>
  </div>
);

export default function ViewECommerceRateConfigPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = parseInt(params.get("id") || "0");
  const record = SAMPLE_DATA.find(r => r.id === id) || SAMPLE_DATA[0];

  const courierTaxValue = record.courierCharge * record.courierTaxPercentage / 100;
  const courierChargeTotal = record.courierCharge + courierTaxValue;
  const photoTaxValue = record.photoCharge * record.photoTaxPercentage / 100;
  const photoChargeTotal = record.photoCharge + photoTaxValue;
  const bankChargeTaxValue = record.bankCharge * record.bankChargeTaxPercentage / 100;
  const bankChargeTotal = record.bankCharge + bankChargeTaxValue;
  const totalExpenses = courierChargeTotal + photoChargeTotal + bankChargeTotal;
  const thirtyPctValue = record.unitRate * 0.30;
  const expenseMarginValue = totalExpenses;
  const expenseMarginPercentage = record.unitRate > 0 ? (expenseMarginValue / record.unitRate) * 100 : 0;
  const productGrossValue = record.unitRate + expenseMarginValue + record.otherCharges;
  const fmt = (n: number) => n.toFixed(2);

  return (
    <div className="p-4">
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">E-Commerce</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Admin</li>
          <li>/</li>
          <li className="text-gray-700">View E-Commerce Rate Configuration</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">View E-Commerce Rate Configuration</h1>

      <div style={{ background: "#fff", borderRadius: "4px", border: "1px solid #dee2e6", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* Teal header */}
        <div style={{ backgroundColor: TEAL, padding: "8px 14px", borderRadius: "4px 4px 0 0" }}>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: "13px" }}>Ecommerce Rate Configuration</span>
        </div>

        <div style={{ padding: "16px" }}>

          {/* Product Details */}
          <SectionHeading title="Product Details" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <Field label="Category Code / Name" value={record.categoryCodeName} />
            <Field label="Group Code / Name" value={record.groupCodeName} />
            <Field label="Product Code / Name" value={record.productCodeName} />
            <Field label="Unit Rate" value={fmt(record.unitRate)} />
          </div>

          {/* Courier Charges */}
          <SectionHeading title="Courier Charges" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <Field label="Courier Charge" value={fmt(record.courierCharge)} />
            <Field label="Courier Tax Percentage" value={fmt(record.courierTaxPercentage)} />
            <Field label="Courier Tax Value" value={fmt(courierTaxValue)} />
            <Field label="Courier Charge Total" value={fmt(courierChargeTotal)} />
          </div>

          {/* Photo Charges */}
          <SectionHeading title="Photo Charges" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <Field label="Photo Charge" value={fmt(record.photoCharge)} />
            <Field label="Photo Tax Percentage" value={fmt(record.photoTaxPercentage)} />
            <Field label="Photo Tax Value" value={fmt(photoTaxValue)} />
            <Field label="Photo Charge Total" value={fmt(photoChargeTotal)} />
          </div>

          {/* Bank Details */}
          <SectionHeading title="Bank Details" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <Field label="Bank Charge" value={fmt(record.bankCharge)} />
            <Field label="Bank Charge Tax Percentage" value={fmt(record.bankChargeTaxPercentage)} />
            <Field label="Bank Charge Tax Value" value={fmt(bankChargeTaxValue)} />
            <Field label="Bank Charge Total" value={fmt(bankChargeTotal)} />
          </div>

          {/* 30% value */}
          <SectionHeading title="30% value" />
          <div style={{ marginBottom: "20px" }}>
            <div style={{ maxWidth: "25%" }}>
              <Field label="30% value" value={fmt(thirtyPctValue)} />
            </div>
          </div>

          {/* Expense Details */}
          <SectionHeading title="Expense Details" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <Field label="Expense Margin Percentage" value={fmt(expenseMarginPercentage)} />
            <Field label="Expense Margin Value" value={fmt(expenseMarginValue)} />
            <Field label="Product Gross Value(E-commRate)" value={fmt(productGrossValue)} />
            <Field label="Status" value={record.status} />
          </div>

          {/* Other Charges */}
          <SectionHeading title="Other Charges" />
          <div style={{ marginBottom: "4px" }}>
            <div style={{ maxWidth: "25%" }}>
              <Field label="Other Charges" value={fmt(record.otherCharges)} />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 16px", borderTop: "1px solid #e5e7eb" }}>
          <button
            onClick={() => router.push("/ecommerce/admin/ecommerce-rate-configuration/list")}
            style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 16px", fontSize: "12px", fontWeight: 600, color: "#fff", borderRadius: "4px", border: "none", backgroundColor: TEAL, cursor: "pointer" }}
          >
            <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
