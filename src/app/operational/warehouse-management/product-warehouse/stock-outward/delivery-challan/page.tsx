"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface ChallanProduct {
  id: number;
  sNo: number;
  productVarietyCodeName: string;
  hsnCode: string;
  uom: string;
  qty: number;
  rpRate: number;
  rpValue: number;
}

const CHALLAN_PRODUCTS: ChallanProduct[] = [
  { id: 1, sNo: 1, productVarietyCodeName: "ASWS/ANGAVAS SALEM WOVEN SILK PURE SILK", hsnCode: "50079090", uom: "NOS", qty: 2, rpRate: 8510.00, rpValue: 17020.00 },
  { id: 2, sNo: 2, productVarietyCodeName: "BJR4/BEDSHEET", hsnCode: "63041990", uom: "NOS", qty: 2, rpRate: 1250.00, rpValue: 2500.00 },
  { id: 3, sNo: 3, productVarietyCodeName: "PCOT/COTTON SAREE", hsnCode: "52091100", uom: "NOS", qty: 1, rpRate: 3500.00, rpValue: 3500.00 },
];

interface HSNSummary {
  hsnCode: string;
  description: string;
  qty: number;
  value: number;
}

const HSN_SUMMARY: HSNSummary[] = [
  { hsnCode: "50079090", description: "WOVEN FABRICS OF SILK", qty: 2, value: 17020.00 },
  { hsnCode: "63041990", description: "BEDSPREADS", qty: 2, value: 2500.00 },
  { hsnCode: "52091100", description: "COTTON WOVEN FABRICS", qty: 1, value: 3500.00 },
];

export default function DeliveryChallanPage() {
  const router = useRouter();

  const totalQty = CHALLAN_PRODUCTS.reduce((s, p) => s + p.qty, 0);
  const totalRPValue = CHALLAN_PRODUCTS.reduce((s, p) => s + p.rpValue, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Delivery Challan</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Product Warehouse</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Delivery Challan</li>
          </ol>
        </nav>
      </div>

      {/* Print-style Document */}
      <div className="rounded-[10px] border border-stroke bg-white p-8 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Document Header */}
        <div className="mb-6 border-b-2 border-dark pb-4 text-center dark:border-gray-500">
          <h1 className="text-xl font-bold text-dark dark:text-white">CO-OPTEX</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">TAMILNADU HANDLOOM WEAVERS CO-OPERATIVE SOCIETY LTD</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Regd. Office: 816, Anna Salai, Chennai - 600002</p>
          <h2 className="mt-3 text-lg font-bold text-dark dark:text-white">DELIVERY CHALLAN</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">(RP Rate - Transfer of Stock)</p>
        </div>

        {/* Challan Info */}
        <div className="mb-6 grid grid-cols-2 gap-6">
          <div>
            <div className="mb-3 rounded bg-gray-100 px-3 py-2 dark:bg-dark-2">
              <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">From (Transferor)</h4>
            </div>
            <div className="space-y-1 text-sm text-dark dark:text-white">
              <p><span className="font-semibold">Code:</span> 2381</p>
              <p><span className="font-semibold">Name:</span> PWH CHENNIMALAI</p>
              <p><span className="font-semibold">Address:</span> 15&17 PATEL STREET, INGUR ROAD, CHENNIMALAI, NAMAKKAL, TAMIL NADU - 637001</p>
              <p><span className="font-semibold">GSTIN:</span> 33AAAAT0212G1ZZ</p>
            </div>
          </div>
          <div>
            <div className="mb-3 rounded bg-gray-100 px-3 py-2 dark:bg-dark-2">
              <h4 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">To (Transferee)</h4>
            </div>
            <div className="space-y-1 text-sm text-dark dark:text-white">
              <p><span className="font-semibold">Code:</span> 1185</p>
              <p><span className="font-semibold">Name:</span> DWH - COIMBATORE</p>
              <p><span className="font-semibold">Address:</span> 1056, AVINASHI ROAD, COIMBATORE, TAMIL NADU - 641018</p>
              <p><span className="font-semibold">GSTIN:</span> 33AAAAT0212G1ZZ</p>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-4 rounded border border-stroke p-3 text-sm dark:border-dark-3">
          <div><span className="font-semibold text-dark dark:text-white">Challan No:</span> <span className="text-dark dark:text-white">DC-2026-362484</span></div>
          <div><span className="font-semibold text-dark dark:text-white">Date:</span> <span className="text-dark dark:text-white">04-Mar-2026</span></div>
          <div><span className="font-semibold text-dark dark:text-white">Stock Outward #:</span> <span className="text-dark dark:text-white">2026-362484</span></div>
        </div>

        {/* Product Table - RP Rate */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-bold text-dark dark:text-white">Product Details (RP Rate)</h4>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">S.No</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Product Variety Code / Name</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">HSN Code</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">UOM</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Qty</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">RP Rate</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">RP Value</th>
              </tr>
            </thead>
            <tbody>
              {CHALLAN_PRODUCTS.map((p, idx) => (
                <tr key={p.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                  <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{p.sNo}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3">{p.productVarietyCodeName}</td>
                  <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{p.hsnCode}</td>
                  <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{p.uom}</td>
                  <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{p.qty}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{p.rpRate.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{p.rpValue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold dark:bg-[#1a2232]">
                <td colSpan={4} className="border border-stroke px-2 py-2 text-right dark:border-dark-3">Total</td>
                <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{totalQty}</td>
                <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totalRPValue.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* HSN Summary */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-bold text-dark dark:text-white">HSN / Product Code Summary</h4>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#2d8f7b] text-white">
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">HSN Code</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Description</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Qty</th>
                <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              {HSN_SUMMARY.map((h, idx) => (
                <tr key={h.hsnCode} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                  <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{h.hsnCode}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3">{h.description}</td>
                  <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{h.qty}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{h.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold dark:bg-[#1a2232]">
                <td colSpan={2} className="border border-stroke px-2 py-2 text-right dark:border-dark-3">Total</td>
                <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{HSN_SUMMARY.reduce((s, h) => s + h.qty, 0)}</td>
                <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{HSN_SUMMARY.reduce((s, h) => s + h.value, 0).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Amount in Words */}
        <div className="mb-6 rounded border border-stroke p-3 dark:border-dark-3">
          <p className="text-sm text-dark dark:text-white"><span className="font-semibold">Amount in Words:</span> Rupees Twenty Three Thousand and Twenty Only</p>
        </div>

        {/* Signature Sections */}
        <div className="mb-6 grid grid-cols-3 gap-6 pt-8">
          <div className="text-center">
            <div className="mb-12 border-b border-dashed border-gray-400"></div>
            <p className="text-sm font-semibold text-dark dark:text-white">Prepared By</p>
          </div>
          <div className="text-center">
            <div className="mb-12 border-b border-dashed border-gray-400"></div>
            <p className="text-sm font-semibold text-dark dark:text-white">Checked By</p>
          </div>
          <div className="text-center">
            <div className="mb-12 border-b border-dashed border-gray-400"></div>
            <p className="text-sm font-semibold text-dark dark:text-white">Authorized Signatory</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-stroke pt-4 dark:border-dark-3">
          <button onClick={() => router.push("/operational/warehouse-management/product-warehouse/stock-outward/list")} className="rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">Cancel</button>
          <button onClick={() => window.print()} className="rounded bg-[#007bff] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
            <span className="flex items-center gap-1.5">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
