"use client";

import FloatingMenu from "@/components/floating-menu";
import { cn } from "@/lib/utils";
import { Check, Edit, Trash } from "lucide-react";
import Form from "next/form";
import React from "react";
export default function CreateManualPage(){
  const [images, setImages] = React.useState<File[] | null>(null);
  const [manualName, setManualName] = React.useState<string>("Cafe Manual");
  const [isEditingManual, setIsEditingManual] = React.useState<boolean>(false);

  return (
    <div className="w-full h-screen p-4 mt-4 flex flex-col items-start justify-items-start">
      <h1 className="text-3xl font-medium"> Create Manual </h1>
      <Form
        action="/create"
        className="flex flex-col gap-4 mt-4">
        <input type="file" 
          id="imageUp"
          name="image" 
          accept="image/*"
          multiple
          className="hidden" 
          onChange={(e) => {
            const files = e.target.files;
            setImages(files? Array.from(files) : null);
          }}
        />
        <div>
          <label htmlFor="imageUp" 
            className="p-3 border-1 rounded-md text-sm text-neutral-800 hover:bg-neutral-100 cursor-pointer">
            {images === null || images.length === 0
              ? "Upload manual images..." :
              images.length === 1
                ? `1 image selected`
                : `${images.length} images selected`
            }
          </label>
          <input 
            type="button" 
            value="Upload"
            disabled={images === null || images.length === 0}
            className="ml-2 p-2 bg-black text-white rounded-md hover:bg-neutral-900 disabled:bg-neutral-400 disabled:text-neutral-100"/>
        </div>
      </Form>
      <div id="manual-adjust-div"
        className="w-full h-full mt-4 ">
        <FloatingMenu className="w-72">
          <h2 className="text-xs text-neutral-500"> 2 pages </h2>
          <div className="flex flex-row justify-between">
            <h1 className={cn("text-lg font-bold", isEditingManual? 'hidden' : '')}> {manualName} </h1>
            <input type="text" 
              className={cn("text-lg font-bold w-40 border-1 border-neutral-300 rounded-md", isEditingManual? '' : 'hidden')}
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}/>
            <button className="p-1 rounded-md hover:text-neutral-600 hover:bg-neutral-200"
              onClick={() => {setIsEditingManual(!isEditingManual)}}>
              <Edit className={cn("size-5", isEditingManual? 'hidden' : '')}/>
              <Check className={cn("size-5 text-green-800", !isEditingManual? 'hidden' : '')}/>
            </button>
          </div>
          <hr className="mt-2 mb-2"/>
          <div className="floatmenu-content flex flex-col gap-2">
            <div className="floatmenu-item flex items-center justify-between p-2 rounded-md bg-neutral-100">
              <div> 
                <h3 className="text-base"> Manual Front </h3>
                <h4 className="text-xs font-light text-neutral-700"> cafe-manual-front.jpg </h4>
              </div>
              <div className="flex flex-row gap-1">
                <Edit className="p-0.5 rounded-md hover:text-neutral-600 hover:bg-neutral-200"/>
                <Trash className="p-0.5 rounded-md text-red-800 hover:text-red-700 hover:bg-neutral-200"/>
              </div>
            </div>
            <div className="floatmenu-item flex items-center justify-between p-2 rounded-md">
              <div> 
                <h3 className="text-base"> Manual Back </h3>
                <h4 className="text-xs font-light text-neutral-700"> cafe-manual-back.jpg </h4>
              </div>
              <div className="flex flex-row gap-1">
                <Edit className="p-0.5 rounded-md hover:text-neutral-600 hover:bg-neutral-200"/>
                <Trash className="p-0.5 rounded-md text-red-800 hover:text-red-700 hover:bg-neutral-200"/>
              </div>
            </div>
            <hr className="mt-2 mb-2"/>
              <label htmlFor="from-step" className="text-sm">From Step</label>
              <input id="from-step" type="number" 
                className="border-1 border-neutral-300 rounded-md h-10 p-2 w-32 mb-4"
                min={1}/>
              <label htmlFor="from-step" className="text-sm">To Step</label>
              <input id="from-step" type="number" 
                className="border-1 border-neutral-300 rounded-md h-10 p-2 w-32"
                min={6}/>
          </div>
        </FloatingMenu>
      </div>
    </div>
  )
}