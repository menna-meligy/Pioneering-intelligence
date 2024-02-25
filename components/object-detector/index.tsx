"use client";

import { rsqrt } from "@tensorflow/tfjs-backend-cpu/dist/kernels/Rsqrt";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import "@tensorflow/tfjs-backend-cpu";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import { loadLayersModel } from "@tensorflow/tfjs";
// import * as tf from '@tensorflow/tfjs-core'; // Use '@tensorflow/tfjs-node' for Node.js environment

// Load the model from the exported file
// tf.loadLayersModel('../../my_classifier/models/model.json')
//   .then((model: tf.LayersModel) => {
//     // Save the model to the specified path
//     return model.save('path_to_save_model');
//   })
//   .then(() => console.log('Model saved successfully'))
//   .catch((err: any) => console.error('Error saving model:', err));


  
interface DetectedObject {
  className: string;
  score: number;
}


export function Detector(props: any) {
  
 useEffect(() => {
    async function loadModel() {
      try {
        const model = await loadLayersModel('F:\CUZ IM NOT AN ORGANIZED PERSON\Documents\SAASAI\saas-ai\my_classifier\TensorFlowModel\model.json');
        console.log('Model loaded successfully:', model);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    }
    loadModel();
  }, []);

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
    // Convert the HTMLImageElement to a tensor
    const tensor = tf.browser.fromPixels(imageElement);

    // Resize, normalize, and expand dimensions of the tensor
    const inputWidth = 224; 
    const inputHeight = 224;
    const resizedTensor = tf.image.resizeBilinear(tensor, [inputHeight, inputWidth]);
    const normalizedTensor = resizedTensor.toFloat().div(255);
    const expandedTensor = normalizedTensor.expandDims(0);
  
    // Load the model
    console.log("modellll");
    const model = await tf.loadLayersModel('../../my_classifier/model.json');
    console.log("model loaded successfully");
    // Perform prediction
    const predictions = await model.predict(expandedTensor);
  
    // Convert model output to DetectedObject[]
    // let detectedObjects: DetectedObject[] = [];
    // if (Array.isArray(predictions)) {
    //   // Handle case when predictions is an array of tensors
    //   detectedObjects = convertToDetectedObjects(predictions[0]); // Assuming only first tensor is relevant
    // } else {
    //   // Handle case when predictions is a single tensor
    //   detectedObjects = convertToDetectedObjects(predictions);
    // }
  
    // // Set the predictions state
    // setPredictions(detectedObjects);
  
    // // Dispose tensors to free up memory
    // tensor.dispose();
    // resizedTensor.dispose();
    // normalizedTensor.dispose();
    // expandedTensor.dispose();
  
    console.log("predictions", predictions);
  };
  
  const convertToDetectedObjects = (predictions: tf.Tensor): DetectedObject[] => {
    // Convert TensorFlow tensors to JavaScript arrays
    const scoresArray = predictions.dataSync() as Float32Array;
    const classesArray = predictions.argMax(-1).dataSync() as Int32Array;
  
    // Convert arrays to DetectedObject[]
    const detectedObjects: DetectedObject[] = [];
    for (let i = 0; i < scoresArray.length; i++) {
      detectedObjects.push({
        className: classesArray[i].toString(), // Convert class index to string
        score: scoresArray[i]
      });
    }
  
    return detectedObjects;
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
