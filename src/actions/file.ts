"use server";

import axios from "axios";
import { env } from "~/env";

export const uploadFile = async (file: File) => {
  return axios.post(`${env.API_URL}/upload`, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
