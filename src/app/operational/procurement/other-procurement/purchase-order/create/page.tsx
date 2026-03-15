"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* ── tiny helpers ─────────────────────────────────────────────────── */
const IconBox = ({ children }: { children: React.ReactNode }) => (
  <span className="flex h-[38px] w-9 shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 text-gray-500 dark:border-dark-3 dark:bg-gray-700">
    {children}
  </span>
);

const CalBox = () => (
  <span className="flex h-[38px] w-9 shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#2d8f7b] text-white dark:border-dark-3">
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  </span>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mb-4 flex items-center gap-2">
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
    <h4 className="text-sm font-semibold text-dark dark:text-white">{title}</h4>
  </div>
);

const inputCls = "h-[38px] w-full rounded border border-stroke bg-white px-3 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white";
const selectCls = "h-[38px] w-full rounded border border-stroke bg-white px-3 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white";
const labelCls = "mb-1 block text-xs font-medium text-dark dark:text-white";

/* ── GST summary mock ─────────────────────────────────────────────── */
interface GstRow { hsnCode: string; unit: number; tax: number; cgst: number; sgst: number; totalTax: number; }
const GST_ROWS: GstRow[] = [];

/* ── product variety rows ─────────────────────────────────────────── */
interface ProductRow {
  id: number; variety: string; uom: string; hsnCode: string;
  plannedUnit: number; alreadyIssued: number; currentUnit: number;
  balanceUnit: number; unitRate: number; totalAmount: number;
  tax: number; taxAmount: number; netAmount: number;
}
const INITIAL_ROWS: ProductRow[] = [];

