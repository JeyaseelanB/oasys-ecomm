"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

type ProductRow = {
  sno: number;
  varietyCode: string;
  hsnCode: string;
  uom: string;
  length: string;
  width: string;
  warpCount: string;
  weftCount: string;
  reedspicks: string;
  unit: string;
  unitPrice: string;
  totalAmount: string;
  gstAmount: string;
  netAmount: string;
};

const MOCK_PRODUCTS: ProductRow[] = [];

const MOCK_PO = {
  poNumber: "PO-434-21Mar2024-124",
  createdDate: "21-Mar-2024",
  createdBy: "SANKARANARAYANAN C",
  validityDate: "21-Mar-2024",
  expectedDelivery: "23-Mar-2024",
  raisedFromName: "Head Office Entity",
  raisedFromAddress:
    "350 PANTHEON ROAD , BALASUNDARAM BUILDING, NEAR MUSEAM, CHENNAI, EGMORE, CHENNAI, TAMIL NADU - 600008",
  raisedToCode: "111111",
  raisedToName: "AYYANPETTAI KANDAPPAR WEAVERS COOP.SOCIETY G.2067",
  raisedToAddress:
    "21/2, KANDAPPAR STREET,, AYYAMPET PO., 631 601,, KANCHEEPURAM DIST., TAMIL NADUIndia",
  deliveryAddress: "COURTALLAM",
  billingAddress: "COURTALLAM",
  termsConditions: "",
  signatureSociety: "",
  totalNet: 0.0,
};

function amountToWords(amount: number): string {
  if (amount === 0) return "Zero Rupees And Zero Paise Only";
  // Simple placeholder
  return `${amount.toFixed(2)} Rupees Only`;
}

