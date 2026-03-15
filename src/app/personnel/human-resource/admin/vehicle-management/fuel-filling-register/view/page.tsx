"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const GridIco = () => (
  <svg className="size-4 text-[#2d8f7b]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>
);

export default function ViewFuelFillingRegisterPage() {
  const router = useRouter();

  const record = {
    hoRo: "HEAD OFFICE",
    vehicleNumber: "TN01 AF 6116",
    vehicleName: "Innova 2.5V",
    variant: "Diesel",
    driverName: "",
    driverId: "",
    lastFilledDate: "26-May-2020",
    lastFilledQty: "35.0",
    lastFilledKm: "225950.0",
    couponNumber: "33026",
    lastClosingTripKm: "225950.0",
    fuelToFill: "35.00",
    pricePerLitre: "",
    fuelValueAmount: "0.0",
    // Receipt details
    receiptDate: "",
    receiptNumber: "",
    amount: "",
    ratePerLitre: "",
    fuelFilled: "",
    cancellationDate: "",
    reason: "",
    uploadedDocument: "IMG_20201118_171742182_20201118_171750492.jpg",
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Fuel Filling Register</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Human Resource</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Admin</li>
            <li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Vehicle Management</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">View Fuel Filling Register</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="rounded-t-[10px] bg-[#2d8f7b] px-5 py-3">
          <h3 className="text-sm font-semibold text-white">Fuel Filling Register</h3>
        </div>

        <div className="p-5">
          {/* Vehicle & Fuel Details (flat grid, no section header) */}
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div><p className="text-xs text-gray-500">HO/RO</p><p className="text-sm font-medium text-[#17a2b8]">{record.hoRo}</p></div>
            <div><p className="text-xs text-gray-500">Vehicle Number</p><p className="text-sm font-medium text-[#17a2b8]">{record.vehicleNumber}</p></div>
            <div><p className="text-xs text-gray-500">Vehicle Name</p><p className="text-sm font-medium text-[#17a2b8]">{record.vehicleName}</p></div>
            <div><p className="text-xs text-gray-500">Variant</p><p className="text-sm font-medium text-[#17a2b8]">{record.variant}</p></div>
            <div><p className="text-xs text-gray-500">Driver Name</p><p className="text-sm font-medium text-[#17a2b8]">{record.driverName || "-"}</p></div>
            <div><p className="text-xs text-gray-500">Driver ID</p><p className="text-sm font-medium text-[#17a2b8]">{record.driverId || "-"}</p></div>
            <div><p className="text-xs text-gray-500">Last Filled Date</p><p className="text-sm font-medium text-[#17a2b8]">{record.lastFilledDate}</p></div>
            <div><p className="text-xs text-gray-500">Last Filled QTY (in litres)</p><p className="text-sm font-medium text-[#17a2b8]">{record.lastFilledQty}</p></div>
            <div><p className="text-xs text-gray-500">Last Filled Kilometer</p><p className="text-sm font-medium text-[#17a2b8]">{record.lastFilledKm}</p></div>
            <div><p className="text-xs text-gray-500">Coupon Number</p><p className="text-sm font-medium text-[#17a2b8]">{record.couponNumber}</p></div>
            <div><p className="text-xs text-gray-500">Last Closing Trip Kilometer</p><p className="text-sm font-medium text-[#17a2b8]">{record.lastClosingTripKm}</p></div>
            <div><p className="text-xs text-gray-500">Fuel to be Filled</p><p className="text-sm font-medium text-[#17a2b8]">{record.fuelToFill}</p></div>
            <div><p className="text-xs text-gray-500">Price Per Litre</p><p className="text-sm font-medium text-[#17a2b8]">{record.pricePerLitre || <span className="text-[#17a2b8]">₹</span>}</p></div>
            <div><p className="text-xs text-gray-500">Fuel Value/Amount</p><p className="text-sm font-medium text-[#17a2b8]">{record.fuelValueAmount}</p></div>
          </div>

          {/* Receipt Details */}
          <div className="mb-2 flex items-center gap-2">
            <GridIco />
            <h4 className="text-sm font-semibold text-dark dark:text-white">Receipt Details</h4>
          </div>
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-stroke pb-6 md:grid-cols-2 lg:grid-cols-4 dark:border-dark-3">
            <div><p className="text-xs text-gray-500">Receipt Date</p><p className="text-sm font-medium text-[#17a2b8]">{record.receiptDate || "-"}</p></div>
            <div><p className="text-xs text-gray-500">Receipt Number</p><p className="text-sm font-medium text-[#17a2b8]">{record.receiptNumber || "-"}</p></div>
            <div>
              <p className="text-xs text-gray-500">Amount</p>
              <p className="text-sm font-medium text-[#17a2b8]">
                {record.amount ? `₹ ${record.amount}` : <span className="text-[#17a2b8]">₹</span>}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Rate Per Litre</p>
              <p className="text-sm font-medium text-[#17a2b8]">
                {record.ratePerLitre ? `₹ ${record.ratePerLitre}` : <span className="text-[#17a2b8]">₹</span>}
              </p>
            </div>
            <div><p className="text-xs text-gray-500">Fuel to be Filled</p><p className="text-sm font-medium text-[#17a2b8]">{record.fuelFilled || "-"}</p></div>
            <div><p className="text-xs text-gray-500">Cancellation Date</p><p className="text-sm font-medium text-[#17a2b8]">{record.cancellationDate || "-"}</p></div>
            <div><p className="text-xs text-gray-500">Reason</p><p className="text-sm font-medium text-[#17a2b8]">{record.reason || "-"}</p></div>
            <div>
              <p className="text-xs text-gray-500">Uploaded Documents :</p>
              {record.uploadedDocument ? (
                <div className="mt-1 space-y-1">
                  <p className="text-sm font-medium text-[#17a2b8] break-all">{record.uploadedDocument}</p>
                  <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <polyline points="8,17 12,21 16,17"/>
                      <line x1="12" y1="12" x2="12" y2="21"/>
                      <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>
                    </svg>
                    Download
                  </button>
                </div>
              ) : (
                <p className="text-sm font-medium text-[#17a2b8]">-</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-dark-3">
            <button className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              View Note
            </button>
            <button
              onClick={() => router.push("/personnel/human-resource/admin/vehicle-management/fuel-filling-register/list")}
              className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/>
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
