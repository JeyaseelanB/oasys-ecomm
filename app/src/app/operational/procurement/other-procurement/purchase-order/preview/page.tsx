"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/* ── mock data ───────────────────────────────────────────────────── */
const PO_DATA = {
  planName:         "test plan 2023-24",
  poNumber:         "PO-2107-Mar26-349",
  createdDate:      "11-Mar-2026",
  createdBy:        "ARULMARY Y",
  validityDate:     "11-Mar-2026",
  deliveryDate:     "19-Mar-2026",
  tel:              "044-28121300",
  fax:              "044-28120761",
  email:            "cooptexhq@gmail.com",
  website:          "www.cooptex.gov.in",

  fromEntity:       "HEAD OFFICE",
  fromAddress:      "350 PANTHEON ROAD\nEGMORE\nCHENNAI TN 600008",

  toEntity:         "352047",
  toName:           "AMMAPET WEAVERS COOP. SOCIETY S.532",
  toAddress:        "AMMAPET, SALEM 636 003.,\nSALEM, TAMIL NADU\nIndia",

  deliveryEntityName: "BALAJI-TIRUPATHI",
  deliveryAddress:  "NO.212, GANDHI ROAD\nGANDHI ROAD, CHITTOOR\nANDHRA PRADESH - 517 501\n0877-2222076",

  indentEntityName: "1241 - SIRKALI",
  indentAddress:    "NO. 3 - A, PIDARI NORTH STREET\nSIRKALI, NAGAPATTINAM\nTAMIL NADU\n04364-272645",

  termsConditions:  "",
};

const PRODUCT_ROWS = [
  {
    id: 1,
    variety:    "ASWS/ANGAVAS SALEM WOVEN SILK PURE SILK",
    hsnCode:    "50072090",
    uom:        "NOS",
    length:     "1.83",
    width:      "0.92",
    warpCount:  "",
    weftCount:  "",
    reedsPicks: "",
    unit:       0,
    value:      "100.0",
    totalAmount: 0.00,
  },
];

const totalMaterialValue = PRODUCT_ROWS.reduce((s, r) => s + r.totalAmount, 0);

