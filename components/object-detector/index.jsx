import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";

const ImageClassifier = () => {
  const inputRef = useRef(null);

  // Function to preprocess the uploaded image
  const preprocessImage = async (image) => {
    // Resize the image to match the model's input shape
    const resizedImage = tf.image.resizeBilinear(image, [256, 256]);

    // Normalize pixel values to [0, 1] range
    const normalizedImage = resizedImage.div(255.0);

    // Expand dimensions to match model input shape [batch_size, height, width, channels]
    const expandedImage = normalizedImage.expandDims(0);

    return expandedImage;
  };

  // Function to classify the uploaded image
  const classifyImage = async () => {
    const imageInput = inputRef.current;
    const resultDiv = document.getElementById("result");

    if (imageInput && resultDiv) {
      const imageFile = imageInput.files?.[0];

      if (imageFile) {
        try {
          // Load the pre-trained model
          const model = await tf.loadLayersModel("/model.json");
          const reader = new FileReader();

          reader.onload = async (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = async () => {
              // Create a tensor from the image data
              const imageTensor = tf.browser.fromPixels(img);

              // Preprocess the image
              const processedImage = await preprocessImage(imageTensor);

              // Make predictions
              const predictions = model.predict(processedImage);

              // Get the predicted class index
              const predictedClassIndex = predictions.argMax(1).dataSync()[0];

              // Display the result
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
