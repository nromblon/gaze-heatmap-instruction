"use client";

import { setCurrentManual } from "@/lib/features/manual/manualSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ManualsPage() {
  const manuals = useAppSelector((state) => state.manuals.manuals);
  const currentManual = useAppSelector((state) => state.manuals.currentManual);

  let curManIdx = manuals.findIndex(manual => manual.name === currentManual?.name);
  // If currentManual is not set, default to the first manual
  curManIdx = curManIdx !== -1 ? curManIdx : 0;

  const dispatch = useAppDispatch();

  const [selectedManual, setSelectedManual] = useState<number>(curManIdx);


  const handleSelectManual = (idx: number) => {
    setSelectedManual(idx);
    // Additional logic can be added here if needed, such as fetching manual details
    dispatch(setCurrentManual(manuals[idx]));
  }

  return (
    <>
    { manuals.length > 0 ? (
      <div className="m-5 flex flex-col w-full">
        {manuals.map((manual, idx) => (
          <div key={manual.name} className={cn("manual-item w-full mb-4 p-4 border rounded-lg hover:bg-gray-100", 
            selectedManual === idx ? "bg-gray-100 border-black" : "")}
            onClick={() => handleSelectManual(idx)}>
            <h2><span className="font-bold"> Manual Name: </span> {manual.name}</h2>
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