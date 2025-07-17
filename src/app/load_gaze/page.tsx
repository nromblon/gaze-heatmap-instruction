"use client";

import Form from 'next/form';
import React from 'react';

export default function LoadGazePage() {
  const [eventsFiles, setEventsFiles] = React.useState<File[] | null>(null);

  return (
    <div id='content' className='p-8 w-full h-full'>
      <div id='events-section' className='mt-4 flex flex-row w-full h-full'>
        <div id='events-number' className='grid justify-center'>
          <span className='w-15 h-15 flex items-center justify-center border-1 border-neutral-300 rounded-full'>1</span>
        </div>
        <div id='events-content' className='flex flex-col items-start ml-5'>
          <h1 className="text-3xl font-medium"> Load Events Data </h1>
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
    </div>
  );
};