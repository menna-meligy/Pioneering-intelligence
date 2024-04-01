// import React from "react";
// import * as tf from "@tensorflow/tfjs";
// // import { rgbToGrayscale, squeeze } from "@tensorflow/tfjs";

// const TextExtractor = async (imageFile) => {
//   try {
//     const model = await tf.loadLayersModel("lstm_model/model.json");
//     const reader = new FileReader();
//     reader.readAsDataURL(imageFile);
//     return new Promise((resolve, reject) => {
//       reader.onload = async (event) => {
//         const img = new Image();
//         img.src = event.target.result;
//         img.onload = async () => {
//           const imageTensor = tf.browser.fromPixels(img);
//           const processedImage = preprocessImage(imageTensor);
//           const predictions = model.predict(processedImage);
//           // const predictedClassIndex = predictions.argMax(1).dataSync()[0];
//           const predictedText = predictions.dataSync()[0];
//           resolve(predictedText);
//         };
//       };
//     });
//   } catch (error) {
//     console.error("Error loading the model:", error);
//     return null;
//   }
// };

// const preprocessImage = (image) => {
//   const resizedImage = tf.image.resizeBilinear(image, [256, 256]);
//   const normalizedImage = resizedImage.div(255.0);
//   const grayscaleImage = tf.image.rgbToGrayscale(normalizedImage); // Convert image to grayscale
//   const processedImage = grayscaleImage.squeeze(); // Remove the last dimension (color channels)
//   return processedImage.expandDims(0); // Expand dimensions to create batch dimension
// };

// // export default TextExtractor;
// import React from "react";
// import * as tf from "@tensorflow/tfjs";

// const TextExtractor = async (imageFile) => {
//   try {
//     // Load the TensorFlow.js model
//     const model = await tf.loadLayersModel("lstm_model/model.json");

//     // Read the image file and preprocess it
//     const imageTensor = await preprocessImage(imageFile);

//     // Make predictions
//     const predictions = model.predict(imageTensor);

//     // Extract predicted text
//     const predictedText = await extractText(predictions);

//     return predictedText;
//   } catch (error) {
//     console.error("Error during text extraction:", error);
//     return null;
//   }
// };

// const preprocessImage = async (imageFile) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       const img = new Image();
//       img.onload = async () => {
//         const tensor = tf.browser.fromPixels(img).toFloat();
//         const resizedImage = tf.image.resizeBilinear(tensor, [256, 256]);
//         const normalizedImage = resizedImage.div(255.0);
//         const grayscaleImage = tf.image.rgbToGrayscale(normalizedImage);

//         // Ensure that the image tensor has the correct shape [1,256,256,1]
//         const processedImage = grayscaleImage.expandDims(0).expandDims(-1);
//         resolve(processedImage);
//       };
//       img.src = event.target.result;
//     };
//     reader.onerror = (error) => reject(error);
//     reader.readAsDataURL(imageFile);
//   });
// };

// const extractText = async (predictions) => {
//   // Process predictions to extract text
//   // Assuming predictions contain the text information
//   // Modify this part according to your model's output
//   const text = await predictions.data(); // Assuming predictions is a tensor containing text
//   return text;
// };

// export default TextExtractor;import React, { useState } from "react";

const TextExtractor = async (imageFile, lang) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("lang", lang);

  try {
    const response = await fetch("http://localhost:5000/extract-text", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const extractedText = data.text;
    return extractedText || ""; // Return empty string if extractedText is undefined
  } catch (error) {
    console.error("Error extracting text:", error);
    return null;
  }
};

export default TextExtractor;
