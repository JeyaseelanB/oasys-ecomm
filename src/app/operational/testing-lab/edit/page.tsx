"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ── Icon helpers ── */
const GridIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="0.5" /><rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="9" width="6" height="6" rx="0.5" /><rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);
const TreeIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
  </svg>
);
const HashIco = () => <span className="text-gray-500 text-xs font-bold leading-none">#</span>;
const PencilIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);
const PctIco = () => <span className="text-gray-500 text-xs font-bold leading-none">%</span>;
const GearIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);
const DropIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 00-1.414 0l-4 4a1 1 0 000 1.414A9 9 0 0010 19a9 9 0 007.707-10.293 1 1 0 00-1.414 0L10 15l-2.293-2.293a1 1 0 00-1.414 0z" clipRule="evenodd" />
  </svg>
);
const PeopleIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);
const FunnelIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
  </svg>
);

const ResultSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const cls =
    value === "Satisfied"
      ? "bg-green-100 text-green-700 border-green-300"
      : value === "Not Satisfied"
        ? "bg-red-100 text-red-700 border-red-300"
        : "bg-white text-gray-700 border-gray-300";
  return (
    <select
      className={`border rounded px-2 py-1.5 text-sm focus:outline-none ${cls}`}
      style={{ minWidth: 120 }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>
      <option value="Satisfied">Satisfied</option>
      <option value="Not Satisfied">Not Satisfied</option>
    </select>
  );
};

