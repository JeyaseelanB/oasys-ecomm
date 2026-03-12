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
            title: "Procurement Costing Society",
            url: "/weavers/procurement-costing-society/list",
          },
          {
            title: "Society Product Appraisal",
            url: "/weavers/society-product-appraisal/list",
          },
          {
            title: "Supply Rate Confirmation",
            url: "/weavers/supply-rate-confirmation/list",
          },

          {
            title: "Production Planning",
            url: "/operational/production-planning",
            items: [
              {
                title: "Contract / Export",
                url: "/operational/production-planning/contract-export",
                items: [
                  {
                    title: "Production Plan",
                    url: "/operational/production-planning/contract-export/list",
                  },
                ],
              },
              {
                title: "Additional Production Plan",
                url: "/operational/production-planning/additional-production-plan/list",
                items: [],
              },
              {
                title: "Government Scheme",
                url: "/operational/production-planning/government-scheme",
                items: [
                  {
                    title: "Production Plan",
                    url: "/operational/production-planning/government-scheme/list",
                  },
                  {
                    title: "District / Taluk Wise Requirement",
                    url: "/operational/production-planning/government-scheme/district-taluk-wise-requirement/list",
                  },
                ],
              },
              {
                title: "Retail Production Plan",
                url: "/operational/production-planning/retail-production-plan",
                items: [
                  {
                    title: "Production Plan-HO",
                    url: "/operational/production-planning/retail-production-plan/production-plan-ho/list",
                  },
                  {
                    title: "Production Plan-RO",
                    url: "/operational/production-planning/retail-production-plan/production-plan-ro/list",
                  },
                  {
                    title: "Production Plan-SR",
                    url: "/operational/production-planning/retail-production-plan/production-plan-sr/list",
                  },
                ],
              },
            ],
          },
          {
            title: "Advertisement",
            url: "/operational/advertisement/list",
            items: [],
          },
          {
            title: "Testing Lab",
            url: "/operational/testing-lab",
            items: [
              {
                title: " Test Report ",
                url: "/operational/testing-lab/list",
              },
            ],
          },
          {
            title: "Textile Library",
            url: "/operational/textile-library/list",
            items: [],
          },
          {
            title: "Quotation/Order/Invoice",
            url: "/operational/quotation-order-invoice",
            items: [
              {
                title: "Purchase",
                url: "/operational/quotation-order-invoice/purchase",
                items: [
                  {
                    title: "Purchase Quotation",
                    url: "/operational/quotation-order-invoice/purchase/purchase-quotation/list",
                  },
                  {
                    title: "Purchase Order",
                    url: "/operational/quotation-order-invoice/purchase/purchase-order/list",
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
              {
                title: "District / Taluk Wise Distribution",
                url: "/close-sales/issr/district-taluk-wise-distribution/list",
              },
              {
                title: "Society Stock Outward",
                url: "/weavers/society-stock-outward/list",
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