"use client";

import Form from "next/form";
import React from "react";
export default function CreateManualPage(){
  const [images, setImages] = React.useState<File[] | null>(null);

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
    </div>
  )
}