const IconInput = ({
  icon,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div className="flex border border-gray-300 rounded overflow-hidden h-8">
    <div className="bg-gray-100 border-r border-gray-300 px-2 flex items-center justify-center min-w-[30px]">
      {icon}
    </div>
    <input
      type="text"
      placeholder={placeholder ?? "pieces"}
      className="flex-1 px-2 text-sm focus:outline-none bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const IconRatingSelect = ({
  icon,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex border border-gray-300 rounded overflow-hidden h-8">
    <div className="bg-gray-100 border-r border-gray-300 px-2 flex items-center justify-center min-w-[30px]">
      {icon}
    </div>
    <select
      className="flex-1 px-2 text-sm focus:outline-none bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>
      {[1, 2, 3, 4, 5].map((n) => (
        <option key={n} value={String(n)}>{n}</option>
      ))}
    </select>
  </div>
);

export default function EditTestReportPage() {
  const router = useRouter();

  // Pre-filled values from screenshot
  const [stockInward, setStockInward] = useState("Jun21170439/23-Jun-2021");
  const [sampleNumber, setSampleNumber] = useState("10649905");

  // Product details (read-only, populated after search)
  const productDetails = {
    dateOfReceipt: "23-Jun-2021",
    varietyCode: "SAWB",
    varietyName: "ARNI SILK SAREE WITH BLOUSE",
  };

  const [warpCount, setWarpCount] = useState("20");
  const [warpCountResult, setWarpCountResult] = useState("Satisfied");
  const [weftCount, setWeftCount] = useState("20");
  const [weftCountResult, setWeftCountResult] = useState("Satisfied");

  const [endsPerInch, setEndsPerInch] = useState("100");
  const [endsResult, setEndsResult] = useState("Satisfied");
  const [picksPerInch, setPicksPerInch] = useState("45");
  const [picksResult, setPicksResult] = useState("Satisfied");

  const [warpShrink, setWarpShrink] = useState("2");
  const [warpShrinkResult, setWarpShrinkResult] = useState("Satisfied");
  const [weftShrink, setWeftShrink] = useState("2");
  const [weftShrinkResult, setWeftShrinkResult] = useState("Satisfied");

  const [changeInColor, setChangeInColor] = useState("3");
  const [changeInColorResult, setChangeInColorResult] = useState("Not Satisfied");
  const [stainingCotton, setStainingCotton] = useState("4");
  const [stainingCottonResult, setStainingCottonResult] = useState("Satisfied");

  const [dry, setDry] = useState("4");
  const [dryResult, setDryResult] = useState("Satisfied");
  const [wet, setWet] = useState("3");
  const [wetResult, setWetResult] = useState("Not Satisfied");

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:text-teal-600">🏠 Home</Link></li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Testing Lab</li>
          <li>/</li>
          <li className="text-gray-700">Testing Lab - Edit Test Report</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">
        Testing Lab - Edit Test Report
      </h1>

      <div className="bg-white rounded shadow-sm border border-gray-200">
        <div
          className="px-4 py-2 flex items-center justify-between text-white text-sm font-semibold rounded-t"
          style={{ backgroundColor: "#2d8f7b" }}
        >
          <span>Create Test Report - Testing Lab</span>
          <span className="text-xs font-normal opacity-90">(* Mandatory Fields)</span>
        </div>

        <div className="p-4 space-y-5">
          {/* Search row */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-1" style={{ minWidth: 280 }}>
              <label className="text-xs text-gray-700">Stock Inward Number / Date</label>
              <div className="flex border border-gray-300 rounded overflow-hidden h-8">
                <div className="bg-gray-100 border-r border-gray-300 px-2 flex items-center justify-center min-w-[30px]">
                  <TreeIco />
                </div>
                <select
                  className="flex-1 px-2 text-sm focus:outline-none bg-white"
                  value={stockInward}
                  onChange={(e) => setStockInward(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Jun21170439/23-Jun-2021">Jun21170439 / 23-Jun-2021</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1" style={{ minWidth: 280 }}>
              <label className="text-xs text-gray-700">Product Sample Number</label>
              <div className="flex border border-gray-300 rounded overflow-hidden h-8">
                <div className="bg-gray-100 border-r border-gray-300 px-2 flex items-center justify-center min-w-[30px]">
                  <HashIco />
                </div>
                <select
                  className="flex-1 px-2 text-sm focus:outline-none bg-white"
                  value={sampleNumber}
                  onChange={(e) => setSampleNumber(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="10649905">10649905</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#6c757d" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 13.5V17h3.5l9.026-9.026-3.5-3.5L4 13.5z" />
                </svg>
                Clear
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
                style={{ backgroundColor: "#17a2b8" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* Product Details — pre-populated */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GridIco />
              <span className="font-semibold text-sm text-gray-800">Product Details</span>
            </div>
            <div className="grid grid-cols-3 gap-6 border-b border-gray-100 pb-4">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Date of Receipt of the Sample</p>
                <p className="text-sm font-medium" style={{ color: "#2d8f7b" }}>
                  {productDetails.dateOfReceipt}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Product Variety Code</p>
                <p className="text-sm font-medium" style={{ color: "#2d8f7b" }}>
                  {productDetails.varietyCode}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Product Variety Name</p>
                <p className="text-sm font-medium" style={{ color: "#2d8f7b" }}>
                  {productDetails.varietyName}
                </p>
              </div>
            </div>
          </div>

          {/* Test Details */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GridIco />
              <span className="font-semibold text-sm text-gray-800">Test Details</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column */}
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: "#2d8f7b" }}>Count</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Warp Count</p>
                      <div className="flex gap-2 items-center">
                        <IconInput icon={<HashIco />} value={warpCount} onChange={setWarpCount} />
                        <ResultSelect value={warpCountResult} onChange={setWarpCountResult} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Weft Count</p>
                      <div className="flex gap-2 items-center">
                        <IconInput icon={<HashIco />} value={weftCount} onChange={setWeftCount} />
                        <ResultSelect value={weftCountResult} onChange={setWeftCountResult} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: "#2d8f7b" }}>Shrinkage (%)</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Warp Shrinkage (%)</p>
                      <div className="flex gap-2 items-center">
                        <IconInput icon={<PctIco />} value={warpShrink} onChange={setWarpShrink} />
                        <ResultSelect value={warpShrinkResult} onChange={setWarpShrinkResult} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Weft Shrinkage (%)</p>
                      <div className="flex gap-2 items-center">
                        <IconInput icon={<PctIco />} value={weftShrink} onChange={setWeftShrink} />
                        <ResultSelect value={weftShrinkResult} onChange={setWeftShrinkResult} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: "#2d8f7b" }}>Rubbing</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Dry</p>
                      <div className="flex gap-2 items-center">
                        <IconRatingSelect icon={<GearIco />} value={dry} onChange={setDry} />
                        <ResultSelect value={dryResult} onChange={setDryResult} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Wet</p>
                      <div className="flex gap-2 items-center">
                        <IconRatingSelect icon={<DropIco />} value={wet} onChange={setWet} />
                        <ResultSelect value={wetResult} onChange={setWetResult} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: "#2d8f7b" }}>Threads Per Inch</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Ends Per Inch</p>
                      <div className="flex gap-2 items-center">
                        <IconInput icon={<PencilIco />} value={endsPerInch} onChange={setEndsPerInch} />
                        <ResultSelect value={endsResult} onChange={setEndsResult} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Picks Per Inch</p>
                      <div className="flex gap-2 items-center">
                        <IconInput icon={<PencilIco />} value={picksPerInch} onChange={setPicksPerInch} />
                        <ResultSelect value={picksResult} onChange={setPicksResult} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: "#2d8f7b" }}>Washing</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Change in Color</p>
                      <div className="flex gap-2 items-center">
                        <IconRatingSelect icon={<PeopleIco />} value={changeInColor} onChange={setChangeInColor} />
                        <ResultSelect value={changeInColorResult} onChange={setChangeInColorResult} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Staining on Cotton</p>
                      <div className="flex gap-2 items-center">
                        <IconRatingSelect icon={<FunnelIco />} value={stainingCotton} onChange={setStainingCotton} />
                        <ResultSelect value={stainingCottonResult} onChange={setStainingCottonResult} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-600">
              <span className="font-semibold">Note :</span>{" "}
              <span style={{ color: "#dc3545" }}>
                1 - Very Bad, 2 - Bad, 3 - Fair, 4 - Good, 5 - Excellent
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#6c757d" }}
            onClick={() => router.push("/operational/testing-lab/list")}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#28a745" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
