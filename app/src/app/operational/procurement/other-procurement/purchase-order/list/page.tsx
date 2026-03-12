"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED:      "bg-[#FFA70B] text-white",
  FINAL_APPROVED: "bg-[#28a745] text-white",
  INITIATED:      "bg-[#6c757d] text-white",
  APPROVED:       "bg-[#17a2b8] text-white",
  REJECTED:       "bg-[#dc3545] text-white",
};

const MOCK_DATA = [
  { id: 1,   poNumber: "PO-2107-Mar26-349", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "11-Mar-2026", status: "SUBMITTED"      },
  { id: 2,   poNumber: "PO-1806-Sep25-348", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "16-Sep-2025", status: "SUBMITTED"      },
  { id: 3,   poNumber: "PO-10-Sep25-347",   society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "11-Sep-2025", status: "SUBMITTED"      },
  { id: 4,   poNumber: "PO-1806-Sep25-346", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "03-Sep-2025", status: "FINAL_APPROVED" },
  { id: 5,   poNumber: "PO-2181-Aug25-345", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "25-Aug-2025", status: "SUBMITTED"      },
  { id: 6,   poNumber: "PO-2181-Aug25-344", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "25-Aug-2025", status: "INITIATED"      },
  { id: 7,   poNumber: "PO-2181-Aug25-343", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "21-Aug-2025", status: "SUBMITTED"      },
  { id: 8,   poNumber: "PO-1806-Aug25-342", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "21-Aug-2025", status: "SUBMITTED"      },
  { id: 9,   poNumber: "PO-1104-Aug25-341", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "21-Aug-2025", status: "SUBMITTED"      },
  { id: 10,  poNumber: "PO-1104-Aug25-340", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "21-Aug-2025", status: "SUBMITTED"      },
  { id: 11,  poNumber: "PO-2107-Jul25-339", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "18-Jul-2025", status: "FINAL_APPROVED" },
  { id: 12,  poNumber: "PO-1806-Jul25-338", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "15-Jul-2025", status: "SUBMITTED"      },
  { id: 13,  poNumber: "PO-1301-Jul25-337", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "10-Jul-2025", status: "FINAL_APPROVED" },
  { id: 14,  poNumber: "PO-2107-Jun25-336", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "28-Jun-2025", status: "SUBMITTED"      },
  { id: 15,  poNumber: "PO-1104-Jun25-335", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "20-Jun-2025", status: "INITIATED"      },
  { id: 16,  poNumber: "PO-1806-Jun25-334", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "15-Jun-2025", status: "FINAL_APPROVED" },
  { id: 17,  poNumber: "PO-2181-May25-333", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "30-May-2025", status: "SUBMITTED"      },
  { id: 18,  poNumber: "PO-1301-May25-332", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "22-May-2025", status: "FINAL_APPROVED" },
  { id: 19,  poNumber: "PO-1806-May25-331", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "15-May-2025", status: "SUBMITTED"      },
  { id: 20,  poNumber: "PO-2107-Apr25-330", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "10-Apr-2025", status: "SUBMITTED"      },
  { id: 21,  poNumber: "PO-1104-Apr25-329", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "05-Apr-2025", status: "FINAL_APPROVED" },
  { id: 22,  poNumber: "PO-2181-Mar25-328", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "28-Mar-2025", status: "SUBMITTED"      },
  { id: 23,  poNumber: "PO-1806-Mar25-327", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "20-Mar-2025", status: "INITIATED"      },
  { id: 24,  poNumber: "PO-1301-Mar25-326", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "15-Mar-2025", status: "SUBMITTED"      },
  { id: 25,  poNumber: "PO-2107-Feb25-325", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "28-Feb-2025", status: "FINAL_APPROVED" },
  { id: 26,  poNumber: "PO-1104-Feb25-324", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "20-Feb-2025", status: "SUBMITTED"      },
  { id: 27,  poNumber: "PO-1806-Jan25-323", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "15-Jan-2025", status: "FINAL_APPROVED" },
  { id: 28,  poNumber: "PO-2181-Jan25-322", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "08-Jan-2025", status: "SUBMITTED"      },
  { id: 29,  poNumber: "PO-1301-Dec24-321", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "20-Dec-2024", status: "SUBMITTED"      },
  { id: 30,  poNumber: "PO-2107-Dec24-320", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "12-Dec-2024", status: "FINAL_APPROVED" },
  { id: 31,  poNumber: "PO-1806-Nov24-319", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "28-Nov-2024", status: "SUBMITTED"      },
  { id: 32,  poNumber: "PO-1104-Nov24-318", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "20-Nov-2024", status: "INITIATED"      },
  { id: 33,  poNumber: "PO-2181-Oct24-317", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "15-Oct-2024", status: "FINAL_APPROVED" },
  { id: 34,  poNumber: "PO-1301-Oct24-316", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "08-Oct-2024", status: "SUBMITTED"      },
  { id: 35,  poNumber: "PO-1806-Sep24-315", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "25-Sep-2024", status: "FINAL_APPROVED" },
  { id: 36,  poNumber: "PO-2107-Sep24-314", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "18-Sep-2024", status: "SUBMITTED"      },
  { id: 37,  poNumber: "PO-1104-Aug24-313", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "28-Aug-2024", status: "SUBMITTED"      },
  { id: 38,  poNumber: "PO-2181-Aug24-312", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "20-Aug-2024", status: "FINAL_APPROVED" },
  { id: 39,  poNumber: "PO-1806-Jul24-311", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "15-Jul-2024", status: "SUBMITTED"      },
  { id: 40,  poNumber: "PO-1301-Jul24-310", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "08-Jul-2024", status: "INITIATED"      },
  { id: 41,  poNumber: "PO-2107-Jun24-309", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "28-Jun-2024", status: "FINAL_APPROVED" },
  { id: 42,  poNumber: "PO-1104-Jun24-308", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "20-Jun-2024", status: "SUBMITTED"      },
  { id: 43,  poNumber: "PO-1806-May24-307", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "30-May-2024", status: "SUBMITTED"      },
  { id: 44,  poNumber: "PO-2181-May24-306", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "22-May-2024", status: "FINAL_APPROVED" },
  { id: 45,  poNumber: "PO-1301-Apr24-305", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "15-Apr-2024", status: "SUBMITTED"      },
  { id: 46,  poNumber: "PO-2107-Apr24-304", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "08-Apr-2024", status: "SUBMITTED"      },
  { id: 47,  poNumber: "PO-1806-Mar24-303", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "28-Mar-2024", status: "FINAL_APPROVED" },
  { id: 48,  poNumber: "PO-1104-Mar24-302", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "20-Mar-2024", status: "INITIATED"      },
  { id: 49,  poNumber: "PO-2181-Feb24-301", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "28-Feb-2024", status: "SUBMITTED"      },
  { id: 50,  poNumber: "PO-1301-Feb24-300", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "20-Feb-2024", status: "FINAL_APPROVED" },
  { id: 51,  poNumber: "PO-1806-Jan24-299", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "15-Jan-2024", status: "SUBMITTED"      },
  { id: 52,  poNumber: "PO-2107-Jan24-298", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "08-Jan-2024", status: "SUBMITTED"      },
  { id: 53,  poNumber: "PO-1104-Dec23-297", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "22-Dec-2023", status: "FINAL_APPROVED" },
  { id: 54,  poNumber: "PO-2181-Dec23-296", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "15-Dec-2023", status: "SUBMITTED"      },
  { id: 55,  poNumber: "PO-1806-Nov23-295", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "28-Nov-2023", status: "SUBMITTED"      },
  { id: 56,  poNumber: "PO-1301-Nov23-294", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "20-Nov-2023", status: "INITIATED"      },
  { id: 57,  poNumber: "PO-2107-Oct23-293", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "15-Oct-2023", status: "FINAL_APPROVED" },
  { id: 58,  poNumber: "PO-1104-Oct23-292", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "08-Oct-2023", status: "SUBMITTED"      },
  { id: 59,  poNumber: "PO-1806-Sep23-291", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "25-Sep-2023", status: "SUBMITTED"      },
  { id: 60,  poNumber: "PO-2181-Sep23-290", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "18-Sep-2023", status: "FINAL_APPROVED" },
  { id: 61,  poNumber: "PO-1301-Aug23-289", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "28-Aug-2023", status: "SUBMITTED"      },
  { id: 62,  poNumber: "PO-2107-Aug23-288", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "20-Aug-2023", status: "SUBMITTED"      },
  { id: 63,  poNumber: "PO-1806-Jul23-287", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "15-Jul-2023", status: "FINAL_APPROVED" },
  { id: 64,  poNumber: "PO-1104-Jul23-286", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "08-Jul-2023", status: "INITIATED"      },
  { id: 65,  poNumber: "PO-2181-Jun23-285", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "28-Jun-2023", status: "SUBMITTED"      },
  { id: 66,  poNumber: "PO-1301-Jun23-284", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "20-Jun-2023", status: "FINAL_APPROVED" },
  { id: 67,  poNumber: "PO-1806-May23-283", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "30-May-2023", status: "SUBMITTED"      },
  { id: 68,  poNumber: "PO-2107-May23-282", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "22-May-2023", status: "SUBMITTED"      },
  { id: 69,  poNumber: "PO-1104-Apr23-281", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "15-Apr-2023", status: "FINAL_APPROVED" },
  { id: 70,  poNumber: "PO-2181-Apr23-280", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "08-Apr-2023", status: "SUBMITTED"      },
  { id: 71,  poNumber: "PO-1806-Mar23-279", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "28-Mar-2023", status: "SUBMITTED"      },
  { id: 72,  poNumber: "PO-1301-Mar23-278", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "20-Mar-2023", status: "INITIATED"      },
  { id: 73,  poNumber: "PO-2107-Feb23-277", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "28-Feb-2023", status: "FINAL_APPROVED" },
  { id: 74,  poNumber: "PO-1104-Feb23-276", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "20-Feb-2023", status: "SUBMITTED"      },
  { id: 75,  poNumber: "PO-1806-Jan23-275", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "15-Jan-2023", status: "SUBMITTED"      },
  { id: 76,  poNumber: "PO-2181-Jan23-274", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "08-Jan-2023", status: "FINAL_APPROVED" },
  { id: 77,  poNumber: "PO-1301-Dec22-273", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "22-Dec-2022", status: "SUBMITTED"      },
  { id: 78,  poNumber: "PO-2107-Dec22-272", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "15-Dec-2022", status: "SUBMITTED"      },
  { id: 79,  poNumber: "PO-1806-Nov22-271", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "28-Nov-2022", status: "FINAL_APPROVED" },
  { id: 80,  poNumber: "PO-1104-Nov22-270", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "20-Nov-2022", status: "INITIATED"      },
  { id: 81,  poNumber: "PO-2181-Oct22-269", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "15-Oct-2022", status: "SUBMITTED"      },
  { id: 82,  poNumber: "PO-1301-Oct22-268", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "08-Oct-2022", status: "FINAL_APPROVED" },
  { id: 83,  poNumber: "PO-1806-Sep22-267", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "25-Sep-2022", status: "SUBMITTED"      },
  { id: 84,  poNumber: "PO-2107-Sep22-266", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "18-Sep-2022", status: "SUBMITTED"      },
  { id: 85,  poNumber: "PO-1104-Aug22-265", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "28-Aug-2022", status: "FINAL_APPROVED" },
  { id: 86,  poNumber: "PO-2181-Aug22-264", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "20-Aug-2022", status: "SUBMITTED"      },
  { id: 87,  poNumber: "PO-1806-Jul22-263", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "15-Jul-2022", status: "SUBMITTED"      },
  { id: 88,  poNumber: "PO-1301-Jul22-262", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "08-Jul-2022", status: "INITIATED"      },
  { id: 89,  poNumber: "PO-2107-Jun22-261", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "28-Jun-2022", status: "FINAL_APPROVED" },
  { id: 90,  poNumber: "PO-1104-Jun22-260", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "20-Jun-2022", status: "SUBMITTED"      },
  { id: 91,  poNumber: "PO-1806-May22-259", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "30-May-2022", status: "SUBMITTED"      },
  { id: 92,  poNumber: "PO-2181-May22-258", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "22-May-2022", status: "FINAL_APPROVED" },
  { id: 93,  poNumber: "PO-1301-Apr22-257", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "15-Apr-2022", status: "SUBMITTED"      },
  { id: 94,  poNumber: "PO-2107-Apr22-256", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "08-Apr-2022", status: "SUBMITTED"      },
  { id: 95,  poNumber: "PO-1104-Mar22-255", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "28-Mar-2022", status: "INITIATED"      },
  { id: 96,  poNumber: "PO-1806-Mar22-254", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "20-Mar-2022", status: "FINAL_APPROVED" },
  { id: 97,  poNumber: "PO-2181-Feb22-253", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "28-Feb-2022", status: "SUBMITTED"      },
  { id: 98,  poNumber: "PO-1301-Feb22-252", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "20-Feb-2022", status: "SUBMITTED"      },
  { id: 99,  poNumber: "PO-2107-Jan22-251", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "15-Jan-2022", status: "FINAL_APPROVED" },
  { id: 100, poNumber: "PO-1806-Jan22-250", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "08-Jan-2022", status: "SUBMITTED"      },
  { id: 101, poNumber: "PO-1104-Dec21-249", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "22-Dec-2021", status: "SUBMITTED"      },
  { id: 102, poNumber: "PO-2181-Dec21-248", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "15-Dec-2021", status: "FINAL_APPROVED" },
  { id: 103, poNumber: "PO-1301-Nov21-247", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "28-Nov-2021", status: "SUBMITTED"      },
  { id: 104, poNumber: "PO-1806-Nov21-246", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "20-Nov-2021", status: "SUBMITTED"      },
  { id: 105, poNumber: "PO-2107-Oct21-245", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "15-Oct-2021", status: "INITIATED"      },
  { id: 106, poNumber: "PO-1104-Oct21-244", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "08-Oct-2021", status: "FINAL_APPROVED" },
  { id: 107, poNumber: "PO-2181-Sep21-243", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "25-Sep-2021", status: "SUBMITTED"      },
  { id: 108, poNumber: "PO-1806-Sep21-242", society: "391302 / NARASINGANPETTAI GOLDEN JUBILE COTTON CUM SILK WCS., Z-264,", createdDate: "18-Sep-2021", status: "SUBMITTED"      },
  { id: 109, poNumber: "PO-1301-Aug21-241", society: "352047 / AMMAPET WEAVERS COOP. SOCIETY S.532",                         createdDate: "28-Aug-2021", status: "FINAL_APPROVED" },
  { id: 110, poNumber: "PO-2107-Aug21-240", society: "112656 / SEMPAKKAM W.C.S. KH.213,",                                    createdDate: "20-Aug-2021", status: "SUBMITTED"      },
  { id: 111, poNumber: "PO-1104-Jul21-239", society: "311021 / BALAN W.C.S., R.H.68,",                                      createdDate: "15-Jul-2021", status: "SUBMITTED"      },
  { id: 112, poNumber: "PO-1806-Jul21-238", society: "351092 / SREE SAMUNDEESWARI WEAVERS COOPERATIVE SOCIETY S.A.53",       createdDate: "08-Jul-2021", status: "FINAL_APPROVED" },
  { id: 113, poNumber: "PO-2181-Jun21-237", society: "354316 / TH 187 SRI PALANI MURUGAN PRIMARY POWERLOOM WCS",             createdDate: "28-Jun-2021", status: "INITIATED"      },
  { id: 114, poNumber: "PO-1301-Jun21-236", society: "371303 / SRI MUSHNAM W.C.S.E.1908",                                    createdDate: "20-Jun-2021", status: "SUBMITTED"      },
];

