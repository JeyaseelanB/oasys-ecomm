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
                title: "Purchase Order",
                url: "/operational/procurement/purchase-order/list",
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
              {
                title: "Other Procurement",
                url: "/operational/procurement/other-procurement",
                items: [
                  {
                    title: "Procurement Order",
                    url: "/operational/procurement/other-procurement/procurement-order/list",
                  },
                  {
                    title: "Purchase Order",
                    url: "/operational/procurement/other-procurement/purchase-order/list",
                  },
                  {
                    title: "Society Wise Production",
                    url: "/operational/procurement/other-procurement/society-wise-production",
                    items: [
                      {
                        title: "Additional Society Wise Production Plan",
                        url: "/operational/procurement/other-procurement/society-wise-production/additional-society-wise-production-plan/list",
                      },
                      {
                        title: "Contract / Export Society Wise Production Plan",
                        url: "/operational/procurement/other-procurement/society-wise-production/contract-export-society-wise-production-plan/list",
                      },
                      {
                        title: "Govt Society Wise Production Plan",
                        url: "/operational/procurement/other-procurement/society-wise-production/govt-society-wise-production-plan/list",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "Revised Retail Price",
            url: "/operational/revised-retail-price/list",
          },
          {
            title: "Gift Coupon",
            url: "/operational/gift-coupon-generation/list",
          },
          {
            title: "Sales Target",
            url: "/operational/sales-target/list",
          },

          {
            title: "Warehouse Management",
            url: "/operational/warehouse-management",
            items: [
              {
                title: "Ecommerce Warehouse",
                url: "/operational/warehouse-management/ecommerce-warehouse",
                items: [
                  {
                    title: "Stock Acknowledgement",
                    url: "/operational/warehouse-management/ecommerce-warehouse/stock-acknowledgement/list",
                  },
                ],
              },
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
              {
                title: "Inspection Center",
                url: "/operational/warehouse-management/inspection-center",
                items: [
                  {
                    title: "Quality Checking",
                    url: "/operational/warehouse-management/inspection-center/quality-check/list",
                  },
                  {
                    title: "Stock Inward",
                    url: "/operational/warehouse-management/inspection-center/stock-inward/list",
                  },
                  {
                    title: "Stock Outward",
                    url: "/operational/warehouse-management/inspection-center/stock-outward/list",
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
                  {
                    title: "Month Wise Procurement Plan",
                    url: "/operational/production-planning/retail-production-plan/month-wise-procurement-plan/list",
                    items: [],
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
                  {
                    title: "Bill",
                    url: "/operational/quotation-order-invoice/purchase/bill/list",
                    items: [],
                  },
                ],
              },
              {
                title: "Sales",
                url: "/operational/quotation-order-invoice/sales",
                items: [
                  {
                    title: "Sales Quotation",
                    url: "/operational/quotation-order-invoice/sales/sales-quotation/list",
                    items: [],
                  },
                  {
                    title: "Sales Order",
                    url: "/operational/quotation-order-invoice/sales/sales-order/list",
                    items: [],
                  },
                  {
                    title: "Sales Invoice",
                    url: "/operational/quotation-order-invoice/sales/sales-invoice/list",
                    items: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Personnel",
        icon: Icons.Personnel,
        items: [
          {
            title: "Human Resource",
            items: [
               {
                title: "Recruitment Process",
                url: "/personnel/human-resource/recruitment-process",
                items: [
                  {
                    title: "Permanent Recruitment",
                    items: [
                      {
                        title: "Staff Eligibility Statement",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/staff-eligibility-statement/list",
                      },
                      {
                        title: "Roster Reservation",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/roster-reservation/list",
                      },
                      {
                        title: "Job Advertisement",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/job-advertisement/list",
                      },
                      {
                        title: "Job Application",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/job-application/list",
                      },
                      {
                        title: "Exam Centre",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/exam-centre/list",
                      },
                      {
                        title: "Total Nominal",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/total-nominal/list",
                      },
                      {
                        title: "Hall Ticket",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/hall-ticket/list",
                      },
                      {
                        title: "Written Examination",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/written-examination/list",
                      },
                      {
                        title: "Oral Test Selection",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/oral-test-selection/list",
                      },
                      {
                        title: "Oral Test Venue",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/oral-test-venue/list",
                      },
                      {
                        title: "Call Letter",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/call-letter/list",
                      },
                      {
                        title: "Oral Test Mark",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/oral-test-mark/list",
                      },
                      {
                        title: "Consolidated Mark List",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/consolidated-mark-list/list",
                      },
                      {
                        title: "Appointment Order",
                        url: "/personnel/human-resource/recruitment-process/permanent-recruitment/appointment-order/list",
                      },
                    ],
                  },
                  {
                    title: "Temporary Engagement",
                    url: "/personnel/human-resource/recruitment-process/temporary-engagement/list",
                  },
                  {
                    title: "Compassionate Appointment",
                    url: "/personnel/human-resource/recruitment-process/compassionate-appointment/list",
                  },
                ],
              },

              {
                title: "TA Bill",
                url: "/personnel/human-resource/ta-bill/list",
              },
              {
                title: "Loan and Advance",
                url: "/personnel/human-resource/loan-and-advance/list",
              },
              {
                title: "Employee Service Register",
                url: "/personnel/human-resource/employee-service-register/list",
                items: [],
              },
               {
                title: "Employee Regularization",
                url: "/personnel/human-resource/employee-regularization/list",
              },
              {
                title: "Confirmation Postponed",
                url: "/personnel/human-resource/confirmation-postponed/list",
              },
              {
                title: "Increment",
                url: "/personnel/human-resource/increment/list",
              },
              {
                title: "Voluntary Provident Fund Process",
                url: "/personnel/human-resource/voluntary-provident-fund-process/list",
              },
              {
                title: "Attendance",
                items: [
                  {
                    title: "View Biometric Attendance",
                    url: "/personnel/human-resource/attendance/view-biometric-attendance",
                  },
                  {
                    title: "Manual Attendance",
                    url: "/personnel/human-resource/attendance/manual-attendance/list",
                    items: [],
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
                  {
                    title: "Payslip Generation",
                    url: "/personnel/human-resource/pay-roll/payslip-generation",
                  },
                  {
                    title: "Pay Master",
                    url: "/personnel/human-resource/pay-roll/pay-master",
                  },
                  {
                    title: "Pay Roll Configuration",
                    url: "/personnel/human-resource/pay-roll/pay-roll-configuration",
                    items: [
                      {
                        title: "Cadrewise Pay Head Config",
                        url: "/personnel/human-resource/pay-roll/pay-roll-configuration/cadrewise-pay-head-config/list",
                      },
                      {
                        title: "DA Arrear Configuration",
                        url: "/personnel/human-resource/pay-roll/pay-roll-configuration/da-arrear-configuration/list",
                      },
                      {
                        title: "Grade Wise Pay Allowance",
                        url: "/personnel/human-resource/pay-roll/pay-roll-configuration/grade-wise-pay-allowance/list",
                      },
                      {
                        title: "OT Register",
                        url: "/personnel/human-resource/pay-roll/pay-roll-configuration/ot-register/list",
                      },
                      {
                        title: "Tax Config",
                        url: "/personnel/human-resource/pay-roll/pay-roll-configuration/tax-config/list",
                      },
                      {
                        title: "Gradewise Pay Config",
                        url: "/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-pay-config/list",
                      },
                      {
                        title: "Gradewise City Config",
                        url: "/personnel/human-resource/pay-roll/pay-roll-configuration/gradewise-city-config/list",
                      },
                    ],
                  },
                  {
                    title: "Additional Earnings / Deduction",
                    url: "/personnel/human-resource/pay-roll/additional-earnings-deduction/list",
                  },
                  {
                    title: "Loan Disbursement",
                    url: "/personnel/human-resource/pay-roll/pay-roll-configuration/loan-disbursement/list",
                  },
                  {
                    title: "Payroll Verification",
                    url: "/personnel/human-resource/pay-roll/payroll-verification/list",
                  },

                ],
              },
              {
                title: "Leave Management",
                items: [
                  {
                    title: "Leave Request",
                    url: "/personnel/human-resource/leave-management/leave-request/list",
                  },
                ],
              },
            ],
          },
          {
            title: "Admin",
            items: [
              {
                title: "File Movement",
                url: "/personnel/human-resource/admin/file-movement/list",
              },
              {
                title: "Court Case",
                url: "/personnel/human-resource/admin/court-case/list",
              },
              {
                title: "Suspension Details List",
                url: "/personnel/admin/suspension-details/list",
              },
              {
                title: "Policy Note",
                url: "/personnel/admin/policy-note/list",
                items: [],
              },
              {
                title: "Claim For Expo",
                url: "/personnel/admin/claim-for-expo/list",
                items: [],
              },
              {
                title: "Circular / Office Order",
                url: "/personnel/admin/circular-office-order/list",
                items: [],
              },
              {
                title: "Petition",
                url: "/personnel/admin/petition/list",
                items: [],
              },
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
              {
                title: "Training",
                items: [
                  {
                    title: "Student Training",
                    url: "/personnel/human-resource/admin/training/student-training/list",
                  },
                  {
                    title: "Internal / External Training",
                    url: "/personnel/human-resource/admin/training/internal-external-training/list",
                  },
                ],
              },
              {
                title: "Meeting",
                items: [
                  {
                    title: "Meeting Request",
                    url: "/personnel/admin/meeting/meeting-request/list",
                    items: [],
                  },
                  {
                    title: "Meeting Report",
                    url: "/personnel/admin/meeting/meeting-report/list",
                    items: [],
                  },
                ],
              },
              {
                title: "Tapal",
                items: [
                  {
                    title: "Incoming Tapal",
                    url: "/personnel/admin/tapal/incoming-tapal/list",
                    items: [],
                  },
                  {
                    title: "Outgoing Tapal",
                    url: "/personnel/admin/tapal/outgoing-tapal/list",
                    items: [],
                  },
                  {
                    title: "File Numbering",
                    url: "/personnel/admin/tapal/file-numbering/list",
                    items: [],
                  },
                ],
              },
            ],
          },
          {
            title: "Employee Self Service",
            items: [
              { title: "General Information", url: "/personnel/employee-self-service/general-information/list" },
              { title: "Apply Leave", url: "/personnel/employee-self-service/apply-leave/list" },
              { title: "FBF Contribution", url: "/personnel/employee-self-service/fbf-contribution/list" },
              { title: "Flag Day Contribution", url: "/personnel/employee-self-service/flag-day-contribution/list" },
              { title: "Interchange", url: "/personnel/employee-self-service/interchange/list" },
              { title: "Additional Charge", url: "/personnel/employee-self-service/additional-charge/list" },
              { title: "Insurance", url: "/personnel/employee-self-service/insurance/list" },
              { title: "Loans & Advance", url: "/personnel/employee-self-service/loans-and-advance/list" },
              { title: "Loan Information", url: "/personnel/employee-self-service/loan-information/list" },
              { title: "Surety Acceptance", url: "/personnel/employee-self-service/surety-acceptance/list" },
              { title: "Transfer", url: "/personnel/employee-self-service/transfer/list" },
              { title: "Promotion", url: "/personnel/employee-self-service/promotion/list" },
              { title: "Training Request", url: "/personnel/employee-self-service/training-request/list" },
              { title: "LTC Request", url: "/personnel/employee-self-service/ltc-request/list" },
              { title: "Pay Slip", url: "/personnel/employee-self-service/pay-slip/list" },
              { title: "Voluntary / Apply Resignation Request", url: "/personnel/employee-self-service/voluntary-resignation-request/list" },
              { title: "Voluntary Provident Fund Request", url: "/personnel/employee-self-service/voluntary-provident-fund-request/list" },
            ],
          }
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
          },    {
            title: "Asset Request",
            url: "/asset-management/asset-request/list",
          },

          {
            title: "Asset Allocation",
            url: "/asset-management/asset-allocation/list",
          },
          {
            title: "Asset Depreciation",
            url: "/asset-management/asset-depreciation/create",
          },
          {
            title: "Asset Disposal",
            url: "/asset-management/asset-disposal/list",
          },
        ]
      },

      {
        title: "E-Commerce",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Admin",
            url: "/ecommerce/admin",
            items: [
              {
                title: "E-Shopping to E-Commerce",
                url: "/ecommerce/admin/eshopping-to-ecommerce/list",
              },
              {
                title: "E-Commerce Rate Configuration",
                url: "/ecommerce/admin/ecommerce-rate-configuration/list",
              },
            ],
          },
        ],
      },


      {
        title: "Masters",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Asset Masters",
            items: [
              {
                title: "Asset Category",
                url: "/masters/asset-masters/asset-category/list",
              },
              {
                title: "Asset Register",
                url: "/masters/asset-masters/asset-register/list",
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
