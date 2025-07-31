// frontend/src/pages/api/scraper/status.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    status: "running", // 可以是 running, paused, stopped
    currentPage: 5,
    totalPages: 139,
    estimatedTime: "12m 45s",
  });
}
