"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ViewAssetCategoryPage() {
  const router = useRouter();

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">View Asset Category</h2>
        <nav><ol className="flex items-center gap-1.5 text-sm"><li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li><li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Masters</li><li className="text-gray-400">/</li><li className="text-gray-500 dark:text-gray-400">Asset Masters</li><li className="text-gray-400">/</li><li className="font-medium text-primary">View Asset Category</li></ol></nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke bg-[#2d8f7b] px-6 py-3 dark:border-dark-3 rounded-t-[10px]">
          <h3 className="text-base font-semibold text-white">Asset Category</h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Parent Asset Category</p>
              <p className="mt-1 text-sm font-medium text-primary">Wood</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Asset Category Code</p>
              <p className="mt-1 text-sm font-medium text-primary">SASA</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Asset Category Name</p>
              <p className="mt-1 text-sm font-medium text-primary">Forum</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Asset Category Name in Tamil</p>
              <p className="mt-1 text-sm font-medium text-primary">Sisham</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <p className="mt-1 text-sm font-medium text-primary">Active</p>
          </div>

          <div className="mt-8 flex items-center justify-end">
            <button onClick={() => router.push("/masters/asset-masters/asset-category/list")} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></svg>Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
