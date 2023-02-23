// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SPREAD_SHEET_ID } from "@/logic/constants";
import { getTicsNowFrom1970, loadSpreadSheetDoc } from "@/logic/utils";
import { GoogleSpreadsheetRow } from "google-spreadsheet";

interface IData{
  rowIndex : number
}

// todo nath : use POST here because this is create 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData>
) {
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = await loadSpreadSheetDoc(SPREAD_SHEET_ID);

  // use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const firstSheet = doc.sheetsByIndex[0];

  // read rows
  const ticsFrom1970 = getTicsNowFrom1970();
  const larryRow: GoogleSpreadsheetRow = await firstSheet.addRow({
    name: `Larry Page - ${ticsFrom1970}`,
    email: `larry-${ticsFrom1970}@google.com`,
  });
  res.status(201).json({rowIndex : larryRow.rowIndex});
}
