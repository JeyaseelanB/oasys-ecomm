"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

/* ─────────────────────────── Sample data (mirrors list page) ─────────────────────────── */
interface ProductItem {
  id: number;
  productVarietyCode: string;
  atNumber: string;
  purchaseOrderNumber: string;
  uom: string;
  hsnCode: string;
  unitRate: number;
  dispatchedQty: number;
  totalRate: number;
  tax: number;
  taxValue: number;
  netValue: number;
}

interface InvoiceDetail {
  id: number;
  referenceNumber: string;
  shippingTo: string;
  purchaseOrderNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  orderType: string;
  outwardToIssr: string;
  products: ProductItem[];
  bundleNumber: string;
  totalBundleWeight: string;
  transportServiceType: string;
  transportServiceName: string;
  waybillAvailable: string;
  waybillNumber: string;
  transportChargeAvailable: string;
  transportChargeType: string;
  transportChargeAmount: string;
}

const INVOICE_DATA: InvoiceDetail[] = [
  {
    id: 1,
    referenceNumber: "3533130326244908",
    shippingTo: "2381 / PWH CHENNIMALAI",
    purchaseOrderNumber: "-",
    invoiceNumber: "12345",
    invoiceDate: "03-Mar-2026",
    orderType: "GEN",
    outwardToIssr: "NO",
    products: [
      {
        id: 1,
        productVarietyCode: "ASWS / AN...",
        atNumber: "123",
        purchaseOrderNumber: "-",
        uom: "NOS",
        hsnCode: "50072090",
        unitRate: 5000,
        dispatchedQty: 10,
        totalRate: 50000,
        tax: 5,
        taxValue: 2500,
        netValue: 52500,
      },
    ],
    bundleNumber: "",
    totalBundleWeight: "",
    transportServiceType: "LRY / Lorry Service",
    transportServiceName: "ABTS / ABT Lorry Service",
    waybillAvailable: "No",
    waybillNumber: "",
    transportChargeAvailable: "No",
    transportChargeType: "",
    transportChargeAmount: "",
  },
  {
    id: 2,
    referenceNumber: "3533130326244907",
    shippingTo: "2381 / PWH CHENNIMALAI",
    purchaseOrderNumber: "-",
    invoiceNumber: "111111112",
    invoiceDate: "03-Mar-2026",
    orderType: "GEN",
    outwardToIssr: "NO",
    products: [
      {
        id: 1,
        productVarietyCode: "ASWS / AN...",
        atNumber: "124",
        purchaseOrderNumber: "-",
        uom: "NOS",
        hsnCode: "50072090",
        unitRate: 1050,
        dispatchedQty: 1,
        totalRate: 1050,
        tax: 0,
        taxValue: 0,
        netValue: 1050,
      },
    ],
    bundleNumber: "",
    totalBundleWeight: "",
    transportServiceType: "LRY / Lorry Service",
    transportServiceName: "ABTS / ABT Lorry Service",
    waybillAvailable: "No",
    waybillNumber: "",
    transportChargeAvailable: "No",
    transportChargeType: "",
    transportChargeAmount: "",
  },
];

/* ─────────────────────────── Helpers ─────────────────────────── */
const fmt = (n: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ─────────────────────────── Sub-components ─────────────────────────── */
const GridIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="4" height="4" rx="1" />
    <rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="2" y="10" width="4" height="4" rx="1" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
  </svg>
);

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-[#17a2b8]">{value || "-"}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export function generateStaticParams() {
  return [];
}

