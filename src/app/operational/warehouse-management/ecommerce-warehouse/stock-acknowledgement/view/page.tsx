"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductViewItem {
  id: number;
  productVarietyCodeName: string;
  societyCodeName: string;
  uom: string;
  hsnCode: string;
  unitRate: number;
  receivedQuantity: number;
  totalRate: number;
  taxPercent: number;
  taxValue: number;
  netValue: number;
}

const MOCK_PRODUCTS: ProductViewItem[] = [
  { id: 1, productVarietyCodeName: "ECU2 / EX...", societyCodeName: "292178 / PA...", uom: "NOS", hsnCode: "63049291", unitRate: 870.00, receivedQuantity: 1.00, totalRate: 870.00, taxPercent: 0, taxValue: 0, netValue: 870.00 },
  { id: 2, productVarietyCodeName: "ECU2 / EX...", societyCodeName: "292178 / PA...", uom: "NOS", hsnCode: "63049291", unitRate: 870.00, receivedQuantity: 1.00, totalRate: 870.00, taxPercent: 0, taxValue: 0, netValue: 870.00 },
  { id: 3, productVarietyCodeName: "ECU2 / EX...", societyCodeName: "292178 / PA...", uom: "NOS", hsnCode: "63049291", unitRate: 850.00, receivedQuantity: 1.00, totalRate: 850.00, taxPercent: 0, taxValue: 0, netValue: 850.00 },
  { id: 4, productVarietyCodeName: "ECU2 / EX...", societyCodeName: "292178 / PA...", uom: "NOS", hsnCode: "63049291", unitRate: 900.00, receivedQuantity: 1.00, totalRate: 900.00, taxPercent: 0, taxValue: 0, netValue: 900.00 },
];

export default function ViewStockAcknowledgementPage() {
  const router = useRouter();

  const totalReceived = MOCK_PRODUCTS.reduce((s, p) => s + p.receivedQuantity, 0);
  const totalRate = MOCK_PRODUCTS.reduce((s, p) => s + p.totalRate, 0);
  const totalTaxPercent = MOCK_PRODUCTS.reduce((s, p) => s + p.taxPercent, 0);
  const totalTaxValue = MOCK_PRODUCTS.reduce((s, p) => s + p.taxValue, 0);
  const totalNetValue = MOCK_PRODUCTS.reduce((s, p) => s + p.netValue, 0);
  const materialValue = totalRate;
  const cgst = 87.28;
  const sgst = 87.28;
  const netTotal = totalNetValue;

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Stock Acknowledgement</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Ecommerce Warehouse</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Stock Acknowledgement</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Ecommerce Stock Acknowledgement</h3>
          <button className="text-white hover:opacity-80">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
        <div className="p-5">
          {/* Info Labels */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">Stock Inward Number</p>
              <p className="text-sm font-medium text-[#17a2b8]">2024-362254</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Received Date</p>
              <p className="text-sm font-medium text-[#17a2b8]">30-Dec-2024</p>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* Product wise Details */}
          <div className="mt-5 mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Product wise Details</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Society Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">UOM</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">HSN Code</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Unit Rate (&#8377;)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Received Quantity</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Rate (&#8377;)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Tax (%)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Tax Value(&#8377;)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Net Value(&#8377;)</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PRODUCTS.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-2 py-2 text-center text-[#17a2b8] dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 text-dark dark:border-dark-3 dark:text-white">{item.productVarietyCodeName}</td>
                      <td className="border border-stroke px-2 py-2 text-dark dark:border-dark-3 dark:text-white">{item.societyCodeName}</td>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{item.uom}</td>
                      <td className="border border-stroke px-2 py-2 text-center text-dark dark:border-dark-3 dark:text-white">{item.hsnCode}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.unitRate.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.receivedQuantity.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.totalRate.toFixed(2)}</td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white"></td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white"></td>
                      <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{item.netValue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">Total</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white"></td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalReceived.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalRate.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalTaxPercent.toFixed(1)}</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalTaxValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{totalNetValue.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-dark">
                    <td colSpan={10} className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">Material Value(Without Tax)(&#8377;):</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{materialValue.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-dark">
                    <td colSpan={10} className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">CGST(&#8377;)</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{cgst.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-dark">
                    <td colSpan={10} className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">SGST(&#8377;)</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{sgst.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-dark">
                    <td colSpan={10} className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">Net Total(&#8377;)</td>
                    <td className="border border-stroke px-2 py-2 text-right font-semibold text-dark dark:border-dark-3 dark:text-white">{netTotal.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Bundle Details */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <h4 className="text-sm font-semibold text-dark dark:text-white">Bundle Details</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Bundle Number</p><p className="text-sm font-medium text-dark dark:text-white">1</p></div>
                <div><p className="text-xs text-gray-500">Total Bundle Weight</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
              </div>
            </div>
          </div>

          {/* Transport Details */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              <h4 className="text-sm font-semibold text-dark dark:text-white">Transport Details</h4>
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">Transport Service Type</p><p className="text-sm font-medium text-dark dark:text-white">/</p></div>
              <div><p className="text-xs text-gray-500">Transport Service Name</p><p className="text-sm font-medium text-[#17a2b8]">PERDEV / Personal Delivery</p></div>
              <div><p className="text-xs text-gray-500">Waybill Available</p><p className="text-sm font-medium text-[#17a2b8]">No</p></div>
              <div><p className="text-xs text-gray-500">Waybill Number</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div><p className="text-xs text-gray-500">Transport Charge Available</p><p className="text-sm font-medium text-[#17a2b8]">No</p></div>
              <div><p className="text-xs text-gray-500">Transport Charge Type</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
              <div><p className="text-xs text-gray-500">Transport Charge Amount</p><p className="text-sm font-medium text-dark dark:text-white">-</p></div>
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/warehouse-management/ecommerce-warehouse/stock-acknowledgement/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
