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
            title: "Society Enrollment",
            items: [
              {
                title: "Request For Society Enrollment",
                url: "/weavers/society-enrollment/request-for-society-enrollment/list",
              }, {
                title: "Society Enrollment",
                url: "/weavers/society-enrollment/list",
              }, {
                title: "Field Verification",
                url: "/weavers/society-enrollment/field-verification/list",
              },
              {
                title: "Department Approval",
                url: "/weavers/society-enrollment/department-approval/list",
              },
              {
                title: "Board Approval",
                url: "/weavers/society-enrollment/board-approval/list",
              },
              {
                title: "Code Allotment",
                url: "/weavers/society-enrollment/code-allotment/list",
              }
            ]
          },
          {
            title: "Society Stock Outward",
            url: "/weavers/society-stock-outward/list",
          },
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
            title: "Tender",
            icon: Icons.Operational,

            items: [
              {
                title: "Create Tender",
                url: "/operational/tender/create-tender/list",
              },
              {
                title: "Apply Tender",
                url: "/operational/tender/apply-tender/list",
              },
              {
                title: "Tender Evaluation",
                url: "/operational/tender/tender-evaluation/list",
              },
              {
                title: "Tender Negotation",
                url: "/operational/tender/tender-negotiation/list",
              },
              {
                title: "Tender Awarding",
                url: "/operational/tender/tender-awarding/list",
              },
            ],
          },
          {
            title: "Printing & Stationary",
            items: [
              {
                title: "Request",
                url: "/operational/printing-stationary/request/list",
              },
              {
                title: "Requirement",
                url: "/operational/printing-stationary/requirement/list",
              },
              {
                title: "Consolidate Requirement",
                url: "/operational/printing-stationary/consolidate-requirement/list",
              },
              {
                title: "Disposal",
                url: "/operational/printing-stationary/disposal/list",
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
              {
                title: "Export Warehouse",
                url: "/operational/warehouse-management/export-warehouse",
                items: [
                  {
                    title: "Stock Inward",
                    url: "/operational/warehouse-management/export-warehouse/stock-inward/list",
                  },
                  {
                    title: "Stock Outward",
                    url: "/operational/warehouse-management/export-warehouse/stock-outward/list",
                  },
                ],
              },
              {
                title: "Printing Warehouse",
                url: "/operational/warehouse-management/printing-warehouse",
                items: [
                  {
                    title: "Stock Inward",
                    url: "/operational/warehouse-management/printing-warehouse/stock-inward/list",
                  },
                  {
                    title: "Stock Outward",
                    url: "/operational/warehouse-management/printing-warehouse/stock-outward/list",
                  },
                ],
              },
              {
                title: "ISSR",
                url: "/operational/warehouse-management/issr",
                items: [
                  {
                    title: "Stock Inward",
                    url: "/operational/warehouse-management/issr/stock-inward/list",
                  },
                  {
                    title: "Stock Outward",
                    url: "/operational/warehouse-management/issr/stock-outward/list",
                  },
                  {
                    title: "District / Taluk Wise Distribution",
                    url: "/close-sales/issr/district-taluk-wise-distribution/list",
                  },
                ],
              },
            ],
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
                title: "Test Report",
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
        title: "Asset Management",
        icon: Icons.AssetManagement,
        items: [
          {
            title: "Modernization",
            url: "/asset-management/modernization",
            items: [
              {
                title: "Request For Modernization/Construction/Supplementary work",
                url: "/asset-management/modernization/request-for-modernization/list",
              },
              {
                title: "Estimation of Modernization",
                url: "/asset-management/modernization/estimation-of-modernization/list",
              },
            ]
          }
        ]
      },

      {
        title: "Personnel",
        icon: Icons.Weavers,
        items: [
          {
            title: "Human Resource",
            items: [
              {
                title: "Attendance",
                items: [
                  {
                    title: "View Biometric Attendance",
                    url: "/personnel/human-resource/attendance/view-biometric-attendance",
                  },
                ],
              },
              {
                title: "Pay Roll",
                items: [
                  {
                    title: "Employee Payment Details",
                    url: "/personnel/human-resource/pay-roll/employee-payment-details/list",
                  },
                  {
                    title: "Income Tax Worksheet",
                    url: "/personnel/human-resource/pay-roll/income-tax-worksheet/list",
                  },
                ],
              },
            ],
          },
          {
            title: "Admin",
            items: [
              {
                title: "Vehicle Management",
                items: [
                  {
                    title: "Vehicle Departure",
                    url: "/personnel/human-resource/admin/vehicle-management/vehicle-departure/list",
                  },
                  {
                    title: "Vehicle Arrival",
                    url: "/personnel/human-resource/admin/vehicle-management/vehicle-arrival/list",
                  },
                  {
                    title: "Fuel Filling Register",
                    url: "/personnel/human-resource/admin/vehicle-management/fuel-filling-register/list",
                  },
                ],
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
];