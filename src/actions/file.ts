"use server";

import { put, PutBlobResult } from "@vercel/blob";
import axios from "axios";
import { env } from "~/env";

export const uploadFile = async (file: File) => {
  try {
    // Convert the file to text (XML content)
    const xmlContent = await file.text();

    // Make the POST request to the API
    const response = await axios.post(
      `${env.API_URL}/convert-xml-to-json`,
      xmlContent,
      {
        headers: {
          "Content-Type": "text/xml", // Inform the server about the payload type
        },
      },
    );

    console.log("Response from API:", response.data);

    return response.data; // Return the API response (e.g., converted JSON)
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
};

export const uploadFileToBlob = async (file: File): Promise<PutBlobResult> => {
  return put(file.name, file, {
    access: "public",
  });
};
