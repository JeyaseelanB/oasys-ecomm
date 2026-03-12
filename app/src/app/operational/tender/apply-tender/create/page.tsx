"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

interface TenderItem {
  id: number;
  itemCodeName: string;
  quantity: number;
  specifications: string;
  description: string;
  itemAmount: number;
  quotationAmount: number;
}

interface BidPaymentItem {
  id: number;
  feeType: string;
  actualFee: number;
  exemptedFee: number | null;
  feeToBePaid: number;
  paidFee: number;
}

interface UploadedDocument {
  id: number;
  documentName: string;
  file: File;
}

const MOCK_ITEMS: TenderItem[] = [];
const MOCK_BID_PAYMENT: BidPaymentItem[] = [];

export default function CreateApplyingTenderPage() {
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(true);
  const [tenderName, setTenderName] = useState("");
  const [tenderRefNumber, setTenderRefNumber] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [items] = useState<TenderItem[]>(MOCK_ITEMS);
  const [bidPayments] = useState<BidPaymentItem[]>(MOCK_BID_PAYMENT);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [uploadFileName, setUploadFileName] = useState("");
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalAmount = items.reduce((sum, i) => sum + i.itemAmount, 0);

  const ALLOWED_EXTENSIONS = ["png", "jpeg", "jpg", "pdf", "doc", "docx"];
  const MAX_FILE_SIZE_MB = 2;

  const handleUploadClick = () => {
    setUploadError("");
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    const fileSizeMB = file.size / (1024 * 1024);

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setUploadError("Invalid file format. Allowed: png, jpeg, pdf, doc");
      setUploadFileName("");
      e.target.value = "";
      return;
    }

    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      setUploadError("File size must be less than 2MB");
      setUploadFileName("");
      e.target.value = "";
      return;
    }

    setUploadError("");
    setUploadFileName(file.name);

    const newDoc: UploadedDocument = {
      id: Date.now(),
      documentName: file.name,
      file,
    };
    setDocuments(prev => [...prev, newDoc]);

    // Reset input so same file can be re-uploaded if needed
    e.target.value = "";
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const SectionIcon = () => (
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Applying Tender</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Tender</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Applying Tender</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Applying Tender</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/80">( <span className="text-red-300">*</span> Mandatory Fields)</span>
            <button
              onClick={() => setIsExpanded(prev => !prev)}
              className="flex size-5 items-center justify-center rounded bg-white/20 text-white hover:bg-white/30"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? "−" : "+"}
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Collapsible: Top Fields */}
          {isExpanded && (
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Tender Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Tender Name</label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                    </svg>
                  </div>
                  <select
                    value={tenderName}
                    onChange={e => setTenderName(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option>Trial Tender</option>
                    <option>Building Tender</option>
                  </select>
                </div>
              </div>

              {/* Tender Reference Number */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Tender Reference Number</label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
                      <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={tenderRefNumber}
                    onChange={e => setTenderRefNumber(e.target.value)}
                    readOnly
                    className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                </div>
              </div>

              {/* Supplier Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">
                  Supplier Name <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={supplierName}
                    onChange={e => setSupplierName(e.target.value)}
                    placeholder="Enter 2 letter"
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Tender Items List ── */}
          <div className="mb-2 flex items-center gap-2">
            <SectionIcon />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Tender Items List</h4>
          </div>
          <div className="mb-6 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Item Code / Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Quantity</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Specifications</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Description</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Item Amount (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Quotation Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="border border-stroke px-3 py-4 text-left text-sm text-gray-500 dark:border-dark-3">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    items.map((item: TenderItem, idx: number) => (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.itemCodeName}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.quantity}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.specifications}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.description}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.itemAmount.toFixed(2)}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">
                          <input
                            type="number"
                            defaultValue={item.quotationAmount}
                            className="w-full rounded border border-stroke bg-white px-2 py-1 text-right text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td colSpan={5} className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">Total Amount</td>
                    <td colSpan={2} className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">
                      {totalAmount > 0 ? totalAmount.toFixed(1) : "0.0"}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* ── Bid Payment Details ── */}
          <div className="mb-2 flex items-center gap-2">
            <SectionIcon />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Bid Payment Details</h4>
          </div>
          <div className="mb-6 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Fee Type</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Actual Fee (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Exempted Fee (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Fee To Be Paid (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Paid Fee (₹)</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bidPayments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="border border-stroke px-3 py-4 text-left text-sm text-gray-500 dark:border-dark-3">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    bidPayments.map((item: BidPaymentItem, idx: number) => (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.feeType}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.actualFee.toFixed(2)}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">
                          {item.exemptedFee !== null ? item.exemptedFee.toFixed(2) : ""}
                        </td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.feeToBePaid.toFixed(2)}</td>
                        <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">
                          <input
                            type="number"
                            defaultValue={item.paidFee}
                            className="w-full rounded border border-stroke bg-white px-2 py-1 text-right text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                          />
                        </td>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                          <button className="inline-flex items-center justify-center rounded bg-[#17a2b8] p-1.5 text-white hover:opacity-90">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Fee / Pre Qualification / Technical Qual / Finance Document Upload ── */}
          <div className="mb-2 flex items-center gap-2">
            <SectionIcon />
            <h4 className="text-sm font-semibold text-dark dark:text-white">
              Fee / Pre Qualification / Technical Qual / Finance Document Upload
            </h4>
          </div>
          <div className="mb-6 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">
                Upload Documents <span className="text-red-500">*</span>
              </label>

              {/* Hidden real file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpeg,.jpg,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex items-center gap-3">
                {/* Read-only text box showing selected file name */}
                <input
                  type="text"
                  readOnly
                  value={uploadFileName}
                  placeholder=""
                  className="w-64 rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                />
                {/* Upload button triggers hidden file input */}
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload
                </button>
              </div>

              {/* Validation error */}
              {uploadError ? (
                <p className="mt-1 text-xs text-red-500">{uploadError}</p>
              ) : (
                <p className="mt-1 text-xs text-red-500">
                  File format: png, jpeg, pdf, doc and file size should be less than 2MB
                </p>
              )}
            </div>

            {/* Documents table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#2d8f7b] text-white">
                    <th className="w-12 border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">#</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Document Name</th>
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="border border-stroke px-3 py-4 text-left text-sm text-gray-500 dark:border-dark-3">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    documents.map((doc: UploadedDocument, idx: number) => (
                      <tr key={doc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{doc.documentName}</td>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                          <button
                            type="button"
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="inline-flex items-center justify-center rounded bg-red-500 p-1.5 text-white hover:opacity-90"
                          >
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button
              type="button"
              onClick={() => router.push("/operational/tender/apply-tender/list")}
              className="flex items-center gap-1.5 rounded bg-[#6c757d] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}