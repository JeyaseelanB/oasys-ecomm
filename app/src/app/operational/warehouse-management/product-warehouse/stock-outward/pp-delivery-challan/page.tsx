"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface PPChallanProduct {
  id: number;
  sNo: number;
  productVarietyCodeName: string;
  hsnCode: string;
  uom: string;
  qty: number;
  ppRate: number;
  ppValue: number;
  cgstPct: number;
  cgstValue: number;
  sgstPct: number;
  sgstValue: number;
  totalValue: number;
}

const PP_PRODUCTS: PPChallanProduct[] = [
  { id: 1, sNo: 1, productVarietyCodeName: "ASWS/ANGAVAS SALEM WOVEN SILK PURE SILK", hsnCode: "50079090", uom: "NOS", qty: 2, ppRate: 5000.00, ppValue: 10000.00, cgstPct: 2.5, cgstValue: 250.00, sgstPct: 2.5, sgstValue: 250.00, totalValue: 10500.00 },
  { id: 2, sNo: 2, productVarietyCodeName: "BJR4/BEDSHEET", hsnCode: "63041990", uom: "NOS", qty: 2, ppRate: 800.00, ppValue: 1600.00, cgstPct: 2.5, cgstValue: 40.00, sgstPct: 2.5, sgstValue: 40.00, totalValue: 1680.00 },
  { id: 3, sNo: 3, productVarietyCodeName: "PCOT/COTTON SAREE", hsnCode: "52091100", uom: "NOS", qty: 1, ppRate: 2200.00, ppValue: 2200.00, cgstPct: 2.5, cgstValue: 55.00, sgstPct: 2.5, sgstValue: 55.00, totalValue: 2310.00 },
];

interface HSNSummary {
  hsnCode: string;
  description: string;
  qty: number;
  taxableValue: number;
  cgstPct: number;
  cgstValue: number;
  sgstPct: number;
  sgstValue: number;
  totalValue: number;
}

const HSN_SUMMARY: HSNSummary[] = [
  { hsnCode: "50079090", description: "WOVEN FABRICS OF SILK", qty: 2, taxableValue: 10000.00, cgstPct: 2.5, cgstValue: 250.00, sgstPct: 2.5, sgstValue: 250.00, totalValue: 10500.00 },
  { hsnCode: "63041990", description: "BEDSPREADS", qty: 2, taxableValue: 1600.00, cgstPct: 2.5, cgstValue: 40.00, sgstPct: 2.5, sgstValue: 40.00, totalValue: 1680.00 },
  { hsnCode: "52091100", description: "COTTON WOVEN FABRICS", qty: 1, taxableValue: 2200.00, cgstPct: 2.5, cgstValue: 55.00, sgstPct: 2.5, sgstValue: 55.00, totalValue: 2310.00 },
];

export default function PPDeliveryChallanPage() {
  const router = useRouter();

  const totalQty = PP_PRODUCTS.reduce((s, p) => s + p.qty, 0);
  const totalPPValue = PP_PRODUCTS.reduce((s, p) => s + p.ppValue, 0);
  const totalCGST = PP_PRODUCTS.reduce((s, p) => s + p.cgstValue, 0);
  const totalSGST = PP_PRODUCTS.reduce((s, p) => s + p.sgstValue, 0);
  const grandTotal = PP_PRODUCTS.reduce((s, p) => s + p.totalValue, 0);

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">PP Delivery Challan</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Warehouse Management</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Product Warehouse</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">PP Delivery Challan</li>
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
          <p className="text-sm text-gray-600 dark:text-gray-400">(PP Rate - Transfer of Stock with GST)</p>
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
          <div><span className="font-semibold text-dark dark:text-white">Challan No:</span> <span className="text-dark dark:text-white">PPDC-2026-362484</span></div>
          <div><span className="font-semibold text-dark dark:text-white">Date:</span> <span className="text-dark dark:text-white">04-Mar-2026</span></div>
          <div><span className="font-semibold text-dark dark:text-white">Stock Outward #:</span> <span className="text-dark dark:text-white">2026-362484</span></div>
        </div>

        {/* Product Table - PP Rate with GST */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-bold text-dark dark:text-white">Product Details (PP Rate with GST)</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">S.No</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Product Variety Code / Name</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">HSN Code</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">UOM</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Qty</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">PP Rate</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">PP Value</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">CGST %</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">CGST Value</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">SGST %</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">SGST Value</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {PP_PRODUCTS.map((p, idx) => (
                  <tr key={p.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{p.sNo}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3">{p.productVarietyCodeName}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{p.hsnCode}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{p.uom}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{p.qty}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{p.ppRate.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{p.ppValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{p.cgstPct}%</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{p.cgstValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{p.sgstPct}%</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{p.sgstValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{p.totalValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold dark:bg-[#1a2232]">
                  <td colSpan={4} className="border border-stroke px-2 py-2 text-right dark:border-dark-3">Total</td>
                  <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{totalQty}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totalPPValue.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totalCGST.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{totalSGST.toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{grandTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* HSN Summary with GST */}
        <div className="mb-6">
          <h4 className="mb-2 text-sm font-bold text-dark dark:text-white">HSN / Product Code Summary</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">HSN Code</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Description</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Qty</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Taxable Value</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">CGST %</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">CGST Value</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">SGST %</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">SGST Value</th>
                  <th className="border border-[#3aa88f] px-2 py-2 text-center font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {HSN_SUMMARY.map((h, idx) => (
                  <tr key={h.hsnCode} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{h.hsnCode}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3">{h.description}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{h.qty}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{h.taxableValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{h.cgstPct}%</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{h.cgstValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{h.sgstPct}%</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{h.sgstValue.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{h.totalValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold dark:bg-[#1a2232]">
                  <td colSpan={2} className="border border-stroke px-2 py-2 text-right dark:border-dark-3">Total</td>
                  <td className="border border-stroke px-2 py-2 text-center dark:border-dark-3">{HSN_SUMMARY.reduce((s, h) => s + h.qty, 0)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{HSN_SUMMARY.reduce((s, h) => s + h.taxableValue, 0).toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{HSN_SUMMARY.reduce((s, h) => s + h.cgstValue, 0).toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{HSN_SUMMARY.reduce((s, h) => s + h.sgstValue, 0).toFixed(2)}</td>
                  <td className="border border-stroke px-2 py-2 text-right dark:border-dark-3">{HSN_SUMMARY.reduce((s, h) => s + h.totalValue, 0).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Amount in Words */}
        <div className="mb-6 rounded border border-stroke p-3 dark:border-dark-3">
          <div className="grid grid-cols-1 gap-2 text-sm text-dark dark:text-white">
            <p><span className="font-semibold">Taxable Amount:</span> Rs. {totalPPValue.toFixed(2)}</p>
            <p><span className="font-semibold">CGST:</span> Rs. {totalCGST.toFixed(2)}</p>
            <p><span className="font-semibold">SGST:</span> Rs. {totalSGST.toFixed(2)}</p>
            <p><span className="font-semibold">Grand Total:</span> Rs. {grandTotal.toFixed(2)}</p>
            <p><span className="font-semibold">Amount in Words:</span> Rupees Fourteen Thousand Four Hundred and Ninety Only</p>
          </div>
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