export default function PreviewSocietyPurchaseOrderPage() {
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  const totalNet = MOCK_PRODUCTS.reduce(
    (s, r) => s + (parseFloat(r.netAmount) || 0),
    0
  );

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
          <li className="text-gray-700">Preview Society Purchase Order</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">
        Preview Society Purchase Order
      </h1>

      {/* Print card */}
      <div
        id="print-area"
        className="bg-white border border-gray-200 rounded shadow-sm"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-start justify-between gap-4">
            {/* Left: Logo + Entity */}
            <div className="flex items-start gap-4">
              {/* Logo placeholder */}
              <div
                className="flex-shrink-0 w-20 h-16 border border-gray-200 rounded flex items-center justify-center bg-gray-50"
                style={{ minWidth: "80px" }}
              >
                <span className="text-xs text-gray-400 font-semibold text-center leading-tight">
                  Co-optex
                </span>
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#2d8f7b" }}
                >
                  {MOCK_PO.raisedFromName}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="font-medium">Tel:</span>{" "}
                  <span className="font-medium">Fax:</span>
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Email :</span>
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Website :</span>
                </p>
              </div>
            </div>

            {/* Right: PO Details */}
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800 mb-2">
                SOCIETY PURCHASE ORDER DETAILS
              </p>
              <table className="text-xs ml-auto">
                <tbody>
                  {[
                    ["Purchase Order Number", MOCK_PO.poNumber],
                    ["Created Date", MOCK_PO.createdDate],
                    ["Created By", MOCK_PO.createdBy],
                    ["Validity Date", MOCK_PO.validityDate],
                    ["Expected Date of Delivery", MOCK_PO.expectedDelivery],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="text-gray-500 pr-3 py-0.5 text-right">
                        {label} :
                      </td>
                      <td className="font-semibold text-gray-800 py-0.5">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Raised From / Raised To */}
        <div className="grid grid-cols-2 border-b border-gray-200">
          <div className="p-3 border-r border-gray-200">
            <div
              className="text-white text-xs font-semibold px-3 py-1.5 mb-2 rounded-sm"
              style={{ backgroundColor: "#1a6fac" }}
            >
              Society Purchase Order Raised From
            </div>
            <div className="px-1 space-y-0.5">
              <p className="text-xs font-semibold text-gray-800">HEAD OFFICE</p>
              <p className="text-xs text-gray-600">{MOCK_PO.raisedFromAddress}</p>
            </div>
          </div>
          <div className="p-3">
            <div
              className="text-white text-xs font-semibold px-3 py-1.5 mb-2 rounded-sm"
              style={{ backgroundColor: "#1a6fac" }}
            >
              Society Purchase Order Raised To
            </div>
            <div className="px-1 space-y-0.5">
              <p className="text-xs font-semibold text-gray-800">{MOCK_PO.raisedToCode}</p>
              <p className="text-xs text-gray-600">{MOCK_PO.raisedToName}</p>
              <p className="text-xs text-gray-600">{MOCK_PO.raisedToAddress}</p>
            </div>
          </div>
        </div>

        {/* Delivery / Billing Address */}
        <div className="grid grid-cols-2 border-b border-gray-200">
          <div className="p-3 border-r border-gray-200">
            <div
              className="text-white text-xs font-semibold px-3 py-1.5 mb-2 rounded-sm"
              style={{ backgroundColor: "#2d8f7b" }}
            >
              Delivery Address
            </div>
            <p className="text-xs text-gray-800 px-1">{MOCK_PO.deliveryAddress}</p>
          </div>
          <div className="p-3">
            <div
              className="text-white text-xs font-semibold px-3 py-1.5 mb-2 rounded-sm"
              style={{ backgroundColor: "#2d8f7b" }}
            >
              Billing Address
            </div>
            <p className="text-xs text-gray-800 px-1">{MOCK_PO.billingAddress}</p>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-4 h-4 text-gray-600"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <rect x="1" y="1" width="6" height="6" rx="0.5" />
              <rect x="9" y="1" width="6" height="6" rx="0.5" />
              <rect x="1" y="9" width="6" height="6" rx="0.5" />
              <rect x="9" y="9" width="6" height="6" rx="0.5" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">Product Details</span>
          </div>

          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full text-xs">
              <thead style={{ backgroundColor: "#2d8f7b" }} className="text-white">
                <tr>
                  <th
                    className="px-2 py-2 font-semibold text-left whitespace-nowrap"
                    rowSpan={2}
                  >
                    S.No
                  </th>
                  <th
                    className="px-2 py-2 font-semibold text-left whitespace-nowrap"
                    rowSpan={2}
                  >
                    Product Variety Code / Name
                  </th>
                  <th
                    className="px-2 py-2 font-semibold text-left whitespace-nowrap"
                    rowSpan={2}
                  >
                    HSN Code
                  </th>
                  <th
                    className="px-2 py-2 font-semibold text-left whitespace-nowrap"
                    rowSpan={2}
                  >
                    UOM
                  </th>
                  <th
                    className="px-2 py-2 font-semibold text-center whitespace-nowrap"
                    colSpan={5}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.3)" }}
                  >
                    Technical Specification
                  </th>
                  <th
                    className="px-2 py-2 font-semibold text-left whitespace-nowrap"
                    rowSpan={2}
                  >
                    Unit
                  </th>
                  <th
                    className="px-2 py-2 font-semibold text-left whitespace-nowrap"
                    rowSpan={2}
                  >
                    Unit Price (₹)
                  </th>
                  <th
                    className="px-2 py-2 font-semibold text-left whitespace-nowrap"
                    rowSpan={2}
                  >
                    Total Amount (₹)
                  </th>
                  <th
                    className="px-2 py-2 font-semibold text-left whitespace-nowrap"
                    rowSpan={2}
                  >
                    GST Amount (₹)
                  </th>
                  <th
                    className="px-2 py-2 font-semibold text-left whitespace-nowrap"
                    rowSpan={2}
                  >
                    Net Amount (₹)
                  </th>
                </tr>
                <tr style={{ backgroundColor: "#2d8f7b" }}>
                  {["Length", "Width", "Warp Count", "Weft Count", "Reeds / Picks"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-2 py-1 font-semibold text-left whitespace-nowrap"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white">
                {MOCK_PRODUCTS.length === 0 ? (
                  <tr>
                    <td
                      colSpan={15}
                      className="px-3 py-3 text-xs"
                      style={{ color: "#2d8f7b" }}
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  MOCK_PRODUCTS.map((r) => (
                    <tr key={r.sno} className="border-b border-gray-100">
                      <td className="px-2 py-1.5">{r.sno}</td>
                      <td className="px-2 py-1.5">{r.varietyCode}</td>
                      <td className="px-2 py-1.5">{r.hsnCode}</td>
                      <td className="px-2 py-1.5">{r.uom}</td>
                      <td className="px-2 py-1.5">{r.length}</td>
                      <td className="px-2 py-1.5">{r.width}</td>
                      <td className="px-2 py-1.5">{r.warpCount}</td>
                      <td className="px-2 py-1.5">{r.weftCount}</td>
                      <td className="px-2 py-1.5">{r.reedspicks}</td>
                      <td className="px-2 py-1.5">{r.unit}</td>
                      <td className="px-2 py-1.5">{r.unitPrice}</td>
                      <td className="px-2 py-1.5">{r.totalAmount}</td>
                      <td className="px-2 py-1.5">{r.gstAmount}</td>
                      <td className="px-2 py-1.5">{r.netAmount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rupees / Terms / Signature */}
        <div className="border-b border-gray-200">
          <table className="w-full text-xs">
            <tbody>
              <tr className="border-b border-gray-200">
                <td
                  className="px-3 py-2 font-semibold bg-gray-100 border-r border-gray-200 whitespace-nowrap"
                  style={{ width: "160px" }}
                >
                  Rupees in Words
                </td>
                <td className="px-3 py-2 text-gray-700">
                  {amountToWords(totalNet || MOCK_PO.totalNet)}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-3 py-2 font-semibold bg-gray-100 border-r border-gray-200">
                  Terms &amp; Conditions
                </td>
                <td className="px-3 py-2 text-gray-700">
                  {MOCK_PO.termsConditions || ""}
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-semibold bg-gray-100 border-r border-gray-200">
                  Signature of Society
                </td>
                <td className="px-3 py-2 text-gray-700">
                  {MOCK_PO.signatureSociety || ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer note + actions */}
        <div className="px-4 py-3 flex items-center justify-between">
          <p className="text-xs" style={{ color: "#e8734a" }}>
            * This is Computer Generated, No Manual Signature Required
          </p>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
              style={{ backgroundColor: "#1a6fac" }}
              onClick={handlePrint}
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
              style={{ backgroundColor: "#6c757d" }}
              onClick={() =>
                router.push(
                  "/operational/quotation-order-invoice/purchase/society-purchase-order/view"
                )
              }
            >
              <svg
                className="w-3.5 h-3.5"
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
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
