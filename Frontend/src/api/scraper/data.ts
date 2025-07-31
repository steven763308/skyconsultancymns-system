// frontend/src/pages/api/scraper/data.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sampleData = [
    {
      name: "ABC Construction Sdn Bhd",
      tel: "03-12345678",
      fax: "03-87654321",
      ppkNo: "PPK123456",
      expiryDate: "2026-04-12",
      grade: "G3",
    },
    {
      name: "XYZ Builders Enterprise",
      tel: "012-3456789",
      fax: "N/A",
      ppkNo: "PPK987654",
      expiryDate: "2025-11-01",
      grade: "G1",
    },
  ];

  res.status(200).json(sampleData);
}
