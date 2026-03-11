import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "eCommerce",
            url: "/",
          },
        ],
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Forms",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Form Elements",
            url: "/forms/form-elements",
          },
          {
            title: "Form Layout",
            url: "/forms/form-layout",
          },
        ],
      },
      {
        title: "Tables",
        url: "/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Tables",
            url: "/tables",
          },
        ],
      },
      {
        title: "Weavers",
        icon: Icons.Weavers,
        items: [
          {
            title: "Society Invoice",
            url: "/weavers/society-invoice/",
          },
          {
            title: "Stock Acknowledgement",
            url: "/weavers/stock-acknowledgement/list",
          },
        ],
      },
      {
        title: "Operational",
        icon: Icons.Operational,
        items: [
          {
            title: "Stock Management",
            url: "/operational/stock-management",
            items: [
              {
                title: "Item Inward",
                url: "/operational/stock-management/stock-item-inward/list",
              },
              {
                title: "Item Outward",
                url: "/operational/stock-management/item-outward/list",
              },
              {
                title: "Inventory Closing",
                url: "/operational/stock-management/inventory-closing",
              },
              {
                title: "Stock Upload",
                url: "/operational/stock-management/stock-upload",
              },
              {
                title: "Stock Verification",
                url: "/operational/stock-management/stock-verification",
              },
            ],
          },
          {
            title: "Procurement",
            url: "/operational/procurement",
            items: [
              {
                title: "Procurement Costing",
                url: "/operational/procurement/procurement-costing/list",
              },
              {
                title: "Retail Procurement",
                url: "/operational/procurement/retail-procurement",
                items: [
                  {
                    title: "Society Wise Production Plan",
                    url: "/operational/procurement/retail-procurement/society-wise-production-plan/list",
                  },
                  {
                    title: "Procurement Order",
                    url: "/operational/procurement/retail-procurement/procurement-order/list",
                  },
                  {
                    title: "Retail Purchase Order",
                    url: "/operational/procurement/retail-procurement/purchase-order/list",
                  },
                  {
                    title: "D&P Procurement Plan",
                    url: "/operational/procurement/retail-procurement/dnp-procurement-plan/list",
                  },
                ],
              },
            ],
          },
          {
            title: "Warehouse Management",
            url: "/operational/warehouse-management",
            items: [
              {
                title: "Product Warehouse",
                url: "/operational/warehouse-management/product-warehouse",
                items: [
                  {
                    title: "Quality Checking",
                    url: "/operational/warehouse-management/product-warehouse/quality-check/list",
                  },
                  {
                    title: "QR Code",
                    url: "/operational/warehouse-management/product-warehouse/qr-code/list",
                  },
                  {
                    title: "Stock Outward",
                    url: "/operational/warehouse-management/product-warehouse/stock-outward/list",
                  },
                ],
              },
              {
                title: "Distribution Warehouse",
                url: "/operational/warehouse-management/distribution-warehouse",
                items: [
                  {
                    title: "Stock Inward",
                    url: "/operational/warehouse-management/distribution-warehouse/stock-inward/list",
                  },
                  {
                    title: "Stock Outward",
                    url: "/operational/warehouse-management/distribution-warehouse/stock-outward/list",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Close Sales",
        icon: Icons.CloseSales,
        items: [
          {
            title: "ISSR",
            url: "/close-sales/issr",
            items: [
              {
                title: "System Notification List",
                url: "/close-sales/issr/system-notification-list",
              },
            ],
          },
        ],
      },
      {
        title: "Pages",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/pages/settings",
          },
          {
            title: "Layout Demo",
            url: "/pages/layout-demo",
          },
          {
            title: "Full Width Example",
            url: "/pages/fullwidth-example",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