export default function ViewSocietyInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = parseInt(params.id as string, 10);
  const invoice = INVOICE_DATA.find((inv) => inv.id === invoiceId) ?? INVOICE_DATA[0];

  /* derived totals */
  const totalQty = invoice.products.reduce((s, r) => s + r.dispatchedQty, 0);
  const totalRate = invoice.products.reduce((s, r) => s + r.totalRate, 0);
  const totalTaxValue = invoice.products.reduce((s, r) => s + r.taxValue, 0);
  const totalNet = invoice.products.reduce((s, r) => s + r.netValue, 0);
  const cgst = totalTaxValue / 2;
  const sgst = totalTaxValue / 2;

  return (
    <div className="mx-auto space-y-5">
      {/* ── Breadcrumb ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">
          View Society Invoice
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="font-medium text-primary hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                href="/weavers/society-invoice"
                className="text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Weavers
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View Society Invoice</li>
          </ol>
        </nav>
      </div>

      {/* ── Section 1: Society Invoice header ── */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        {/* teal header bar */}
        <div className="flex items-center justify-between bg-[#17a2b8] px-5 py-3">
          <span className="font-semibold text-white">Society Invoice</span>
          <button className="text-lg font-bold leading-none text-white hover:opacity-70">
            −
          </button>
        </div>

        {/* Row 1 — 4 columns */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-stroke p-5 dark:border-dark-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Shipping To</span>
            <span className="text-sm font-medium text-[#17a2b8]">{invoice.shippingTo}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Purchase Order Number</span>
            <span className="text-sm font-medium text-[#17a2b8]">{invoice.purchaseOrderNumber}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Invoice Number</span>
            <span className="text-sm font-medium text-[#17a2b8]">{invoice.invoiceNumber}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Invoice Date</span>
            <span className="text-sm font-medium text-[#17a2b8]">{invoice.invoiceDate}</span>
          </div>
        </div>

        {/* Row 2 — 2 columns */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Order Type</span>
            <span className="text-sm font-medium text-[#17a2b8]">{invoice.orderType}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Outward To Issr</span>
            <span className="text-sm font-medium text-[#17a2b8]">{invoice.outwardToIssr}</span>
          </div>
        </div>
      </div>

      {/* ── Section 2: Product wise Details ── */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Product wise Details
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                {[
                  "#",
                  "Product Variety Code / Name",
                  "AT Number",
                  "Purchase Order Number",
                  "UOM",
                  "HSN Code",
                  "Unit Rate (₹)",
                  "Dispatched Quantity",
                  "Total Rate (₹)",
                  "Tax (%)",
                  "Tax Value(₹)",
                  "Net Value(₹)",
                ].map((col) => (
                  <th
                    key={col}
                    className="whitespace-nowrap border border-[#3aa88f] px-3 py-3 text-center text-xs font-semibold"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.products.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-stroke dark:border-dark-3 ${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-dark"
                      : "bg-gray-50 dark:bg-[#1a2232]"
                  }`}
                >
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">
                    {idx + 1}
                  </td>
                  <td className="border-r border-stroke px-3 py-2.5 dark:border-dark-3">
                    {row.productVarietyCode}
                  </td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">
                    {row.atNumber}
                  </td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">
                    {row.purchaseOrderNumber}
                  </td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">
                    {row.uom}
                  </td>
                  <td className="border-r border-stroke px-3 py-2.5 text-center dark:border-dark-3">
                    {row.hsnCode}
                  </td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                    {fmt(row.unitRate)}
                  </td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                    {fmt(row.dispatchedQty)}
                  </td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                    {fmt(row.totalRate)}
                  </td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                    {fmt(row.tax)}
                  </td>
                  <td className="border-r border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                    {fmt(row.taxValue)}
                  </td>
                  <td className="px-3 py-2.5 text-right">{fmt(row.netValue)}</td>
                </tr>
              ))}

              {/* Total row */}
              <tr className="bg-[#f0f0f0] font-semibold dark:bg-dark-2">
                <td
                  colSpan={7}
                  className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3"
                >
                  Total
                </td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                  {fmt(totalQty)}
                </td>
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                  {fmt(totalRate)}
                </td>
                <td className="border-r border-t border-stroke px-3 py-2.5 dark:border-dark-3" />
                <td className="border-r border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                  {fmt(totalTaxValue)}
                </td>
                <td className="border-t border-stroke px-3 py-2.5 text-right dark:border-dark-3">
                  {fmt(totalNet)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tax summary */}
        <div className="border-t border-stroke dark:border-dark-3">
          {[
            { label: "Material Value(Without Tax)(₹):", value: fmt(totalRate) },
            { label: "CGST(₹):", value: fmt(cgst) },
            { label: "SGST(₹):", value: fmt(sgst) },
            { label: "Net Total(₹):", value: fmt(totalNet) },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-end gap-8 border-b border-stroke px-5 py-2.5 last:border-0 dark:border-dark-3"
            >
              <span className="text-sm font-medium text-dark dark:text-white">{label}</span>
              <span className="w-32 text-right text-sm font-semibold text-dark dark:text-white">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 3: Bundle Details ── */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Bundle Details
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-5 sm:grid-cols-2">
          <InfoRow label="Bundle Number" value={invoice.bundleNumber} />
          <InfoRow label="Total Bundle Weight" value={invoice.totalBundleWeight} />
        </div>
      </div>

      {/* ── Section 4: Transport Details ── */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="border-b border-stroke px-5 py-3 dark:border-dark-3">
          <h3 className="flex items-center gap-2 text-base font-semibold text-dark dark:text-white">
            <GridIcon /> Transport Details
          </h3>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-stroke p-5 dark:border-dark-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Transport Service Type</span>
            <span className="text-sm font-medium text-[#17a2b8]">
              {invoice.transportServiceType}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Transport Service Name</span>
            <span className="text-sm font-medium text-[#17a2b8]">
              {invoice.transportServiceName}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Waybill Available</span>
            <span className="text-sm font-medium text-[#17a2b8]">
              {invoice.waybillAvailable}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Waybill Number</span>
            <span className="text-sm font-medium text-[#17a2b8]">
              {invoice.waybillNumber || "-"}
            </span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 p-5 sm:grid-cols-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Transport Charge Available
            </span>
            <span className="text-sm font-medium text-[#17a2b8]">
              {invoice.transportChargeAvailable}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">Transport Charge Type</span>
            <span className="text-sm font-medium text-[#17a2b8]">
              {invoice.transportChargeType || "-"}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Transport Charge Amount
            </span>
            <span className="text-sm font-medium text-[#17a2b8]">
              {invoice.transportChargeAmount || "-"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Footer buttons ── */}
      <div className="flex justify-end gap-3 pb-4">
        <button
          onClick={() => router.push("/weavers/society-invoice")}
          className="flex items-center gap-2 rounded bg-[#5a6268] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12,19 5,12 12,5" />
          </svg>
          Back
        </button>
        <button className="flex items-center gap-2 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <polyline points="20,6 9,17 4,12" />
          </svg>
          Submit
        </button>
      </div>
    </div>
  );
}
