import * as React from "react";
import { useRef } from "react";
import Button from "./Button";
import uploadIcon from "public/assets/icons/upload-solid.svg";
import { IHandleUploadTransactions } from "@/types";

interface Props {
  handleUploadTransactions(props: IHandleUploadTransactions): void;
}

export default function UploadFileButton(props: Props) {
  /* In this case, useRef is used to access a DOM element directly! */
  const inputFileBtn = useRef<HTMLInputElement | null>(null);

  const handleOpenFileDialog = () => {
    if (inputFileBtn) {
      inputFileBtn.current?.click();
    }
  };

  const handleImport = (event: React.FormEvent<HTMLInputElement>) => {
    try {
      const file = (event.target as HTMLInputElement).files![0]; // ! tells it to ignore the possibility that files is null
      if (!file) return;
      props.handleUploadTransactions({ file });
    } catch (error) {
      console.log(error);
      console.log("Error in upload!");
    }
  };

  return (
    <div>
      <Button icon={uploadIcon} height="2rem" isSquare={true} onClick={handleOpenFileDialog} />
      <input
        type="file"
        name="inputFile"
        ref={inputFileBtn}
        onChange={handleImport}
        style={{ display: "none" }}
      />
    </div>
  );
}
