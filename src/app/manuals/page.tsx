"use client";

import { useAppSelector } from "@/lib/hooks";

export default function ManualsPage() {

  const manuals = useAppSelector((state) => state.manuals.manuals);

  return (
    <>
    { manuals.length > 0 ? (
      <div>
        {manuals.map((manual) => (
          <div key={manual.name} className="manual-item">
            <h2>{manual.name}</h2>
            <ul>
              {manual.pages.map((page) => (
                <li key={page.filename}>
                  {/* TODO: retrieve image data from database */}
                  {/* <Image src={URL.createObjectURL(page.imgURL)} alt={page.name} /> */}
                  <p>{page.name}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ) : (
      <p>No manuals found.</p>
    )}  
  </>
  );
}