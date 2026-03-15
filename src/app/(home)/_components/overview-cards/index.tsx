"use client";

import { compactFormat } from "@/lib/format-number";
import { useEffect, useState } from "react";
import { OverviewCard } from "./card";
import * as icons from "./icons";

type OverviewData = {
  views: { value: number; growthRate: number };
  profit: { value: number; growthRate: number };
  products: { value: number; growthRate: number };
  users: { value: number; growthRate: number };
};

function getOverview(): OverviewData {
  return {
    views: { value: 3456, growthRate: 0.43 },
    profit: { value: 4220, growthRate: 4.35 },
    products: { value: 3456, growthRate: 2.59 },
    users: { value: 3456, growthRate: -0.95 },
  };
}

export function OverviewCardsGroup() {
  const [data, setData] = useState<OverviewData | null>(null);

  useEffect(() => {
    setData(getOverview());
  }, []);

  if (!data) return null;

  const { views, profit, products, users } = data;

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Views"
        data={{
          ...views,
          value: compactFormat(views.value),
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Total Profit"
        data={{
          ...profit,
          value: "$" + compactFormat(profit.value),
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Total Products"
        data={{
          ...products,
          value: compactFormat(products.value),
        }}
        Icon={icons.Product}
      />

      <OverviewCard
        label="Total Users"
        data={{
          ...users,
          value: compactFormat(users.value),
        }}
        Icon={icons.Users}
      />
    </div>
  );
}
