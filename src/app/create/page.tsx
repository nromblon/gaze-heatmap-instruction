"use client";

import FloatingMenu from "@/components/floating-menu";
import StackedImage from "@/components/stacked-image";
import { cn } from "@/lib/utils";
import { Check, Edit, Trash } from "lucide-react";
import Form from "next/form";
import React from "react";
export default function CreateManualPage(){
  const [selectImages, setSelectImages] = React.useState<File[] | null>(null);
  const [images, setImages] = React.useState<File[] | null>(null);
  const [manualName, setManualName] = React.useState<string>("Unnamed Manual");
  const [isEditingManual, setIsEditingManual] = React.useState<boolean>(false);
  const [selectedPage, setSelectedPage] = React.useState<number>(0);
  const [hasPressedSelect, setPressedSelect] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (hasPressedSelect && selectImages !== null) {
      setImages(selectImages);
    }
    setPressedSelect(false);
  }, [hasPressedSelect, selectImages]);

  return (
    <div className="w-full h-screen p-4 mt-4 flex flex-col items-start justify-items-start">
      <div className="flex flex-row justify-between w-full items-end">
        <div className="flex flex-col items-start">
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
                setSelectImages(files? Array.from(files) : null);
              }}
            />
            <div>
              <label htmlFor="imageUp" 
                className="p-3 border-1 rounded-md text-sm text-neutral-800 hover:bg-neutral-100 cursor-pointer">
                {selectImages === null || selectImages.length === 0
                  ? "Upload manual images..." :
                  selectImages.length === 1
                    ? `1 image selected`
                    : `${selectImages.length} images selected`
                }
              </label>
              <input 
                type="button" 
                value="Load"
                onClick={() => setPressedSelect(true)}
                disabled={selectImages === null || selectImages.length === 0}
                className="ml-2 p-2 bg-black text-white rounded-md hover:bg-neutral-900 disabled:bg-neutral-400 disabled:text-neutral-100"/>
            </div>
          </Form>
        </div>
        <button className="bg-green-700 text-white w-24 h-10 rounded-md hover:bg-green-600 mr-6"> Save </button>
      </div>
      {/* Displays "No Images Loaded" when no images has been loaded yet */}
      { images === null ?
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-neutral-500"> No images loaded </h2>
        </div>
        :
        <></>
      }
      <div id="manual-adjust-div"
        className={cn("w-full mt-4 flex flex-row", images === null ? "hidden" : "")}
        >
        <FloatingMenu className="w-80 flex flex-col items-stretch self-start">
          {/* Header */}
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
            {/* Page Item */}
            { images?.map((image, idx) => {
              return (
                <div 
                  key={idx}
                  className={cn("floatmenu-item flex items-center cursor-pointer justify-between p-2 rounded-md", 
                    selectedPage === idx ? "bg-neutral-100" : "")}
                  onClick={() => setSelectedPage(idx)}>
                  <div> 
                    <h3 className="text-base"> {`Page ${idx + 1}`} </h3>
                    <h4 className="text-xs font-light text-neutral-700"> {image.name} </h4>
                  </div>
                  <div className="flex flex-row gap-1">
                    <Edit className="p-0.5 rounded-md hover:text-neutral-600 hover:bg-neutral-200"/>
                    <Trash className="p-0.5 rounded-md text-red-800 hover:text-red-700 hover:bg-neutral-200"/>
                  </div>
                </div>
              )
            })}
            {/* Footer */}
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
        <div className="relative h-full w-full">
          {images === null ? <></> : 
            <StackedImage 
              images={images.map((image) => URL.createObjectURL(image))}
              topIndex={selectedPage}
            />
          }
        </div>
      </div>
    </div>
  )
}