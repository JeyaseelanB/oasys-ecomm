"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const GridIco = () => (
  <svg className="w-3.5 h-3.5 text-gray-600" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="0.5" /><rect x="9" y="1" width="6" height="6" rx="0.5" />
    <rect x="1" y="9" width="6" height="6" rx="0.5" /><rect x="9" y="9" width="6" height="6" rx="0.5" />
  </svg>
);

const Result = ({ value }: { value: string }) => {
  const isSatisfied = value === "Satisfied";
  const isNot = value === "Not Satisfied";
  return (
    <span
      className={`text-sm font-medium ${
        isSatisfied
          ? "text-green-600"
          : isNot
            ? "text-red-500"
            : "text-gray-700"
      }`}
    >
      {value}
    </span>
  );
};

const TealVal = ({ value }: { value: string }) => (
  <p className="text-sm font-medium" style={{ color: "#2d8f7b" }}>
    {value}
  </p>
);

type TestRow = {
  label: string;
  value: string;
  result: string;
};

const TestGroup = ({
  title,
  rows,
}: {
  title: string;
  rows: TestRow[];
}) => (
  <div className="mb-4">
    <p className="text-sm font-bold text-gray-800 mb-2">{title}</p>
    <div className="grid grid-cols-4 gap-x-6 gap-y-1">
      {rows.map((r) => (
        <>
          <p key={r.label + "-label"} className="text-xs text-gray-500">
            {r.label}
          </p>
          <p key={r.label + "-result-label"} className="text-xs text-gray-500">
            Result
          </p>
        </>
      ))}
    </div>
    <div className="grid grid-cols-4 gap-x-6 gap-y-2 mt-0.5">
      {rows.map((r) => (
        <>
          <TealVal key={r.label + "-val"} value={r.value} />
          <Result key={r.label + "-res"} value={r.result} />
        </>
      ))}
    </div>
  </div>
);

export default function ViewTestReportPage() {
  const router = useRouter();

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-1 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-teal-600">🏠 Home</Link>
          </li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Operational</li>
          <li>/</li>
          <li className="hover:text-teal-600 cursor-pointer">Testing Lab</li>
          <li>/</li>
          <li className="text-gray-700">Testing Lab - View Test Report</li>
        </ol>
      </nav>
      <h1 className="text-base font-semibold text-gray-800 mb-3">
        Testing Lab - View Test Report
      </h1>

      <div className="bg-white rounded shadow-sm border border-gray-200">
        {/* Section header */}
        <div
          className="px-4 py-2 text-white text-sm font-semibold rounded-t"
          style={{ backgroundColor: "#2d8f7b" }}
        >
          Test Report
        </div>

        <div className="p-4 space-y-5">
          {/* Top fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Stock Inward Number / Date</p>
              <TealVal value="Jun21170439/23-Jun-2021" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Product Sample Number</p>
              <TealVal value="10649905" />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GridIco />
              <span className="font-semibold text-sm text-gray-800">Product Details</span>
            </div>
            <div className="grid grid-cols-3 gap-6 border-b border-gray-100 pb-4">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Date of Receipt of the Sample</p>
                <TealVal value="23-Jun-2021" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Product Variety Code</p>
                <TealVal value="SAWB" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Product Variety Name</p>
                <TealVal value="ARNI SILK SAREE WITH BLOUSE" />
              </div>
            </div>
          </div>

          {/* Test Details */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GridIco />
              <span className="font-semibold text-sm text-gray-800">Test Details</span>
            </div>

            {/* Two-column layout: left (Count, Shrinkage, Rubbing) | right (Threads Per Inch, Washing) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left */}
              <div className="space-y-4">
                {/* Count */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">Count</p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-x-4">
                      <p className="text-xs text-gray-500">Warp Count</p>
                      <p className="text-xs text-gray-500">Result</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <TealVal value="20" />
                      <Result value="Satisfied" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <p className="text-xs text-gray-500">Weft Count</p>
                      <p className="text-xs text-gray-500">Result</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <TealVal value="20" />
                      <Result value="Satisfied" />
                    </div>
                  </div>
                </div>

                {/* Shrinkage */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">Shrinkage (%)</p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-x-4">
                      <p className="text-xs text-gray-500">Warp Shrinkage</p>
                      <p className="text-xs text-gray-500">Result</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <TealVal value="2" />
                      <Result value="Satisfied" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <p className="text-xs text-gray-500">Weft Shrinkage</p>
                      <p className="text-xs text-gray-500">Result</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <TealVal value="2" />
                      <Result value="Satisfied" />
                    </div>
                  </div>
                </div>

                {/* Rubbing */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">Rubbing</p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-x-4">
                      <p className="text-xs text-gray-500">Dry</p>
                      <p className="text-xs text-gray-500">Result</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <TealVal value="4" />
                      <Result value="Satisfied" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <p className="text-xs text-gray-500">Wet</p>
                      <p className="text-xs text-gray-500">Result</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <TealVal value="3" />
                      <Result value="Not Satisfied" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="space-y-4">
                {/* Threads Per Inch */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">Threads Per Inch</p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-x-4">
                      <p className="text-xs text-gray-500">Ends Per Inch</p>
                      <p className="text-xs text-gray-500">Result</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <TealVal value="100" />
                      <Result value="Satisfied" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <p className="text-xs text-gray-500">Picks Per Inch</p>
                      <p className="text-xs text-gray-500">Result</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <TealVal value="45" />
                      <Result value="Satisfied" />
                    </div>
                  </div>
                </div>

                {/* Washing */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">Washing</p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-x-4">
                      <p className="text-xs text-gray-500">Change in Color</p>
                      <p className="text-xs text-gray-500">Result</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <TealVal value="3" />
                      <Result value="Not Satisfied" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <p className="text-xs text-gray-500">Staining on Cotton</p>
                      <p className="text-xs text-gray-500">Result</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <TealVal value="4" />
                      <Result value="Satisfied" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="mt-4 text-xs text-gray-600">
              <span className="font-semibold">Note :</span>{" "}
              <span style={{ color: "#dc3545" }}>
                1 - Very Bad, 2 - Bad, 3 - Fair, 4 - Good, 5 - Excellent
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-4 py-3 border-t border-gray-200">
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 text-white text-sm font-semibold rounded"
            style={{ backgroundColor: "#17a2b8" }}
            onClick={() => router.push("/operational/testing-lab/list")}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
