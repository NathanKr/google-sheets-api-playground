import Link from "next/link";
import { ChangeEvent, useState } from "react";


export default function Home() {
  // 0 means index but on the sheet this is row number 2
  const [rowIndex, setRowIndex] = useState(0);
  return (
    <>
      <main>
        <Link href="/api/google-sheets-read">Click to read from sheet</Link>
        <br />
        <br />
        <Link href="/api/google-sheets-add-row">Click to add row to sheet</Link>
        <br />
        <br />
        <p style={{color:'lightblue'}}>To get the rowIndex \ row number add 2 to the following index</p>
        <input
          type="number"
          placeholder="row index to delete \ edit"
          defaultValue={rowIndex}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRowIndex(Number(e.target.value))
          }
        />
        <br />
        <br />
        <Link href={`/api/google-sheets-delete-row?rowIndex=${rowIndex}`}>
          Click to delete row in sheet
        </Link>
        <br />
        <br />
        <Link href={`/api/google-sheets-edit-row?rowIndex=${rowIndex}`}>
          Click to edit email row in sheet
        </Link>
      </main>
    </>
  );
}
