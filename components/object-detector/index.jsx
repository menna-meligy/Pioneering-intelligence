import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import ImageRevealer from "@/components/object-detector/imageReveal/index";
import TextExtractor from "@/components/object-detector/textExtraction/index";
import { MdCloudUpload } from "react-icons/md";

const ImageClassifier = ({ onOutputsReceived }) => {
  const inputRef = useRef(null);
  // const [textOutput, setTextOutput] = useState("");
  // const [graphOutput, setGraphOutput] = useState("");
  let textOutput = "";
  let graphOutput = "";

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
          const model = await tf.loadLayersModel("/model.json");
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

              // if (predictedClassIndex === 2) {
              // If predictedClassIndex is 2-> text and graphs, pass the image to TextExtractor and ImageRevealer
              textOutput = await TextExtractor(imageFile);
              graphOutput = await ImageRevealer(imageFile);
              // }
              // setTextOutput(textOutput);
              // setGraphOutput(graphOutput);
              // Pass outputs to the parent component
              console.log("textOutput", textOutput);
              console.log("graphOutput", graphOutput);
              onOutputsReceived(graphOutput, textOutput);
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
      {/* <button onClick={() => inputRef.current?.click()}>Upload Image</button> */}
      <button
        onClick={() => inputRef.current?.click()}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <MdCloudUpload size={24} /> {/* Adjust size as needed */}
      </button>
      <div id="result"></div>
    </div>
  );
};

export default ImageClassifier;
