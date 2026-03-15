"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TenderItem {
  id: number;
  itemCodeName: string;
  quantity: number;
  specifications: string;
  description: string;
  itemAmount: number;
}

interface UploadedDocument {
  id: number;
  documentName: string;
}

const MOCK_ITEMS: TenderItem[] = [
  { id: 1, itemCodeName: "PKW1 / Pure Zari Silk Pavadai 50Cmx120mt", quantity: 12.00, specifications: "trial", description: "trial", itemAmount: 1000.00 },
];

const MOCK_DOCUMENTS: UploadedDocument[] = [];

const TENDER_TYPE_OPTIONS = ["Open Tender", "Limited Tender", "Single Tender", "Global Tender"];
const COVER_TYPE_OPTIONS = ["fee", "technical", "financial"];
const DOCUMENT_TYPE_OPTIONS = ["pdf", "doc", "xls"];
const EMD_FEE_TYPE_OPTIONS = ["fixed", "percentage"];
const EMD_PAYMENT_MODE_OPTIONS = ["NEFT", "DD", "Cash"];
const CURRENCY_OPTIONS = ["Indian Rupee", "US Dollar", "Euro"];

export default function EditTenderPage() {
  const router = useRouter();

  // Basic Info
  const [tenderRefNumber] = useState("12345");
  const [tenderDate, setTenderDate] = useState("17-Nov-2022");
  const [tenderType, setTenderType] = useState("Open Tender");
  const [tenderCategory, setTenderCategory] = useState("Printing and Publishing");
  const [tenderDescription, setTenderDescription] = useState("Trial");
  const [tenderName, setTenderName] = useState("Trial Tender");
  const [contractForm, setContractForm] = useState("");
  const [numberOfCover, setNumberOfCover] = useState("2");
  const [sourceOfFunding, setSourceOfFunding] = useState("Trial");
  const [status, setStatus] = useState("Active");
  const [costOfTenderForm, setCostOfTenderForm] = useState("100.00");
  const [numberOfBidOpeners, setNumberOfBidOpeners] = useState("2");
  const [rebidSubmission, setRebidSubmission] = useState("No");
  const [bidsWithdraw, setBidsWithdraw] = useState("No");
  const [offlineSubmission, setOfflineSubmission] = useState("Yes");
  const [technicalEvaluation, setTechnicalEvaluation] = useState("No");
  const [multiCurrency, setMultiCurrency] = useState("Yes");
  const [currency, setCurrency] = useState("Indian Rupee");
  const [lastDateOfSubmission, setLastDateOfSubmission] = useState("30 Nov-2022");
  const [submissionTime, setSubmissionTime] = useState("17:00");

  // Critical Dates
  const [publishedDate, setPublishedDate] = useState("17-Nov-2022");
  const [publishedTime, setPublishedTime] = useState("12:00");
  const [bidOpeningDate, setBidOpeningDate] = useState("28-Nov-2022");
  const [bidOpeningTime, setBidOpeningTime] = useState("12:00");
  const [bidClosingDate, setBidClosingDate] = useState("30-Nov-2022");
  const [bidClosingTime, setBidClosingTime] = useState("12:00");
  const [docDownloadStartDate, setDocDownloadStartDate] = useState("28-Nov-2022");
  const [docDownloadStartTime, setDocDownloadStartTime] = useState("12:00");
  const [docDownloadEndDate, setDocDownloadEndDate] = useState("29-Nov-2022");
  const [docDownloadEndTime, setDocDownloadEndTime] = useState("12:06");
  const [clarificationStartDate, setClarificationStartDate] = useState("28-Nov-2022");
  const [clarificationStartTime, setClarificationStartTime] = useState("12:00");
  const [clarificationEndDate, setClarificationEndDate] = useState("29-Nov-2022");
  const [clarificationEndTime, setClarificationEndTime] = useState("12:00");
  const [bidSubmissionStartDate, setBidSubmissionStartDate] = useState("27-Nov-2022");
  const [bidSubmissionStartTime, setBidSubmissionStartTime] = useState("17:00");
  const [bidSubmissionEndDate, setBidSubmissionEndDate] = useState("28-Nov-2022");
  const [bidSubmissionEndTime, setBidSubmissionEndTime] = useState("12:00");
  const [preBidMeetingDate, setPreBidMeetingDate] = useState("");
  const [preBidMeetingTime, setPreBidMeetingTime] = useState("");
  const [govPublishingDate, setGovPublishingDate] = useState("27-Nov-2022");
  const [feePayableTo, setFeePayableTo] = useState("ABC Company");
  const [tenderFeeExemption, setTenderFeeExemption] = useState("No");
  const [bidOpeningAddress, setBidOpeningAddress] = useState("Trial, India, CHENNAI, TAMIL NADU, - 600000");
  const [sameAsBidAddress, setSameAsBidAddress] = useState(false);
  const [preBidMeetingAddress, setPreBidMeetingAddress] = useState("Trial, India, CHENNAI, TAMIL NADU, - 600000");

  // Eligibility Criteria
  const [yearsOfService, setYearsOfService] = useState("10");
  const [minYearlyTurnOver, setMinYearlyTurnOver] = useState("10");

  // EMD Fee Type
  const [emdFeeType, setEmdFeeType] = useState("fixed");
  const [emdExemptionAllowed, setEmdExemptionAllowed] = useState("No");
  const [emdPercentage, setEmdPercentage] = useState("10.00");
  const [emdPayableTo, setEmdPayableTo] = useState("DEF company");
  const [emdPayableAt, setEmdPayableAt] = useState("DEF");
  const [earnestDeposit, setEarnestDeposit] = useState("100.00");
  const [emdPaymentMode, setEmdPaymentMode] = useState("NEFT");

  // Tender Cover Information
  const [coverNo, setCoverNo] = useState("?");
  const [coverType, setCoverType] = useState("fee");
  const [documentType, setDocumentType] = useState("pdf");
  const [coverDescription, setCoverDescription] = useState("abc");

  // Tender Details (Add form)
  const [productCategory, setProductCategory] = useState("");
  const [productGroup, setProductGroup] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<TenderItem[]>(MOCK_ITEMS);
  // Form Of Contract
  const [authorityName, setAuthorityName] = useState("ABC Company");
  const [landlineNumber, setLandlineNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("Trial");
  const [addressLine2, setAddressLine2] = useState("Trial");
  const [addressLine3, setAddressLine3] = useState("Trial");

  // Upload Documents
  const [docDescription, setDocDescription] = useState("");
  const [documents, setDocuments] = useState<UploadedDocument[]>(MOCK_DOCUMENTS);

  const totalItemAmount = items.reduce((sum, i) => sum + i.itemAmount, 0);

  // Helper: date input with calendar icon
  const DateInput = ({ value, onChange, label, required }: { value: string; onChange: (v: string) => void; label: string; required?: boolean }) => (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="dd-MMM-yyyy"
          className="w-full rounded-l border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
        />
        <button className="flex shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#17a2b8] px-2.5 text-white hover:opacity-90 dark:border-dark-3">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </div>
    </div>
  );

  // Helper: time input with clock icon and +/- buttons
  const TimeInput = ({ value, onChange, label, required }: { value: string; onChange: (v: string) => void; label: string; required?: boolean }) => (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex">
        <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
          <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-x-0 border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
        />
        <div className="flex shrink-0 flex-col border border-l-0 border-stroke dark:border-dark-3">
          <button className="flex flex-1 items-center justify-center border-b border-stroke px-2 text-gray-500 hover:bg-gray-50 dark:border-dark-3 dark:hover:bg-dark-2">
            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="18 15 12 9 6 15" /></svg>
          </button>
          <button className="flex flex-1 items-center justify-center px-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-dark-2">
            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>
      </div>
    </div>
  );

  // Helper: input with left icon
  const IconInput = ({ icon, value, onChange, placeholder, readOnly, type = "text" }: { icon: React.ReactNode; value: string; onChange?: (v: string) => void; placeholder?: string; readOnly?: boolean; type?: string }) => (
    <div className="flex">
      <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 text-gray-500 dark:border-dark-3 dark:bg-dark-2">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
      />
    </div>
  );

  const HashIcon = () => (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
  const RupeeIcon = () => <span className="text-sm font-semibold text-gray-500">₹</span>;
  const DocIcon = () => (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
    </svg>
  );
  const GridIcon = () => (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
  const EditIcon = () => (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
  const PhoneIcon = () => (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.37 2.18 2 2 0 012.34 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.28-.78a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );

  return (
    <div className="mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Edit Tender</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Tender</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Edit Tender</li>
          </ol>
        </nav>
      </div>

      {/* ── Main Card ── */}
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Tender</h3>
          <span className="text-xs text-white/80">( <span className="text-red-300">*</span> Mandatory Fields)</span>
        </div>

        <div className="p-5">

          {/* Row 1: Ref Number, Tender Date, Tender Type, Tender Category */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Tender Reference Number <span className="text-red-500">*</span></label>
              <IconInput icon={<HashIcon />} value={tenderRefNumber} readOnly />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Tender Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <input type="text" value={tenderDate} onChange={e => setTenderDate(e.target.value)}
                  className="w-full border border-x-0 border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <button className="flex shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#17a2b8] px-2.5 text-white hover:opacity-90 dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Tender Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                  </svg>
                </div>
                <select value={tenderType} onChange={e => setTenderType(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  {TENDER_TYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Tender Category <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                </div>
                <select value={tenderCategory} onChange={e => setTenderCategory(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option>Printing and Publishing</option>
                  <option>Construction</option>
                  <option>IT Services</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tender Description */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Tender Description <span className="text-red-500">*</span></label>
            <textarea value={tenderDescription} onChange={e => setTenderDescription(e.target.value)} rows={2}
              className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
            <p className="mt-1 text-xs text-gray-400">Should be maximum 250 characters</p>
          </div>

          {/* Row: Tender Name, Contract Form, Number of Cover, Source of Funding */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Tender Name <span className="text-red-500">*</span></label>
              <IconInput icon={<DocIcon />} value={tenderName} onChange={setTenderName} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Contract Form</label>
              <div className="flex">
                <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                  </svg>
                </div>
                <select value={contractForm} onChange={e => setContractForm(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option value="">Select</option>
                  <option>Supply</option>
                  <option>Purchase</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Number of Cover <span className="text-red-500">*</span></label>
              <IconInput icon={<HashIcon />} value={numberOfCover} onChange={setNumberOfCover} type="number" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Source of Funding <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                </div>
                <input type="text" value={sourceOfFunding} onChange={e => setSourceOfFunding(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              </div>
            </div>
          </div>

          {/* Row: Status, Cost of Tender Form, Number Of Bid Openers */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Status <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <select value={status} onChange={e => setStatus(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Cost of Tender Form <span className="text-red-500">*</span></label>
              <IconInput icon={<RupeeIcon />} value={costOfTenderForm} onChange={setCostOfTenderForm} type="number" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Number Of Bid Openers</label>
              <input type="number" value={numberOfBidOpeners} onChange={e => setNumberOfBidOpeners(e.target.value)}
                className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
            </div>
            <div></div>
          </div>

          {/* Row: Re-bid, Bids Withdraw, Offline Submission, Technical Evaluation */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Re-bid Submission Allowed <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4 pt-1">
                {["Yes", "No"].map(v => (
                  <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm">
                    <input type="radio" name="rebid" value={v} checked={rebidSubmission === v} onChange={() => setRebidSubmission(v)}
                      className="size-4 accent-[#2d8f7b]" />
                    {v}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Bids Withdraw Allowed <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4 pt-1">
                {["Yes", "No"].map(v => (
                  <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm">
                    <input type="radio" name="bidswithdraw" value={v} checked={bidsWithdraw === v} onChange={() => setBidsWithdraw(v)}
                      className="size-4 accent-[#2d8f7b]" />
                    {v}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Offline Submission Allowed <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4 pt-1">
                {["Yes", "No"].map(v => (
                  <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm">
                    <input type="radio" name="offline" value={v} checked={offlineSubmission === v} onChange={() => setOfflineSubmission(v)}
                      className="size-4 accent-[#2d8f7b]" />
                    {v}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Technical Evaluation Required <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4 pt-1">
                {["Yes", "No"].map(v => (
                  <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm">
                    <input type="radio" name="techeval" value={v} checked={technicalEvaluation === v} onChange={() => setTechnicalEvaluation(v)}
                      className="size-4 accent-[#2d8f7b]" />
                    {v}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Row: Multi Currency, Currency, Last Date of Submission, Submission Time */}
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Multi Currency Allowed <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-4 pt-1">
                {["Yes", "No"].map(v => (
                  <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm">
                    <input type="radio" name="multicurr" value={v} checked={multiCurrency === v} onChange={() => setMultiCurrency(v)}
                      className="size-4 accent-[#2d8f7b]" />
                    {v}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Currency <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                  <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                </div>
                <select value={currency} onChange={e => setCurrency(e.target.value)}
                  className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  {CURRENCY_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Last Date of Submission <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" value={lastDateOfSubmission} onChange={e => setLastDateOfSubmission(e.target.value)}
                  className="w-full rounded-l border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <button className="flex shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#17a2b8] px-2.5 text-white hover:opacity-90 dark:border-dark-3">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <TimeInput label="Submission Time" value={submissionTime} onChange={setSubmissionTime} required />
            </div>
          </div>

          {/* ── Critical Dates ── */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Critical Dates</h4>
          </div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput label="Published Date" value={publishedDate} onChange={setPublishedDate} required />
              <TimeInput label="Published Time" value={publishedTime} onChange={setPublishedTime} required />
              <DateInput label="Bid Opening Date" value={bidOpeningDate} onChange={setBidOpeningDate} required />
              <TimeInput label="Bid Opening Time" value={bidOpeningTime} onChange={setBidOpeningTime} required />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput label="Bid Closing Date" value={bidClosingDate} onChange={setBidClosingDate} required />
              <TimeInput label="Bid Closing Time" value={bidClosingTime} onChange={setBidClosingTime} required />
              <DateInput label="Document Download / Sale Start Date" value={docDownloadStartDate} onChange={setDocDownloadStartDate} required />
              <TimeInput label="Document Download / Sale Start Time" value={docDownloadStartTime} onChange={setDocDownloadStartTime} required />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput label="Document Download / Sale End Date" value={docDownloadEndDate} onChange={setDocDownloadEndDate} required />
              <TimeInput label="Document Download / Sale End Time" value={docDownloadEndTime} onChange={setDocDownloadEndTime} required />
              <DateInput label="Clarification Start Date" value={clarificationStartDate} onChange={setClarificationStartDate} required />
              <TimeInput label="Clarification Start Time" value={clarificationStartTime} onChange={setClarificationStartTime} required />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput label="Clarification End Date" value={clarificationEndDate} onChange={setClarificationEndDate} required />
              <TimeInput label="Clarification End Time" value={clarificationEndTime} onChange={setClarificationEndTime} required />
              <DateInput label="Bid Submission Start Date" value={bidSubmissionStartDate} onChange={setBidSubmissionStartDate} required />
              <TimeInput label="Bid Submission Start Time" value={bidSubmissionStartTime} onChange={setBidSubmissionStartTime} required />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput label="Bid Submission End Date" value={bidSubmissionEndDate} onChange={setBidSubmissionEndDate} required />
              <TimeInput label="Bid Submission End Time" value={bidSubmissionEndTime} onChange={setBidSubmissionEndTime} required />
              <DateInput label="Pre Bid Meeting Date" value={preBidMeetingDate} onChange={setPreBidMeetingDate} />
              <TimeInput label="Pre Bid Meeting Time" value={preBidMeetingTime} onChange={setPreBidMeetingTime} />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput label="Government Publishing Date" value={govPublishingDate} onChange={setGovPublishingDate} required />
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Fee Payable To <span className="text-red-500">*</span></label>
                <IconInput icon={<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>}
                  value={feePayableTo} onChange={setFeePayableTo} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Tender Fee Exemption Allowed <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-4 pt-1">
                  {["Yes", "No"].map(v => (
                    <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm">
                      <input type="radio" name="feeexemption" value={v} checked={tenderFeeExemption === v} onChange={() => setTenderFeeExemption(v)}
                        className="size-4 accent-[#2d8f7b]" />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
              <div></div>
            </div>
            {/* Addresses */}
            <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Bid Opening Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <textarea value={bidOpeningAddress} onChange={e => setBidOpeningAddress(e.target.value)} rows={3}
                    className="w-full rounded border border-stroke bg-white px-3 py-2 pr-16 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                  <button className="absolute right-2 top-2 flex items-center gap-1 rounded bg-[#17a2b8] px-2 py-1 text-xs text-white hover:opacity-90">
                    <EditIcon /> Edit
                  </button>
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-medium text-dark dark:text-white">Pre Bid Meeting Address <span className="text-red-500">*</span></label>
                  <label className="flex cursor-pointer items-center gap-1.5 text-xs">
                    <input type="checkbox" checked={sameAsBidAddress} onChange={e => setSameAsBidAddress(e.target.checked)} className="size-3.5 accent-[#2d8f7b]" />
                    Same As Bid Opening Address
                  </label>
                </div>
                <div className="relative">
                  <textarea value={preBidMeetingAddress} onChange={e => setPreBidMeetingAddress(e.target.value)} rows={3}
                    className="w-full rounded border border-stroke bg-white px-3 py-2 pr-16 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                  <button className="absolute right-2 top-2 flex items-center gap-1 rounded bg-[#17a2b8] px-2 py-1 text-xs text-white hover:opacity-90">
                    <EditIcon /> Edit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Eligibility Criteria ── */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Eligibility Criteria</h4>
          </div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">No of Years of Service <span className="text-red-500">*</span></label>
                <IconInput icon={<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
                  value={yearsOfService} onChange={setYearsOfService} type="number" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Minimum Yearly Turn Over <span className="text-red-500">*</span></label>
                <IconInput icon={<svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
                  value={minYearlyTurnOver} onChange={setMinYearlyTurnOver} type="number" />
              </div>
            </div>
          </div>

          {/* ── EMD Fee Type ── */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">EMD Fee Type</h4>
          </div>
          {/* <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">EMD Fee Type <span className="text-red-500">*</span></label>
                <IconInput icon={<RupeeIcon />} value={emdFeeType}
                  icon={<div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2"><RupeeIcon /></div>}
                  value={emdFeeType} onChange={setEmdFeeType} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">EMD Exemption Allowed <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-4 pt-1">
                  {["Yes", "No"].map(v => (
                    <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm">
                      <input type="radio" name="emdexemption" value={v} checked={emdExemptionAllowed === v} onChange={() => setEmdExemptionAllowed(v)}
                        className="size-4 accent-[#2d8f7b]" />
                      {v}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">EMD Percentage <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />
                    </svg>
                  </div>
                  <input type="number" value={emdPercentage} onChange={e => setEmdPercentage(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">EMD Payable To <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                    <DocIcon />
                  </div>
                  <input type="text" value={emdPayableTo} onChange={e => setEmdPayableTo(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">EMD Payable At <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                    <DocIcon />
                  </div>
                  <input type="text" value={emdPayableAt} onChange={e => setEmdPayableAt(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Earnest Deposit <span className="text-red-500">*</span></label>
                <IconInput icon={<RupeeIcon />} value={earnestDeposit} onChange={setEarnestDeposit} type="number" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">EMD Payment Mode <span className="text-red-500">*</span></label>
                <IconInput icon={<RupeeIcon />} value={emdPaymentMode}
                  icon={<div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2"><RupeeIcon /></div>}
                  value={emdPaymentMode} onChange={setEmdPaymentMode} />
              </div>
              <div></div>
            </div>
          </div> */}

          {/* ── Tender Cover Information ── */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Tender Cover Information</h4>
          </div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Cover No <span className="text-red-500">*</span></label>
                <IconInput icon={<HashIcon />} value={coverNo} onChange={setCoverNo} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Cover Type <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                    <DocIcon />
                  </div>
                  <select value={coverType} onChange={e => setCoverType(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                    {COVER_TYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Document Type <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                    <DocIcon />
                  </div>
                  <select value={documentType} onChange={e => setDocumentType(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                    {DOCUMENT_TYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Description <span className="text-red-500">*</span></label>
              <textarea value={coverDescription} onChange={e => setCoverDescription(e.target.value)} rows={3}
                className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              <p className="mt-1 text-xs text-gray-400">Should be maximum 250 characters</p>
            </div>
          </div>

          {/* ── Tender Details (Add form) ── */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Tender Details</h4>
          </div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Product Category Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <select value={productCategory} onChange={e => setProductCategory(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                    <option value="">Select</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Product Group Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </div>
                  <select value={productGroup} onChange={e => setProductGroup(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                    <option value="">Select</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Item Name Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                    <DocIcon />
                  </div>
                  <select value={itemName} onChange={e => setItemName(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                    <option value="">Select</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Quantity <span className="text-red-500">*</span></label>
                <IconInput icon={<HashIcon />} value={quantity} onChange={setQuantity} type="number" />
              </div>
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Specifications <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                    <EditIcon />
                  </div>
                  <input type="text" value={specifications} onChange={e => setSpecifications(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Item Amount <span className="text-red-500">*</span></label>
                <IconInput icon={<RupeeIcon />} value={itemAmount} onChange={setItemAmount} type="number" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Total Amount</label>
                <IconInput icon={<RupeeIcon />} value={totalAmount} readOnly />
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Description <span className="text-red-500">*</span></label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Some text"
                className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              <p className="mt-1 text-xs text-gray-400">Should be maximum 250 characters</p>
            </div>
            <div className="flex justify-end">
              <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Add
              </button>
            </div>
          </div>

          {/* ── Tender Items List ── */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Tender Items List</h4>
          </div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
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
                    <th className="border border-[#3aa88f] px-3 py-2.5 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.itemCodeName}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.quantity.toFixed(2)}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.specifications}</td>
                      <td className="border border-stroke px-3 py-2 dark:border-dark-3">{item.description}</td>
                      <td className="border border-stroke px-3 py-2 text-right dark:border-dark-3">{item.itemAmount.toFixed(2)}</td>
                      <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                        <button onClick={() => setItems(items.filter(i => i.id !== item.id))}
                          className="inline-flex items-center justify-center rounded bg-red-500 p-1.5 text-white hover:opacity-90">
                          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td colSpan={5} className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">Total Amount</td>
                    <td className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">{totalItemAmount.toFixed(2)}</td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* ── Form Of Contract ── */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Form Of Contract - Supply or Purchase</h4>
          </div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Tender Inviting Authority Name <span className="text-red-500">*</span></label>
                <IconInput icon={<HashIcon />} value={authorityName} onChange={setAuthorityName} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">LandLine Number</label>
                <IconInput icon={<PhoneIcon />} value={landlineNumber} onChange={setLandlineNumber} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Mobile Number</label>
                <div className="flex">
                  <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                    <svg className="size-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  </div>
                  <input type="text" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)}
                    className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>
              </div>
              <div></div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { label: "Tender Inviting Authority Address Line 1", value: addressLine1, set: setAddressLine1 },
                { label: "Tender Inviting Authority Address Line 2", value: addressLine2, set: setAddressLine2 },
                { label: "Tender Inviting Authority Address Line 3", value: addressLine3, set: setAddressLine3 },
              ].map(({ label, value, set }) => (
                <div key={label}>
                  <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">{label} <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <div className="flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2">
                      <EditIcon />
                    </div>
                    <input type="text" value={value} onChange={e => set(e.target.value)}
                      className="w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Upload Documents ── */}
          <div className="mb-2 flex items-center gap-2">
            <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
            <h4 className="text-sm font-semibold text-dark dark:text-white">Upload Documents</h4>
          </div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-medium text-dark dark:text-white">Description <span className="text-red-500">*</span></label>
              <textarea value={docDescription} onChange={e => setDocDescription(e.target.value)} rows={3} placeholder="Some text"
                className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              <p className="mt-1 text-xs text-gray-400">Should be maximum 250 characters</p>
            </div>
            <div className="mb-3">
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload
              </button>
              <p className="mt-1 text-xs text-gray-400">No format pdf,doc,xlsx. File size should be less than 5 MB</p>
            </div>
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
                      <td colSpan={3} className="border border-stroke px-3 py-4 text-left text-sm text-gray-500 dark:border-dark-3">No records found.</td>
                    </tr>
                  ) : (
                    documents.map((doc, idx) => (
                      <tr key={doc.id} className={idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">{idx + 1}</td>
                        <td className="border border-stroke px-3 py-2 dark:border-dark-3">{doc.documentName}</td>
                        <td className="border border-stroke px-3 py-2 text-center dark:border-dark-3">
                          <button className="inline-flex items-center justify-center rounded bg-red-500 p-1.5 text-white hover:opacity-90">
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
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

          {/* ── Bottom Buttons ── */}
          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/tender/create-tender/list")}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
              </svg>
              Update
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
