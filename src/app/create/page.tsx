"use client";

import FloatingMenu from "@/components/floating-menu";
import StackedImage from "@/components/stacked-image";
import { cn } from "@/lib/utils";
import { Page } from "@/types/manual-types";
import { Check, Edit, Trash } from "lucide-react";
import Form from "next/form";
import React from "react";
export default function CreateManualPage(){
  // States for manual creation
  const [loadImages, setLoadImages] = React.useState<File[] | null>(null);
  const [selectedPage, setSelectedPage] = React.useState<number>(0);

  // States for Manual Object creation
  const [manualName, setManualName] = React.useState<string>("Unnamed Manual");
  const [pagesInfo, setPagesInfo] = React.useState<Page[]>([]);

  // States for manual editing
  const [isEditingManual, setIsEditingManual] = React.useState<boolean>(false);
  const [hasPressedLoad, setPressedLoad] = React.useState<boolean>(false);
  const [isEditingPageName, setIsEditingPageName] = React.useState<boolean>(false); 

  // Drag and drop states
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);
  const [dragOverBottom, setDragOverBottom] = React.useState<boolean>(false);


  React.useEffect(() => {
    if (hasPressedLoad && loadImages !== null) {
      // Create initial pages info based on selected images
      const initialPages: Page[] = loadImages.map((file, index) => ({
        name: `Page ${index + 1}`,
        imgURL: file, // Assuming imgURL is a File object
        filename: file.name,
        stepFrom: -1, 
        stepTo: -1,
      }));
      setPagesInfo(initialPages);
    }
    setPressedLoad(false);
  }, [hasPressedLoad, loadImages]);

  const handleStepChange = (index: number, stepFrom?: number , stepTo?: number) => {
    if (pagesInfo && index >= 0 && index < pagesInfo.length) {
      const updatedPages = [...pagesInfo];
      if (stepFrom !== undefined) {
        pagesInfo[index].stepFrom = stepFrom;
      }
      if (stepTo !== undefined) {
        pagesInfo[index].stepTo = stepTo;
      }
      setPagesInfo(updatedPages);
    }
  }

  const handlePageNameChange = (index: number, newName: string) => {
    if (pagesInfo && index >= 0 && index < pagesInfo.length) {
      const updatedPages = [...pagesInfo];
      updatedPages[index].name = newName;
      setPagesInfo(updatedPages);
    }
  }

  const handlePageDelete = (index: number) => {
    if (pagesInfo && index >= 0 && index < pagesInfo.length) {
      const updatedPages = pagesInfo.filter((_, idx) => idx !== index);
      setPagesInfo(updatedPages);
      // Adjust selected page index if necessary
      if (selectedPage >= updatedPages.length) {
        setSelectedPage(updatedPages.length - 1);
      } else if (selectedPage === index) {
        setSelectedPage(0); // Reset to first page if deleted
      }
      if (updatedPages.length === 0) {
        setSelectedPage(-1); // No pages left
        setPressedLoad(false); // Reset load state
        setManualName("Unnamed Manual"); // Reset manual name
        setIsEditingManual(false); // Reset editing state
      }
    }
  }


  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || !pagesInfo || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      setDragOverBottom(false);
      return;
    }

    const newPages = [...pagesInfo];
    const draggedItem = newPages[draggedIndex];
    
    // Remove dragged item
    newPages.splice(draggedIndex, 1);
    
    // Insert at new position
    const insertIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newPages.splice(insertIndex, 0, draggedItem);
    
    setPagesInfo(newPages);
    
    // Update selected page if necessary
    if (selectedPage === draggedIndex) {
      setSelectedPage(insertIndex);
    } else if (selectedPage > draggedIndex && selectedPage <= dropIndex) {
      setSelectedPage(selectedPage - 1);
    } else if (selectedPage < draggedIndex && selectedPage >= dropIndex) {
      setSelectedPage(selectedPage + 1);
    }
    
    setDraggedIndex(null);
    setDragOverIndex(null);
    setDragOverBottom(false);
  };

  const handleDropAtBottom = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (draggedIndex === null || !pagesInfo) {
      setDraggedIndex(null);
      setDragOverBottom(false);
      return;
    }

    const newPages = [...pagesInfo];
    const draggedItem = newPages[draggedIndex];
    
    // Remove dragged item
    newPages.splice(draggedIndex, 1);
    
    // Add to end
    newPages.push(draggedItem);
    
    setPagesInfo(newPages);
    
    // Update selected page if necessary
    const newIndex = newPages.length - 1;
    if (selectedPage === draggedIndex) {
      setSelectedPage(newIndex);
    } else if (selectedPage > draggedIndex) {
      setSelectedPage(selectedPage - 1);
    }
    
    setDraggedIndex(null);
    setDragOverBottom(false);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setDragOverBottom(false);
  };

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
                setLoadImages(files? Array.from(files) : null);
              }}
            />
            <div>
              <label htmlFor="imageUp" 
                className="p-3 border-1 rounded-md text-sm text-neutral-800 hover:bg-neutral-100 cursor-pointer">
                {loadImages === null || loadImages.length === 0
                  ? "Upload manual images..." :
                  loadImages.length === 1
                    ? `1 image selected`
                    : `${loadImages.length} images selected`
                }
              </label>
              <input 
                type="button" 
                value="Load"
                onClick={() => setPressedLoad(true)}
                disabled={loadImages === null || loadImages.length === 0}
                className="ml-2 p-2 bg-black text-white rounded-md hover:bg-neutral-900 disabled:bg-neutral-400 disabled:text-neutral-100"/>
            </div>
          </Form>
        </div>
        <button className="bg-green-700 text-white w-24 h-10 rounded-md hover:bg-green-600 mr-6"> Save </button>
      </div>
      {/* Displays "No Images Loaded" when no images has been loaded yet */}
      { pagesInfo === null || pagesInfo.length === 0 ?
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-neutral-500"> No images loaded </h2>
        </div>
        :
        <></>
      }
      <div id="manual-adjust-div"
        className={cn("w-full mt-4 flex flex-row", pagesInfo === null || pagesInfo.length === 0 ? "hidden" : "")}
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
            { pagesInfo?.map((page, idx) => {
              return (
                <div 
                  key={idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    "floatmenu-item flex items-center cursor-pointer justify-between p-2 rounded-md transition-all", 
                    selectedPage === idx ? "bg-neutral-100" : "",
                    draggedIndex === idx ? "opacity-50" : "",
                    dragOverIndex === idx ? "border-2 border-blue-400 border-dashed" : ""
                  )}
                  onClick={() => setSelectedPage(idx)}>
                  <div> 
                    <h3 className={cn("text-base w-40 overflow-hidden text-clip", isEditingPageName && selectedPage === idx ? 'hidden' : '')}> {page.name} </h3>
                    <input type="text" 
                      className={cn("text-base w-40 border-1 border-neutral-300 rounded-md", isEditingPageName && selectedPage === idx ? '' : 'hidden')}
                      value={page.name}
                      onChange={(e) => handlePageNameChange(idx, e.target.value)}/>
                    <h4 className="text-xs font-light text-neutral-700"> {page.filename} </h4>
                  </div>
                  <div className="flex flex-row gap-1">
                    <button onClick={() => setIsEditingPageName(!isEditingPageName)}>
                      <Edit className={cn("p-0.5 rounded-md hover:text-neutral-600 hover:bg-neutral-200", isEditingPageName && selectedPage === idx ? 'hidden' : '')}/>
                      <Check className={cn("p-0.5 rounded-md text-green-800", isEditingPageName && selectedPage === idx ? '' : 'hidden')}/>
                    </button>
                    <button onClick={() => handlePageDelete(idx)}>
                      <Trash className="p-0.5 rounded-md text-red-800 hover:text-red-700 hover:bg-neutral-200"/>
                    </button>
                  </div>
                </div>
              )
            })}
            {/* Bottom Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                setDragOverBottom(true);
              }}
              onDragLeave={() => setDragOverBottom(false)}
              onDrop={handleDropAtBottom}
              className={cn(
                "h-4 rounded-md transition-all",
                dragOverBottom ? "border-2 border-blue-400 border-dashed bg-blue-50" : ""
              )}
            />
          </div>
            {/* Footer */}
            <hr className="mt-2 mb-2"/>
            {selectedPage < 0 || selectedPage >= pagesInfo.length ? <></> : <>
              <label htmlFor="from-step" className="text-sm">From Step</label>
              <input id="from-step" type="number" 
          className="border-1 border-neutral-300 rounded-md h-10 p-2 w-32 mb-4"
          min={pagesInfo[selectedPage-1] === undefined ? 0 : pagesInfo[selectedPage-1].stepTo + 1}
          value={pagesInfo[selectedPage]?.stepFrom}
          onChange={(e) => handleStepChange(selectedPage, Number(e.target.value), undefined)}/>
              <label htmlFor="from-step" className="text-sm">To Step</label>
              <input id="from-step" type="number" 
          className="border-1 border-neutral-300 rounded-md h-10 p-2 w-32"
          min={pagesInfo[selectedPage] === undefined ? 0 : pagesInfo[selectedPage]?.stepFrom + 1}
          value={pagesInfo[selectedPage]?.stepTo}
          onChange={(e) => handleStepChange(selectedPage, undefined, Number(e.target.value))}/>
          </>}
        </FloatingMenu>
        <div className="relative h-full w-full">
          {pagesInfo === null ? <></> : 
            <StackedImage 
              images={pagesInfo.map((pages) => URL.createObjectURL(pages.imgURL))}
              topIndex={selectedPage}
            />
          }
        </div>
      </div>
    </div>
  )
}