// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { SPREAD_SHEET_ID } from "@/logic/constants";
import { loadSpreadSheetDoc } from "@/logic/utils";

interface IRow {
  name: string;
  email: string;
  index: number;
}

interface IData {
  spreadSheetId: string;
  docTitle: string;
  firstSheet: {
    title: string;
    index: number;
    rowCount: number;
    rows: IRow[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IData>
) {
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = await loadSpreadSheetDoc(SPREAD_SHEET_ID);

  // use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const firstSheet = doc.sheetsByIndex[0];

  // read rows
  const firstSheetRows = await firstSheet.getRows();
  const rows: IRow[] = firstSheetRows.map((it) => {
    return { name: it.name, email: it.email, index: it.rowIndex };
  });

  res.status(200).json({
    spreadSheetId: SPREAD_SHEET_ID,
    docTitle: doc.title,
    firstSheet: {
      title: firstSheet.title,
      index: firstSheet.index,
      rowCount: firstSheet.rowCount,
      rows,
    },
  });
}
