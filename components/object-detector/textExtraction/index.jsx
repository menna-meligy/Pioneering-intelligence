import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";

const ImageClassifier = () => {
  const inputRef = useRef(null);

  const preprocessImage = async (image) => {
    const resizedImage = tf.image.resizeBilinear(image, [256, 256]);
    const normalizedImage = resizedImage.div(255.0);
    const expandedImage = normalizedImage.expandDims(0);

    return expandedImage;
  };

  const classifyImage = async () => {
    const imageInput = inputRef.current;
    const resultDiv = document.getElementById("result");

    if (imageInput && resultDiv) {
      const imageFile = imageInput.files?.[0];

      if (imageFile) {
        try {
          const model = await tf.loadLayersModel("lstm_model/model.json");
          const reader = new FileReader();

          reader.onload = async (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = async () => {
              const imageTensor = tf.browser.fromPixels(img);

              const processedImage = await preprocessImage(imageTensor);

              const predictions = model.predict(processedImage);

              const predictedClassIndex = predictions.argMax(1).dataSync()[0];

              console.log("predictedClassIndex", predictedClassIndex);
              resultDiv.innerText = `Predicted Class: ${predictedClassIndex}`;
            };
          };

          reader.readAsDataURL(imageFile);
        } catch (error) {
          console.error("Error loading the model:", error);
        }
      } else {
        resultDiv.innerText = "Please upload an image.";
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={classifyImage}
      />
      <button onClick={() => inputRef.current?.click()}>Upload Image</button>
      <div id="result"></div>
    </div>
  );
};

export default ImageClassifier;
