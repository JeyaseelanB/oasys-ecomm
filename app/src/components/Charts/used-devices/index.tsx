"use client";

import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DonutChart } from "./chart";

type DeviceData = { name: string; percentage: number; amount: number }[];

function getDevicesData(timeFrame: string): DeviceData {
  const data = [
    { name: "Desktop", percentage: 0.65, amount: 1625 },
    { name: "Tablet", percentage: 0.1, amount: 250 },
    { name: "Mobile", percentage: 0.2, amount: 500 },
    { name: "Unknown", percentage: 0.05, amount: 125 },
  ];

  if (timeFrame === "yearly") {
    data[0].amount = 19500;
    data[1].amount = 3000;
    data[2].amount = 6000;
    data[3].amount = 1500;
  }

  return data;
}

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export function UsedDevices({
  timeFrame = "monthly",
  className,
}: PropsType) {
  const [data, setData] = useState<DeviceData | null>(null);

  useEffect(() => {
    setData(getDevicesData(timeFrame));
  }, [timeFrame]);

  if (!data) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-1 grid-rows-[auto_1fr] gap-9 overflow-visible rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Used Devices
        </h2>

        <PeriodPicker defaultValue={timeFrame} sectionKey="used_devices" />
      </div>

      <div className="grid place-items-center">
        <DonutChart data={data} />
      </div>
    </div>
  );
}
