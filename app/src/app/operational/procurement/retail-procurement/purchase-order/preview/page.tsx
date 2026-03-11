"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK = {
  poNo: "352254-SQY19FEB-5-181",
  createdDate: "11-Feb-2019",
  createdBy: "GUNASEKARAN N",
  validityDate: "11-Feb-2019",
  expectedDelivery: "15-Feb-2019",
  raisedFrom: "D&P Office Salem",
  raisedTo: "MURUGAN SILK WEAVERS COOP. SOCIETY SA.89",
  deliveryName: "PWH - SALEM",
  deliveryAddress: "Cooptex Product Warehouse, 343, Bazaar Street, Salem, SALEM, SALEM, TAMIL NADU - 636003",
  deliveryPhone: "04272265618",
  billingName: "HEAD OFFICE",
  billingAddress: "350 PANTHEON ROAD , BALASUNDARAM BUILDING, NEAR MUSEAM, CHENNAI, EGMORE, CHENNAI, TAMIL NADU - 600008",
};

const MOCK_PRODUCTS = [
  { id: 1, variety: "SSLB / SALEM SILK SAREE WITH BLOUSE", atNumber: "352254-Feb2019-173", hsnCode: "50072010", uom: "NOS", length: "6.2", width: "1.17", warpCount: "", weftCount: "", reedsPicks: "/ 76.0", unit: 1, unitPrice: 3000.00, gstAmount: 150.00, totalAmount: 3150.00 },
];

const MOCK_GST = [
  { id: 1, hsnCode: "50072010", unit: 1.0, taxPct: 2.5, cgst: 75.00, sgst: 75.00, totalTax: 150.00 },
];

const materialValue = 3000.00;
const cgstTotal = 75.00;
const sgstTotal = 75.00;
const gstTaxTotal = 150.00;
const grandTotal = 3150.00;

const numToWords = (n: number): string => {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  if (n === 0) return "Zero";
  const inWords = (num: number): string => {
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
    if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + inWords(num % 100) : "");
    if (num < 100000) return inWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + inWords(num % 1000) : "");
    return inWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + inWords(num % 100000) : "");
  };
  const [whole, paise] = n.toFixed(2).split(".");
  return inWords(parseInt(whole)) + " Rupees And " + (parseInt(paise) === 0 ? "Zero Paise" : inWords(parseInt(paise)) + " Paise") + " Only";
};

