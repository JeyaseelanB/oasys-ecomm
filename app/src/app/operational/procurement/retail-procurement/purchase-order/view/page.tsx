"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK = {
  planCode: "RPPY1818-8 / Plan for Co-Optex",
  procurementOrderNo: "SPH18T03",
  societyCode: "352254 / MURUGAN SILK WEAVERS COOP. SOCIETY SA.89",
  supplyRateConf: "352254-SQY19FEB-5",
  shippingAddress: "Cooptex Product Warehouse, 343, Bazaar Street, Salem, SALEM, SALEM, TAMIL NADU - 636003",
  billingAddress: "350 PANTHEON ROAD , BALASUNDARAM BUILDING, NEAR MUSEAM, CHENNAI, EGMORE, CHENNAI, TAMIL NADU - 600008",
  validDate: "11-Feb-2019",
  expectedDelivery: "15-Feb-2019",
};

const MOCK_PRODUCTS = [
  { id: 1, variety: "SSLB / SALEM SILK SAREE WITH BLOUSE", atNumber: "352254-Feb2019-173", uom: "NOS", hsnCode: "50072010", unit: 1, unitPrice: 3000.00, taxPct: 5, taxAmount: 150.00, totalAmount: 3150.00 },
];

const MOCK_GST = [
  { id: 1, hsnCode: "50072010", unit: 1.0, taxPct: 2.5, cgst: 75.00, sgst: 75.00, totalTax: 150.00 },
];

const materialValue = MOCK_PRODUCTS.reduce((s, r) => s + r.unitPrice * r.unit, 0);
const cgstTotal = MOCK_GST.reduce((s, r) => s + r.cgst, 0);
const sgstTotal = MOCK_GST.reduce((s, r) => s + r.sgst, 0);
const gstTaxTotal = MOCK_GST.reduce((s, r) => s + r.totalTax, 0);
const netTotal = materialValue + gstTaxTotal;

const SectionHeader = ({ label }: { label: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{label}</h4>
  </div>
);

export default function ViewPurchaseOrderPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Purchase Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Retail Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Purchase Order</li>
          </ol>
        </nav>
      </div>

      {/* Main card */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Purchase Order Details</h3>
          <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>

        <div className="p-5">
          {/* Header fields */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">Plan Code / Name</p>
              <p className="text-sm font-medium text-[#17a2b8]">{MOCK.planCode}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">Procurement Order Number</p>
              <p className="text-sm font-medium text-[#17a2b8]">{MOCK.procurementOrderNo}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">Society Code / Name</p>
              <p className="text-sm font-medium text-[#17a2b8]">{MOCK.societyCode}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">Supply Rate Confirmation</p>
              <p className="text-sm font-medium text-[#17a2b8]">{MOCK.supplyRateConf}</p>
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Product Details */}
          <SectionHeader label="Product Details" />
          <div className="mb-5 flex gap-5">
            <div className="flex-1 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">AT Number</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">UOM</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">HSN Code</th>
                    <th className="w-16 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Unit</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Unit Price (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Tax (%)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Tax Amount (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Total Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PRODUCTS.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.variety}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{row.atNumber}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.uom}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.hsnCode}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.unit}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.unitPrice.toFixed(2)}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.taxPct}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.taxAmount.toFixed(2)}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right summary */}
            <div className="w-52 shrink-0">
              <div className="rounded border border-stroke bg-gray-50 p-3 text-sm dark:border-dark-3 dark:bg-dark-2">
                <div className="mb-2 flex justify-between border-b border-stroke pb-2 dark:border-dark-3">
                  <span className="text-gray-600 dark:text-gray-400">Material Value (Without Tax):</span>
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
                  <span className="text-dark dark:text-white">Net Total</span>
                  <span className="text-dark dark:text-white">{netTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* GST Summary */}
          <SectionHeader label="GST Summary" />
          <div className="mb-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">HSN Code</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Unit</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Tax (%)</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">CGST (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">SGST (₹)</th>
                  <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Total Tax (₹)</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_GST.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                    <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{row.hsnCode}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.unit.toFixed(1)}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.taxPct.toFixed(1)}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.cgst.toFixed(2)}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.sgst.toFixed(2)}</td>
                    <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{row.totalTax.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                  <td colSpan={4} className="border border-stroke px-3 py-2 text-right dark:border-dark-3">Total</td>
                  <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{cgstTotal.toFixed(2)}</td>
                  <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{sgstTotal.toFixed(2)}</td>
                  <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{gstTaxTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mb-5 border-t border-stroke dark:border-dark-3"></div>

          {/* Address + Date fields */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">Shipping Address</p>
              <p className="text-sm font-medium text-[#17a2b8]">{MOCK.shippingAddress}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">Billing Address</p>
              <p className="text-sm font-medium text-[#17a2b8]">{MOCK.billingAddress}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">Purchase Order Valid Date</p>
              <p className="text-sm font-medium text-[#17a2b8]">{MOCK.validDate}</p>
            </div>
            <div>
              <p className="mb-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">Expected Date of Delivery</p>
              <p className="text-sm font-medium text-[#17a2b8]">{MOCK.expectedDelivery}</p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-5">
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">Terms & Conditions</p>
            <textarea readOnly rows={4} className="w-full rounded border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/procurement/retail-procurement/purchase-order/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>
              Back
            </button>
            <button onClick={() => router.push("/operational/procurement/retail-procurement/purchase-order/preview")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
