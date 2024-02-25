// utils.ts

import * as tf from "@tensorflow/tfjs";

export const convertToDetectedObjects = (
  predictions: tf.Tensor
): DetectedObjectInterface[] => {
  const scoresArray = Array.from(predictions.dataSync());
  const classesArray = Array.from(predictions.argMax(-1).dataSync());

  const detectedObjects: DetectedObjectInterface[] = [];
  for (let i = 0; i < scoresArray.length; i++) {
    detectedObjects.push({
      className: classesArray[i].toString(),
      score: scoresArray[i],
    });
  }

  return detectedObjects;
};

export interface DetectedObjectInterface {
  className: string;
  score: number;
}

export default convertToDetectedObjects;
