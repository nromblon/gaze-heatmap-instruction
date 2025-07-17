"use client"

import Pagination from "@/components/pagination";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = React.useState(1);  

  return (
    <div className="w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex justify-between w-full">
        <div className="flex-col items-start ">
          <h1 className="text-3xl font-medium"> Construction Block -Cafe- </h1>
          <h2> Front - Step 1</h2>
        </div>
        <div className="flex items-center">
          <button className="rounded-md text-white bg-stone-800 border border-solid border-black/[.08] hover:bg-stone-600 hover:border-transparent font-medium text-sm sm:text-base h-8 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
            Hide Heatmap
          </button>
        </div>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/images/overlaysample.png"
          alt="Gaze Heatmap Logo"
          width={1000}
          height={180}
          priority
        />
      </main>
      <footer className="row-start-3 flex-col">
        <Pagination
          steps={15}
          currentStep={currentStep}
          onStepChange={(step) => setCurrentStep(step)}
        />
      </footer>
    </div>
  );
}
