import { FileDropzone } from "~/components/file-dropzone";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function HomePage() {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>AutoFixer</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Загрузить таблицу</Button>
            </DialogTrigger>
            <DialogContent className="p-4">
              <DialogTitle>Загрузка данных</DialogTitle>
              <DialogDescription>
                Перетащите файл <code>xml</code> в область ниже
              </DialogDescription>
              <FileDropzone />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