/* ══════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════ */
export default function CreatePurchaseOrderPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/purchase-order";

  /* header fields */
  const [planType, setPlanType]     = useState("");
  const [planCode, setPlanCode]     = useState("");
  const [society, setSociety]       = useState("");
  const [shippingAddr, setShipping] = useState("");
  const [billingAddr, setBilling]   = useState("");
  const [validityDate, setValidity] = useState("");
  const [deliveryDate, setDelivery] = useState("");

  /* product rows */
  const [rows, setRows] = useState<ProductRow[]>(INITIAL_ROWS);

  /* forward */
  const [forwardTo, setForwardTo]   = useState("");
  const [forwardFor, setForwardFor] = useState("");

  /* create note modal */
  const [showNote, setShowNote] = useState(false);

  const totalAmount = rows.reduce((s, r) => s + r.totalAmount, 0);
  const totalNetAmt = rows.reduce((s, r) => s + r.netAmount, 0);
  const totalTaxAmt = rows.reduce((s, r) => s + r.taxAmount, 0);

  return (
    <div className="mx-auto">
      {/* ── breadcrumb ── */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Purchase Order</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Create Purchase Order</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* card header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#17a2b8] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Create Purchase Order</h3>
          <button className="text-white hover:opacity-80">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        <div className="p-5">
          {/* ── Row 1: Plan Type | Plan Code/Name | Society Code/Name | Clear+Search ── */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Plan Type */}
            <div>
              <label className={labelCls}>Plan Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </IconBox>
                <select value={planType} onChange={e => setPlanType(e.target.value)} className={`${selectCls} rounded-l-none`}>
                  <option value="">-- Select --</option>
                  <option>Government Scheme</option>
                  <option>Contract</option>
                  <option>Export</option>
                  <option>Additional</option>
                  <option>Retail</option>
                </select>
              </div>
            </div>

            {/* Plan Code/Name */}
            <div>
              <label className={labelCls}>Plan Code / Name <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/>
                  </svg>
                </IconBox>
                <select value={planCode} onChange={e => setPlanCode(e.target.value)} className={`${selectCls} rounded-l-none`}>
                  <option value="">-- Select --</option>
                  <option>test plan 2023-24</option>
                </select>
              </div>
            </div>

            {/* Society Code/Name */}
            <div>
              <label className={labelCls}>Society Code / Name</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </IconBox>
                <select value={society} onChange={e => setSociety(e.target.value)} className={`${selectCls} rounded-l-none`}>
                  <option value="">-- Select --</option>
                  <option>352047 / AMMAPET WEAVERS COOP. SOCIETY S.532</option>
                </select>
              </div>
            </div>

            {/* Clear + Search */}
            <div className="flex items-end gap-2">
              <button className="flex h-[38px] items-center gap-1.5 rounded bg-[#6c757d] px-4 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Clear
              </button>
              <button className="flex h-[38px] items-center gap-1.5 rounded bg-[#17a2b8] px-4 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* ── Row 2: Shipping | Billing | Validity Date | Delivery Date ── */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Shipping Address */}
            <div>
              <label className={labelCls}>Shipping Address <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </IconBox>
                <select value={shippingAddr} onChange={e => setShipping(e.target.value)} className={`${selectCls} rounded-l-none`}>
                  <option value="">-- Select --</option>
                  <option>NO.212, GANDHI ROAD, GANDHI ROAD, CHITTOOR</option>
                </select>
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <label className={labelCls}>Billing Address <span className="text-red-500">*</span></label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </IconBox>
                <select value={billingAddr} onChange={e => setBilling(e.target.value)} className={`${selectCls} rounded-l-none`}>
                  <option value="">-- Select --</option>
                </select>
              </div>
            </div>

            {/* Purchase Order Validity Date */}
            <div>
              <label className={labelCls}>Purchase Order Validity Date</label>
              <div className="flex">
                <input type="date" value={validityDate} onChange={e => setValidity(e.target.value)}
                  className={`${inputCls} rounded-r-none`} />
                <CalBox />
              </div>
            </div>

            {/* Expected Date of Delivery */}
            <div>
              <label className={labelCls}>Expected Date of Delivery</label>
              <div className="flex">
                <input type="date" value={deliveryDate} onChange={e => setDelivery(e.target.value)}
                  className={`${inputCls} rounded-r-none`} />
                <CalBox />
              </div>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ══ Product Variety Details ══ */}
          <div className="mt-5">
            <SectionHeader title="Product Variety Details" />
            <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Product Variety Code / Name</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">UOM</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">HSN Code</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Planned Unit</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Already Issued Units</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Current Unit</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Balance Unit</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Unit Rate (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Amount (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Tax (%)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Tax Amount (₹)</th>
                    <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Net Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={13} className="border border-stroke px-4 py-6 text-center text-sm text-gray-400 dark:border-dark-3">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    rows.map((r, idx) => (
                      <tr key={r.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{idx + 1}</td>
                        <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{r.variety}</td>
                        <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3 dark:text-white">{r.uom}</td>
                        <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3 dark:text-white">{r.hsnCode}</td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3 dark:text-white">{r.plannedUnit}</td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3 dark:text-white">{r.alreadyIssued}</td>
                        <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3">
                          <input type="number" defaultValue={r.currentUnit} className="w-16 rounded border border-stroke px-1 text-right text-sm dark:border-dark-3 dark:bg-gray-dark dark:text-white" />
                        </td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3 dark:text-white">{r.balanceUnit}</td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3 dark:text-white">{r.unitRate.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3 dark:text-white">{r.totalAmount.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3 dark:text-white">{r.tax.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3 dark:text-white">{r.taxAmount.toFixed(2)}</td>
                        <td className="border border-stroke px-2 py-2 text-right align-middle dark:border-dark-3 dark:text-white">{r.netAmount.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                    <td colSpan={9} className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total :</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalAmount.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 dark:border-dark-3"></td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalTaxAmt.toFixed(2)}</td>
                    <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">{totalNetAmt.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-dark-3"></div>

          {/* ══ GST Summary + Terms & Conditions ══ */}
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* GST Summary – 2 cols */}
              <div className="md:col-span-2">
                <SectionHeader title="GST Summary" />
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#2d8f7b] text-white">
                        <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">HSN Code</th>
                        <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Unit</th>
                        <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Tax (%)</th>
                        <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">CGST (₹)</th>
                        <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">SGST (₹)</th>
                        <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Total Tax Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {GST_ROWS.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="border border-stroke px-4 py-6 text-center text-sm text-gray-400 dark:border-dark-3">
                            No records found
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-100 font-semibold dark:bg-[#1a2232]">
                        <td colSpan={3} className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">Total :</td>
                        <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">0.00</td>
                        <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">0.00</td>
                        <td className="border border-stroke px-2 py-2 text-right text-dark dark:border-dark-3 dark:text-white">0.00</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Terms & Conditions – 1 col */}
              <div>
                <SectionHeader title="Terms &amp; Conditions" />
                <textarea
                  rows={6}
                  placeholder="Enter terms and conditions..."
                  className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                />
                <div className="mt-3 rounded border border-stroke p-3 dark:border-dark-3">
                  <div className="flex justify-between text-sm text-gray-400 dark:text-gray-500">
                    <span>No records found</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm font-semibold text-dark dark:text-white">
                    <span>Total</span>
                    <span>0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-stroke dark:border-dark-3"></div>

          {/* ── Forward To / For ── */}
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelCls}>Forward To</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="5,12 19,12"/><polyline points="13,6 19,12 13,18"/>
                  </svg>
                </IconBox>
                <input type="text" value={forwardTo} onChange={e => setForwardTo(e.target.value)}
                  placeholder="Forward to..." className={`${inputCls} rounded-l-none`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Forward For</label>
              <div className="flex">
                <IconBox>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="5,12 19,12"/><polyline points="13,6 19,12 13,18"/>
                  </svg>
                </IconBox>
                <select value={forwardFor} onChange={e => setForwardFor(e.target.value)}
                  className={`${selectCls} rounded-l-none`}>
                  <option value="">-- Select --</option>
                  <option>Approval</option>
                  <option>Review</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Bottom action bar ── */}
          <div className="mt-6 flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button
              onClick={() => setShowNote(true)}
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create Note
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push(`${basePath}/list`)}
                className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Cancel
              </button>
              <button onClick={() => router.push(`${basePath}/preview`)}
                className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="6,9 6,2 18,2 18,9"/><path d="M6,18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                  <rect x="6" y="14" width="12" height="8"/>
                </svg>
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ CREATE NOTE MODAL ══════ */}
      {showNote && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-2xl dark:bg-gray-dark">
            {/* modal header */}
            <div className="flex items-center justify-between rounded-t-lg bg-[#17a2b8] px-5 py-3">
              <h3 className="text-sm font-semibold text-white">Create Note</h3>
              <button onClick={() => setShowNote(false)} className="text-white hover:opacity-80">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* rich text toolbar */}
              <div className="mb-2 flex flex-wrap items-center gap-1 rounded border border-stroke bg-gray-50 px-2 py-1.5 dark:border-dark-3 dark:bg-gray-700">
                {["B","I","U"].map(f => (
                  <button key={f} className={`flex h-7 w-7 items-center justify-center rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${f === "B" ? "font-bold" : f === "I" ? "italic" : "underline"}`}>{f}</button>
                ))}
                <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-gray-600"/>
                {["left","center","right"].map(a => (
                  <button key={a} className="flex h-7 w-7 items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      {a === "left"   && <><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></>}
                      {a === "center" && <><line x1="3" y1="6"  x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></>}
                      {a === "right"  && <><line x1="3" y1="6"  x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></>}
                    </svg>
                  </button>
                ))}
                <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-gray-600"/>
                <select className="h-7 rounded border border-stroke bg-white px-1 text-xs dark:border-dark-3 dark:bg-gray-dark dark:text-white">
                  <option>Normal</option><option>Heading 1</option><option>Heading 2</option>
                </select>
              </div>
              {/* note textarea */}
              <textarea rows={5}
                className="mb-4 w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark focus:border-[#2d8f7b] focus:outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                placeholder="Write your note here..."
              />
              {/* Created By card */}
              <div className="mb-6">
                <div className="inline-block rounded border border-[#FFA70B] p-4">
                  <h5 className="mb-2 text-center text-sm font-semibold text-dark dark:text-white">Created By</h5>
                  <div className="space-y-1 text-sm text-dark dark:text-white">
                    <p>Name : SANKARANARAYANAN</p>
                    <p>Designation : ASSISTANT SALES MAN</p>
                    <p>Date : 12-Mar-2026</p>
                  </div>
                </div>
              </div>
              {/* footer */}
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => setShowNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20,6 9,17 4,12"/></svg>
                  Save
                </button>
                <button onClick={() => setShowNote(false)}
                  className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