/* rupees in words (simple) */
function rupeesInWords(n: number): string {
  if (n === 0) return "Zero Rupees And Zero Paise Only";
  return `${n} Rupees Only`;
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════ */
export default function PreviewPurchaseOrderPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      {/* breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Preview Purchase Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Preview Purchase Order</li>
          </ol>
        </nav>
      </div>

      {/* ── White paper card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-6 md:p-10" id="print-area">

          {/* ── Logo row ── */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-start">
            {/* Left: Logo + entity */}
            <div className="flex items-start gap-4">
              {/* butterfly logo placeholder */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2d8f7b] text-white text-2xl font-bold select-none">
                C
              </div>
              <div>
                <p className="font-bold text-dark dark:text-white">Head Office Entity</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Co-operative Textiles</p>
              </div>
            </div>

            {/* Right: PO Details */}
            <div className="min-w-[260px] rounded border border-stroke p-4 text-sm dark:border-dark-3">
              <p className="mb-1 font-bold text-dark dark:text-white text-center">PURCHASE ORDER DETAILS</p>
              <div className="mt-2 space-y-1 text-xs text-dark dark:text-white">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500 dark:text-gray-400">Purchase Order Plan Name :</span>
                  <span className="font-medium">{PO_DATA.planName}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500 dark:text-gray-400">Purchase Order Number :</span>
                  <span className="font-medium">{PO_DATA.poNumber}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500 dark:text-gray-400">Created Date :</span>
                  <span className="font-medium">{PO_DATA.createdDate}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500 dark:text-gray-400">Created By :</span>
                  <span className="font-medium">{PO_DATA.createdBy}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500 dark:text-gray-400">Validity Date :</span>
                  <span className="font-medium">{PO_DATA.validityDate}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500 dark:text-gray-400">Expected Date of Delivery :</span>
                  <span className="font-medium">{PO_DATA.deliveryDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Contact row ── */}
          <div className="mb-6 flex flex-wrap gap-6 text-xs text-gray-500 dark:text-gray-400">
            <span>Tel : {PO_DATA.tel}</span>
            <span>Fax : {PO_DATA.fax}</span>
            <span>Email : {PO_DATA.email}</span>
            <span>Website : {PO_DATA.website}</span>
          </div>

          {/* ── Raised From / Raised To ── */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded border border-stroke p-4 dark:border-dark-3">
              <p className="mb-2 rounded bg-[#17a2b8] px-3 py-1.5 text-center text-xs font-bold text-white">Purchase Order Raised From</p>
              <div className="text-sm text-dark dark:text-white">
                <p className="font-semibold">{PO_DATA.fromEntity}</p>
                <p className="mt-1 whitespace-pre-line text-xs text-gray-600 dark:text-gray-400">{PO_DATA.fromAddress}</p>
              </div>
            </div>
            <div className="rounded border border-stroke p-4 dark:border-dark-3">
              <p className="mb-2 rounded bg-[#17a2b8] px-3 py-1.5 text-center text-xs font-bold text-white">Purchase Order Raised To</p>
              <div className="text-sm text-dark dark:text-white">
                <p className="font-semibold">{PO_DATA.toEntity}</p>
                <p className="font-semibold">{PO_DATA.toName}</p>
                <p className="mt-1 whitespace-pre-line text-xs text-gray-600 dark:text-gray-400">{PO_DATA.toAddress}</p>
              </div>
            </div>
          </div>

          {/* ── Delivery / Indenting address ── */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded border border-stroke p-4 dark:border-dark-3">
              <p className="mb-2 text-xs font-bold text-dark dark:text-white">Delivery Address</p>
              <p className="text-xs font-semibold text-dark dark:text-white">{PO_DATA.deliveryEntityName}</p>
              <p className="mt-1 whitespace-pre-line text-xs text-gray-600 dark:text-gray-400">{PO_DATA.deliveryAddress}</p>
            </div>
            <div className="rounded border border-stroke p-4 dark:border-dark-3">
              <p className="mb-2 text-xs font-bold text-dark dark:text-white">Indenting Entity Address</p>
              <p className="text-xs font-semibold text-dark dark:text-white">{PO_DATA.indentEntityName}</p>
              <p className="mt-1 whitespace-pre-line text-xs text-gray-600 dark:text-gray-400">{PO_DATA.indentAddress}</p>
            </div>
          </div>

          {/* ══ Product Details ══ */}
          <div className="mb-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-1 flex-1 bg-[#2d8f7b]"></div>
              <span className="rounded bg-[#2d8f7b] px-4 py-1 text-xs font-bold text-white">Product Details</span>
              <div className="h-1 flex-1 bg-[#2d8f7b]"></div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">S.No</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Product Variety Code / Name</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">HSN Code</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">UOM</th>
                    <th colSpan={5} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Technical Specification</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Unit / Value</th>
                    <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Total Amount (₹)</th>
                  </tr>
                  <tr className="bg-[#3aa88f] text-white">
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Length</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Width</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Warp Count</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Weft Count</th>
                    <th className="border border-[#3aa88f] px-2 py-1.5 text-center font-semibold">Reeds Picks</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCT_ROWS.map((r, idx) => (
                    <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.variety}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.hsnCode}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.uom}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.length}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.width}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.warpCount}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.weftCount}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{r.reedsPicks}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">
                        {r.unit} / {r.value}
                      </td>
                      <td className="border border-stroke px-2 py-2 text-right align-middle text-dark dark:border-dark-3 dark:text-white">{r.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Material value */}
            <div className="mt-2 flex justify-end text-sm text-dark dark:text-white">
              <span className="mr-4 font-semibold">Material Value (Without Tax) :</span>
              <span>{totalMaterialValue.toFixed(2)}</span>
            </div>
          </div>

          {/* Rupees in words */}
          <div className="mb-6 rounded border border-stroke p-3 text-xs text-dark dark:border-dark-3 dark:text-white">
            <span className="font-semibold">Rupees in Words : </span>
            {rupeesInWords(totalMaterialValue)}
          </div>

          {/* Terms & Conditions | Signature */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded border border-stroke p-4 dark:border-dark-3">
              <p className="mb-2 text-xs font-bold text-dark dark:text-white">Terms &amp; Conditions</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 min-h-[60px]">{PO_DATA.termsConditions}</p>
            </div>
            <div className="flex items-end justify-center rounded border border-stroke p-4 dark:border-dark-3">
              <p className="text-xs font-bold text-dark dark:text-white">Signature of Society</p>
            </div>
          </div>

          {/* Footer note */}
          <p className="mb-6 text-center text-[11px] text-gray-400 dark:text-gray-500">
            * This is Computer Generated, No Manual Signature Required
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="6,9 6,2 18,2 18,9"/>
                <path d="M6,18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print
            </button>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
