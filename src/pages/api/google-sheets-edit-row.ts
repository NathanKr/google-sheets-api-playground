// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SPREAD_SHEET_ID } from "@/logic/constants";
import { getTicsNowFrom1970, loadSpreadSheetDoc } from "@/logic/utils";

interface IQueryString {
  rowIndex: number;
}

// todo nath : use PATCH here because this is updated

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { rowIndex } = req.query as unknown as IQueryString;

  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = await loadSpreadSheetDoc(SPREAD_SHEET_ID);

  // use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const firstSheet = doc.sheetsByIndex[0];
  const rows = await firstSheet.getRows();
  const ticsFrom1970 = getTicsNowFrom1970();
  // update email
  const row = rows[rowIndex];
  row.email = `updated_${ticsFrom1970}_${row.email}`; 
  row.save();

  res.status(200).json({ status: "Success" });
}
