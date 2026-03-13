"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FbfContributionViewPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="whitespace-nowrap text-[22px] font-bold leading-tight text-dark dark:text-white">
          View FBF Contribution
        </h2>
        <nav className="self-start">
          <ol className="flex items-center gap-1.5 whitespace-nowrap text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Personnel</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-500 dark:text-gray-400">Employee Self Service</li>
            <li className="text-gray-400">/</li>
            <li className="font-medium text-primary">View FBF Contribution</li>
          </ol>
        </nav>
      </div>

      {/* Title Bar */}
      <div className="mb-4 rounded bg-[#00bcd4] px-4 py-2.5">
        <h3 className="text-base font-semibold text-white">FBF Contribution</h3>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Row 1 */}
        <div className="mb-5 grid grid-cols-4 gap-8">
          <div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Employee Name / Provident Fund Number</p>
            <p className="text-sm font-medium text-primary">RAMASAMY / 784</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Year</p>
            <p className="text-sm font-medium text-primary">2024</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Month</p>
            <p className="text-sm font-medium text-primary">4</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Total Amount Planned</p>
            <p className="text-sm font-medium text-primary">&#8377; 300000.0</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="mb-8 grid grid-cols-4 gap-8">
          <div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Employer Contribution</p>
            <p className="text-sm font-medium text-primary">&#8377; 60000.0</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Total Number of Employees</p>
            <p className="text-sm font-medium text-primary">1364</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">Per Employee Contribution</p>
            <p className="text-sm font-medium text-primary">&#8377; 175.95</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end">
          <button
            onClick={() => router.push("/personnel/employee-self-service/fbf-contribution/list")}
            className="flex items-center gap-1.5 rounded bg-[#00bcd4] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
