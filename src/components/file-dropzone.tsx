"use client";

import { PutBlobResult } from "@vercel/blob";
import { ClipboardCopyIcon, FileIcon } from "lucide-react";
import { useCallback, useRef, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "~/actions/file";
import { useToast } from "~/hooks/use-toast";
import { Button } from "./ui/button";
import { Spinner } from "./spinner";
import axios from "axios";
import { env } from "~/env";

export const FileDropzone = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);

    startTransition(async () => {
      try {
        if (acceptedFiles[0]) {
          const response = await uploadFile(acceptedFiles[0]);
          setBlob(response);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Ошибка",
            description: error.message,
            variant: "destructive",
          });
        }
        if (typeof error === "string") {
          toast({
            title: "Ошибка",
            description: error,
            variant: "destructive",
          });
        }
      }
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const handleCopy = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (blob) {
        navigator.clipboard.writeText(blob.url);
        toast({
          title: "Ссылка скопирована",
          description: "Скопирована в буфер обмена",
        });
      }
    },
    [blob, toast],
  );

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          if (!inputFileRef.current || !inputFileRef.current.files) return;
          const file = inputFileRef.current.files[0];
          if (!file) return;

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
      }}
      className="flex aspect-square size-full flex-col items-center justify-center gap-4 rounded-md border border-dashed p-4 text-sm tracking-tight text-muted-foreground"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <FileIcon size={24} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {isPending && <Spinner />}
      {blob && (
        <>
          <div className="flex w-fit items-center gap-2">
            <span className="w-40 truncate underline-offset-4 hover:underline">
              {blob.url}
            </span>
            <Button
              className="z-50"
              type="submit"
              size="icon"
              variant="secondary"
            >
              <ClipboardCopyIcon className="size-4" />
            </Button>
          </div>
          {/* <p className="text-pretty">{JSON.stringify(blob)}</p> */}
        </>
      )}
    </form>
  );
};