type SortKey = "poNumber" | "society" | "createdDate" | "status";

const SortIcon = ({ active, dir }: { active: boolean; dir: "asc" | "desc" }) => (
  <span className="ml-1 inline-flex flex-col text-[9px] leading-none opacity-80">
    <span className={active && dir === "asc" ? "opacity-100" : "opacity-40"}>▲</span>
    <span className={active && dir === "desc" ? "opacity-100" : "opacity-40"}>▼</span>
  </span>
);

export default function PurchaseOrderListPage() {
  const router = useRouter();
  const basePath = "/operational/procurement/other-procurement/purchase-order";

  const [selectedId, setSelectedId]   = useState<number | null>(null);
  const [sortKey, setSortKey]         = useState<SortKey>("poNumber");
  const [sortDir, setSortDir]         = useState<"asc" | "desc">("desc");
  const [filters, setFilters]         = useState({ poNumber: "", society: "", createdDate: "", status: "" });
  const [page, setPage]               = useState(1);
  const [pageSize, setPageSize]       = useState(10);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = MOCK_DATA.filter((r) =>
    r.poNumber.toLowerCase().includes(filters.poNumber.toLowerCase()) &&
    r.society.toLowerCase().includes(filters.society.toLowerCase()) &&
    r.createdDate.toLowerCase().includes(filters.createdDate.toLowerCase()) &&
    (filters.status === "" || r.status === filters.status)
  ).sort((a, b) => {
    const va = (a as any)[sortKey] as string, vb = (b as any)[sortKey] as string;
    return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 1 || (page <= 3 && i <= 5) || (page >= totalPages - 2 && i >= totalPages - 4))
        pages.push(i);
      else if (pages[pages.length - 1] !== "...") pages.push("...");
    }
    return pages;
  };

  return (
    <div className="mx-auto">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-[22px] font-bold leading-tight text-dark dark:text-white">Purchase Order List</h2>
        <nav>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm">
            <li><Link href="/" className="font-medium text-dark hover:text-primary dark:text-gray-400">Home</Link></li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Operational</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Procurement</li>
            <li className="text-gray-400">/</li><li className="text-gray-500">Other Procurement</li>
            <li className="text-gray-400">/</li><li className="font-medium text-primary">Purchase Order List</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="p-5">
          {/* Top bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-dark dark:text-white">{filtered.length} - Purchase Order(s)</span>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => router.push(`${basePath}/create`)} className="flex items-center gap-1.5 rounded bg-[#28a745] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                Add
              </button>
              <button disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit
              </button>
              <button onClick={() => { if (selectedId) router.push(`${basePath}/view`); }} disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#17a2b8] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View
              </button>
              <button disabled={selectedId === null} className="flex items-center gap-1.5 rounded bg-[#dc3545] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/></svg>
                Delete
              </button>
              <button onClick={() => { setSelectedId(null); setFilters({ poNumber: "", society: "", createdDate: "", status: "" }); setPage(1); }} className="flex items-center gap-1.5 rounded bg-[#6c757d] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Clear
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#2d8f7b] text-white">
                  <th className="w-10 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">#</th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-left font-semibold cursor-pointer" onClick={() => handleSort("poNumber")}>
                    Purchase Order Number <SortIcon active={sortKey === "poNumber"} dir={sortDir} />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-left font-semibold cursor-pointer" onClick={() => handleSort("society")}>
                    Society Code / Name <SortIcon active={sortKey === "society"} dir={sortDir} />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold cursor-pointer" onClick={() => handleSort("createdDate")}>
                    Created Date <SortIcon active={sortKey === "createdDate"} dir={sortDir} />
                  </th>
                  <th className="border border-[#3aa88f] px-2 py-2.5 text-center font-semibold cursor-pointer" onClick={() => handleSort("status")}>
                    Status <SortIcon active={sortKey === "status"} dir={sortDir} />
                  </th>
                  <th className="w-16 border border-[#3aa88f] px-2 py-2.5 text-center font-semibold">Select</th>
                </tr>
                <tr className="bg-[#2d8f7b]">
                  <th className="border border-[#3aa88f] px-1 py-1"></th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={filters.poNumber} onChange={(e) => { setFilters((f) => ({ ...f, poNumber: e.target.value })); setPage(1); }} className="w-full rounded bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <input value={filters.society} onChange={(e) => { setFilters((f) => ({ ...f, society: e.target.value })); setPage(1); }} className="w-full rounded bg-white px-2 py-1 text-xs text-dark outline-none" />
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <div className="flex items-center gap-0.5">
                      <input value={filters.createdDate} onChange={(e) => { setFilters((f) => ({ ...f, createdDate: e.target.value })); setPage(1); }} placeholder="dd-MMM-yyyy" className="w-full rounded bg-white px-2 py-1 text-xs text-dark outline-none" />
                      <div className="flex size-6 shrink-0 items-center justify-center rounded bg-[#17a2b8] text-white">
                        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      </div>
                    </div>
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1">
                    <select value={filters.status} onChange={(e) => { setFilters((f) => ({ ...f, status: e.target.value })); setPage(1); }} className="w-full rounded bg-white px-2 py-1 text-xs text-dark outline-none">
                      <option value="">Select</option>
                      <option>SUBMITTED</option>
                      <option>FINAL_APPROVED</option>
                      <option>INITIATED</option>
                    </select>
                  </th>
                  <th className="border border-[#3aa88f] px-1 py-1"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={6} className="border border-stroke px-3 py-4 text-left text-gray-400 dark:border-dark-3">No records found</td></tr>
                ) : (
                  paginated.map((row, idx) => (
                    <tr key={row.id} className={`cursor-pointer ${idx % 2 === 0 ? "bg-white dark:bg-gray-dark" : "bg-[#f9fafb] dark:bg-[#1a2232]"}`} onClick={() => setSelectedId(row.id)}>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-[#17a2b8] dark:border-dark-3">{(page - 1) * pageSize + idx + 1}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.poNumber}</td>
                      <td className="border border-stroke px-2 py-2 align-middle text-dark dark:border-dark-3 dark:text-white">{row.society}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle text-dark dark:border-dark-3 dark:text-white">{row.createdDate}</td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3">
                        <span className={`rounded px-3 py-1 text-[11px] font-semibold ${STATUS_COLORS[row.status] ?? "bg-gray-200 text-gray-700"}`}>{row.status}</span>
                      </td>
                      <td className="border border-stroke px-2 py-2 text-center align-middle dark:border-dark-3">
                        <input type="radio" name="rowSelect" checked={selectedId === row.id} onChange={() => setSelectedId(row.id)} className="size-4 cursor-pointer accent-[#17a2b8]" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-3 flex flex-wrap items-center justify-end gap-1 text-sm">
            <span className="mr-1 text-gray-500 dark:text-gray-400">({page} of {totalPages})</span>
            <button onClick={() => setPage(1)} disabled={page === 1} className="flex size-7 items-center justify-center rounded border border-stroke disabled:opacity-40 dark:border-dark-3">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="11,17 6,12 11,7"/><polyline points="18,17 13,12 18,7"/></svg>
            </button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex size-7 items-center justify-center rounded border border-stroke disabled:opacity-40 dark:border-dark-3">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15,18 9,12 15,6"/></svg>
            </button>
            {visiblePages().map((p, i) =>
              p === "..." ? <span key={`e${i}`} className="px-0.5 text-gray-400">...</span> : (
                <button key={p} onClick={() => setPage(p as number)} className={`flex size-7 items-center justify-center rounded border text-xs font-medium ${page === p ? "border-[#17a2b8] bg-[#17a2b8] text-white" : "border-stroke text-dark dark:border-dark-3 dark:text-white"}`}>{p}</button>
              )
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex size-7 items-center justify-center rounded border border-stroke disabled:opacity-40 dark:border-dark-3">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="9,18 15,12 9,6"/></svg>
            </button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex size-7 items-center justify-center rounded border border-stroke disabled:opacity-40 dark:border-dark-3">
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="13,17 18,12 13,7"/><polyline points="6,17 11,12 6,7"/></svg>
            </button>
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="ml-1 rounded border border-stroke bg-transparent px-2 py-1 text-sm outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white">
              {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
