"use client";

import FloatingMenu from '@/components/floating-menu';
import Pagination from '@/components/pagination';
import StackedImage from '@/components/stacked-image';
import { cn } from '@/lib/utils';
import Form from 'next/form';
import React from 'react';

export default function LoadGazePage() {
  const [eventsFiles, setEventsFiles] = React.useState<File[] | null>(null);
  const [gazeFiles, setGazeFiles] = React.useState<File[] | null>(null);
  const [selectedPage, setSelectedPage] = React.useState<number>(0);
  const [selectedStep, setSelectedStep] = React.useState<number>(0);

  return (
    <div id='content' className='p-8 w-full h-full'>
      <div id='events-section' className='mt-4 flex flex-row w-full h-full'>
        <div id='events-number' className='grid justify-center'>
          <span className='w-15 h-15 flex items-center justify-center border-1 border-neutral-300 rounded-full'>1</span>
        </div>
        <div id='events-content' className='flex flex-col items-start ml-5'>
          <h1 className="text-3xl font-medium"> Load Events Data <span className='text-sm text-neutral-600 font-light'> for every user to include </span></h1>
          <Form
            action="/create"
            className="flex flex-col gap-4 mt-4">
            <input type="file" 
              id="eventsUp"
              name="events" 
              accept="text/csv, application/json"
              multiple
              className="hidden" 
              onChange={(e) => {
                const files = e.target.files;
                setEventsFiles(files ? Array.from(files) : null);
              }}
            />
              <div>
                <label htmlFor="eventsUp" 
                  className="p-3 border-1 rounded-md text-sm text-neutral-800 hover:bg-neutral-100 cursor-pointer">
                  {eventsFiles === null || eventsFiles.length === 0
                    ? "Upload events data..." :
                    eventsFiles.length === 1
                      ? `1 file selected`
                      : `${eventsFiles.length} files selected`
                  }
                </label>
                <input 
                  type="button" 
                  value="Upload"
                  disabled={eventsFiles === null || eventsFiles.length === 0}
                  className="ml-2 p-2 bg-black text-white rounded-md hover:bg-neutral-900 disabled:bg-neutral-400 disabled:text-neutral-100"/>
              </div>

              <h2 className="text-xl mt-4">Annotation Settings</h2>
              <div className='flex flex-row gap-8'>
                <div className="flex flex-col gap-2">
                  <label htmlFor="stepFormat" className="text-sm">Step Format: </label>
                  <input id="stepFormat" name="stepFormat" type="text" className="border-1 border-neutral-300 rounded-md w-50 p-2 text-sm font-light" 
                    defaultValue={"step{i}"}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="stepBeginFormat" className="text-sm">Step Begin Format: </label>
                  <input id="stepBeginFormat" name="stepBeginFormat" type="text" className="border-1 border-neutral-300 rounded-md w-50 p-2 text-sm font-light" 
                    defaultValue={"step{i}.begin"}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="stepEndFormat" className="text-sm">Step End Format: </label>
                  <input id="stepEndFormat" name="stepEndFormat" type="text" className="border-1 border-neutral-300 rounded-md w-50 p-2 text-sm font-light" 
                    defaultValue={"step{i}.end"}/>
                </div>
              </div>
          </Form>
        </div>
      </div>
      <hr className='my-5'/>
      <div id='gaze-section' className='mt-4 flex flex-row w-full h-full'>
        <div id='gaze-number' className='grid justify-center'>
          <span className='w-15 h-15 flex items-center justify-center border-1 border-neutral-300 rounded-full'>2</span>
        </div>
        <div id='gaze-content' className='flex flex-col items-start ml-5'>
          <h1 className="text-3xl font-medium"> Load Gaze Data <span className='text-sm text-neutral-600 font-light'> for each page of the manual </span> </h1>
          <Form
            action="/create"
            className="flex flex-col gap-4 mt-4">
            <input type="file" 
              id="gazeUp"
              name="gaze" 
              accept="text/csv, application/json"
              multiple
              className="hidden" 
              onChange={(e) => {
                const files = e.target.files;
                setGazeFiles(files ? Array.from(files) : null);
              }}
            />
              <div>
                <label htmlFor="gazeUp" 
                  className="p-3 border-1 rounded-md text-sm text-neutral-800 hover:bg-neutral-100 cursor-pointer">
                  {gazeFiles === null || gazeFiles.length === 0
                    ? "Upload gaze data..." :
                    gazeFiles.length === 1
                      ? `1 file selected`
                      : `${gazeFiles.length} files selected`
                  }
                </label>
                <input 
                  type="button" 
                  value="Upload"
                  disabled={gazeFiles === null || gazeFiles.length === 0 || eventsFiles === null || eventsFiles.length === 0}
                  className="ml-2 p-2 bg-black text-white rounded-md hover:bg-neutral-900 disabled:bg-neutral-400 disabled:text-neutral-100"/>
              </div>
          </Form>
          <div>
            <FloatingMenu className='mt-4 w-72'>
              <h2 className="text-xs text-neutral-500"> 2 pages </h2>
              <h1 className="text-lg font-bold"> Manual </h1>
              <hr className="my-2"/>
              <div className="floatmenu-content flex flex-col gap-2">
                <div 
                  className={cn("floatmenu-item flex items-center justify-between p-2 cursor-pointer rounded-md", 
                    selectedPage === 0 ? "bg-neutral-100" : "")}
                    onClick={() => setSelectedPage(0)}>
                  <div> 
                    <h3 className="text-base"> Manual Front </h3>
                    <h4 className="text-xs font-light text-neutral-700"> cafe-manual-front.jpg </h4>
                  </div>
                </div>
                <div 
                  className={cn("floatmenu-item flex items-center justify-between p-2 cursor-pointer rounded-md", 
                    selectedPage === 1 ? "bg-neutral-100" : "")}
                    onClick={() => setSelectedPage(1)}>
                  <div> 
                    <h3 className="text-base"> Manual Back </h3>
                    <h4 className="text-xs font-light text-neutral-700"> cafe-manual-back.jpg </h4>
                  </div>
                </div>
              </div>
            </FloatingMenu>
            <div className="flex justify-center w-full">
              <button className="bg-green-600 text-white w-32 h-16 rounded-md hover:bg-green-700 mt-4 disabled:bg-neutral-400 disabled:text-neutral-100"
                disabled={gazeFiles === null || gazeFiles.length === 0 || eventsFiles === null || eventsFiles.length === 0}
              > 
              Generate Heatmap 
              </button>
            </div>
          </div>
        </div>
        <div id="manual-thumbnail" className="p-4 m-4 flex-1 flex flex-col items-center justify-center gap-3">
          <StackedImage
            images={["/images/cafe-manual-front.jpg", "/images/cafe-manual-back.jpg"]}
            imageWidth={600}
            topIndex={selectedPage}
          />
          <Pagination
            steps={15}
            maxVisibleSteps={6}
            currentStep={selectedStep}
            onStepChange={(step) => setSelectedStep(step)}
          />
        </div>
      </div>
    </div>
  );
};