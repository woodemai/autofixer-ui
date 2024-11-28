"use client";

import { FileIcon, Loader2 } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "~/actions/file";
import { useToast } from "~/hooks/use-toast";

export const FileDropzone = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    startTransition(async () => {
      try {
        if (acceptedFiles[0]) {
          await uploadFile(acceptedFiles[0]);
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

  return (
    <div
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
      {isPending && <Loader2 className="size-4 animate-spin" />}
    </div>
  );
};
