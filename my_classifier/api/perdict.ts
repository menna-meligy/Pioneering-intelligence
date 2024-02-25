import { NextApiRequest, NextApiResponse } from "next";
import * as tf from "@tensorflow/tfjs";
import { convertToDetectedObjects } from "../../my_classifier/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Extract the image data from the request body
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image data is missing" });
    }

    // Create an HTMLImageElement and set its source to the image data
    const imageElement = new Image();
    imageElement.src = image;

    // Wait for the image to load
    await new Promise<void>((resolve, reject) => {
      imageElement.onload = () => resolve();
      imageElement.onerror = (error) => reject(error);
    });

    // Convert the image to a TensorFlow tensor
    const tensor = tf.browser.fromPixels(imageElement);

    // Resize and expand the tensor as needed
    const resizedTensor = tf.image.resizeBilinear(tensor, [256, 256]);
    const expandedTensor = resizedTensor.expandDims(0);

    // Load the TensorFlow model
    const model = await tf.loadLayersModel(
      "file://../../my_classifier/TensorFlowModel/model.json"
    );

    if (!model) {
      return res
        .status(500)
        .json({ error: "Failed to load the TensorFlow model" });
    }

    // Perform prediction
    const predictions = model.predict(expandedTensor) as tf.Tensor;

    if (!predictions) {
      return res.status(500).json({ error: "Failed to make predictions" });
    }

    // Convert model output to DetectedObject[]
    const detectedObjects = convertToDetectedObjects(predictions);

    // Send the prediction result as a response
    res.status(200).json(detectedObjects);
  } catch (error) {
    console.error("Error predicting:", error);
    res.status(500).json({ error: "An error occurred while predicting." });
  }
}
