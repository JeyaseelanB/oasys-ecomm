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

const TENDER_TYPE_OPTIONS = ["Select", "Open Tender", "Limited Tender", "Single Tender", "Global Tender"];
const COVER_TYPE_OPTIONS = ["Select", "fee", "technical", "financial"];
const DOCUMENT_TYPE_OPTIONS = ["Select", "pdf", "doc", "xls"];
const CURRENCY_OPTIONS = ["Select", "Indian Rupee", "US Dollar", "Euro"];

export default function CreateTenderPage() {
  const router = useRouter();

  const [tenderRefNumber, setTenderRefNumber] = useState("");
  const [tenderDate, setTenderDate] = useState("");
  const [tenderType, setTenderType] = useState("");
  const [tenderCategory, setTenderCategory] = useState("");
  const [tenderDescription, setTenderDescription] = useState("");
  const [tenderName, setTenderName] = useState("");
  const [contractForm, setContractForm] = useState("");
  const [numberOfCover, setNumberOfCover] = useState("");
  const [sourceOfFunding, setSourceOfFunding] = useState("");
  const [status, setStatus] = useState("");
  const [costOfTenderForm, setCostOfTenderForm] = useState("");
  const [numberOfBidOpeners, setNumberOfBidOpeners] = useState("");
  const [rebidSubmission, setRebidSubmission] = useState("No");
  const [bidsWithdraw, setBidsWithdraw] = useState("No");
  const [offlineSubmission, setOfflineSubmission] = useState("Yes");
  const [technicalEvaluation, setTechnicalEvaluation] = useState("No");
  const [multiCurrency, setMultiCurrency] = useState("Yes");
  const [currency, setCurrency] = useState("");
  const [lastDateOfSubmission, setLastDateOfSubmission] = useState("");
  const [submissionTime, setSubmissionTime] = useState("");

  // Critical Dates
  const [publishedDate, setPublishedDate] = useState("");
  const [publishedTime, setPublishedTime] = useState("");
  const [bidOpeningDate, setBidOpeningDate] = useState("");
  const [bidOpeningTime, setBidOpeningTime] = useState("");
  const [bidClosingDate, setBidClosingDate] = useState("");
  const [bidClosingTime, setBidClosingTime] = useState("");
  const [docDownloadStartDate, setDocDownloadStartDate] = useState("");
  const [docDownloadStartTime, setDocDownloadStartTime] = useState("");
  const [docDownloadEndDate, setDocDownloadEndDate] = useState("");
  const [docDownloadEndTime, setDocDownloadEndTime] = useState("");
  const [clarificationStartDate, setClarificationStartDate] = useState("");
  const [clarificationStartTime, setClarificationStartTime] = useState("");
  const [clarificationEndDate, setClarificationEndDate] = useState("");
  const [clarificationEndTime, setClarificationEndTime] = useState("");
  const [bidSubmissionStartDate, setBidSubmissionStartDate] = useState("");
  const [bidSubmissionStartTime, setBidSubmissionStartTime] = useState("");
  const [bidSubmissionEndDate, setBidSubmissionEndDate] = useState("");
  const [bidSubmissionEndTime, setBidSubmissionEndTime] = useState("");
  const [preBidMeetingDate, setPreBidMeetingDate] = useState("");
  const [preBidMeetingTime, setPreBidMeetingTime] = useState("");
  const [govPublishingDate, setGovPublishingDate] = useState("");
  const [feePayableTo, setFeePayableTo] = useState("");
  const [tenderFeeExemption, setTenderFeeExemption] = useState("Yes");
  const [bidOpeningAddress, setBidOpeningAddress] = useState("");
  const [sameAsBidAddress, setSameAsBidAddress] = useState(false);
  const [preBidMeetingAddress, setPreBidMeetingAddress] = useState("");

  // Eligibility Criteria
  const [yearsOfService, setYearsOfService] = useState("");
  const [minYearlyTurnOver, setMinYearlyTurnOver] = useState("");

  // EMD Fee Type
  const [emdFeeType, setEmdFeeType] = useState("");
  const [emdExemptionAllowed, setEmdExemptionAllowed] = useState("Yes");
  const [emdPercentage, setEmdPercentage] = useState("");
  const [emdPayableTo, setEmdPayableTo] = useState("");
  const [emdPayableAt, setEmdPayableAt] = useState("");
  const [earnestDeposit, setEarnestDeposit] = useState("");
  const [emdPaymentMode, setEmdPaymentMode] = useState("");

  // Tender Cover Information
  const [coverNo, setCoverNo] = useState("");
  const [coverType, setCoverType] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [coverDescription, setCoverDescription] = useState("");

  // Tender Details (Add form)
  const [productCategory, setProductCategory] = useState("");
  const [productGroup, setProductGroup] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [totalAmount] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<TenderItem[]>([]);

  // Form Of Contract
  const [authorityName, setAuthorityName] = useState("");
  const [landlineNumber, setLandlineNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");

  // Upload Documents
  const [docDescription, setDocDescription] = useState("");
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const totalItemAmount = items.reduce((sum, i) => sum + i.itemAmount, 0);

  // ── Reusable sub-components ──
  const CalIcon = () => (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
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
  const EditIcon = () => (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
  const SectionIcon = () => (
    <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );

  const inputBase = "w-full rounded-r border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white";
  const iconBox = "flex shrink-0 items-center justify-center rounded-l border border-r-0 border-stroke bg-gray-100 px-2.5 dark:border-dark-3 dark:bg-dark-2 text-gray-500";
  const label = "mb-1.5 block text-xs font-medium text-dark dark:text-white";

  const DateInput = ({ lbl, value, onChange, req }: { lbl: string; value: string; onChange: (v: string) => void; req?: boolean }) => (
    <div>
      <label className={label}>{lbl} {req && <span className="text-red-500">*</span>}</label>
      <div className="flex">
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="dd-MMM-yyyy"
          className="w-full rounded-l border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
        <button className="flex shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#17a2b8] px-2.5 text-white hover:opacity-90 dark:border-dark-3">
          <CalIcon />
        </button>
      </div>
    </div>
  );

  const TimeInput = ({ lbl, value, onChange, req }: { lbl: string; value: string; onChange: (v: string) => void; req?: boolean }) => (
    <div>
      <label className={label}>{lbl} {req && <span className="text-red-500">*</span>}</label>
      <div className="flex">
        <div className={iconBox}>
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
        </div>
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="w-full border border-x-0 border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
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

  const RadioGroup = ({ name, lbl, value, onChange, req }: { name: string; lbl: string; value: string; onChange: (v: string) => void; req?: boolean }) => (
    <div>
      <label className={label}>{lbl} {req && <span className="text-red-500">*</span>}</label>
      <div className="flex items-center gap-4 pt-1">
        {["Yes", "No"].map(v => (
          <label key={v} className="flex cursor-pointer items-center gap-1.5 text-sm">
            <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} className="size-4 accent-[#2d8f7b]" />
            {v}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Create Tender</h2>
        <nav>
          <ol className="flex items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Operational</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Tender</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">Create Tender</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Tender</h3>
          <span className="text-xs text-white/80">( <span className="text-red-300">*</span> Mandatory Fields)</span>
        </div>

        <div className="p-5">
          {/* Row 1 */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className={label}>Tender Reference Number <span className="text-red-500">*</span></label>
              <div className="flex"><div className={iconBox}><HashIcon /></div>
                <input type="text" value={tenderRefNumber} onChange={e => setTenderRefNumber(e.target.value)} className={inputBase} />
              </div>
            </div>
            <div>
              <label className={label}>Tender Date <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className={iconBox}><CalIcon /></div>
                <input type="text" value={tenderDate} onChange={e => setTenderDate(e.target.value)} placeholder="dd-MMM-yyyy"
                  className="w-full border border-x-0 border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <button className="flex shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#17a2b8] px-2.5 text-white hover:opacity-90 dark:border-dark-3"><CalIcon /></button>
              </div>
            </div>
            <div>
              <label className={label}>Tender Type <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className={iconBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                </div>
                <select value={tenderType} onChange={e => setTenderType(e.target.value)} className={inputBase}>
                  {TENDER_TYPE_OPTIONS.map(o => <option key={o} value={o === "Select" ? "" : o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={label}>Tender Category <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className={iconBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                </div>
                <select value={tenderCategory} onChange={e => setTenderCategory(e.target.value)} className={inputBase}>
                  <option value="">Select</option>
                  <option>Printing and Publishing</option>
                  <option>Construction</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tender Description */}
          <div className="mb-4">
            <label className={label}>Tender Description <span className="text-red-500">*</span></label>
            <textarea value={tenderDescription} onChange={e => setTenderDescription(e.target.value)} rows={3} placeholder="Some text"
              className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
            <p className="mt-1 text-xs text-gray-400">Should be maximum 250 characters</p>
          </div>

          {/* Tender Name, Contract Form, Number of Cover, Source of Funding */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className={label}>Tender Name <span className="text-red-500">*</span></label>
              <div className="flex"><div className={iconBox}><DocIcon /></div>
                <input value={tenderName} onChange={e => setTenderName(e.target.value)} className={inputBase} />
              </div>
            </div>
            <div>
              <label className={label}>Contract Form</label>
              <div className="flex">
                <div className={iconBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                </div>
                <select value={contractForm} onChange={e => setContractForm(e.target.value)} className={inputBase}>
                  <option value="">Select</option><option>Supply</option><option>Purchase</option>
                </select>
              </div>
            </div>
            <div>
              <label className={label}>Number of Cover <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className={iconBox}><HashIcon /></div>
                <select value={numberOfCover} onChange={e => setNumberOfCover(e.target.value)} className={inputBase}>
                  <option value="">Select</option><option>1</option><option>2</option><option>3</option>
                </select>
              </div>
            </div>
            <div>
              <label className={label}>Source of Funding <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className={iconBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                </div>
                <input value={sourceOfFunding} onChange={e => setSourceOfFunding(e.target.value)} className={inputBase} />
              </div>
            </div>
          </div>

          {/* Status, Cost of Tender Form, Number of Bid Openers */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className={label}>Status <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className={iconBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <select value={status} onChange={e => setStatus(e.target.value)} className={inputBase}>
                  <option value="">Select</option><option>Active</option><option>Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <label className={label}>Cost of Tender Form <span className="text-red-500">*</span></label>
              <div className="flex"><div className={iconBox}><RupeeIcon /></div>
                <input type="number" value={costOfTenderForm} onChange={e => setCostOfTenderForm(e.target.value)} className={inputBase} />
              </div>
            </div>
            <div>
              <label className={label}>Number Of Bid Openers</label>
              <input type="number" value={numberOfBidOpeners} onChange={e => setNumberOfBidOpeners(e.target.value)}
                className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
            </div>
            <div></div>
          </div>

          {/* Radio rows */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <RadioGroup name="rebid" lbl="Re-bid Submission Allowed" value={rebidSubmission} onChange={setRebidSubmission} req />
            <RadioGroup name="bidswithdraw" lbl="Bids Withdraw Allowed" value={bidsWithdraw} onChange={setBidsWithdraw} req />
            <RadioGroup name="offline" lbl="Offline Submission Allowed" value={offlineSubmission} onChange={setOfflineSubmission} req />
            <RadioGroup name="techeval" lbl="Technical Evaluation Required" value={technicalEvaluation} onChange={setTechnicalEvaluation} req />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-4">
            <RadioGroup name="multicurr" lbl="Multi Currency Allowed" value={multiCurrency} onChange={setMultiCurrency} req />
            <div>
              <label className={label}>Currency <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className={iconBox}>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
                </div>
                <select value={currency} onChange={e => setCurrency(e.target.value)} className={inputBase}>
                  {CURRENCY_OPTIONS.map(o => <option key={o} value={o === "Select" ? "" : o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={label}>Last Date of Submission <span className="text-red-500">*</span></label>
              <div className="flex">
                <input type="text" value={lastDateOfSubmission} onChange={e => setLastDateOfSubmission(e.target.value)} placeholder="dd-MMM-yyyy"
                  className="w-full rounded-l border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                <button className="flex shrink-0 items-center justify-center rounded-r border border-l-0 border-stroke bg-[#17a2b8] px-2.5 text-white hover:opacity-90 dark:border-dark-3"><CalIcon /></button>
              </div>
            </div>
            <TimeInput lbl="Submission Time" value={submissionTime} onChange={setSubmissionTime} req />
          </div>

          {/* ── Critical Dates ── */}
          <div className="mb-2 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Critical Dates</h4></div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput lbl="Published Date" value={publishedDate} onChange={setPublishedDate} req />
              <TimeInput lbl="Published Time" value={publishedTime} onChange={setPublishedTime} req />
              <DateInput lbl="Bid Opening Date" value={bidOpeningDate} onChange={setBidOpeningDate} req />
              <TimeInput lbl="Bid Opening Time" value={bidOpeningTime} onChange={setBidOpeningTime} req />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput lbl="Bid Closing Date" value={bidClosingDate} onChange={setBidClosingDate} req />
              <TimeInput lbl="Bid Closing Time" value={bidClosingTime} onChange={setBidClosingTime} req />
              <DateInput lbl="Document Download / Sale Start Date" value={docDownloadStartDate} onChange={setDocDownloadStartDate} req />
              <TimeInput lbl="Document Download / Sale Start Time" value={docDownloadStartTime} onChange={setDocDownloadStartTime} req />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput lbl="Document Download / Sale End Date" value={docDownloadEndDate} onChange={setDocDownloadEndDate} req />
              <TimeInput lbl="Document Download / Sale End Time" value={docDownloadEndTime} onChange={setDocDownloadEndTime} req />
              <DateInput lbl="Clarification Start Date" value={clarificationStartDate} onChange={setClarificationStartDate} req />
              <TimeInput lbl="Clarification Start Time" value={clarificationStartTime} onChange={setClarificationStartTime} req />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput lbl="Clarification End Date" value={clarificationEndDate} onChange={setClarificationEndDate} req />
              <TimeInput lbl="Clarification End Time" value={clarificationEndTime} onChange={setClarificationEndTime} req />
              <DateInput lbl="Bid Submission Start Date" value={bidSubmissionStartDate} onChange={setBidSubmissionStartDate} req />
              <TimeInput lbl="Bid Submission Start Time" value={bidSubmissionStartTime} onChange={setBidSubmissionStartTime} req />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput lbl="Bid Submission End Date" value={bidSubmissionEndDate} onChange={setBidSubmissionEndDate} req />
              <TimeInput lbl="Bid Submission End Time" value={bidSubmissionEndTime} onChange={setBidSubmissionEndTime} req />
              <DateInput lbl="Pre Bid Meeting Date" value={preBidMeetingDate} onChange={setPreBidMeetingDate} />
              <TimeInput lbl="Pre Bid Meeting Time" value={preBidMeetingTime} onChange={setPreBidMeetingTime} />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <DateInput lbl="Government Publishing Date" value={govPublishingDate} onChange={setGovPublishingDate} req />
              <div>
                <label className={label}>Fee Payable To <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className={iconBox}>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
                  </div>
                  <input value={feePayableTo} onChange={e => setFeePayableTo(e.target.value)} className={inputBase} />
                </div>
              </div>
              <RadioGroup name="feeexemption" lbl="Tender Fee Exemption Allowed *" value={tenderFeeExemption} onChange={setTenderFeeExemption} />
              <div></div>
            </div>
            {/* Addresses */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={label}>Bid Opening Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <textarea value={bidOpeningAddress} onChange={e => setBidOpeningAddress(e.target.value)} rows={4}
                    className="w-full rounded border border-stroke bg-white px-3 py-2 pr-16 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                  <button className="absolute right-2 top-2 flex items-center gap-1 rounded bg-[#17a2b8] px-2 py-1 text-xs text-white hover:opacity-90">
                    <EditIcon /> Add
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
                  <textarea value={preBidMeetingAddress} onChange={e => setPreBidMeetingAddress(e.target.value)} rows={4}
                    className="w-full rounded border border-stroke bg-white px-3 py-2 pr-16 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                  <button className="absolute right-2 top-2 flex items-center gap-1 rounded bg-[#17a2b8] px-2 py-1 text-xs text-white hover:opacity-90">
                    <EditIcon /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Eligibility Criteria ── */}
          <div className="mb-2 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Eligibility Criteria</h4></div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={label}>No of Years of Service <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className={iconBox}><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg></div>
                  <input type="number" value={yearsOfService} onChange={e => setYearsOfService(e.target.value)} className={inputBase} />
                </div>
              </div>
              <div>
                <label className={label}>Minimum Yearly Turn Over <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className={iconBox}><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg></div>
                  <input type="number" value={minYearlyTurnOver} onChange={e => setMinYearlyTurnOver(e.target.value)} className={inputBase} />
                </div>
              </div>
            </div>
          </div>

          {/* ── EMD Fee Type ── */}
          <div className="mb-2 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">EMD Fee Type</h4></div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className={label}>EMD Fee Type <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><RupeeIcon /></div>
                  <select value={emdFeeType} onChange={e => setEmdFeeType(e.target.value)} className={inputBase}>
                    <option value="">Select</option><option>fixed</option><option>percentage</option>
                  </select>
                </div>
              </div>
              <RadioGroup name="emdexemption" lbl="EMD Exemption Allowed *" value={emdExemptionAllowed} onChange={setEmdExemptionAllowed} />
              <div>
                <label className={label}>EMD Percentage <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className={iconBox}>
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>
                  </div>
                  <input type="number" value={emdPercentage} onChange={e => setEmdPercentage(e.target.value)} className={inputBase} />
                </div>
              </div>
              <div>
                <label className={label}>EMD Payable To <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><DocIcon /></div>
                  <input value={emdPayableTo} onChange={e => setEmdPayableTo(e.target.value)} className={inputBase} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className={label}>EMD Payable At <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><DocIcon /></div>
                  <input value={emdPayableAt} onChange={e => setEmdPayableAt(e.target.value)} className={inputBase} />
                </div>
              </div>
              <div>
                <label className={label}>Earnest Deposit <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><RupeeIcon /></div>
                  <input type="number" value={earnestDeposit} onChange={e => setEarnestDeposit(e.target.value)} className={inputBase} />
                </div>
              </div>
              <div>
                <label className={label}>EMD Payment Mode <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><RupeeIcon /></div>
                  <select value={emdPaymentMode} onChange={e => setEmdPaymentMode(e.target.value)} className={inputBase}>
                    <option value="">Select</option><option>NEFT</option><option>DD</option><option>Cash</option>
                  </select>
                </div>
              </div>
              <div></div>
            </div>
          </div>

          {/* ── Tender Cover Information ── */}
          <div className="mb-2 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Tender Cover Information</h4></div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className={label}>Cover No <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><HashIcon /></div>
                  <input value={coverNo} onChange={e => setCoverNo(e.target.value)} className={inputBase} />
                </div>
              </div>
              <div>
                <label className={label}>Cover Type <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><DocIcon /></div>
                  <select value={coverType} onChange={e => setCoverType(e.target.value)} className={inputBase}>
                    {COVER_TYPE_OPTIONS.map(o => <option key={o} value={o === "Select" ? "" : o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={label}>Document Type <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><DocIcon /></div>
                  <select value={documentType} onChange={e => setDocumentType(e.target.value)} className={inputBase}>
                    {DOCUMENT_TYPE_OPTIONS.map(o => <option key={o} value={o === "Select" ? "" : o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className={label}>Description <span className="text-red-500">*</span></label>
              <textarea value={coverDescription} onChange={e => setCoverDescription(e.target.value)} rows={3} placeholder="Some text"
                className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              <p className="mt-1 text-xs text-gray-400">Should be maximum 250 characters</p>
            </div>
          </div>

          {/* ── Tender Details ── */}
          <div className="mb-2 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Tender Details</h4></div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className={label}>Product Category Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className={iconBox}><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div>
                  <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className={inputBase}>
                    <option value="">Select</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={label}>Product Group Code / Name <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className={iconBox}><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg></div>
                  <select value={productGroup} onChange={e => setProductGroup(e.target.value)} className={inputBase}>
                    <option value="">Select</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={label}>Item Code / Name <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><DocIcon /></div>
                  <select value={itemName} onChange={e => setItemName(e.target.value)} className={inputBase}>
                    <option value="">Select</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={label}>Quantity <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><HashIcon /></div>
                  <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className={inputBase} />
                </div>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className={label}>Specifications <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><EditIcon /></div>
                  <input value={specifications} onChange={e => setSpecifications(e.target.value)} className={inputBase} />
                </div>
              </div>
              <div>
                <label className={label}>Item Amount</label>
                <div className="flex"><div className={iconBox}><RupeeIcon /></div>
                  <input type="number" value={itemAmount} onChange={e => setItemAmount(e.target.value)} className={inputBase} />
                </div>
              </div>
              <div>
                <label className={label}>Total Amount</label>
                <div className="flex"><div className={iconBox}><RupeeIcon /></div>
                  <input type="number" value={totalAmount} readOnly
                    className="w-full rounded-r border border-stroke bg-gray-50 px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className={label}>Description <span className="text-red-500">*</span></label>
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
          <div className="mb-2 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Tender Items List</h4></div>
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
                  {items.length === 0 ? (
                    <tr><td colSpan={7} className="border border-stroke px-3 py-4 text-left text-sm text-gray-500 dark:border-dark-3">No records found.</td></tr>
                  ) : (
                    items.map((item, idx) => (
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
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-[#1a2232]">
                    <td colSpan={5} className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">Total Amount</td>
                    <td className="border border-stroke px-3 py-2 text-right font-semibold dark:border-dark-3">{totalItemAmount > 0 ? totalItemAmount.toFixed(2) : ""}</td>
                    <td className="border border-stroke px-3 py-2 dark:border-dark-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* ── Form Of Contract ── */}
          <div className="mb-2 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Form Of Contract - Supply or Purchase</h4></div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className={label}>Tender Inviting Authority Name <span className="text-red-500">*</span></label>
                <div className="flex"><div className={iconBox}><HashIcon /></div>
                  <input value={authorityName} onChange={e => setAuthorityName(e.target.value)} className={inputBase} />
                </div>
              </div>
              <div>
                <label className={label}>LandLine Number</label>
                <div className="flex">
                  <div className={iconBox}><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.37 2.18 2 2 0 012.34 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.28-.78a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg></div>
                  <input value={landlineNumber} onChange={e => setLandlineNumber(e.target.value)} className={inputBase} />
                </div>
              </div>
              <div>
                <label className={label}>Mobile Number</label>
                <div className="flex">
                  <div className={iconBox}><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg></div>
                  <input value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} className={inputBase} />
                </div>
              </div>
              <div></div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { lbl: "Tender Inviting Authority Address Line 1", val: addressLine1, set: setAddressLine1 },
                { lbl: "Tender Inviting Authority Address Line 2", val: addressLine2, set: setAddressLine2 },
                { lbl: "Tender Inviting Authority Address Line 3", val: addressLine3, set: setAddressLine3 },
              ].map(({ lbl, val, set }) => (
                <div key={lbl}>
                  <label className={label}>{lbl} <span className="text-red-500">*</span></label>
                  <div className="flex"><div className={iconBox}><EditIcon /></div>
                    <input value={val} onChange={e => set(e.target.value)} className={inputBase} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Upload Documents ── */}
          <div className="mb-2 flex items-center gap-2"><SectionIcon /><h4 className="text-sm font-semibold text-dark dark:text-white">Upload Documents</h4></div>
          <div className="mb-5 border-t border-stroke pt-3 dark:border-dark-3">
            <div className="mb-3">
              <label className={label}>Description <span className="text-red-500">*</span></label>
              <textarea value={docDescription} onChange={e => setDocDescription(e.target.value)} rows={3} placeholder="Some text"
                className="w-full rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              <p className="mt-1 text-xs text-gray-400">Should be maximum 250 characters</p>
            </div>
            <div className="mb-3 flex items-center gap-3">
              <input type="text" readOnly placeholder=""
                className="w-48 rounded border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white" />
              <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                Upload
              </button>
            </div>
            <p className="mb-3 text-xs text-gray-400">File format pdf,doc,xlsx. File size should be less than 5 MB</p>
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
                    <tr><td colSpan={3} className="border border-stroke px-3 py-4 text-left text-sm text-gray-500 dark:border-dark-3">No records found.</td></tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-end gap-2 border-t border-stroke pt-4 dark:border-dark-3">
            <button onClick={() => router.push("/operational/tender/create-tender/list")}
              className="flex items-center gap-1.5 rounded bg-[#dc3545] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              Cancel
            </button>
            <button className="flex items-center gap-1.5 rounded bg-[#28a745] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12" /></svg>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
