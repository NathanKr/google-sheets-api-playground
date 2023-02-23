import { GoogleSpreadsheet } from "google-spreadsheet";

export async function loadSpreadSheetDoc(
  spreadSheetId: string
): Promise<GoogleSpreadsheet> {
  const doc = new GoogleSpreadsheet(spreadSheetId);

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    // --- check credential file under secret directory
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: process.env.GOOGLE_PRIVATE_KEY!,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  return doc;
}

export function getTicsNowFrom1970() : number{
  return new Date().getTime()
}
