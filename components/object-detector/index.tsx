"use client";

import { rsqrt } from "@tensorflow/tfjs-backend-cpu/dist/kernels/Rsqrt";
import React, { useState, useRef, ChangeEvent } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";

import { div } from "@tensorflow/tfjs-core";

interface DetectedObject {
  className: string;
  score: number;
}


export function Detector(props: any) {
  const [imageInfo, setImageInfo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [predictions, setPredictions] = useState<DetectedObject[]>([]);

  const hasNoPredictions = !predictions || predictions.length === 0;
  const openFilePicker = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onImageSelection = async (e: ChangeEvent<HTMLInputElement>) => {
    //when we select another image
    const file = e.target.files && e.target.files[0];

    if (file) {
      const imageInfo = await readImage(file);
      setImageInfo(imageInfo);
      const imageElement = document.createElement("img");
      imageElement.src = imageInfo;

      imageElement.onload = async () => {
        await detectObjectsOfImage(imageElement);
      };
    }
  };

  //loading the image from the disk and display it in base 64 encoded
  const readImage = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      //when finished reading -> onload is a callback function
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const detectObjectsOfImage = async (imageElement: HTMLImageElement) => {
    const model = await cocoSsd.load({});
    const predictions = await model.detect(imageElement, 6);
    //await cuz it returns promise and we need to process one in order to move to the next
    // setPredictions(predictions);
    setPredictions(predictions.map(({ class: className, score }) => ({ className, score })));
    console.log("predictions", predictions);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="min-w-200px h-700px border-3 border-white rounded-5 flex items-center justify-center relative">
        {/* img */}
        {imageInfo && (
          <img src={imageInfo} className="h-full bg-cover bg-center" alt="Selected" />
        )}
        {/* loading img and displaying */}
      </div>
      <input
        type="file"
        name=""
        value=""
        className="hidden"
        ref={inputRef}
        onChange={onImageSelection}
      />
      <button
        className="px-10 py-7 border-2 border-transparent bg-white text-0a0f22 text-16 font-semibold outline-none mt-8 cursor-pointer transition-all duration-260 ease-in-out hover:bg-transparent hover:border-white hover:text-white"
        onClick={openFilePicker}
      >
        select img
      </button>
      <div>
        {!hasNoPredictions && predictions.map((prediction , index) => (
          <div key={index}>{prediction.className}</div>
        ))}
      </div>
    </div>
  );
}