export default function PreviewPurchaseOrderPage() {
  const router = useRouter();

  const handlePrint = () => window.print();

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Preview Purchase Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Preview Purchase Order</li>
          </ol>
        </nav>
      </div>

      {/* PO Document */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-6">
          {/* Company header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            {/* Logo + address */}
            <div className="flex items-start gap-4">
              <div className="flex size-20 shrink-0 items-center justify-center rounded border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2">
                <svg viewBox="0 0 80 80" className="size-16">
                  <ellipse cx="40" cy="40" rx="30" ry="18" fill="none" stroke="#2d8f7b" strokeWidth="3" />
                  <ellipse cx="40" cy="40" rx="18" ry="30" fill="none" stroke="#2d8f7b" strokeWidth="3" />
                  <circle cx="40" cy="40" r="8" fill="#2d8f7b" />
                  <text x="40" y="68" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#2d8f7b">Co-optex</text>
                </svg>
              </div>
              <div>
                <p className="text-base font-bold text-[#17a2b8]">HEAD OFFICE</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">350 PANTHEON ROAD , BALASUNDARAM BUILDING, NEAR MUSEAM, CHENNAI, EGMORE, CHENNAI,</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">TAMIL NADU - 600008</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Tel:</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fax:</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email : cooptex@cooptex.com</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Website :</p>
              </div>
            </div>

            {/* PO Number block */}
            <div className="shrink-0 text-right">
              <p className="mb-2 text-base font-bold uppercase text-dark dark:text-white">Purchase Order Number</p>
              <table className="ml-auto text-xs text-dark dark:text-white">
                <tbody>
                  <tr><td className="pr-3 text-right text-gray-500 dark:text-gray-400">Purchase Order Details :</td><td className="font-medium">{MOCK.poNo}</td></tr>
                  <tr><td className="pr-3 text-right text-gray-500 dark:text-gray-400">Created Date :</td><td className="font-medium">{MOCK.createdDate}</td></tr>
                  <tr><td className="pr-3 text-right text-gray-500 dark:text-gray-400">Created By :</td><td className="font-bold">{MOCK.createdBy}</td></tr>
                  <tr><td className="pr-3 text-right text-gray-500 dark:text-gray-400">Validity Date :</td><td className="font-medium">{MOCK.validityDate}</td></tr>
                  <tr><td className="pr-3 text-right text-gray-500 dark:text-gray-400">Expected Date of Delivery :</td><td className="font-medium">{MOCK.expectedDelivery}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Raised From / Raised To */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <div className="rounded-t bg-[#17a2b8] px-3 py-2">
                <p className="text-sm font-semibold text-white">Purchase Order Raised From</p>
              </div>
              <div className="rounded-b border border-t-0 border-stroke px-3 py-3 dark:border-dark-3">
                <p className="text-sm text-dark dark:text-white">{MOCK.raisedFrom}</p>
              </div>
            </div>
            <div>
              <div className="rounded-t bg-[#17a2b8] px-3 py-2">
                <p className="text-sm font-semibold text-white">Purchase Order Raised To</p>
              </div>
              <div className="rounded-b border border-t-0 border-stroke px-3 py-3 dark:border-dark-3">
                <p className="text-sm text-dark dark:text-white">{MOCK.raisedTo}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address / Billing Address */}
          <div className="mb-5 grid grid-cols-2 gap-4">
            <div>
              <div className="rounded-t bg-[#17a2b8] px-3 py-2">
                <p className="text-sm font-semibold text-white">Delivery Address</p>
              </div>
              <div className="rounded-b border border-t-0 border-stroke px-3 py-3 dark:border-dark-3">
                <p className="text-sm font-semibold text-dark dark:text-white">{MOCK.deliveryName}</p>
                <p className="text-sm text-dark dark:text-white">{MOCK.deliveryAddress}</p>
                <p className="text-sm text-dark dark:text-white">{MOCK.deliveryPhone}</p>
              </div>
            </div>
            <div>
              <div className="rounded-t bg-[#17a2b8] px-3 py-2">
                <p className="text-sm font-semibold text-white">Billing Address</p>
              </div>
              <div className="rounded-b border border-t-0 border-stroke px-3 py-3 dark:border-dark-3">
                <p className="text-sm font-semibold text-dark dark:text-white">{MOCK.billingName}</p>
                <p className="text-sm text-dark dark:text-white">{MOCK.billingAddress}</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Product Details</h4>
            </div>
            <div className="flex gap-5">
              <div className="flex-1 overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle w-8">#</th>
                      <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">Product Variety Code / Name</th>
                      <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">AT Number</th>
                      <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">HSN Code</th>
                      <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle w-10">UOM</th>
                      <th colSpan={5} className="border border-[#3aa88f] px-2 py-1 text-center font-semibold">Technical Specification</th>
                      <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle w-10">Unit</th>
                      <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">Unit Price (₹)</th>
                      <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">GST Amount (₹)</th>
                      <th rowSpan={2} className="border border-[#3aa88f] px-2 py-2 text-center font-semibold align-middle">Total Amount (₹)</th>
                    </tr>
                    <tr className="bg-[#2d8f7b] text-white">
                      <th className="border border-[#3aa88f] px-2 py-1 text-center font-medium">Length</th>
                      <th className="border border-[#3aa88f] px-2 py-1 text-center font-medium">Width</th>
                      <th className="border border-[#3aa88f] px-2 py-1 text-center font-medium">Warp Count</th>
                      <th className="border border-[#3aa88f] px-2 py-1 text-center font-medium">Weft Count</th>
                      <th className="border border-[#3aa88f] px-2 py-1 text-center font-medium">Reeds / Picks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_PRODUCTS.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.variety}</td>
                        <td className="border border-stroke px-2 py-2 dark:border-dark-3">{row.atNumber}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.hsnCode}</td>
                        <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{row.uom}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.length}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.width}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.warpCount}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.weftCount}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.reedsPicks}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.unit}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.unitPrice.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.gstAmount.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{row.totalAmount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right summary */}
              <div className="w-48 shrink-0">
                <div className="rounded border border-stroke bg-gray-50 p-3 text-xs dark:border-dark-3 dark:bg-dark-2">
                  <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-dark-3">
                    <span className="text-gray-600 dark:text-gray-400">Material Value (Without Tax)</span>
                    <span className="font-semibold text-dark dark:text-white">{materialValue.toFixed(2)}</span>
                  </div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">CGST 2.5%</span>
                    <span className="text-dark dark:text-white">{cgstTotal.toFixed(2)}</span>
                  </div>
                  <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-dark-3">
                    <span className="text-gray-600 dark:text-gray-400">SGST 2.5%</span>
                    <span className="text-dark dark:text-white">{sgstTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-dark dark:text-white">Total</span>
                    <span className="text-dark dark:text-white">{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GST Summary */}
          <div className="mb-5">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">GST Summary</h4>
            </div>
            <table className="w-full max-w-lg border-collapse text-xs">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-8 border border-[#3aa88f] px-2 py-2 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">HSN Code</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Unit</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Tax (%)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">CGST (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">SGST (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2 text-center font-semibold">Total Tax (₹)</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_GST.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-1.5 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-3 py-1.5 text-center dark:border-dark-3">{row.hsnCode}</td>
                    <td className="border border-stroke px-3 py-1.5 text-right dark:border-dark-3">{row.unit.toFixed(1)}</td>
                    <td className="border border-stroke px-3 py-1.5 text-right dark:border-dark-3">{row.taxPct.toFixed(1)}</td>
                    <td className="border border-stroke px-3 py-1.5 text-right dark:border-dark-3">{row.cgst.toFixed(2)}</td>
                    <td className="border border-stroke px-3 py-1.5 text-right dark:border-dark-3">{row.sgst.toFixed(2)}</td>
                    <td className="border border-stroke px-3 py-1.5 text-right dark:border-dark-3">{row.totalTax.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                  <td colSpan={4} className="border border-stroke px-3 py-1.5 text-right dark:border-dark-3">Total</td>
                  <td className="border border-stroke px-3 py-1.5 text-right dark:border-dark-3">{cgstTotal.toFixed(2)}</td>
                  <td className="border border-stroke px-3 py-1.5 text-right dark:border-dark-3">{sgstTotal.toFixed(2)}</td>
                  <td className="border border-stroke px-3 py-1.5 text-right dark:border-dark-3">{gstTaxTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Amount in words + signature */}
          <div className="mb-5 border border-stroke dark:border-dark-3">
            <table className="w-full text-xs">
              <tbody>
                <tr>
                  <td className="w-40 border-b border-r border-stroke bg-gray-100 px-3 py-2 font-semibold text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">Rupees in Words</td>
                  <td className="border-b border-stroke px-3 py-2 text-dark dark:border-dark-3 dark:text-white">{numToWords(grandTotal)}</td>
                </tr>
                <tr>
                  <td className="border-b border-r border-stroke bg-gray-100 px-3 py-2 font-semibold text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">Certified Terms</td>
                  <td className="border-b border-stroke px-3 py-2 dark:border-dark-3"></td>
                </tr>
                <tr>
                  <td className="border-r border-stroke bg-gray-100 px-3 py-2 font-semibold text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white">Signature of Society</td>
                  <td className="px-3 py-6 dark:border-dark-3"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Disclaimer */}
          <p className="mb-5 text-xs text-gray-500 dark:text-gray-400">
            * This is Computer Generated, No Manual Signature Required
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 print:hidden dark:border-dark-3">
            <button onClick={() => router.back()}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Cancel
            </button>
            <button onClick={handlePrint}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
