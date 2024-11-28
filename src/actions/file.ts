"use server";

import { put, PutBlobResult } from "@vercel/blob";

export const uploadFile = async (file: File): Promise<PutBlobResult> => {
  return put(file.name, file, {
    access: "public",
  });
};
